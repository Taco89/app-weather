import LocalHistory from "@/assets/localHistory";

export default {
    name: 'app',
    data () {
        return {
            localHistory: new LocalHistory(),
            api_key: '04888a87542e446e054c229561992d1d',
            url_base: 'https://api.openweathermap.org/data/2.5/',
            query: '',
            weather: {},
            previousQueries: []
        }
    },
    methods: {
        fetchWeather (e) {
            if (e.key == "Enter") {
                    fetch(`${this.url_base}weather?q=${this.query}&units=metric&APPID=${this.api_key}`)
                        .then(res => {
                            return res.json();
                        }).then(this.setResults);
            }
        },
        setResults (results) {
            this.weather = results;
            this.localHistory.set(this.query, this.weather);
            this.previousQueries.push(this.query);
        },
        clearHistory(){
            localStorage.clear();
            this.previousQueries = [];
            this.weather = {};
            this.query = '';
        },
        showHistory(element) {
            this.weather = this.localHistory.get(element);
        },
        dateBuilder () {
            let d = new Date();
            let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
            let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
            let day = days[d.getDay()];
            let date = d.getDate();
            let month = months[d.getMonth()];
            let year = d.getFullYear();
            return `${day} ${date} ${month} ${year}`;
        }
    }
}