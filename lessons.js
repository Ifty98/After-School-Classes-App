const app = Vue.createApp({
    data() {
        return {
            sort1: '',
            sort2: '',
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
            ]
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

            if (this.sort1 === 'price') {
                if (this.sort2 === 'ascending') {
                    return this.lessons.slice().sort((a, b) => a.Price - b.Price);
                } 
                if (this.sort2 === 'descending') {
                    return this.lessons.slice().sort((a, b) => b.Price - a.Price);
                } else {
                    return this.lessons;
                }
            } else {
                return this.lessons;
            }
             
            
            
        }
      }
      
})

app.mount('#box')