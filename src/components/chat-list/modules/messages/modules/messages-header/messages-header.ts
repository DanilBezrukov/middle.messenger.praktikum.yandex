import { Block, IProps } from 'core';
import messagesHeaderHbs from './messages-header.hbs';
import './messages-header.scss';
import { IUser } from '../../../../../../api/types';
import { Button } from 'components';
import { EVENT } from '../../../../../../core/block/events';
import { ChatsControllers } from '../../../../../../controllers/ChatsControllers';

interface TPropsMessagesHeader extends IProps {
    idChat?: number;
    interlocutor?: IUser;
}

export class MessagesHeader extends Block {
    constructor(props?: TPropsMessagesHeader) {
        super(messagesHeaderHbs, {
            ...props,
            button: new Button({
                title: 'Удалить чат',
                className: 'deleting-chat',
                events: {
                    [EVENT.Click]: () => {
                        const idChat = this.props?.idChat as number;
                        ChatsControllers.deleteChat(+idChat).then();
                    },
                },
            }),
        });
    }

    protected render() {
        return this.compile();
    }
}
