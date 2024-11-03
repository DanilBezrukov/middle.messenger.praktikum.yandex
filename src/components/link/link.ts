import { Block, IProps } from 'core';
import link from './link.hbs';
import './link.scss';

interface TPropsLink extends IProps {
    href?: string;
    title?: string;
    color?: string;
}
export class Link extends Block {
    constructor(props?: TPropsLink) {
        super(link, props);
    }

    protected render() {
        return this.compile();
    }
}
