import { Block, IProps } from 'core';
import listItem from './list-item.hbs';

interface TPropsListItem extends IProps {
    placeholder: string;
    value: string;
}
export class ListItem extends Block {
    constructor(props?: TPropsListItem) {
        super(listItem, props);
    }

    protected render() {
        return this.compile(listItem);
    }
}
