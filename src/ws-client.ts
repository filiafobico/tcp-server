import mitt, { Emitter } from 'mitt';

type SocketEvents = {
    data: string;
};

export class SocketClient {

    private readonly socket: WebSocket;

    public constructor(address: string) {
        Object.assign(this, mitt<SocketEvents>());

        this.socket = new WebSocket(`ws://${address}`);

        this.socket.addEventListener('message', (event: MessageEvent<Blob>) =>
            event.data.text().then(data => this.emit('data', 'R: ' + data))
        );
    }

    public send(data: object) {
        const message = JSON.stringify(data);
        this.emit('data', 'S: ' + message);
        this.socket.send(message);
    }

}

export interface SocketClient extends Emitter<SocketEvents> { }
