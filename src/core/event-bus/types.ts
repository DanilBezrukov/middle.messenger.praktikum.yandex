export type TCallback<T = unknown> = (...args: T[]) => void;
export type TListeners<T = unknown> = { [key: string]: TCallback<T>[] };
