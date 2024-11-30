import { WSEvents, WSService } from '../core/utils/WSService';
import { Store } from 'core';
import { ChatsControllers } from './ChatsControllers';

const store = new Store();

export interface IMessageRes {
    id: number;
    user_id: number;
    type: string;
    time: string;
    content: string;
    chat_id?: number;
    is_read?: boolean;
    file?: string | null;
}

function messageProcessing(message: IMessageRes, currentUserId: number) {
    return {
        role: currentUserId === message.user_id ? 'outgoing' : 'incoming',
        message: message.content,
    };
}

export class SocketController {
    static __instance: unknown;
    public ws?: WSService;

    constructor() {
        if (SocketController.__instance) {
            return SocketController.__instance as SocketController;
        }
        SocketController.__instance = this;
    }

    private subscribeMessages() {
        if (!this.ws) {
            throw new Error('Socket is not connected');
        }
        const currentUser = store.getState('user');
        this.ws.on<IMessageRes | IMessageRes[]>(WSEvents.Message, data => {
            let messagesStore = store.getState('messages') || [];

            if (Array.isArray(data)) {
                const messages = data?.map(item => {
                    return messageProcessing(item, currentUser!.id);
                });
                messagesStore = messagesStore.concat(messages);
            } else {
                messagesStore.unshift(messageProcessing(data, currentUser!.id));
                ChatsControllers.getChats().then();
            }
            store.set('messages', messagesStore);
        });
    }

    async connect() {
        if (this.ws) {
            this.ws.close();
            store.set('messages', []);
        }
        const user = store.getState('user');
        const currentChat = store.getState('currentChat');
        if (!user || !currentChat) {
            throw new Error('Socket is not connected');
        }

        const url = `wss://ya-praktikum.tech/ws/chats/${user.id}/${currentChat.id}/${currentChat.token}`;
        this.ws = new WSService(url);

        await this.ws.connect();
        this.subscribeMessages();
        this.ws?.send({
            content: '0',
            type: 'get old',
        });
    }

    send(message: string) {
        if (!this.ws) {
            throw new Error('Socket is not connected');
        }
        this.ws!.send({
            content: message,
            type: 'message',
        });
    }
}
