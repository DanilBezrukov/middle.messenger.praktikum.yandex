import { Block, IProps, Router } from 'core';
import chatList from './chat-list.hbs';
import './chat-list.scss';
import { Chats } from './modules/chats/chats';
import { MessagesForm } from './modules/messages/modules/messages-form/messages-form';
import { SearchChats } from './modules/search-chats/search-chats';
import { Messages } from './modules/messages/messages';
import { State } from '../../core/store/Store';
import { Indexed } from '../../utils/merge';
import { connect } from '../../core/utils/connect';
import { deepEqual } from '../../utils/deepEqual';
import { EmptyCorrespondence } from './modules/empty-correspondence/empty-correspondence';
import { Button } from 'components';
import { EVENT } from '../../core/block/events';
import { ChatsControllers } from '../../controllers/ChatsControllers';
import { BaseModal } from '../base-modal/base-modal';

interface TPropsChatList extends IProps {
    currentChat?: State['currentChat'];
    chats?: State['chats'];
    foundChats?: State['foundChats'];
}

const router = new Router();

const messagesForm = new MessagesForm();
const searchChats = new SearchChats();

const chats = new Chats();
const messages = new Messages();
const button = new Button({
    title: 'Профиль >',
    className: 'go-settings',
    events: {
        [EVENT.Click]: () => router.go('/settings'),
    },
});
const modalCreateChat = new BaseModal({
    className: 'create-chat',
    title: 'Создать чат',
    placeholderField: 'Название чата',
    events: {
        [EVENT.Submit]: event => {
            event?.preventDefault();
            const form = event.target as HTMLFormElement;
            const formData = new FormData(form);
            const value = formData.get('field-modal')?.toString().trim();
            if (!value) return;
            form.reset();
            ChatsControllers.createChat(value).then(() => {
                modalCreateChat.close();
            });
        },
    },
});

const createChatBtn = new Button({
    title: 'Создать чат',
    events: {
        [EVENT.Click]: () => {
            modalCreateChat.open();
        },
    },
});
const emptyCorrespondence = new EmptyCorrespondence();

export class ChatListComponent extends Block {
    constructor(props?: TPropsChatList) {
        super(chatList, {
            ...props,
            messages,
            emptyCorrespondence,
            chats,
            messagesForm,
            searchChats,
            button,
            createChatBtn,
            modalCreateChat,
        });
    }

    componentDidShowed() {
        ChatsControllers.getChats().then();
        /*
         * Понимаю весь абсурд, но альтернативной возможности обновлять состояние чата в не активном диалоге нет.
         * */
        setInterval(() => {
            ChatsControllers.getChats().then();
        }, 10000);
    }

    protected componentDidUpdate(oldProps: TPropsChatList, newProps: TPropsChatList) {
        if (newProps.currentChat) {
            emptyCorrespondence.hide();
            messages.show('grid');
            if (!deepEqual(oldProps.currentChat, newProps.currentChat)) {
                messages.setProps({ currentChat: newProps.currentChat });
            }
        } else {
            messages.setProps({ currentChat: null });
            emptyCorrespondence.show('flex');
            messages.hide();
        }
        if (newProps.chats || newProps.foundChats) {
            if (newProps.foundChats === null && oldProps.foundChats !== newProps.foundChats) {
                searchChats.reset();
            }
            chats.setProps({ chats: newProps.chats, foundChats: newProps.foundChats });
        }

        return !deepEqual(oldProps, newProps);
    }

    protected render() {
        return this.compile();
    }
}

function mapStateToProps(state: State | null): Indexed {
    const chats = state?.chats ? [...state.chats] : null;
    const foundChats = state?.foundChats ? { ...state?.foundChats } : null;
    const currentChat = state?.currentChat ? { ...state?.currentChat } : null;
    return { currentChat, chats, foundChats };
}

const ChatList = connect<IProps>(mapStateToProps)(ChatListComponent);

export { ChatList };
