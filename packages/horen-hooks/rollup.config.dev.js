import buildConfig from './rollup.config.build.js';
import typescript from '@rollup/plugin-typescript';

export default {
  ...buildConfig,
  plugins: [
    ...buildConfig.plugins,
    typescript({
      compilerOptions: {
        declarationMap: true,
      }
    }),
  ]
}