import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// react-native-web is aliased over react-native so that RN component imports
// resolve to their DOM implementations.
export default defineConfig(({ mode }) => ({
  plugins: [react()],
  resolve: {
    alias: { 'react-native': 'react-native-web' },
    extensions: ['.web.tsx', '.web.ts', '.tsx', '.ts', '.jsx', '.js', '.json'],
  },
  define: {
    __DEV__: JSON.stringify(mode !== 'production'),
  },
  server: {
    // `npm run dev` dərhal brauzerdə səhifəni açsın.
    open: true,
  },
  build: {
    target: 'es2020',
    cssCodeSplit: false,
    assetsInlineLimit: 4096,
  },
}))
