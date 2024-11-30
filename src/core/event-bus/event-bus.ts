import { TCallback, TListeners } from './types';

export class EventBus {
    protected listeners: TListeners;
    constructor() {
        this.listeners = {};
    }

    on<T = unknown>(event: string, callback: TCallback<T>) {
        this.listeners[event] ??= [];
        this.listeners[event].push(callback as TCallback<unknown>);
    }

    off(event: string, callback: TCallback) {
        if (!this.listeners[event]) {
            throw new Error(`Нет события: ${event}`);
        }

        this.listeners[event] = this.listeners[event].filter(listener => listener !== callback);
    }

    emit<T>(event: string, ...args: T[]) {
        if (!this.listeners[event]) {
            throw new Error(`Нет события: ${event}`);
        }

        this.listeners[event].forEach(function (listener) {
            listener(...args);
        });
    }
}
