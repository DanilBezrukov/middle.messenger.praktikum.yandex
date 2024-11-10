import { resolve } from 'path';
import { defineConfig, UserConfig } from 'vite';
import * as path from 'node:path';
import { handlebarsPrecompile } from './vite-plugins/handlebars-precompile';

const pathToPages = path.join(__dirname, 'src/pages');

const pages = {
    index: resolve(__dirname, 'index.html'),
    authorization: resolve(pathToPages, 'authorization/index.html'),
    registration: resolve(pathToPages, 'registration/index.html'),
    chatList: resolve(pathToPages, 'chat-list/index.html'),
    userSetting: resolve(pathToPages, 'user-settings/index.html'),
    changePassword: resolve(pathToPages, 'user-settings-password/index.html'),
    changePersonalData: resolve(pathToPages, 'user-settings-personal-data/index.html'),
    notFound: resolve(pathToPages, 'not-found/index.html'),
    serverError: resolve(pathToPages, 'server-error/index.html'),
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
    css: {
        preprocessorOptions: {
            scss: {
                api: 'modern',
            },
        },
    },
    plugins: [handlebarsPrecompile()],
    resolve: {
        alias: [
            {
                find: 'core',
                replacement: path.resolve(__dirname, 'src/core/core'),
            },
            {
                find: 'components',
                replacement: path.resolve(__dirname, 'src/components/components'),
            },
        ],
    },
};
export default defineConfig(config);
