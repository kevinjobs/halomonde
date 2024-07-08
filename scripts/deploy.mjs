import path from 'path';
import { fileURLToPath } from 'url';
import fsExtra from 'fs-extra';
import ghpages from 'gh-pages';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function now() {
  const d = new Date();
  let month = d.getMonth() + 1;
  let day = d.getDate();
  const year = d.getFullYear();
  const hour = d.getHours();
  const min = d.getMinutes();
  const s = d.getSeconds();

  if (month.length < 2) month = '0' + month;
  if (day.length < 2) day = '0' + day;

  return [year, month, day].join('-') + ' ' + [hour, min, s].join(':');
}

/**
 * 部署到 GitHub Pages
 *
 * @param distPath 部署的目录路径
 * @param config 配置对象
 * @returns 无返回值，通过回调函数处理结果
 */
export function deploy(distPath, config) {
  const publishDir = path.join(distPath, '..', 'publish');

  fsExtra.copySync(publishDir, distPath, {
    overwrite: true,
    dereference: true,
    recursive: true,
  });

  ghpages.publish(distPath, config, (err) => {
    if (err) {
      console.error(err);
    } else {
      console.log('Deployed to GitHub Pages at ' + now());
    }
  });
}

export const config = (siteName, message) => {
  const c = {
    kevinjobs: {
      branch: 'gh-pages',
      repo: 'git@github.com:kevinjobs/kevinjobs.github.io.git',
      message: message || 'update new version',
      // 是否将 .nojekyll 文件添加到 gh-pages 分支
      dotfiles: true,
    },
    lumie: {
      branch: 'gh-pages',
      repo: 'https://github.com/iyumin/iyumin.github.io',
      message: message || 'update new version',
    },
  };
  return c[siteName] || {};
};

export const folder = (siteName) => {
  const f = {
    kevinjobs: path.join(__dirname, '../packages/kevinjobs/dist'),
    lumie: path.join(__dirname, '../packages/lumie/dist'),
  };

  return f[siteName] || {};
};
