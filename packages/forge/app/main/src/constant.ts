import path from "path";

const DIST_PATH = process.env.EE_DIST_PATH;
const VIEW_MAIN_PATH = path.join(DIST_PATH, 'view-home');
const VIEW_SETTING_PATH = path.join(DIST_PATH, 'view-setting');

export const MAIN_PORT = process.env.EE_MAIN_PORT;
export const SETTING_PORT = process.env.EE_SETTING_PORT;

export const MAIN_PAGE = path.join(DIST_PATH, VIEW_MAIN_PATH, 'index.html');
export const SETTING_PAGE = path.join(
  DIST_PATH,
  VIEW_SETTING_PATH,
  'index.html'
);