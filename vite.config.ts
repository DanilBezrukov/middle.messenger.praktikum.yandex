import { defineConfig, UserConfig } from 'vite';
import * as path from 'node:path';
import { handlebarsPrecompile } from './vite-plugins/handlebars-precompile';

const config: UserConfig = {
    root: './',
    build: {
        outDir: './build',
    },
    server: {
        port: 3000,
        open: true,
        // proxy: {
        //     '/api': {
        //         target: 'https://ya-praktikum.tech',
        //         changeOrigin: true,
        //         secure: false,
        //         ws: true,
        //         configure: proxy => {
        //             proxy.on('proxyReq', proxyReq => {
        //                 proxyReq.setHeader('Origin', 'https://ya-praktikum.tech');
        //             });
        //         },
        //         cookieDomainRewrite: '',
        //     },
        //     '/ws': {
        //         target: 'wss://ya-praktikum.tech',
        //         changeOrigin: true,
        //         ws: true,
        //         secure: false,
        //     },
        // },
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
