import { Block, IProps } from 'core';
import chats from './chats.hbs';
import './chats.scss';
import { IChatList } from '../../../../api/types';
import { State } from '../../../../core/store/Store';
import { deepEqual } from '../../../../utils/deepEqual';
import { Dialogue } from './modules/dialogue/dialogue';

interface TPropsChats extends IProps {
    chatItems?: Block[];
    foundChats?: State['foundChats'];
    chats?: IChatList[];
}

const dialogue = new Dialogue();

export class Chats extends Block {
    constructor(props?: TPropsChats) {
        super(chats, { ...props, dialogue });
    }

    protected componentDidUpdate(oldProps: TPropsChats, newProps: TPropsChats) {
        if (newProps.foundChats) {
            const { chats } = newProps.foundChats;
            dialogue.setData({ chats });
        } else if (newProps.chats) {
            dialogue.setData({ chats: newProps.chats });
        } else {
            dialogue.setData({ chats: [] });
        }
        return !deepEqual(oldProps, newProps);
    }

    protected render() {
        return this.compile();
    }
}
