import { ApiService } from 'core';
import { IChatList, IOptionsForGettingChat, IOptionsForGettingChatUsers, IRemoteChat, IUser } from './types';

const HTTP = new ApiService('/chats');

export class ChatsAPI {
    static async getChats(options?: IOptionsForGettingChat): Promise<IChatList[] | null> {
        try {
            const { response, status } = await HTTP.get('', { data: options });
            if (status !== 200) return null;
            return JSON.parse(response);
        } catch (e) {
            console.error(e);
            return null;
        }
    }

    static async createChat(title: string): Promise<{ id: number } | null> {
        try {
            const { response, status } = await HTTP.post('', { data: { title } });
            if (status !== 200) return null;
            return JSON.parse(response);
        } catch (e) {
            console.error(e);
            return null;
        }
    }

    static async deleteChat(chatId: number): Promise<IRemoteChat | null> {
        try {
            const { response, status } = await HTTP.delete('', { data: { chatId } });
            if (status !== 200) return null;
            return JSON.parse(response);
        } catch (e) {
            console.error(e);
            return null;
        }
    }

    static async addUserToChat(value: { user: number[] | number; chatId: number }): Promise<boolean> {
        let { user, chatId } = value;
        if (!Array.isArray(user)) {
            user = [+user];
        }
        try {
            const { status } = await HTTP.put('/users', { data: { users: user, chatId } });
            return status === 200;
        } catch (e) {
            console.error(e);
            return false;
        }
    }

    static async getToken(chatId: number): Promise<{ token: string } | null> {
        try {
            const { response, status } = await HTTP.post('/token/' + chatId);
            if (status !== 200) return null;
            return JSON.parse(response);
        } catch (e) {
            console.error(e);
            return null;
        }
    }

    static async getChatUsers(idChat: number, options: IOptionsForGettingChatUsers = {}): Promise<IUser[] | null> {
        try {
            const { response, status } = await HTTP.get(`/${idChat}/users`, { data: options });
            if (status !== 200) return null;
            return JSON.parse(response);
        } catch (e) {
            console.error(e);
            return null;
        }
    }

    static async getCountChat(idChat: number): Promise<{ unread_count: number } | null> {
        try {
            const { response, status } = await HTTP.get(`/new/${idChat}`);
            if (status !== 200) return null;
            return JSON.parse(response);
        } catch (e) {
            console.error(e);
            return null;
        }
    }
}
