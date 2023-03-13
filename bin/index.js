#!/usr/bin/env node

import yargs from 'yargs';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { hideBin } from 'yargs/helpers';
import { welcomeMessage } from './src/welcome-message.js';
import { Logger, scaffold } from './src/helpers.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

yargs(hideBin(process.argv))
	.scriptName('enginex')
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
	.alias('h', 'hooks')
	.describe('h', 'Generates react-query hooks for each route')
	.command(
		'create [route-name]',
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
			const routeNameTitleCase =
				routeName.charAt(0).toUpperCase() + routeName.slice(1);

			const currentDir = process.cwd();

			if (!fs.existsSync(currentDir + '/src')) {
				Logger.error('You need to have a src folder');
				return;
			}
			if (!fs.existsSync(currentDir + '/src/engine')) {
				Logger.info(`Creating engine directory`);
				fs.mkdirSync(currentDir + '/src/engine');
			}

			Logger.info(`Creating directories`);
			fs.mkdirSync(currentDir + `/src/engine/${routeName}`);
			fs.mkdirSync(currentDir + `/src/engine/${routeName}/dto`);
			fs.mkdirSync(currentDir + `/src/engine/${routeName}/guards`);
			fs.mkdirSync(currentDir + `/src/pages/api/${routeName}`);

			const SOURCE_FILES = {
				dto: {
					create: __dirname + '/template/dto/create-todo.dto.ts',
					update: __dirname + '/template/dto/update-todo.dto.ts',
				},
				guard: __dirname + '/template/guards/auth.guard.ts',
				hooks: {
					getAll: __dirname + `/template/hooks/useGetTodos.ts`,
				},
				handler: __dirname + '/template/todo/[[...params]].ts',
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
				hooks: {
					getAll:
						currentDir +
						`/src/engine/${routeName}/hooks/useGet${routeNameTitleCase}s.ts`,
				},
				handler: currentDir + `/src/pages/api/${routeName}/[[...params]].ts`,
			};

			Logger.info(`Scaffolding your files`);

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
			scaffold(SOURCE_FILES.guard, DESTINATION_FILES.guard, routeName);
			scaffold(SOURCE_FILES.handler, DESTINATION_FILES.handler, routeName);

			if (argv.h) {
				Logger.info(`Generating react-query hooks`);
				fs.mkdirSync(currentDir + `/src/engine/${routeName}/hooks`);
				scaffold(
					SOURCE_FILES.hooks.getAll,
					DESTINATION_FILES.hooks.getAll,
					routeName
				);
			}

			Logger.success(`${routeNameTitleCase} Engine created`);
		}
	)
	.help().argv;
