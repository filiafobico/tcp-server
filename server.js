const net = require('net');

const processEntry = require('./helpers/processEntry')
const errorResponse = require('./helpers/errorResponse')
const successResponse = require('./helpers/successResponse')

const serviceMap = require('./serviceMap')

const PORT = +process.argv[2] || 0

const server = net.createServer((socket) => {
  console.log('client connected');

  socket.on('data', (data) => {
    try {
      const message = processEntry(data)
      let service = serviceMap[message?.id]

      if (typeof service === 'object') {
        service = service[message?.type]
      }

      if (typeof service === 'function') {
        const response = JSON.stringify(successResponse(service(message?.data)))
        console.log('send response: ', response)
        return socket.write(response)
      }

      throw new Error('unprocessable message')
    } catch (error) {
      const response = JSON.stringify(errorResponse(error.message))
      console.log('send error: ', response)
      return socket.write(response)
    }
  })

  socket.on('end', () => {
    console.log('client disconected')
  })
  socket.on('error', (error) => {
    console.log('socket error:', error)
  })
});

server.on('error', (error) => {
  console.error('erro:', error)
})

server.listen(PORT, () => {
  console.log('server bound on port: ' + server.address().port)
});
