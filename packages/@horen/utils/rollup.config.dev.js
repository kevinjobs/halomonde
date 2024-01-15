import baseConfig from './rollup.config.base.js';
import typescript from '@rollup/plugin-typescript';

export default {
  ...baseConfig,
  plugins: [
    ...baseConfig.plugins,
    typescript({
      compilerOptions: {
        declarationMap: true,
      },
    }),
  ],
};
