import { getParseWrapper } from './getParseWrapper';
import { IParseWrapper } from './types';

export function compileHbs<T>(hbs: unknown, options?: Record<string, T>, isParseWrapper?: true): IParseWrapper;
export function compileHbs<T>(hbs: unknown, options?: Record<string, T>, isParseWrapper?: false): string;
export function compileHbs<T>(hbs: unknown, options?: Record<string, T>, isParseWrapper: boolean = true): IParseWrapper | string {
    let tmpl: string = '';
    if (typeof hbs !== 'function') return '';

    tmpl = hbs(options);

    if (!isParseWrapper) {
        return tmpl;
    }

    return getParseWrapper(tmpl);
}
