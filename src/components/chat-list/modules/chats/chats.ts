import { Block, IProps } from 'core';
import chats from './chats.hbs';
import './chats.scss';
import { IChatList } from '../../../../api/types';
import { State } from '../../../../core/store/Store';
import { deepEqual } from '../../../../utils/deepEqual';
import { Dialogue } from './modules/dialogue/dialogue';
import { PossibleDialogue } from './modules/possible-dialogue/possible-dialogue';

interface TPropsChats extends IProps {
    chatItems?: Block[];
    foundChats?: State['foundChats'];
    chats?: IChatList[];
}

const possibleDialogue = new PossibleDialogue();
const dialogue = new Dialogue();

export class Chats extends Block {
    constructor(props?: TPropsChats) {
        possibleDialogue.hide();
        super(chats, { ...props, possibleDialogue, dialogue });
    }

    protected componentDidUpdate(oldProps: TPropsChats, newProps: TPropsChats) {
        if (newProps.foundChats) {
            const { chats, users } = newProps.foundChats;
            dialogue.setData({ chats });
            possibleDialogue.setData({ foundUsers: users });
        } else if (newProps.chats) {
            dialogue.setData({ chats: newProps.chats });
            possibleDialogue.setData();
        } else {
            dialogue.setData({ chats: [] });
            possibleDialogue.setData();
        }
        return !deepEqual(oldProps, newProps);
    }

    protected render() {
        return this.compile();
    }
}
