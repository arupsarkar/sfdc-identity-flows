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
// Testing: http://localhost:8081/login?username=arup.dotnet@sfdc.com&password=Salesforce4C01Yp5elgy1bBjP3QmRFfFGA&loginUrl=https://login.salesforce.com
app.get('/login', async (req, res, next) => {
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

// get accounts
// Testing: http://localhost:8081/accounts?instanceUrl=https://azure-integration-dev-ed.my.salesforce.com&accessToken=00Df4000004kCY8!AQsAQP1mKIYvqQBMQFNYNrWDzgYemPHwbNxGJyHaDkQPFwYvlJI_byti0YKU_WPGzL5RUXJsNjvdVxboBxQhkJsIJRw90Kw1&searchParam=1234
app.get('/accounts', async (req, res, next) =>{
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

app.get('*', (req, res, next) => {
    res.sendFile(path.join(__dirname+'/client/build/index.html'))
})
//
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

