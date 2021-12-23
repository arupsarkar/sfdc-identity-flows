const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const cors = require('cors')


const app = express();
app.use(cors())
app.options('*', cors())
const allowedOrigins = ["https://login.salesforce.com", "https://sfdc-identity-flows.herokuapp.com"];
app.use((req, res, next) => {
    console.log('---> req.headers ', req.headers)
    let origin = req.headers.origin;
    console.log('---> origin', origin)
    if (allowedOrigins.includes(origin)) {
        res.header("Access-Control-Allow-Origin", origin); // restrict it to the required domain
    }
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
});
// Initialize session
// parse application/x-www-form-urlencoded
app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({extended: false}))

const loginRouter = require('./routes/login/login')
const accountsRouter = require('./routes/accounts/account')
const auth0Router = require('./routes/login/auth0/login')

app.use(express.static(path.join(__dirname, 'client/build')))
app.get('/app', (req, res, next) => {
    res.sendFile(path.join(__dirname+'/client/build/index.html'))
})

app.use('/api/login', loginRouter)
app.use('/api/accounts', accountsRouter)
app.use('/api/auth0', auth0Router)

module.exports = app

