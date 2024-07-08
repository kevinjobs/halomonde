import { Command } from 'commander';
import { deploy, config, folder } from './deploy.mjs';

const program = new Command();

program
  .name('halomonde')
  .description('a command line tool for deploying sites')
  .version('0.1.0');

program
  .command('deploy')
  .description('deploys a site')
  // .argument('<string>', 'the site to deploy')
  .option('-c, --config <string>', 'deploys a site with the specified config')
  .option('-d, --dir <string>', 'directory to deploy')
  .option('-s, --site <string>', 'the site to deploy')
  .action((options) => {
    const site = options.site;

    if (!site) {
      console.error('No site specified');
      process.exit(1);
    }

    const dist = options.dir || folder(site);
    const conf = options.config || config(site);

    deploy(dist, conf);
  });

program.parse();
