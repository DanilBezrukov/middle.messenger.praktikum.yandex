import { defineConfig, UserConfig } from 'vite';

const config: UserConfig = {
    root: './',
    build: {
        outDir: './build',
    },
    server: {
        port: 3000,
    },
};
export default defineConfig(config);
