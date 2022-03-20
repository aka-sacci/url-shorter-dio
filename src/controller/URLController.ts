import { Request, Response } from 'express'
const urlService = require('../service/URLService')
const URLService = new urlService



class URLController {
    public async shortner(req: Request, res: Response): Promise<void> {
        const { originURL } = req.body

        const urlExists = await URLService.checkURL(originURL)
        if (urlExists.exists) {
            res.status(302).json({
                message: "A URL já foi encurtada!",
                originURL: originURL,
                hash: urlExists.hash
            })
        }

        else {
            const shortURL = URLService.generateURL()
            const createSuccess = await URLService.addURL(originURL, shortURL.hash)

            if (createSuccess.success) {
                res.status(201).json({
                    message: "A URL foi encurtada!",
                    ...shortURL
                })
            } else {
                res.status(500).json({
                    message: "Houve um erro ao encurtar a URL",
                    error: createSuccess.error
                })
            }
        }

    }

    public async redirect(req: Request<{ hash: string }>, res: Response) {
        const { hash } = req.params
        const existsToRedirect = await URLService.getOriginURL(hash)
        if(existsToRedirect.exists === true) res.redirect(existsToRedirect.originURL)
        else {
            res.status(404).json({
                message: "Não foi possível encontrar a URL referente ao hash especificado",
            })
        }
    }
}

module.exports = URLController