import { EventBus } from 'core';

export enum WSEvents {
    Connected = 'connected',
    Close = 'close',
    Message = 'message',
    Error = 'error',
}
export class WSService extends EventBus {
    private socket?: WebSocket;
    private pingInterval?: ReturnType<typeof setInterval>;
    private readonly pingIntervalTime = 30000;
    private readonly url: string;

    constructor(url: string) {
        super();
        this.url = url;
    }

    public send(data: string | number | object): void {
        if (!this.socket) {
            throw new Error('Socket is not connected');
        }
        this.socket.send(JSON.stringify(data));
    }

    public connect(): Promise<void> {
        if (this.socket) {
            throw new Error('The socket is already connected');
        }

        this.socket = new WebSocket(this.url);
        this.subscribe(this.socket);
        this.setupPing();

        return new Promise((resolve, reject) => {
            this.on(WSEvents.Error, reject);
            this.on(WSEvents.Connected, () => {
                this.off(WSEvents.Error, reject);
                resolve();
            });
        });
    }

    public close(): void {
        this.socket?.close();
        clearInterval(this.pingInterval);
    }

    private setupPing(): void {
        this.pingInterval = setInterval(() => {
            this.send({ type: 'ping' });
        }, this.pingIntervalTime);

        this.on(WSEvents.Close, () => {
            clearInterval(this.pingInterval);
            this.pingInterval = undefined;
        });
    }

    private subscribe(socket: WebSocket): void {
        socket.addEventListener('open', () => {
            this.emit(WSEvents.Connected);
        });

        socket.addEventListener('close', () => {
            this.emit(WSEvents.Close);
        });

        socket.addEventListener('error', event => {
            this.emit(WSEvents.Error, event);
        });

        socket.addEventListener('message', event => {
            try {
                const data = JSON.parse(event.data);
                if (['pong', 'user connected'].includes(data.type)) {
                    return;
                }
                this.emit(WSEvents.Message, data);
            } catch (e) {
                this.emit(WSEvents.Error, e);
            }
        });
    }
}
