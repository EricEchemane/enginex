import chalk from 'chalk';
import boxen from 'boxen';

const welcome = chalk.bold(
	'WELCOME to EngineX\n\nCLI tool for generating NextJs API Routes in NestJS-like structure that scaffolds data model, handlers, DTOs, tests, and react-query hooks for frontend.'
);
export const welcomeMessage = boxen(welcome, {
	textAlignment: 'center',
	padding: 1,
	margin: 1,
	float: 'center',
});
