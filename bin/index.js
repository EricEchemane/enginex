#!/usr/bin/env node

import yargs from 'yargs';
import fs from 'fs';
import { hideBin } from 'yargs/helpers';
import { welcomeMessage } from './src/welcome-message.js';
import { Logger, scaffold } from './src/helpers.js';

yargs(hideBin(process.argv))
	.scriptName('gen')
	.usage('$0 <cmd> [args]')
	.command(
		'$0',
		'The default command',
		() => {},
		() => {
			console.log(welcomeMessage);
		}
	)
	.alias('v', 'version')
	.command(
		'routes [route-name]',
		'Generates REST endpoints of the given route-name with DTOs.',
		(yargs) => {
			yargs.positional('route-name', {
				type: 'string',
				describe: 'Route name',
			});
		},
		function (argv) {
			let routeName = argv['route-name'];

			if (!routeName) {
				Logger.error('Please specify a singular route name');
				return;
			}

			routeName = routeName.toLowerCase();

			const currentDir = process.cwd();

			if (!fs.existsSync(currentDir + '/src')) {
				Logger.error('You need to have a src folder');
				return;
			}
			if (!fs.existsSync(currentDir + '/src/engine')) {
				Logger.info(`Creating engine directory...`);
				fs.mkdirSync(currentDir + '/src/engine');
				fs.mkdirSync(currentDir + `/src/engine/${routeName}`);
			}

			Logger.info(`Creating directories...`);
			fs.mkdirSync(currentDir + `/src/engine/${routeName}`);
			fs.mkdirSync(currentDir + `/src/engine/${routeName}/dto`);
			//fs.mkdirSync(currentDir + `/src/engine/${routeName}/guards`);
			//fs.mkdirSync(currentDir + `/src/engine/${routeName}/hooks`);
			//fs.mkdirSync(currentDir + `/src/pages/api/${routeName}`);

			const SOURCE_FILES = {
				dto: {
					create: currentDir + '/bin/template/dto/create-todo.dto.ts',
					update: currentDir + '/bin/template/dto/update-todo.dto.ts',
				},
				guard: currentDir + '/bin/template/guards/auth.guard.ts',
				handler: currentDir + '/bin/template/todo/[[...params]].ts',
			};

			const DESTINATION_FILES = {
				dto: {
					create:
						currentDir +
						`/src/engine/${routeName}/dto/create-${routeName}.dto.ts`,
					update:
						currentDir +
						`/src/engine/${routeName}/dto/update-${routeName}.dto.ts`,
				},
				guard: currentDir + `/src/engine/${routeName}/guards/auth.guard.ts`,
				handler: currentDir + `/src/pages/api/${routeName}/[[...params]].ts`,
			};

			Logger.info(`Scaffolding your files...`);

			scaffold(
				SOURCE_FILES.dto.create,
				DESTINATION_FILES.dto.create,
				routeName
			);
			scaffold(
				SOURCE_FILES.dto.update,
				DESTINATION_FILES.dto.update,
				routeName
			);

			//if (argv.r) {
			//	// Generate routes
			//	console.log(chalk.bold(`=> Creating ${model} routes...`));
			//}
			//if (argv.q) {
			//	// Generate react-query hooks
			//	console.log(chalk.bold(`=> Creating ${model} react-query hooks...`));
			//}
		}
	)
	.help().argv;
