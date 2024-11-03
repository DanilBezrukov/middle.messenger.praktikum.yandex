import { Block, IProps } from 'core';
import button from './button.hbs';
import './button.scss';
interface TPropsButton extends IProps {
    type?: string;
    title?: string;
    dataAttributes?: string;
}
export class Button extends Block {
    constructor(props?: TPropsButton) {
        super(button, props);
    }

    protected render() {
        return this.compile();
    }
}
