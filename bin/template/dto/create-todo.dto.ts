import { IsNotEmpty } from 'class-validator';

export class CreateTodoDTO {
	@IsNotEmpty()
	property!: string;
}
