// -Path: "vite-extra-react-ssr-ts/vite.config.ts"
import path from 'path';
import { fileURLToPath } from 'url';
import react from '@vitejs/plugin-react';
import tsconfig from './tsconfig.app.json';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig, loadEnv, type AliasOptions } from 'vite';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Generate Vite aliases from tsconfig paths
 */
const getAliases = (): AliasOptions => {
    const alias: AliasOptions = {};
    const paths = tsconfig.compilerOptions.paths || {};

    Object.entries(paths).forEach(([key, value]) => {
        const cleanKey = key.replace(/\/\*$/, '');
        const cleanPath = (Array.isArray(value) ? value[0] : value).replace(/\/\*$/, '');
        alias[cleanKey] = path.resolve(__dirname, cleanPath);
    });

    return alias;
};

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, process.cwd(), '');
    const base = env.VITE_CLIENT_BASE;
    const host = env.VITE_CLIENT_HOST;
    const port = Number(env.VITE_CLIENT_PORT);
    const isDev = env.VITE_MODE === 'development';

    return {
        base: base ? base : '/',
        resolve: { alias: getAliases() },
        plugins: [react(), tailwindcss()],
        server: {
            port: port || 8000,
            host: host || '0.0.0.0',
            strictPort: isDev ? true : undefined,
        },
    };
});
