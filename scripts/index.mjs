#!/usr/bin/env zx

const hooks = 'pnpm -F @horen/hooks run watch';
const core = 'pnpm -F @horen/core run watch';
const utils = 'pnpm -F @horen/utils run watch';
const store = 'pnpm -F @horen/store run watch';
const notifications = '"pnpm -F @horen/notifications run watch"';
const lumie = 'pnpm -F lumie run dev';
const docs = 'pnpm -F docs run dev';

await $`concurrently ${hooks} ${core} ${utils} ${notifications} ${store} ${lumie} ${docs}`;
