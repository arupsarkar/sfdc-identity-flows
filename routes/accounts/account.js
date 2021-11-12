const express = require('express')
const bodyParser = require('body-parser')
const jsforce = require("jsforce");

const router = express.Router()
// create application/json parser
const jsonParser = bodyParser.json()
// create application/x-www-form-urlencoded parser
const urlencodedParser = bodyParser.urlencoded({ extended: false })

router.get('/find', async (req, res, next) =>{
    let instanceUrl = decodeURIComponent(encodeURIComponent(req.query.instanceUrl))
    let accessToken = decodeURIComponent(encodeURIComponent(req.query.accessToken))
    let searchParam = req.query.searchParam

    //create the conn object
    let conn = new jsforce.Connection({
        instanceUrl : instanceUrl,
        accessToken: accessToken
    });

    //let accounts = await conn.search(`FIND {${searchParam}} IN ALL FIELDS RETURNING Account`)
    let accounts = await getAccounts(conn, searchParam)
    res.json(accounts)

})

function getAccounts(conn, searchParam) {
    try{
        return new Promise((resolve, reject) => {
            conn.search(`FIND {${searchParam}} IN ALL FIELDS RETURNING Account`, (err, res) => {
                if(err) {
                    return reject(err)
                }
                console.log(JSON.stringify(res))
                resolve(res)
            })
        })
    }catch(err) {
        return err
    }
}

module.exports = router;