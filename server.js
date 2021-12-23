const bodyParser = require('body-parser')
const cors = require('cors')
const port = process.env.PORT || 8081

//const app = express()
const app = require('./app')
// enable all cors request

app.use(cors())
app.options('*', cors())
// Initialize session
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: false}))

app.listen(port, () => {
    console.log(`Server listening on ${port}`)
})

