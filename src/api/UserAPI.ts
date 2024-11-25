import { ApiService } from 'core';
import { IPassword, IProfileData, IUser } from './types';

const HTTP = new ApiService('/user');
export class UserAPI {
    static async changeProfile(value: IProfileData): Promise<IUser | null> {
        try {
            const { response, status } = await HTTP.put('/profile', { data: value });
            if (status !== 200) return null;
            return JSON.parse(response);
        } catch (e) {
            console.error(e);
            return null;
        }
    }

    static async changeAvatar(value: FormData): Promise<IUser | null> {
        try {
            const { response, status } = await HTTP.put('/profile/avatar', { data: value });
            if (status !== 200) return null;
            return JSON.parse(response);
        } catch (e) {
            console.error(e);
            return null;
        }
    }

    static async changePassword(value: IPassword): Promise<boolean> {
        try {
            const { status } = await HTTP.put('/password', { data: value });
            return status !== 200;
        } catch (e) {
            console.error(e);
            return false;
        }
    }

    static async searchUsers(login: string): Promise<IUser[] | null> {
        try {
            const { response, status } = await HTTP.post('/search', { data: { login } });
            if (status !== 200) return null;
            return JSON.parse(response);
        } catch (e) {
            console.error(e);
            return null;
        }
    }
}
