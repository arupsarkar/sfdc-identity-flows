const port = process.env.PORT || 8081
const app = require('./app')
app.listen(port, () => {
    console.log(`Server listening on ${port}`)
})

