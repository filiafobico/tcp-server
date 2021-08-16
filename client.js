const { resolve } = require('path');
const { createServer } = require('vite');
const { default: vue } = require('@vitejs/plugin-vue');

const { createWebSocketServer, parseAddress } = require('./ws-wrapper');

const args = process.argv.slice(2);

if (!args[0]) {
    return console.error('Socket address to connect not provided!');
}

(async () => {
    const { port } = await parseAddress(args[0])
        .then(createWebSocketServer);

    /**
     * @type {import('vite').InlineConfig}
     */
    const options = {
        configFile: false,
        server: {
            port: 8080
        },
        plugins: [
            vue()
        ],
        define: {
            '__WEBSOCKET__': JSON.stringify(`localhost:${port}`)
        },
        resolve: {
            alias: {
                '@': resolve(__dirname, '/src'),
                '~': resolve(__dirname, '/src')
            }
        },
    };

    createServer(options).then(server => server.listen());
})().catch(e => console.error(e.message || e));
