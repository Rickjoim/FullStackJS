import { Test, TestingModule } from '@nestjs/testing';
import { TasksService } from './tasks.service';
import { NotFoundException } from '@nestjs/common';

describe('TasksService', () => {
  let service: TasksService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TasksService],
    }).compile();
    service = module.get<TasksService>(TasksService);
  });

  it('Deve estar definido', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('Deve retornar um array de tarefas', () => {
      const tasks = service.findAll();
      expect(tasks).toBeInstanceOf(Array);
      expect(tasks.length).toBeGreaterThan(0);
    });
  });

  describe('findOne', () => {
    it('Deve retornar uma única tarefa', () => {
      expect(service.findOne(1)).toBeDefined();
    });

    it('Deve lançar uma NotFoundException', () => {
      expect(() => service.findOne(999)).toThrow(NotFoundException);
    });
  });

  describe('create', () => {
    it('Deve criar uma tarefa', () => {
      const initialCount = service.findAll().length;
      const newTask = service.create({ title: 'New Task', description: 'New Desc' });
      expect(newTask).toHaveProperty('id');
      expect(service.findAll().length).toBe(initialCount + 1);
    });
  });

  describe('remove', () => {
    it('Deve remover uma tarefa', () => {
      service.remove(1);
      expect(() => service.findOne(1)).toThrow(NotFoundException);
    });
  });
});