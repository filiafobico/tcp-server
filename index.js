const net = require('net');

const processEntry = require('./helpers/processEntry')
const errorResponse = require('./helpers/errorResponse')
const successResponse = require('./helpers/successResponse')

const serviceMap = require('./serviceMap')

const server = net.createServer((socket) => {
  socket.pipe(socket);

  socket.on('data', (data) => {
    try {
      const message = processEntry(data)
      let service = serviceMap[message?.id]

      if (typeof service === 'object') {
        service = service[message?.type]
      }

      if (typeof service === 'function') {
        return socket.write(JSON.stringify(successResponse(service(message?.data))))
      }

      throw new Error('unprocessable message')
    } catch (error) {
      return socket.write(JSON.stringify(errorResponse(error.message)))
    }
  })

  socket.on('connect', () => {
    console.info('client connected')
  })
  socket.on('end', () => {
    console.info('client disconected')
  })
  socket.on('error', (error) => {
    console.error('socket error:', error)
  })
});

server.on('error', (error) => {
  console.error('erro:', error)
})

server.listen(process.env.PORT, () => {
  console.log('server bound on port: ' + process.env.PORT)
});
