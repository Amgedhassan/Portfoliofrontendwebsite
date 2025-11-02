
  import { defineConfig } from 'vite';
  import react from '@vitejs/plugin-react-swc';
  import path from 'path';

  export default defineConfig({
    plugins: [react()],
    resolve: {
      extensions: ['.js', '.jsx', '.ts', '.tsx', '.json'],
      alias: {
        'vaul@1.1.2': 'vaul',
        'recharts@2.15.2': 'recharts',
        'react-hook-form@7.55.0': 'react-hook-form',
        'package@version': 'package',
        'figma:asset/eaac4d0e6806d088ddea7f8f293a5ce511708948.png': path.resolve(__dirname, './src/assets/eaac4d0e6806d088ddea7f8f293a5ce511708948.png'),
        'figma:asset/61aad403a2d958a83bac5dc82982b55f4dc5636e.png': path.resolve(__dirname, './src/assets/61aad403a2d958a83bac5dc82982b55f4dc5636e.png'),
        'figma:asset/4884701e19135c38bd94f5374ad4e6d65ed002ad.png': path.resolve(__dirname, './src/assets/4884701e19135c38bd94f5374ad4e6d65ed002ad.png'),
        'figma:asset/2a2b9acd1f3aa10123259ab05af158474f0cd3f5.png': path.resolve(__dirname, './src/assets/2a2b9acd1f3aa10123259ab05af158474f0cd3f5.png'),
        'figma:asset/27b155a01764d284ee449e9eecce8afc366ead7a.png': path.resolve(__dirname, './src/assets/27b155a01764d284ee449e9eecce8afc366ead7a.png'),
        '@': path.resolve(__dirname, './src'),
      },
    },
    build: {
      target: 'esnext',
      outDir: 'build',
    },
    server: {
      port: 3000,
      open: true,
    },
  });