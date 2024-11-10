import { TCallback, TListeners } from './types';

export class EventBus {
    protected listeners: TListeners;
    constructor() {
        this.listeners = {};
    }

    on(event: string, callback: TCallback) {
        this.listeners[event] ??= [];
        this.listeners[event].push(callback);
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
