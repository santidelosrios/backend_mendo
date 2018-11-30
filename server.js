const http = require('http')
const WebServer = require('./api.js')

const server = http.createServer(WebServer)
const port = 8080

server.listen(port)

server.on('listening', () => {
  console.log('------------------------------------')
  console.log(`listening on port ${port}`)
  console.log('------------------------------------')
})