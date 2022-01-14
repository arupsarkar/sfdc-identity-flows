const port = process.env.PORT || 8081
const app = require('./app')

const webSocketServer = require('websocket').server
const http = require('http')
const server = http.createServer(app)
server.listen(port, () => {
    console.log(`Server listening on ${port}`)
})

