import { resolve } from 'path';
import { defineConfig, UserConfig } from 'vite';
import handlebars from 'vite-plugin-handlebars';
import { authorizationContext } from './src/pages/authorization/authorization.context';
import { registrationContext } from './src/pages/registration/registration.context';
import { userSettingContext } from './src/pages/user-settings/user-setting.context';

const pathToPages = `${__dirname}/src/pages`;

const pages = {
    index: resolve(__dirname, 'index.html'),
    authorization: resolve(pathToPages, 'authorization/authorization.html'),
    registration: resolve(pathToPages, 'registration/registration.html'),
    chatList: resolve(pathToPages, 'chat-list/chat-list.html'),
    userSetting: resolve(pathToPages, 'user-settings/user-settings.html'),
    changePassword: resolve(pathToPages, 'user-settings/change-password-page.html'),
    changePersonalData: resolve(pathToPages, 'user-settings/change-personal-data-page.html'),
    notFound: resolve(pathToPages, 'not-found/not-found.html'),
    serverError: resolve(pathToPages, 'server-error/server-error.html'),
};

const contextHandlebars = {
    authorization: authorizationContext,
    registration: registrationContext,
    userSetting: userSettingContext,
};

const config: UserConfig = {
    root: './',
    build: {
        outDir: './build',
        rollupOptions: {
            input: pages,
        },
    },
    server: {
        port: 3000,
        open: true,
    },
    plugins: [
        handlebars({
            partialDirectory: resolve(__dirname, 'src/partials'),
            context: contextHandlebars,
        }),
    ],
};
export default defineConfig(config);
