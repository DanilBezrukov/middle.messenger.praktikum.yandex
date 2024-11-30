import { Block, IProps, Router } from 'core';
import goBack from './go-back.hbs';
import './go-back.scss';
import { EVENT } from '../../core/block/events';
interface TPropsGoBack extends IProps {
    href?: string;
}
const router = new Router('#app');
export class GoBack extends Block {
    constructor(props?: TPropsGoBack) {
        super(goBack, {
            ...props,
            events: {
                [EVENT.Click]: event => {
                    event.preventDefault();
                    router.back();
                },
            },
        });
    }

    protected render() {
        return this.compile();
    }
}
