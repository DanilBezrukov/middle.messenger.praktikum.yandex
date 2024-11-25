import { Block, IProps } from 'core';
import dialogue from './dialogue.hbs';
import './dialogue.scss';
import { IChatList } from '../../../../../../api/types';
import { formatDate } from '../../../../../../utils/formatDate';
import { EVENT } from '../../../../../../core/block/events';
import { ChatsControllers } from '../../../../../../controllers/ChatsControllers';

interface TPropsDialogue extends IProps {
    chats: IChatList[];
}
export class Dialogue extends Block {
    constructor(props?: TPropsDialogue) {
        super(dialogue, {
            ...props,
            events: {
                [EVENT.Click]: event => {
                    const target = event.target as HTMLElement;
                    const user = target.closest<HTMLElement>('.chat-item');
                    const id = user?.dataset?.id || null;
                    if (!id) return;
                    ChatsControllers.setCurrentChat(+id).then();
                },
            },
        });
    }

    setData(nextProps: TPropsDialogue) {
        if (!nextProps?.chats?.length) {
            this.hide();
            return;
        }
        nextProps.chats.forEach(chat => {
            if (chat?.last_message) {
                chat.last_message.time = formatDate(chat?.last_message.time);
            }
        });
        this.setProps(nextProps);
        this.show();
    }

    protected render() {
        return this.compile();
    }
}
