const express = require('express')

const app = express()

app.use(express.static('front-end'))

app.listen(3000, () => console.log('listening on localhost port 3000'))
