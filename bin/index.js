#!/usr/bin/env node

import chalk from 'chalk';
import yargs from 'yargs';
import fs from 'fs';
import { hideBin } from 'yargs/helpers';
import { welcomeMessage } from './src/welcome-message.js';

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
				console.log(chalk.redBright('⚠️ Please specify a singular route name'));
				return;
			}

			routeName = routeName.toLowerCase();

			const routeNameTitle =
				routeName.charAt(0).toUpperCase() + routeName.slice(1);

			const currentDir = process.cwd();

			if (!fs.existsSync(currentDir + '/src')) {
				console.log(chalk.redBright('⚠️ You need to have a src folder'));
				return;
			}
			if (!fs.existsSync(currentDir + '/src/engine')) {
				console.log(chalk.bold(`=> Creating engine directory...`));
				fs.mkdirSync(currentDir + '/src/engine');
			}

			//const sourceFilePath = currentDir + '/bin/templates/temp.model.ts';
			//const destinationFilePath =
			//	currentDir + `/models/${model.toLowerCase()}.model.ts`;

			//fs.readFile(sourceFilePath, 'utf8', (err, data) => {
			//	if (err) throw err;

			//	// Replace all occurrences of the word 'foo' with 'bar' in the data
			//	const replacedData = data.replace(/temp/g, model);

			//	// Write the replaced data to the destination file
			//	fs.writeFile(destinationFilePath, replacedData, (err) => {
			//		if (err) throw err;
			//		console.log(chalk.greenBright(`=> ${model} model has been created`));
			//	});
			//});

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
