import { IsBoolean, IsNotEmpty } from 'class-validator';

export class UpdateTodoDto {
	@IsNotEmpty()
	property_one!: string;
	@IsBoolean()
	property_two!: boolean;
}
