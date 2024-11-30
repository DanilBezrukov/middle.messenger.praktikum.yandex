import { deepEqual } from '../../utils/deepEqual';

export function checkUpdateProps(oldProps: unknown, newProps: unknown) {
    if (oldProps !== newProps) return true;
    return !deepEqual(oldProps, newProps);
}
