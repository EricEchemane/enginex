import chalk from 'chalk';
import fs from 'fs';

export const Logger = {
	info: (message) => console.log(chalk.bold(`=> ${message}`)),
	error: (message) => console.log(chalk.redBright(`❌ ${message}`)),
	success: (message) => console.log(chalk.greenBright.bold(`✅ ${message}`)),
};

export function scaffold(source, destination, routeName) {
	fs.writeFile(destination, '', (err) => {
		if (err) throw err;
	});
	fs.readFile(source, 'utf8', (err, data) => {
		if (err) throw err;

		let replacedData = data.replaceAll(/todo/g, routeName.toLowerCase());

		fs.writeFile(destination, replacedData, (err) => {
			if (err) throw err;
		});

		replacedData = replacedData.replaceAll(
			/Todo/g,
			routeName.charAt(0).toUpperCase() + routeName.slice(1)
		);

		fs.writeFile(destination, replacedData, (err) => {
			if (err) throw err;
		});
	});
}
