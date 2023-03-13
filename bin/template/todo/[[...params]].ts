import {
	Body,
	createHandler,
	Get,
	Param,
	Patch,
	Post,
	ValidationPipe,
} from 'next-api-decorators';

import { CreateTodoDTO } from '../dto/create-todo.dto';
import { UpdateTodoDto } from '../dto/update-todo.dto';

class Todo {
	@Get()
	all(): {
		return 'all todos';
	}

	@Get('/:id')
	todo(@Param('id') id: string) {
		return 'todo by id';
	}

	@Post()
	store(@Body(ValidationPipe) body: CreateTodoDTO) {
		return 'new todo';
	}

	@Patch('/:id')
	update(
		@Param('id') id: string,
		@Body(ValidationPipe) body: Partial<UpdateTodoDto>
	) {
		return 'updated todo';
	}
}

export default createHandler(Todo);
