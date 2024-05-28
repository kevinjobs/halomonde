#!/usr/bin/env zx
import { resolve } from 'path';

// 在部分系统中路径应当使用 \\ 进行分割
const config = resolve(__dirname, '../config/webpack.config.js').replaceAll('\\', '\\\\');

await $`cross-env NODE_ENV=development webpack serve -c ${config}`;
