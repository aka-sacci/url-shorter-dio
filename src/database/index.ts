const mongoose = require('mongoose')
require('dotenv').config()

//Importação dos schemas
const shortenedURLsSchema = require('./models/shortenedURLsSchema')

//CONFIG MONGOOSE
mongoose.connect(process.env.DATABASE_URL)
.then(() => {
    console.log("Mongo conectado!")
})
.catch((error: Error) => {
    console.log("Erro ao se conectar ao MongoDB: " + error)
})

//Definição de models a partir de schemas
mongoose.model('shortenedURLs', shortenedURLsSchema)


module.exports = mongoose;