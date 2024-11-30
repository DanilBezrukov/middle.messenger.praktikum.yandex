import { Block, IProps } from 'core';
import button from './button.hbs';
import './button.scss';
interface TPropsButton extends IProps {
    type?: string;
    title?: string;
    dataAttributes?: string;
    className?: string;
}
export class Button extends Block {
    constructor(props?: TPropsButton) {
        super(button, { ...props, className: props?.className ?? 'default-btn' });
    }

    protected render() {
        return this.compile();
    }
}
