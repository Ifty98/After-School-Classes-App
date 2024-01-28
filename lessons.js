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
            //ids of the lessons that are in the shopping cart
            lessonIDs: [

            ],
            //lessons requested by the user using the search functionality
            searchedLessons: [

            ],
            lessonImage: '',
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
                    return this.lessons.slice().sort((a, b) => a.topic.localeCompare(b.topic));
                }
                //sort by subject in descending order
                if (this.sort2 === 'descending') {
                    return this.lessons.slice().sort((a, b) => b.topic.localeCompare(a.topic));
                } else {
                    return this.lessons;
                }
            }

            if (this.sort1 === 'location') {
                if (this.sort2 === 'ascending') {
                    return this.lessons.slice().sort((a, b) => a.location.localeCompare(b.location));
                }
                if (this.sort2 === 'descending') {
                    return this.lessons.slice().sort((a, b) => b.location.localeCompare(a.location));
                } else {
                    return this.lessons;
                }
            }

            if (this.sort1 === 'price') {
                if (this.sort2 === 'ascending') {
                    return this.lessons.slice().sort((a, b) => a.price - b.price);
                }
                if (this.sort2 === 'descending') {
                    return this.lessons.slice().sort((a, b) => b.price - a.price);
                } else {
                    return this.lessons;
                }
            }

            if (this.sort1 === 'availability') {
                if (this.sort2 === 'ascending') {
                    return this.lessons.slice().sort((a, b) => a.space - b.space);
                }
                if (this.sort2 === 'descending') {
                    return this.lessons.slice().sort((a, b) => b.space - a.space);
                } else {
                    return this.lessons;
                }
            }
            //if user enters a text in the search space
            if (this.searchInput.length > 0) {
                //request to the server all the lessons searched by the user
                this.getSearchedLessons();
                //modify the lesssons array with the lessons got from the search request
                return this.lessons
                .filter(lesson => this.searchedLessons.some(searchedLesson => searchedLesson._id === lesson._id));
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
        //if user enters a text in the search space
        async getSearchedLessons() {
            try {
                //send get request with search input as a query parameter
                //const response = await fetch(`http://localhost:3000/lessons/search?userInput=${this.searchInput}`);
                const response = await fetch(`http://firstapp-env.eba-c7ragnr7.eu-west-2.elasticbeanstalk.com/lessons/search?userInput=${this.searchInput}`);
                //get data and store it in the searchedLessons array
                const data = await response.json();
                this.searchedLessons = data;
            } catch (error) {
                //catch any error during the request
                console.error('Error fetching lessons:', error);
            }
        },
        
        /*every time an item is added or removed from the shopping cart
        update the array of lessons IDs*/
        updateLessonIDs() {
            this.lessonIDs = [];
            this.shoppingCart.forEach(cartItem => {
                let nSpaces = cartItem.space;
                let lessonId = cartItem._id;
                //store the IDs of the lessons in the shopping depending on the number of spaces requested
                this.lessonIDs.push(...Array(nSpaces).fill(lessonId));
            });
        },

        //request to the server all data about the lessons
        async getLessons() {
            try {
                //send get request  
                //const response = await fetch('http://localhost:3000/lessons');
                const response = await fetch('http://firstapp-env.eba-c7ragnr7.eu-west-2.elasticbeanstalk.com/lessons');
                //get data and store it in the lessons array
                const data = await response.json();
                this.lessons = data;
            } catch (error) {
                //catch any error during the request
                console.error('Error fetching lessons:', error);
            }
        },

        //post request to store a new order in the database
        async submitOrder() {
            try {
                //http://localhost:3000/orders
                const response = await fetch('http://firstapp-env.eba-c7ragnr7.eu-west-2.elasticbeanstalk.com/orders', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        name: this.name,
                        phoneNumber: this.phoneNumber,
                        lessonIDs: this.lessonIDs,
                        numberOfSpaces: this.num,
                    }),
                });
            } catch (error) {
                console.error('Error submitting order:', error);
                //handle error
            }
        },
        
        //put request to update the number spaces of the lessons after an order have been done
        async updateLessonSpaces() {
            try {
                //http://localhost:3000/lessons/updateSpaces
                const response = await fetch('http://firstapp-env.eba-c7ragnr7.eu-west-2.elasticbeanstalk.com/lessons/updateSpaces', {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        lessonIDs: this.lessonIDs,
                    }),
                });
            } catch (error) {
                console.error('Error updating lesson spaces:', error);
                //handle error
            }
        },

        getLessonImage(lesson) {
            if (lesson.topic == "Math") {
                //http://localhost:3000/lesson-images/math.png
                return this.lessonImage = "http://firstapp-env.eba-c7ragnr7.eu-west-2.elasticbeanstalk.com/lesson-images/math.png"
            }
            if (lesson.topic == "English") {
                //http://localhost:3000/lesson-images/english.png
                return this.lessonImage = "http://firstapp-env.eba-c7ragnr7.eu-west-2.elasticbeanstalk.com/lesson-images/english.png"
            }
            if (lesson.topic == "Music") {
                http://localhost:3000/lesson-images/music.png
                return this.lessonImage = "http://firstapp-env.eba-c7ragnr7.eu-west-2.elasticbeanstalk.com/lesson-images/music.png"
            }
            if (lesson.topic == "Science") {
                http://localhost:3000/lesson-images/science.png
                return this.lessonImage = "http://firstapp-env.eba-c7ragnr7.eu-west-2.elasticbeanstalk.com/lesson-images/science.png"
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
            this.updateLessonIDs();
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
            this.updateLessonIDs();
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
            this.submitOrder();
            this.updateLessonSpaces();
            alert("Order comfirmed");
        }
    },
})

app.mount('body')
