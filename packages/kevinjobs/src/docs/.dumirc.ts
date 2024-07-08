import { defineConfig } from 'dumi';

export default defineConfig({
  outputPath: '../../dist/docs',
  base: '/docs',
  publicPath: '/docs/',
  themeConfig: {
    name: 'Horen',
    socialLinks: {
      github: 'https://github.com/kevinjobs/halomonde',
    },
  },
});
