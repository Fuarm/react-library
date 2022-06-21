import { defineConfig, loadEnv  } from 'vite'
import react from '@vitejs/plugin-react'
import postcssConfig from './postcss.config'

// https://vitejs.dev/config/
export default defineConfig(({mode}) => ({
  define: {
    '__ISDEV__': mode === 'development',
    'process.env': {NODE_MODE: mode, ...loadEnv(mode, process.cwd())}
  },
  css: {
    postcss: postcssConfig
  },
  plugins: [react()]
}))
