import { Block, IProps } from 'core';
import listItem from './list-item.hbs';
import { IUser } from '../../api/types';

export interface TPropsListItem extends IProps {
    type: string;
    placeholder: string;
    name: string;
    value: string;
    user?: IUser;
}
export class ListItem extends Block {
    constructor(props?: TPropsListItem) {
        super(listItem, { ...props });
    }

    protected render() {
        return this.compile();
    }
}
