import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig} from 'vite';

export default defineConfig(() => {
  return {
    plugins: [react(), tailwindcss()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    build: {
      rollupOptions: {
        input: {
          main: path.resolve(__dirname, 'index.html'),
          signin: path.resolve(__dirname, 'signin.html'),
          zookeeperLogin: path.resolve(__dirname, 'zookeeper-login.html'),
          adminLogin: path.resolve(__dirname, 'admin-login.html'),
          citizenLogin: path.resolve(__dirname, 'citizen-login.html'),
          citizenRegister: path.resolve(__dirname, 'citizen-register.html'),
          observations: path.resolve(__dirname, 'observations.html'),
          uploadObservation: path.resolve(__dirname, 'upload-observation.html'),
          liveMap: path.resolve(__dirname, 'live-map.html'),
          adminZookeeperCreator: path.resolve(__dirname, 'admin-zookeeper-creator.html'),
          citizenHome: path.resolve(__dirname, 'citizen-home.html'),
        },
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modify—file watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
