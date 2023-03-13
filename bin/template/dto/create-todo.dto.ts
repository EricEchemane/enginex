import { IsNotEmpty } from 'class-validator';

export class CreateTodoDTO {
	@IsNotEmpty()
	title!: string;
}
