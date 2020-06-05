import axios from "axios"

export default axios.create({
    baseURL: "https://movie-web-backend.herokuapp.com"
})
