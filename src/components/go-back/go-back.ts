import { Block, IProps } from 'core';
import goBack from './go-back.hbs';
import './go-back.scss';
interface TPropsGoBack extends IProps {
    href: string;
}
export class GoBack extends Block {
    constructor(props?: TPropsGoBack) {
        super(goBack, props);
    }

    protected render() {
        return this.compile();
    }
}
