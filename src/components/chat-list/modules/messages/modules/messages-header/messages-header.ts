import { BaseModal, Block, IProps } from 'core';
import messagesHeaderHbs from './messages-header.hbs';
import './messages-header.scss';
import { Button } from 'components';
import { EVENT } from '../../../../../../core/block/events';
import { ChatsControllers } from '../../../../../../controllers/ChatsControllers';
import { TPropsModalCreateChat } from '../../../../../../core/base-modal/base-modal';

interface TPropsMessagesHeader extends IProps {
    idChat?: number;
    avatar?: string;
    usersCount?: number;
}

const modal = new BaseModal({ placeholderField: 'UserID' });

const modalConfigAddUser: TPropsModalCreateChat = {
    title: 'Добавить пользователя в чат',
    events: {
        [EVENT.Submit]: event => {
            event?.preventDefault();
            const form = event.target as HTMLFormElement;
            const formData = new FormData(form);
            const value = formData.get('field-modal')?.toString().trim();
            if (!value) return;
            form.reset();
            ChatsControllers.addUserToChat(+value).then(() => {
                modal.close();
            });
        },
    },
};

const modalConfigDeleteUser: TPropsModalCreateChat = {
    title: 'Удалить пользователя из чата',
    events: {
        [EVENT.Submit]: event => {
            event?.preventDefault();
            const form = event.target as HTMLFormElement;
            const formData = new FormData(form);
            const value = formData.get('field-modal')?.toString().trim();
            if (!value) return;
            form.reset();
            ChatsControllers.deleteUserToChat(+value).then(() => {
                modal.close();
            });
        },
    },
};

export class MessagesHeader extends Block<TPropsMessagesHeader> {
    constructor(props?: TPropsMessagesHeader) {
        super(messagesHeaderHbs, {
            ...props,
            avatar: props?.avatar || './static/chat.svg',
            modal,
            button: new Button({
                title: 'Действия',
                className: 'deleting-chat',
                events: {
                    [EVENT.Click]: () => {
                        const idChat = this.props?.idChat;
                        if (!idChat) return;
                        const selectDropdown = this.element?.querySelector('.select-dropdown');
                        selectDropdown?.classList.toggle('active');
                        selectDropdown?.addEventListener('click', this.handleClickDropdown, { once: true });
                    },
                },
            }),
        });
    }

    protected handleClickDropdown = (event: Event) => {
        const dropdown = event.currentTarget as HTMLDivElement;
        const options = event.target as HTMLDivElement;
        const value = options.dataset.value;

        switch (value) {
            case 'add-user':
                modal.setProps(modalConfigAddUser);
                modal.open();
                break;
            case 'delete-user':
                modal.setProps(modalConfigDeleteUser);
                modal.open();
                break;
            case 'delete-chat':
                console.log(this.props?.idChat);
                if (this.props?.idChat) {
                    ChatsControllers.deleteChat(this.props?.idChat).then();
                }
                break;
        }
        dropdown?.classList.toggle('active');
    };

    protected render() {
        return this.compile();
    }
}
