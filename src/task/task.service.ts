import { Not } from './../../node_modules/expect-type/dist/utils.d';
import { Injectable, NotFoundException } from '@nestjs/common';
import { TaskInterface } from '../types/Task';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Injectable()
export class TaskService {
  private tasks: TaskInterface[] = [
    {
      id: 1,
      title: 'Learn NestJS',
      isCompleted: false,
    },
    {
      id: 2,
      title: 'Learn Angular',
      isCompleted: false,
    },
  ];

  findAll(): TaskInterface[] {
    return this.tasks;
  }
  findById(id: number): TaskInterface {
    const foundItem = this.tasks.find((task) => task.id === id);

    if (!foundItem) {
      throw new NotFoundException('Task not found');
    }

    return foundItem;
  }

  createTask(dto: CreateTaskDto): TaskInterface[] {
    const { title } = dto;

    const newTask = {
      id: this.tasks.length + 1,
      title,
      isCompleted: false,
    };

    this.tasks.push(newTask);

    return this.tasks;
  }

  updateTaskById(id: number, dto: UpdateTaskDto) {
    const { title, isCompleted } = dto;
    const task = this.findById(id);
    task.title = title;
    task.isCompleted = isCompleted;
    return task;
  }

  patchTaskById(id: number, dto: Partial<UpdateTaskDto>) {
    const { title, isCompleted } = dto;
    const task = this.findById(id);
    Object.assign(task, dto);
    return task;
  }
  deleteTaskById(id: number) {
    const foundTask = this.findById(id);
    this.tasks = this.tasks.filter((task) => task.id !== foundTask.id);
    return this.tasks;
  }
}
