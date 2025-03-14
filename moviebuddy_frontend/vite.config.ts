/** @format */

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import { fileURLToPath } from 'url'

// https://vite.dev/config/
export default defineConfig({
    plugins: [react()],
    resolve: {
        alias: {
            '@': path.resolve(
                path.dirname(fileURLToPath(import.meta.url)),
                'src'
            ),
        },
    },
    server: {
        proxy: {
            // '/api': {
            //     target: 'http://localhost:8000',
            //     changeOrigin: true,
            //     rewrite: (path) => path.replace(/^\/api/, ''),
            // },
        },
    },
})
