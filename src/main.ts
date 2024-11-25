import { Router } from 'core';
import { PageAuthorization } from './pages/authorization/authorization';
import { PageNotFound } from './pages/not-found/not-found';
import { PageRegistration } from './pages/registration/registration';
import { PageMessenger } from './pages/chat-list/chat-list';
import { PageSettings } from './pages/user-settings/user-settings';
import { PageServerError } from './pages/server-error/server-error';
import { PageSettingsPassword } from './pages/user-settings-password/user-settings-password';
import { PageSettingsPersonalData } from './pages/user-settings-personal-data/user-settings-personal-data';
import { AuthController } from './controllers/AuthController';
/*
 * DanilB
 * test@practicumyandex.ru
 * 89999999999
 * aJY5BsMhae2eaUE
 * */

/*
 * TestDanilB
 * test@practicumyandex2.ru
 * 89999999999
 * aJY5BsMhae2eaUE
 * */
const router = new Router();

AuthController.requestUser().then(() => {
    router.use({
        '/': PageAuthorization,
        '/sign-up': PageRegistration,
        '/settings': PageSettings,
        '/settings/password': PageSettingsPassword,
        '/settings/personal-data': PageSettingsPersonalData,
        '/messenger': PageMessenger,
        '/server-error': PageServerError,
        '/*': PageNotFound,
    });
    router.start();
});
