import typescript from '@rollup/plugin-typescript';
import resolve from '@rollup/plugin-node-resolve';
import externals from 'rollup-plugin-node-externals';
import commonjs from '@rollup/plugin-commonjs';
import postcss from 'rollup-plugin-postcss';

export default {
  input: './src/index.ts',
  output: {
    dir: './dist',
    format: 'es',
    exports: 'named',
    preserveModules: true,
    preserveModulesRoot: 'src',
  },
  plugins: [
    commonjs(),
    typescript(),
    resolve(),
    externals({
      exclude: ['styled-components']
    }),
    postcss()
  ],
}