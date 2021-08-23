const net = require('net');

const {
  createWebSocketServer, parseAddress
} = require('./ws-wrapper');

const processEntry = require('./helpers/processEntry')
const errorResponse = require('./helpers/errorResponse')
const successResponse = require('./helpers/successResponse')

const serviceMap = require('./serviceMap')

const args = [...process.argv].slice(2);

const PORT = +args[args.indexOf('--port') + 1] || 0;

const _createWebSocketServer = (address, port) =>
  createWebSocketServer(address, { port })
    .then(({ port }) =>
      console.log('websocket bound on port %d', port)
    );

if (args.includes('--ws-only')) {
  const i = args.indexOf('--ws-only') + 1;

  if (!args[i]) {
    return console.error('Socket address to be bound not provided!');
  }

  return (async () => {
    const address = await parseAddress(args[i]);

    return _createWebSocketServer(address, PORT);
  })().catch(e => console.error(e.message || e));
}

const connectedSockets = new Set();
connectedSockets.broadcast = function (message) {
  console.log('broadcasted message: ', message);

  for (let socket of this) {
    socket.write(JSON.stringify(message));
  }
}

const server = net.createServer((socket) => {
  console.log('client connected');
  connectedSockets.add(socket);

  socket.on('data', (data) => {
    try {
      const message = processEntry(data)

      if (message?.id === 'chat') {
        return connectedSockets.broadcast({
          id: 'chat',
          data: {
            ip: socket.address().address,
            message: message?.data?.message
          }
        });
      }

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
    connectedSockets.delete(socket);
  })
  socket.on('error', (error) => {
    console.log('socket error:', error)
  })
});

server.on('error', (error) => {
  console.error('erro:', error)
})

server.listen(PORT, () => {
  const address = server.address();
  console.log('server bound on port %d', address.port)
});
