import express, {Request, Response} from 'express'
const app = express()
const cors = require('cors')

//Controllers
const urlController = require('./controller/URLController')
const URLController = new urlController
    
//Config
    //CORS
    app.use(cors())

//Middlewares
    //Middlewares para conversão 
    app.use(express.urlencoded({ extended: false }))
    app.use(express.json())

//Routes
    //Test route
    app.get('/test', (req: Request, res: Response) => {
        res.status(200).json({success: true})
    })

    //Shortner
    app.post('/shorter', URLController.shortner)
    //Redirect
    app.get('/shorter/:hash', URLController.redirect)


module.exports = app