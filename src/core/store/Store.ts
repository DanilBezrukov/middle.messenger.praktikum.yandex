import { EventBus } from '../event-bus/event-bus';
import { Indexed } from '../../utils/merge';
import { set } from '../../utils/set';
import { IChatList, ICurrentChat, IMessage, IUser } from '../../api/types';

export const StoreEvents = {
    Updated: 'updated',
} as const;

export type State = {
    user?: IUser | null;
    foundChats?: {
        chats: IChatList[];
    } | null;
    chats?: IChatList[];
    currentChat?: ICurrentChat;
    messages?: IMessage[];
    [key: string]: unknown;
};

export class Store extends EventBus {
    private state: State = {};
    timeoutId?: ReturnType<typeof setTimeout>;
    static __instance: unknown;

    constructor() {
        if (Store.__instance) {
            return Store.__instance as Store;
        }
        super();
        Store.__instance = this;
    }

    public getState(): Indexed;
    public getState<Key extends keyof State>(key: Key): State[Key];
    public getState<Key extends keyof State>(key?: Key) {
        if (key) {
            return this.state[key] ?? null;
        }
        return this.state;
    }

    public set(path: string, value: unknown) {
        set(this.state, path, value);
        clearTimeout(this.timeoutId);
        this.timeoutId = setTimeout(() => {
            this.emit(StoreEvents.Updated);
        });
    }

    emit<T>(event: string, ...args: T[]) {
        if (this.listeners[event]) {
            this.listeners[event].forEach(function (listener) {
                listener(...args);
            });
        }
    }

    reset() {
        this.state = {};
    }
}
