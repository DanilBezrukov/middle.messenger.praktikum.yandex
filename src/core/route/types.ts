import { IProps } from '../block/types';
import { Block } from 'core';

export type Constructor<C extends Block = Block, P extends IProps = IProps, A = unknown> = new (props: P, ...args: A[]) => C;
export interface IOptions<P extends IProps = IProps> {
    rootQuery: string;
    props: P;
    args: unknown;
    [key: string]: unknown;
}
