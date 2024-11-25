import { Block, IProps } from 'core';
import messagesHbs from './messages.hbs';
import './messages.scss';
import { MessagesForm } from './modules/messages-form/messages-form';
import { MessagesHeader } from './modules/messages-header/messages-header';
import { MessagesWindow } from './modules/messages-window/messages-window';
import { ICurrentChat, IMessage } from '../../../../api/types';
import { deepEqual } from '../../../../utils/deepEqual';
import { SocketController } from '../../../../controllers/SocketController';
import { ChatsControllers } from '../../../../controllers/ChatsControllers';

interface TPropsMessages extends IProps {
    currentChat?: ICurrentChat;
    messages?: IMessage[];
}

const messagesHeader = new MessagesHeader();
const messagesWindow = new MessagesWindow();
const messagesForm = new MessagesForm();
const socket = new SocketController();
export class Messages extends Block {
    constructor(props?: TPropsMessages) {
        super(messagesHbs, { ...props, messagesHeader, messagesWindow, messagesForm });
    }

    componentDidShowed() {
        ChatsControllers.getChats().then();
    }

    protected componentDidUpdate(oldProps: TPropsMessages, newProps: TPropsMessages) {
        if (newProps.currentChat) {
            socket.connect().then();
        }
        if (newProps.messages) {
            messagesWindow.setProps({ messages: newProps.messages });
        }
        if (newProps.currentChat?.interlocutor) {
            messagesHeader.setProps({
                interlocutor: newProps.currentChat?.interlocutor,
                idChat: newProps.currentChat.id,
            });
        }

        return !deepEqual(oldProps, newProps);
    }

    protected render() {
        return this.compile();
    }
}
