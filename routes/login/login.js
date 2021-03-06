const express = require('express')
const bodyParser = require('body-parser')
const jsforce = require("jsforce")
const { getToken } = require('sf-jwt-token')
// const {instanceUrl, accessToken} = require("jsforce/lib/connection")
const encryptUtils = require('../../utils-module/index').Encrypt

require('dotenv').config()

const router = express.Router()
// create application/json parser
const jsonParser = bodyParser.json()
// create application/x-www-form-urlencoded parser
const urlencodedParser = bodyParser.urlencoded({ extended: false })

router.get('/heartbeat', async (req, res, next) => {
    const today = new Date()
    res.json({'heartbeat': today})
})

router.get('/oauth2/auth', async (req, res, next) => {
//
// OAuth2 client information can be shared with multiple connections.
//
    let env  = req.query.env
    let login_url
    console.log('---> env ', env)
    if (env == 'prod') {
        login_url = process.env.OAUTH2_LOGIN_PROD_URL
    } else if(env == 'test') {
        login_url = process.env.OAUTH2_LOGIN_TEST_URL
    }
    req.session.loginUrl = login_url
    console.log('---> login URL ', req.session.loginUrl)
    console.log('---> key ', process.env.OAUTH2_KEY)
    console.log('---> secret ', process.env.OAUTH2_SECRET)
    console.log('---> redirect URL  ', process.env.OAUTH2_CALLBACK_URL)
    let oauth2 = await new jsforce.OAuth2({
        // you can change loginUrl to connect to sandbox or prerelease env.
        loginUrl : login_url,
        clientId : process.env.OAUTH2_KEY,
        clientSecret : process.env.OAUTH2_SECRET,
        redirectUri : process.env.OAUTH2_CALLBACK_URL
    });

    res.redirect(oauth2.getAuthorizationUrl({scope: 'api id web refresh_token'}))

})

const writeEvent = (res, sseId, data) => {
    res.write(`id:  ${sseId}`)
    res.write(`data: ${data}`)
}
const sendEvent = (req, res, data) => {
    res.writeHead(200, {
        'Cache-Control': 'no-cache',
        Connection: 'keep-alive',
        'Content-Type': 'text/event-stream',
        "Access-Control-Allow-Origin": "*"
    })

    const sseId = new Date().toDateString();

    writeEvent(res, sseId, data);
}
router.get('/oauth2-token/callback', async (req, res, next) => {
    console.log('---> login url ', req.session.loginUrl)
    let oauth2 = new jsforce.OAuth2({
        // you can change loginUrl to connect to sandbox or prerelease env.
        loginUrl : req.session.loginUrl,
        clientId : process.env.OAUTH2_KEY,
        clientSecret : process.env.OAUTH2_SECRET,
        redirectUri : process.env.OAUTH2_CALLBACK_URL
    });

    const conn = new jsforce.Connection({ oauth2 : oauth2 });
    let code = req.query.code
    console.log('---> OAuth2 code', code)
    await conn.authorize(code, (err, userInfo) => {
        if(err){
            console.log('---> Oauth2 err', err)
            res.json({'Error': err})
        }
    }).then((result) =>{
        let encrypted_token = encryptUtils.encrypt(conn.accessToken)
        console.log('---> encrypted access token', encrypted_token)
        req.session.accessToken = conn.accessToken
        req.session.instanceUrl = conn.instanceUrl
        console.log('---> access token', conn.accessToken)
        console.log('---> instance URL ', conn.instanceUrl)
        console.log('---> refresh token ', conn.refreshToken)
        console.log('---> req session values ', `${req.session.accessToken} ${req.session.instanceUrl}`)
        console.log('---> OAuth2 result', result)
        const data = `[access_token: ${encrypted_token}, instance_url: ${conn.instanceUrl}]`
        // res.status(200).json({
        //     access_token: encrypted_token,
        //     instance_url: conn.instanceUrl,
        //     redirectUrl: '/app'
        // })
        sendEvent(req, res, data)
        res.redirect('/')
        // res.json({'result': result})
    })

})

router.get('/', urlencodedParser, async (req, res, next) => {
    let username = req.query.username
    let password = req.query.password
    let loginUrl = req.query.loginUrl
    const { conn, userInfo } = await init(username, password, loginUrl)
    console.log(conn)
    if(conn.accessToken) {
        let randomToken = randomString(conn.accessToken)
        res.json({"instanceUrl": conn.instanceUrl, "randomToken": randomToken, "loginStatus": "success"})
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

        const {conn} = await initJWT(token)
        if(conn.accessToken) {
            //console.log(conn.accessToken)
            let randomToken = randomString(conn.accessToken)
            res.json({"instanceUrl": conn.instanceUrl, "randomToken": randomToken, "loginStatus": "success"})
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
        conn.initialize({
            instanceUrl: token.instance_url,
            accessToken: token.access_token
        })
        if(conn){
            resolve({conn})
        }else {
            reject({"Err": "Error connecting to server via JWT"})
        }
    })
}

function randomString(chars) {
    let vLength = chars.length
    let result = '';
    for (let i = vLength; i > 0; --i) result += chars[Math.floor(Math.random() * chars.length)];
    return result;
}

const encrypt = (payload) => {

}

const decrypt = (hash) => {

}




module.exports = router;
