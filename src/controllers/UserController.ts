import { IPassword, IProfileData } from '../api/types';
import { Store } from 'core';
import { UserAPI } from '../api/UserAPI';

const store = new Store();

export class UserController {
    static async changeData(value: IProfileData) {
        const userData = await UserAPI.changeProfile(value);
        if (userData) {
            store.set('user', userData);
        }
    }

    static async changeAvatar(value: FormData) {
        const userData = await UserAPI.changeAvatar(value);
        if (userData) {
            store.set('user', userData);
        }
    }

    static async changePassword(value: IPassword) {
        const userData = await UserAPI.changePassword(value);
        if (userData) {
            store.set('user', userData);
        }
    }
}
