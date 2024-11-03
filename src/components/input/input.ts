import { Block, IProps } from 'core';
import input from './input.hbs';
interface TPropsInput extends IProps {
    value?: string;
    type: string;
    name: string;
}
export class Input extends Block {
    constructor(props: TPropsInput) {
        super(input, props);
    }

    protected render() {
        return this.compile();
    }
}
