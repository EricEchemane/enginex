import { IsBoolean, IsNotEmpty } from 'class-validator';

export class UpdateUserDto {
	@IsNotEmpty()
	title!: string;
	@IsBoolean()
	isDone!: boolean;
}
