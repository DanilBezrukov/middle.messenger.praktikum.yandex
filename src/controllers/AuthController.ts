import { Router, Store } from 'core';
import { AuthAPI } from '../api/AuthAPI';
import { ISignInBody, ISignUpBody } from '../api/types';
const store = new Store();
const router = new Router();

export class AuthController {
    public static async requestUser() {
        const userData = await AuthAPI.getUser();
        if (userData) {
            store.set('user', userData);
        }
        return userData;
    }

    public static async signOut() {
        const flag = await AuthAPI.logout();
        if (flag) {
            store.reset();
            router.go('/');
        }
    }

    public static async signIn(values: ISignInBody) {
        const flag = await AuthAPI.signIn(values);
        if (flag) {
            const userData = await AuthController.requestUser();
            if (userData) {
                router.go('/messenger');
            }
        }
    }

    public static async signUp(values: ISignUpBody) {
        const flag = await AuthAPI.signUp(values);
        if (flag) {
            const userData = await AuthController.requestUser();
            if (userData) {
                router.go('/messenger');
            }
        }
    }
}
