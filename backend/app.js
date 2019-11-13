const config = require('./utils/config')
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const mongoose = require('mongoose')
const pairsRouter = require('./controllers/pairs')




mongoose.connect(config.DB_URI, { useNewUrlParser: true })
app.use(cors())
app.use(bodyParser.json())
app.use('/api/pairs', pairsRouter)




module.exports = app