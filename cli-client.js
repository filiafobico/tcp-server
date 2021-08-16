#!/usr/bin/env node

const { Socket } = require('net');
const { argv, stdin, stdout } = require('process');

const _clear = () => stdout.write('\033c') && stdout.write('\033[2J');

const _break = () => console.log('----------------------------------------------------------------');

const _info = (...message) => console.log('[INFO] %s', ...message);

const _err = (error) => console.error('[ERRO] %s', error.message || error);

const _question = (description, required = false) => {
    return new Promise((resolve) => {
        if (!required) {
            description += ' (Opcional)';
        }

        stdout.write(`${description}: `);

        stdin.once('data', data => {
            const value = data.toString().trim();

            if (!value && required) {
                console.log('Obrigatório informar um valor!');
                return resolve(_question(description, required));
            }

            resolve(value);
        });
    });
};

const send = (socket, message) => new Promise((resolve, reject) => {
    socket.once('data', data => {
        const value = data.toString();

        try {
            _info('Mensagem recebida:', value);
            resolve(JSON.parse(value));
        } catch (error) {
            reject('Recebido JSON inválido: ' + value);
        }
    });

    _info('Mensagem enviada:', message);
    socket.write(message);
});

const options = {
    '1': {
        name: 'Cadastrar usuário',
        action: async () => {
            const name = await _question('Nome', true);
            const cpf = await _question('CPF', true);
            const email = await _question('E-mail', true);
            const password = await _question('Senha', true);
            const address = await _question('Endereço');
            const phone = await _question('Telefone');

            return {
                id: 'user',
                type: 'create',
                data: { name, cpf, email, password, address, phone }
            };
        }
    },
    '2': {
        name: 'Fazer login',
        action: async () => {
            const email = await _question('E-mail', true);
            const password = await _question('Senha', true);

            return {
                id: 'login',
                data: { email, password }
            };
        }
    },
    '3': {
        name: 'Atualizar dados',
        action: async () => {
            const id = await _question('ID do usuário', true);

            _clear();

            console.log('Alterando dados do usuário %s', id);

            const name = await _question('Nome');
            const cpf = await _question('CPF');
            const email = await _question('E-mail');
            const password = await _question('Senha');
            const address = await _question('Endereço');
            const phone = await _question('Telefone');

            return {
                id: 'user',
                type: 'update',
                data: { id, name, cpf, email, password, address, phone }
            };
        }
    },
    '4': {
        name: 'Logout',
        action: async () => ({ id: 'logout' })
    },
    'x': {
        name: 'Fechar programa',
        action: async () => process.exit(0)
    }
};

const _menu = () => {
    _break();

    console.log([
        'Escolha uma opção abaixo:',
        ...Object.keys(options).map(e =>
            `(${e}) ${options[e].name}`
        )
    ].join('\n'));

    _break();
};

const connect = ({ hostname: host, port }) => new Promise((resolve, reject) => {
    const client = new Socket();

    process.on('exit', () => client.destroy());

    client.once('connect', () => {
        resolve();

        const { address, port } = client.address();

        _clear();

        console.log('[%s:%s] Cliente conectado', address, port);

        const reader = async (data) => {
            const value = data.toString().trim();

            _clear();

            if (!options[value]) {
                if (!value) {
                    console.log('Opção não informada!');
                } else {
                    console.log('Opção informada inválida!');
                }
            } else {
                await options[value].action(client).finally(_clear)
                    .then(payload => {
                        if (payload && payload.id) {
                            return send(client, JSON.stringify(payload));
                        }
                    }).catch(_err);
            }

            stdin.once('data', reader);
            _menu();
        };

        stdin.once('data', reader);
        _menu();
    });

    client.on('error', error => {
        if (error.code === 'ECONNREFUSED') {
            return reject(`(${error.code}) Não foi possível se conectar ao servidor no endereço '${error.address}:${error.port}'`);
        }

        reject(error);
    });

    try {
        client.connect({ host, port });
    } catch (error) {
        if (error.code === 'ERR_SOCKET_BAD_PORT') {
            return reject('Porta do socket inválida');
        }

        reject(error);
    }
});

(() => {
    const [address] = [...argv].slice(2);

    if (!address) {
        return _err('Endereço do servidor socket não informado');
    }

    try {
        connect(new URL(`wss://${address}`))
            .catch(_err);
    } catch (error) {
        if (error.code === 'ERR_INVALID_URL') {
            return _err('Endereço informado inválido');
        }
    }
})();
