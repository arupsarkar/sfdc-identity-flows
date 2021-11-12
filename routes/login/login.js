const express = require('express')
const bodyParser = require('body-parser')
const jsforce = require("jsforce");

const router = express.Router()
// create application/json parser
const jsonParser = bodyParser.json()
// create application/x-www-form-urlencoded parser
const urlencodedParser = bodyParser.urlencoded({ extended: false })

router.get('/', urlencodedParser, async (req, res, next) => {
    let username = req.query.username
    let password = req.query.password
    let loginUrl = req.query.loginUrl
    const { conn, userInfo } = await init(username, password, loginUrl)
    console.log(conn)
    if(conn.accessToken) {
        res.json({"instanceUrl": conn.instanceUrl, "accessToken": conn.accessToken})
    }else {
        res.json({"Error": "Error logging in"})
    }

})

function init(username, password, loginUrl) {
    console.log('username', username)
    console.log('password', password)
    console.log('loginUrl', decodeURIComponent(encodeURIComponent(loginUrl)))
    const loginURL = decodeURIComponent(encodeURIComponent(loginUrl))
    const conn = new jsforce.Connection({
        loginUrl: loginURL
    })

    return new Promise((resolve, reject) => {
        conn.login(username, password, (err, userInfo) => {
            if (err) return reject(err)
            resolve({conn, userInfo})
        })
    })
}




module.exports = router;
