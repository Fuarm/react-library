import postcssPresetEnv from 'postcss-preset-env'
import tailwindcss from 'tailwindcss'
import tailwindConfig from './tailwind.config'

export default {
  plugins: [
    require('postcss-import'),
    tailwindcss({
      config: tailwindConfig
    }),
    require('autoprefixer'),
    postcssPresetEnv(
      {
        autoprefixer: {
          flexbox: 'no-2009',
        },
        stage: 3,
      },
    )
  ],
}
