const http = require('http')
const config = require('./utils/config.js')
const app = require('./app')

//start server
const server = http.createServer(app)

server.listen(config.PORT, () => {
  console.log(`Server running on port ${config.PORT}`)
})