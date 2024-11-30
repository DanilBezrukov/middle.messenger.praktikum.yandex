import { Store } from 'core';
import { ChatsAPI } from '../api/ChatsAPI';
import { IChatList, ICurrentChat, IUser } from '../api/types';

const store = new Store();

function avatarReplacement(data: IUser[] | IChatList[] | IUser | IChatList, url: string): void {
    const replacement = (item: IUser | IChatList): void => {
        if (!item) return;
        if (item?.avatar) {
            item.avatar = 'https://ya-praktikum.tech/api/v2/resources' + item.avatar;
        } else {
            item.avatar = url;
        }
    };

    if (Array.isArray(data)) {
        data.forEach(replacement);
    } else {
        replacement(data);
    }
}

export class ChatsControllers {
    static async createChat(value: string) {
        const { id } = (await ChatsAPI.createChat(value)) || {};
        await ChatsControllers.getChats();
        return id;
    }

    static async addUserToChat(userId: number | number[]) {
        const currentChat = store.getState('currentChat');
        if (!currentChat?.id || !userId) return;
        await ChatsAPI.addUserToChat({ user: userId, chatId: currentChat?.id });
        await ChatsControllers.setCurrentChat(currentChat.id);
    }

    static async deleteUserToChat(userId: number | number[]) {
        const currentChat = store.getState('currentChat');
        if (!currentChat?.id || !userId) return;
        await ChatsAPI.deleteUSerToChat({ user: userId, chatId: currentChat?.id });
        await ChatsControllers.setCurrentChat(currentChat.id);
    }

    static async searchChats(value?: string) {
        if (!value?.length) {
            await ChatsControllers.getChats();
            store.set('foundChats', null);
            return;
        }
        const chats = await ChatsAPI.getChats({ title: value });
        if (!chats) return;

        avatarReplacement(chats, './static/chat.svg');

        store.set('foundChats', { chats });
    }

    static async getChats() {
        const chats = (await ChatsAPI.getChats()) || [];
        avatarReplacement(chats, './static/chat.svg');
        store.set('chats', chats);
    }

    static async setCurrentChat(idChat: number | typeof NaN) {
        if (!idChat || store.getState('currentChat')?.id === idChat) return;

        const requests = [ChatsAPI.getToken(idChat), ChatsAPI.getChatUsers(idChat)];

        const foundChats = store.getState('foundChats')?.chats || [];
        const chats = store.getState('chats') || [];
        const allChats = chats.concat(foundChats);
        const currentChat = allChats.find(chat => chat.id === idChat);

        const [token, users] = (await Promise.all(requests)) as [{ token: string }, users: IUser[]];

        if (!currentChat || !token || !users) return;

        avatarReplacement(users, './static/user.svg');

        const data: ICurrentChat = {
            ...currentChat,
            users,
            token: token.token,
        };
        store.set('currentChat', data);
    }

    static async deleteChat(chatId: number) {
        if (!chatId) return;
        const remoteChat = await ChatsAPI.deleteChat(chatId);
        if (!remoteChat) return;
        const chats = store.getState('chats');
        const filteredChats = chats?.filter(chat => chat.id !== chatId) || null;
        store.set('chats', filteredChats);
        store.set('currentChat', null);
    }
}
