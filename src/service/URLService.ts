require('dotenv').config()
import shortId from 'shortid'
const database = require('../database')
const shortenedURLs = database.model('shortenedURLs')

class URLService {

    public generateURL(): object {
        const hash = shortId.generate()
        const shortURL = `${process.env.API_URL}/${hash}`
        return {
            hash,
            shortenedURL: shortURL
        }
    }

    public async checkURL(url: string): Promise<object> {
        var returnObject = {}
        const findURL = await shortenedURLs.findOne({
            originURL: url
        }).then((data: object) => {
            return data
        }).catch(() => {
            return null
        })
        returnObject = findURL === null ? { exists: false } : { exists: true, hash: findURL.hash }
        return returnObject
    }

    public async addURL(originURL: string, hash: string): Promise<object> {
        
        var ret = new shortenedURLs({
            hash: hash,
            originURL: originURL
        })
        .save()
        .then(() =>  { return { success: true } })
        .catch((err: Error) => { return {error: err} })
        return ret
    }

    public async getOriginURL(hash: string): Promise<object> {
        var returnObject = {}
        const findURL = await shortenedURLs.findOne({
            hash: hash
        }).then((data: object) => {
            return data
        }).catch(() => {
            return null
        })

        returnObject = findURL === null ? { exists: false } : { exists: true, originURL: findURL.originURL }
        return returnObject
    }

}

module.exports = URLService