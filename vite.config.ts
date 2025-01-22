import { defineConfig, PluginOption, UserConfigExport } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

const config: UserConfigExport = defineConfig({
  plugins: [react()] as PluginOption[],
  server: {
    // host:"localhost"
    host: true,
    port: 5173 
  },
  base: "/TRC",
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@use "@/Assets/css/style.scss" as *;`
      },
    },
  }
});

export default config;
