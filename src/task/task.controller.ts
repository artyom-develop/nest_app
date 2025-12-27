import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
} from '@nestjs/common';
import { TaskService } from './task.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { TaskInterface } from '../types/Task';
@Controller('tasks')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Get('')
  getTasks() {
    return this.taskService.findAll();
  }

  @Get('/:id')
  getTaskById(@Param('id') id: string) {
    return this.taskService.findById(+id);
  }

  @Post('')
  createTask(@Body() dto: CreateTaskDto) {
    return this.taskService.createTask(dto);
  }
  @Put('/:id')
  updateTask(@Param('id') id: string, @Body() dto: UpdateTaskDto) {
    return this.taskService.updateTaskById(+id, dto);
  }

  @Patch('/:id')
  patchTask(@Param('id') id: string, @Body() dto: Partial<UpdateTaskDto>) {
    return this.taskService.patchTaskById(+id, dto);
  }

  @Delete('/:id')
  deleteTask(@Param('id') id: string) {
    return this.taskService.deleteTaskById(+id);
  }
}
