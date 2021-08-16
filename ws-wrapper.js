const net = require('net');
const _WebSocket = require('ws');

/**
 * WebSocket instance options
 * @typedef {{ port?: number }} WebSocketOptions
 */

/**
 * Try to parse a socket address
 * @param {string} address Socket address
 * @returns {Promise<Partial<net.AddressInfo>>} Parsed address object
 */
const parseAddress = (address) =>
  new Promise((resolve, reject) => {
    try {
      const {
        hostname, port
      } = new URL(`a://${address}`);

      resolve({ address: hostname, port });
    } catch (error) {
      if (error.code === 'ERR_INVALID_URL') {
        reject('Invalid socket address');
      }
    }
  });

/**
 * Creates a WebSocket server wrapper
 * @param {Partial<net.AddressInfo>} address Socket address to connect
 * @param {WebSocketOptions} [options] WebSocket server options
 * @returns {Promise<_WebSocket.AddressInfo>} WebSocket server address
 */
const createWebSocketServer = (address, options = { port: 0 }) =>
  new Promise((resolve, reject) => {
    if (!address) {
      return reject('Address not provided!');
    }

    const { address: host, port } = address;

    if (!host) {
      return reject('Socket host not provided!');
    }

    if (!port) {
      return reject('Socket port not provided!');
    }

    const ws = new _WebSocket.Server({ port: options.port });

    ws.on('connection', (ws) => {
      const client = new net.Socket();

      client.connect({ host, port }, () => {
        ws.on('close', () => client.destroy());
        ws.on('message', (data) => client.write(data));
        client.on('data', (data) => ws.send(data));
      });
    });

    ws.on('listening', () => resolve(ws.address()));
  });

module.exports = {
  createWebSocketServer,
  parseAddress,
};
