import typescript from '@rollup/plugin-typescript';
import resolve from '@rollup/plugin-node-resolve';

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
    typescript(),
    resolve(),
  ],
  external: ['react'],
}