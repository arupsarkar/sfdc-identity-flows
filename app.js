const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const cors = require('cors')


const app = express();
app.use(cors())
app.options('*', cors())
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

