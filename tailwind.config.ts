import typography from '@tailwindcss/typography'
import { Config } from 'tailwindcss'

const config: Config = {
  content: ['./index.html', './src/**/*.tsx'],
  darkMode: 'class',
  theme: {
    extend: {},
  },
  plugins: [typography],
}

export default config

