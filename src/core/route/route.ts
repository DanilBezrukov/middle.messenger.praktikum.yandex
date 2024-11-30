import { Block } from '../block/block';
import { IProps } from '../block/types';
import { render } from '../utils/render';
import { Constructor, IOptions } from './types';

export class Route<C extends Block = Block, P extends IProps = IProps, A extends IOptions<P> = IOptions<P>> {
    private readonly _blockClass: Constructor<C, P>;
    private _block: C | null;
    private _pathname: string;
    private readonly _props: P;
    private readonly _rootQuery: string;
    private readonly _args: unknown[] = [];

    constructor(pathname: string, view: Constructor<C, P>, options: A) {
        this._pathname = pathname;
        this._blockClass = view;
        this._block = null;
        this._props = options.props;
        this._rootQuery = options.rootQuery;
        this._args = options.args as unknown[];
    }

    public navigate(pathname: string): void {
        if (this.match(pathname)) {
            this._pathname = pathname;
            this.render();
        }
    }

    public leave(): void {
        if (this._block) {
            document.querySelector(this._rootQuery)?.removeChild(this._block?.getContent());
        }
    }

    public match(pathname: string): boolean {
        return pathname === this._pathname;
    }

    public render(): void {
        if (!this._block) {
            this._block = new this._blockClass(this._props, ...this._args);
        }
        render(this._rootQuery, this._block);
        this._block._componentDidShowed();
    }
}
