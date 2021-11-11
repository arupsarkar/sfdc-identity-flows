const express = require('express')
const path = require('path')


const app = express()

app.use(express.static(path.join(__dirname, 'client/build')))

app.get('/', (req, res, next) => {
    res.json("hello world !!")
})

app.get('*', (req, res, next) => {
    res.sendFile(path.join(__dirname+'/client/build/index.html'))
})

const port = process.env.PORT || 8081

app.listen(port)

console.log(`Server listening on ${port}`)