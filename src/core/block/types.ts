import { EVENT } from './events';
import { TAttributes } from '../utils/types';

interface ISettings {
    withInternalID?: boolean;
    deepPropComparison?: boolean;
}

export type TChildren<T> = { [key: string]: T };

export type TEvent = Partial<Record<EVENT, (event: Event) => void>>;

export interface IProps {
    className?: string;
    settings?: ISettings;
    events?: TEvent;
    [key: string]: unknown;
}

export interface IMeta {
    tagName: string;
    props: IProps;
    attributes?: TAttributes;
}

export interface IRunningListeners {
    eventName: string;
    callback: (event: Event) => void;
}
