import { Store } from 'core';
import { ChatsAPI } from '../api/ChatsAPI';
import { IChatList, IUser } from '../api/types';
import { UserAPI } from '../api/UserAPI';

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
    private static async createChat(currentUser?: IUser | null, foundUser?: IUser) {
        if (!foundUser || !currentUser) return;
        const nameChat = `${currentUser.first_name} / ${foundUser?.first_name}`;
        const { id } = (await ChatsAPI.createChat(nameChat)) || {};
        return id;
    }

    static async addChat(id: number | typeof NaN) {
        const foundUser = store.getState('foundChats')?.users?.find(user => user.id === id);
        const currentUser = store.getState('user');
        const chatId = await ChatsControllers.createChat(currentUser, foundUser);
        if (!chatId) return;
        const flag = await ChatsAPI.addUserToChat({ user: [currentUser!.id, foundUser!.id], chatId });
        if (flag) {
            store.set('foundChats', null);
        }
    }

    static async searchChats(value?: string) {
        if (!value?.length) {
            await ChatsControllers.getChats();
            store.set('foundChats', null);
            return;
        }

        const requests = [ChatsAPI.getChats({ title: value }), UserAPI.searchUsers(value)];
        const response = await Promise.all(requests);

        const [chats, users] = response.map(item => item || []);

        avatarReplacement(chats, '/static/chat.svg');
        avatarReplacement(users, '/static/user.svg');

        store.set('foundChats', { chats, users });
    }

    static async getChats() {
        const chats = (await ChatsAPI.getChats()) || [];
        avatarReplacement(chats, '/static/chat.svg');
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

        const currentUser = store.getState('user')!;

        const interlocutor = users.find(user => user.id !== currentUser.id)!;
        avatarReplacement(interlocutor, '/static/user.svg');
        const data = {
            ...currentChat,
            interlocutor,
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
