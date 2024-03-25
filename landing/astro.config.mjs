import { defineConfig } from 'astro/config'
import mdx from '@astrojs/mdx'
import tailwind from '@astrojs/tailwind'
import compress from 'astro-compress'
import icon from 'astro-icon'

// https://astro.build/config
export default defineConfig({
  compressHTML: true,
  integrations: [
    mdx(),
    icon(),
    tailwind({
      applyBaseStyles: false,
    }),
    compress(),
  ],
  vite: {
    ssr: {
      noExternal: [
        '@astrojs/mdx',
        '@astrojs/partytown',
        '@astrojs/tailwind',
        '@astrojs/check',
        'accessible-astro-components',
        'astro-icon',
        'astro-compress',
      ],
    },
  },
})
