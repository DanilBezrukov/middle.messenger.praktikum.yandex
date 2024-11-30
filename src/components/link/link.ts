import { Block, IProps, Router } from 'core';
import link from './link.hbs';
import './link.scss';
import { EVENT } from '../../core/block/events';

interface TPropsLink extends IProps {
    href?: string;
    title?: string;
    color?: string;
    className?: string;
}

const router = new Router('#app');

export class Link extends Block {
    constructor(props?: TPropsLink) {
        super(link, {
            ...props,
            events: {
                [EVENT.Click]: event => {
                    event.preventDefault();
                    router.go(props?.href || '/');
                },
            },
        });
    }

    protected render() {
        return this.compile();
    }
}
