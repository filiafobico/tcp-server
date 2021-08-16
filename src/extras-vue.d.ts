import { SocketClient } from './ws-client';

declare module '@vue/runtime-core' {

    interface ComponentCustomProperties {

        readonly $socket: SocketClient;

    }

}

declare global {

    const __WEBSOCKET__: string;

}
