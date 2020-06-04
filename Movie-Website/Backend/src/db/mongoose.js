const mongoose = require("mongoose")

mongoose.connect("mongodb+srv://sanchits1999:qwertyuiop@cluster0-qdyic.mongodb.net/movie-web?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
})

//module.exports = mongoose