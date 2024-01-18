const app = Vue.createApp({
    data() {
        return {
            // initial value for the first sorting form
            sort1: '',
            // intial value for the second sorting form
            sort2: '',
            // initialy the app shows the main page
            showCart: false,
            showMain: true,
            name: '',
            phoneNumber: '',
            // initila number of items in the shopping cart
            num: 0,
            // initial value for the search bar
            searchInput: '',
            matchingLessons: [

            ],
            //list of lessons in json format 
            lessons: [
                
            ],
            //lessons added to the shopping cart are stored here 
            shoppingCart: [

            ],
        }
    },

    //run functions when the app is loaded
    mounted() {
        this.getLessons();
    },

    //computed properties don't accept arguments and they update when a dependency changes
    computed: {
        //function to sort the lessons 
        sortedLessons() {
            //if input value is subject 
            if (this.sort1 === 'subject') {
                //sort by subject in ascending order
                if (this.sort2 === 'ascending') {
                    /* using slice() creates a new array without changing the original array and sorts the new array
                    based on the comparison function added  */
                    return this.lessons.slice().sort((a, b) => a.Subject.localeCompare(b.Subject));
                }
                //sort by subject in descending order
                if (this.sort2 === 'descending') {
                    return this.lessons.slice().sort((a, b) => b.Subject.localeCompare(a.Subject));
                } else {
                    return this.lessons;
                }
            }

            if (this.sort1 === 'location') {
                if (this.sort2 === 'ascending') {
                    return this.lessons.slice().sort((a, b) => a.Location.localeCompare(b.Location));
                }
                if (this.sort2 === 'descending') {
                    return this.lessons.slice().sort((a, b) => b.Location.localeCompare(a.Location));
                } else {
                    return this.lessons;
                }
            }

            if (this.sort1 === 'price') {
                if (this.sort2 === 'ascending') {
                    return this.lessons.slice().sort((a, b) => a.Price - b.Price);
                }
                if (this.sort2 === 'descending') {
                    return this.lessons.slice().sort((a, b) => b.Price - a.Price);
                } else {
                    return this.lessons;
                }
            }

            if (this.sort1 === 'availability') {
                if (this.sort2 === 'ascending') {
                    return this.lessons.slice().sort((a, b) => a.Spaces - b.Spaces);
                }
                if (this.sort2 === 'descending') {
                    return this.lessons.slice().sort((a, b) => b.Spaces - a.Spaces);
                } else {
                    return this.lessons;
                }
            }
            //if user enters a text in the search space
            if (this.searchInput.length > 0) {
                //the input is converted to lower case
                const input = this.searchInput.toLowerCase();
                //and using filter returns a new array with the lessons that meet the requirements without changing the original one 
                return this.lessons.filter(lesson => {
                    const subject = lesson.Subject.toLowerCase();
                    const location = lesson.Location.toLowerCase();
                    //return the selected lesson if it's subject or location contains the specified input
                    return subject.includes(input) || location.includes(input);
                });
            }
            
            else {
                return this.lessons;
            }
        },

        correctForm() {
            // Check if the name and phoneNumber are not empty
            const isNameValid = this.name !== '';
            const isPhoneNumberValid = this.phoneNumber !== '';

            // Check if the name contains only letters
            const nameContainsOnlyLetters = /^[A-Za-z]+$/.test(this.name);

            // Check if the phoneNumber contains only numbers
            const phoneNumberContainsOnlyNumbers = /^[0-9]+$/.test(this.phoneNumber);

            return isNameValid && isPhoneNumberValid && nameContainsOnlyLetters && phoneNumberContainsOnlyNumbers;
        },
    },

    methods: {
        //request to the server all data about the lessons
        async getLessons() {
            try {
              //send get request  
              const response = await fetch('http://localhost:3000/lessons');
              //get data and store it in the lessons array
              const data = await response.json();
              this.lessons = data;
            } catch (error) {
                //catch any error during the request
                console.error('Error fetching lessons:', error);
            }
        },

        //method to add the selected lesson to the shopping cart
        addToCart(lesson) {
            if (lesson.space > 0) {
                // Check if the lesson is already in the shopping cart
                const cartLesson = this.shoppingCart.find(item => item._id === lesson._id);

                if (cartLesson) {
                    // If the lesson is in the cart, increase its spaces by one
                    lesson.space--;
                    cartLesson.space++;
                } else {
                    // If the lesson is not in the cart, add it to the cart
                    lesson.space--;
                    this.shoppingCart.push({ ...lesson, space: 1 });
                }
                //every time a lesson is added the number of items in the shopping cart increases
                this.num++;
            }
        },
        //method to remove the selected lesson from the shopping cart
        removeFromCart(lesson) {
            //decreases the spaces of the selected lesson in the shopping cart
            lesson.space--;
            //looks for the lesson in the lessons array using its id 
            const listLesson = this.lessons.find(item => item._id === lesson._id);
            //and increases its spaces
            listLesson.space++;
            // if the spaces for the lesson in the shopping cart reach 0, remove it from the shopping cart
            if (lesson.space === 0) {
                const lessonIndex = this.shoppingCart.findIndex(item => item._id === lesson._id);
                // if the lesson is found in the shopping cart, remove it
                if (lessonIndex !== -1) {
                    this.shoppingCart.splice(lessonIndex, 1);
                }
            }
            // decrease the total count of items in the shopping cart
            this.num--;
        },
        //this method changes the value of showCart and showMain every time is executed
        changePage() {
            this.showCart = !this.showCart;
            this.showMain = !this.showMain;
        },
        //replace any characters that are not letters (A-Za-z) with an empty string
        //only letters are allowed in the input
        checkName(event) {
            event.target.value = event.target.value.replace(/[^A-Za-z]/g, '');
        },
        //replace any characters that are not digits (0-9) with an empty string
        //only numeric digits are allowed in the input
        checkNumber(event) {
            event.target.value = event.target.value.replace(/[^0-9]/g, '');
        },
        //submitting the form send an alert
        submitForm() {
            alert("Order comfirmed");
        }
    },
})

app.mount('body')
