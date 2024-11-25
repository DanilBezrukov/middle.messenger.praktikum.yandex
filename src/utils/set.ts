import { Indexed, merge } from './merge';
import { isObject } from './isObject';

export function set(object: Indexed, path: string, value: unknown): Indexed | unknown {
    if (!isObject(object)) {
        return value;
    }

    const pathKeys = path.split('.');

    if (pathKeys.length === 1 && !pathKeys.at(0)) {
        return value;
    }

    const result = pathKeys.reduceRight<unknown>((acc, key) => {
        return { [key]: acc };
    }, value) as Indexed;

    return merge(object, result);
}
