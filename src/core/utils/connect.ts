import { Block, IProps, Store } from 'core';
import { Indexed } from '../../utils/merge';
import { StoreEvents } from '../store/Store';

const store = new Store();

type Constructor<T = object> = new (...args: unknown[]) => T;
export function connect<P extends IProps>(mapStateToProps: (state: Indexed | null) => Indexed) {
    return function <T = Constructor>(Component: T) {
        if (typeof Component === 'function') {
            return class extends (Component as Constructor) {
                constructor(...args: unknown[]) {
                    const [props, ...restArgs] = args;
                    super({ ...(props as P), ...mapStateToProps(store.getState()) }, ...restArgs);
                    store.on(StoreEvents.Updated, () => {
                        (this as unknown as Block).setProps({ ...mapStateToProps(store.getState()) });
                    });
                }
            } as T;
        }
        throw new Error('Invalid Component constructor.');
    };
}
