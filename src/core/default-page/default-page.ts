import { Block, IProps } from 'core';
import { Constructor } from '../route/types';

export class DefaultPage<C extends Block = Block, P extends IProps = IProps, A = unknown> {
    private readonly _component: Constructor<C, P, A>;
    private readonly _props: P;
    private readonly _args: A[];

    constructor(component: Constructor<C, P, A>, props: P, args?: A[]) {
        this._props = props || {};
        this._component = component || null;
        this._args = args || [];
    }

    public get props() {
        return this._props;
    }

    public get component() {
        return this._component;
    }

    public get args() {
        return this._args;
    }
}
