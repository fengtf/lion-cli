#!/usr/bin/env node
import { Command } from 'commander';
const program = new Command();
import packageJson from '../package.json';

// commands
import { clean } from './commands/clean';
import { build } from './commands/build';

program.version(
  packageJson.version,
  '-v, --vers',
  'output the current version'
);
process.env.LION_CLI_VERSION = packageJson.version;

program
  .command('build')
  .description('Compile components in production mode')
  .option('--watch', 'Watch file change')
  .action(build);

program.command('clean').description('Clean all dist files').action(clean);

program.parse();
