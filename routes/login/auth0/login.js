const express = require('express')
const { auth } = require('express-oauth2-jwt-bearer')

const router = express.Router()

const checkJwt = auth({
    audience: 'https://salesforce-auth0-jwt/api',
    issuerBaseURL: `https://dev-2xjf75by.us.auth0.com/`
})


router.get('/private', checkJwt, (req, res, next) => {
    res.json({
        message: 'success'
    })
})

module.exports = router;