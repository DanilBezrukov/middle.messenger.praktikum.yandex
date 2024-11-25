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
