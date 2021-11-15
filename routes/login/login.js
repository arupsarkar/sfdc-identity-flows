const express = require('express')
const bodyParser = require('body-parser')
const jsforce = require("jsforce");
const { getToken } = require('sf-jwt-token')
const {instanceUrl, accessToken} = require("jsforce/lib/connection");

require('dotenv').config()

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

router.get('/jwt',  urlencodedParser, async (req, res, next) => {

    const iss = process.env.CONSUMER_KEY
    const sub = process.env.USERNAME
    const aud = process.env.LOGIN_URL
    const key = process.env.PRIVATE_KEY
    try{
        const token = await getToken({
            iss: iss,
            sub: sub,
            aud: aud,
            privateKey: key.replace(/\\n/g, '\n')
        })

        // const conn = new jsforce.Connection()
        // conn.initialize({
        //     instanceUrl: token.instance_url,
        //     accessToken: token.access_token
        // })
        const {conn, userInfo} = await initJWT(token)
        if(conn.accessToken) {
            console.log(conn.accessToken)
            res.json({"instanceUrl": conn.instanceUrl, "accessToken": conn.accessToken})
        }else {
            console.log('Error', 'Did not receive any access token')
            res.json({"Error": "JWT : Error logging in"})
        }

    }catch(e) {
        console.log(e)
        res.json({"error": e})
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

function initJWT(token) {
    const conn = new jsforce.Connection()

    return new Promise((resolve, reject) => {
        conn.initialize(token.instance_url, token.access_token, (err, userInfo) => {
            if(err) return reject(err)
            resolve({conn, userInfo})
        })
    })

    // conn.initialize({
    //     instanceUrl: token.instance_url,
    //     accessToken: token.access_token
    // })
    // console.log(conn)
    // return conn
}




module.exports = router;
