import { ApiService } from 'core';
import { ISignInBody, ISignUpBody, IUser } from './types';

const HTTP = new ApiService('/auth');

export class AuthAPI {
    static async signUp(value: ISignUpBody): Promise<{ id: number } | null> {
        try {
            const { response, status } = await HTTP.post('/signup', { data: value });
            if (status !== 200) return null;
            return JSON.parse(response);
        } catch (e) {
            console.error(e);
            return null;
        }
    }

    static async signIn(value: ISignInBody): Promise<boolean> {
        try {
            const { status } = await HTTP.post('/signin', { data: value });
            return status === 200;
        } catch (e) {
            console.error(e);
            return false;
        }
    }

    static async getUser(): Promise<IUser | null> {
        try {
            const { response, status } = await HTTP.get('/user');
            if (status !== 200) return null;
            return JSON.parse(response);
        } catch (e) {
            console.error(e);
            return null;
        }
    }

    static async logout(): Promise<boolean> {
        try {
            const { status } = await HTTP.post('/logout');
            return status === 200;
        } catch (e) {
            console.error(e);
            return false;
        }
    }
}
