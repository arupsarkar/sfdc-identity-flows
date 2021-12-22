const express = require('express')
const path = require('path')

const app = express();

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

