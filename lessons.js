const app = Vue.createApp({
    data() {
        return {
            sort1: '',
            sort2: '',
            showCart: false,
            showMain: true,
            name: '',
            phoneNumber: '',
            lessons: [
                {
                    id: 1,
                    Subject: "Math",
                    Location: "London",
                    Price: 100,
                    Spaces: 5,
                    Image: "icon fa-solid fa-square-root-variable fa-beat-fade fa-4x",
                },
                {
                    id: 2,
                    Subject: "English",
                    Location: "London",
                    Price: 85,
                    Spaces: 5,
                    Image: "fa-solid fa-pencil fa-beat fa-4x",
                },
                {
                    id: 3,
                    Subject: "Math",
                    Location: "Oxford",
                    Price: 120,
                    Spaces: 5,
                    Image: "icon fa-solid fa-square-root-variable fa-beat-fade fa-4x",
                },
                {
                    id: 4,
                    Subject: "Music",
                    Location: "Bristol",
                    Price: 150,
                    Spaces: 5,
                    Image: "fa-solid fa-music fa-beat-fade fa-4x",
                },
                {
                    id: 5,
                    Subject: "Music",
                    Location: "Cambridge",
                    Price: 120,
                    Spaces: 5,
                    Image: "fa-solid fa-music fa-beat-fade fa-4x",
                },
                {
                    id: 6,
                    Subject: "Science",
                    Location: "Cambridge",
                    Price: 90,
                    Spaces: 5,
                    Image: "fa-solid fa-flask-vial fa-beat-fade fa-4x",
                },
                {
                    id: 7,
                    Subject: "Science",
                    Location: "London",
                    Price: 145,
                    Spaces: 5,
                    Image: "fa-solid fa-flask-vial fa-beat-fade fa-4x",
                },
                {
                    id: 8,
                    Subject: "English",
                    Location: "Oxford",
                    Price: 100,
                    Spaces: 5,
                    Image: "fa-solid fa-pencil fa-beat fa-4x",
                },
                {
                    id: 9,
                    Subject: "Math",
                    Location: "Luton",
                    Price: 75,
                    Spaces: 5,
                    Image: "icon fa-solid fa-square-root-variable fa-beat-fade fa-4x",
                },
                {
                    id: 10,
                    Subject: "Music",
                    Location: "Luton",
                    Price: 110,
                    Spaces: 5,
                    Image: "fa-solid fa-music fa-beat-fade fa-4x",
                },
            ],
            shoppingCart: [

            ],
        }
    },
    computed: {
        sortedLessons() {
            if (this.sort1 === 'subject') {
                if (this.sort2 === 'ascending') {
                    return this.lessons.slice().sort((a, b) => a.Subject.localeCompare(b.Subject));
                }
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

            else {
                return this.lessons;
            }
        },

        correctForm() {
            // Check if the name and phoneNumber are not empty
            const isNameValid = this.name.trim() !== '';
            const isPhoneNumberValid = this.phoneNumber.trim() !== '';

            // Check if the name contains only letters
            const nameContainsOnlyLetters = /^[A-Za-z]+$/.test(this.name);

            // Check if the phoneNumber contains only numbers
            const phoneNumberContainsOnlyNumbers = /^[0-9]+$/.test(this.phoneNumber);

            return isNameValid && isPhoneNumberValid && nameContainsOnlyLetters && phoneNumberContainsOnlyNumbers;
        },
    },

    methods: {
        addToCart(lesson) {
            if (lesson.Spaces > 0) {
                // Check if the lesson is already in the shopping cart
                const cartLesson = this.shoppingCart.find(item => item.id === lesson.id);

                if (cartLesson) {
                    // If the lesson is in the cart, increase its spaces by one
                    lesson.Spaces--;
                    cartLesson.Spaces++;
                } else {
                    // If the lesson is not in the cart, add it to the cart
                    lesson.Spaces--;
                    this.shoppingCart.push({ ...lesson, Spaces: 1 });
                }
            }
        },
        removeFromCart(lesson) {
            lesson.Spaces--;
            const listLesson = this.lessons.find(item => item.id === lesson.id);
            listLesson.Spaces++;
            if (lesson.Spaces === 0) {
                const lessonIndex = this.shoppingCart.findIndex(item => item.id === lesson.id);
                if (lessonIndex !== -1) {
                    this.shoppingCart.splice(lessonIndex, 1);
                }
            }
        },

        changePage() {
            this.showCart = !this.showCart;
            this.showMain = !this.showMain;
        },

        checkName(event) {
            event.target.value = event.target.value.replace(/[^A-Za-z]/g, '');
        },

        checkNumber(event) {
            event.target.value = event.target.value.replace(/[^0-9]/g, '');
        },
    }


})

app.mount('body')
