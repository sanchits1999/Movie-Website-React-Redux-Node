import axios from "axios"

export default axios.create({
    baseURL: "https://imdb8.p.rapidapi.com/title",
    headers: {
        "x-rapidapi-host": "imdb8.p.rapidapi.com",
        "x-rapidapi-key": "ffe8967a50mshb89a5631c0d8abcp12e320jsn33e8761e593a",
        "useQueryString": true
    }
})