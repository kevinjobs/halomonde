const ghpages = require('gh-pages');

ghpages.publish('dist', {
  branch: 'gh-pages',
  repo: 'https://github.com/iyumin/iyumin.github.io',
  message: 'update new version'
})