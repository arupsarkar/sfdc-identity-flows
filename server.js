const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const cors = require('cors')
const jsforce = require('jsforce')
const {use} = require("express/lib/router");
const port = process.env.PORT || 8081

const app = express()
// enable all cors request
app.use(cors())
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: false}))
// parse application/json
app.use(express.static(path.join(__dirname, 'client/build')))

app.get('/', (req, res, next) => {
    res.json("hello world !!")
})
// to test the URL
// http://localhost:8081/login?username=arup&password=foo&loginUrl=https://login.salesforce.com
app.get('/login', async (req, res, next) => {
    let username = req.query.username
    let password = req.query.password
    let loginUrl = req.query.loginUrl
    const { conn, userInfo } = await init(username, password, loginUrl)
    console.log(conn)
    if(conn.accessToken) {
        res.json({"access token": conn.accessToken})
    }else {
        res.json({"Error": "Error logging in"})
    }

})

app.get('*', (req, res, next) => {
    res.sendFile(path.join(__dirname+'/client/build/index.html'))
})
// /login?username=arup.dotnet@sfdc.com&password=Salesforce4C01Yp5elgy1bBjP3QmRFfFGA&loginUrl=https://login.salesforce.com
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


app.listen(port, () => {
    console.log(`Server listening on ${port}`)
})

