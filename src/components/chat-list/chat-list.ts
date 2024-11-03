import { Block, IProps } from 'core';
import chatList from './chat-list.hbs';
import './chat-list.scss';
import { Chats } from './modules/chats/chats';
import { MessagesForm } from './modules/messages-form/messages-form';

const chats = new Chats();
const messagesForm = new MessagesForm();

export class ChatList extends Block {
    constructor(props?: IProps) {
        super(chatList, { ...props, chats, messagesForm });
    }

    protected render() {
        return this.compile();
    }
}
