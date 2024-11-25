import { Block, IProps } from 'core';
import input from './input.hbs';
interface TPropsInput extends IProps {
    value?: string;
    type: string;
    name: string;
    placeholder?: string;
}
export class Input extends Block {
    constructor(props: TPropsInput) {
        super(input, { ...props, className: props?.className ?? 'field-input' });
    }

    protected render() {
        return this.compile();
    }
}
