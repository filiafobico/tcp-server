import mitt, { Emitter } from 'mitt';

type SocketEvents = {
    sent: string;
    data: string;
};

export class SocketClient {

    private _id: number = -1;

    private readonly socket: WebSocket;

    public constructor(address: string) {
        Object.assign(this, mitt<SocketEvents>());

        this.socket = new WebSocket(`ws://${address}`);

        this.socket.addEventListener('message', (event: MessageEvent<Blob>) =>
            event.data.text().then(data => this.emit('data', data))
        );
    }

    public async send(data: object): Promise<string> {
        const message = JSON.stringify(data);
        this.emit('sent', message);

        return new Promise((resolve) => {
            const callback = (event: MessageEvent<Blob>) => {
                resolve(event.data.text());

                this.socket.removeEventListener('message', callback);
            };

            this.socket.addEventListener('message', callback);
            this.socket.send(message);
        });
    }

    public set user(value: number) {
        this._id = value;
    }

    public get user(): number {
        return this._id;
    }

}

export interface SocketClient extends Emitter<SocketEvents> { }
