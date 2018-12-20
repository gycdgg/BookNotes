let http = require('http')
const port = 3003
console.log(`server listening at port http://localhost:${port}`)
const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' })
  res.end('hello world')
})

server.on('connection', () => {
  console.log('connected success')
})
const events = require('events')
const myEmitter = new events()

myEmitter.on('action', () => {
  console.log('=>action')
})

myEmitter.emit('action')
server.listen(3003)