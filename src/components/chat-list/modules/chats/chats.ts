import { Block, IProps } from 'core';
import chats from './chats.hbs';
import './chats.scss';
import { ChatItem } from '../chat-item/chat-item';
import { getComponentsList } from '../../../../utils/getComponentsList';

interface TPropsChats extends IProps {
    chatItems?: Block[];
}

const chatsData = [
    {
        name: 'Алексей Иванов',
        textPreview:
            'Привет! Как дела? Давно не виделись, надо встретиться и обсудить проект, который мы с тобой начинали. Когда у тебя будет время?',
        date: '10:15',
        messageCount: 3,
    },
    {
        name: 'Мария Смирнова',
        textPreview:
            'Встретимся вечером? Я нашла отличное место для ужина. Думаю, тебе понравится. Заодно обсудим все детали нашего проекта.',
        date: '18:30',
        messageCount: '99+',
    },
    {
        name: 'Иван Петров',
        textPreview:
            'Не забудь отправить отчет. Руководство просило обновить информацию по текущим задачам и прогрессу. Пожалуйста, сделай это до конца дня.',
        date: '12:45',
        messageCount: 5,
    },
    {
        name: 'Ольга Сидорова',
        textPreview: 'Спасибо за помощь!',
        date: '14:20',
        messageCount: 1,
    },
    {
        name: 'Дмитрий Кузнецов',
        textPreview:
            'Увидимся на встрече. Не забудь подготовить все материалы и отчет о проделанной работе за последний месяц, чтобы мы могли обсудить дальнейшие шаги.',
        date: '09:10',
        messageCount: 2,
    },
];

const chatItems = getComponentsList(ChatItem, chatsData);

export class Chats extends Block {
    constructor(props?: TPropsChats) {
        super(chats, { ...props, chatItems });
    }

    protected render() {
        return this.compile();
    }
}
