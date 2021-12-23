const port = process.env.PORT || 8081

//const app = express()
const app = require('./app')
// enable all cors request
app.listen(port, () => {
    console.log(`Server listening on ${port}`)
})

