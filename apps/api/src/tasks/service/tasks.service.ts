import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from '../dto/create-task.dto';
import { UpdateTaskDto } from '../dto/update-task.dto';
import { Task } from '../entities/task.entity';

@Injectable()
export class TasksService {
  private tasks: Task[] = [
    { id: 1, title: 'Falha ao acessar home', description: 'Ao acessar a página inicial, ocorreu um erro inesperado.' },
    { id: 2, title: 'Falha ao acessar dashboard', description: 'Ao acessar o dashboard, ocorreu um erro inesperado.' },
    { id: 3, title: 'Falha ao acessar perfil', description: 'Ao acessar o perfil, ocorreu um erro inesperado.' },
    { id: 4, title: 'Falha ao acessar configurações', description: 'Ao acessar as configurações, ocorreu um erro inesperado.' },
  ];

  create(createTaskDto: CreateTaskDto) {
    const currentMaxId = this.tasks.reduce((max, task) => (task.id > max ? task.id : max), 0);
    const newTask = {
      id: currentMaxId + 1,
      ...createTaskDto,
    };
    this.tasks.push(newTask);
    return newTask;
  }

  findAll() {
    return this.tasks;
  }

  findOne(id: number) {
    const task = this.tasks.find(t => t.id === id);
    if (!task) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }
    return task;
  }

  update(id: number, updateTaskDto: UpdateTaskDto) {
    const task = this.findOne(id);
    Object.assign(task, updateTaskDto);
    return task;
  }

  remove(id: number) {
    const index = this.tasks.findIndex(t => t.id === id);
    if (index === -1) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }
    this.tasks.splice(index, 1);
  }
}