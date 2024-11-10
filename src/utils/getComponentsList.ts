type Constructor<C, P> = new (...args: P[]) => C;

export function getComponentsList<C, P>(Constructor: Constructor<C, P>, options: P[]) {
    return options.map(propsItem => {
        return new Constructor(propsItem);
    });
}
