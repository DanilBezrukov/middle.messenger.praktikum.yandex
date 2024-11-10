import { Block, IProps } from 'core';
import chatItem from './chat-item.hbs';
import './chat-item.scss';

interface TPropsChatItem extends IProps {
    name: string;
    textPreview?: string;
    date: string;
    messageCount: number | string;
}

export class ChatItem extends Block {
    constructor(props?: TPropsChatItem) {
        super(chatItem, props);
    }

    protected render() {
        return this.compile();
    }
}
