import { Test, TestingModule } from '@nestjs/testing';
import { TasksController } from './tasks.controller';
import { TasksService } from '../service/tasks.service';
import { CreateTaskDto } from '../dto/create-task.dto';

describe('TasksController', () => {
  let controller: TasksController;
  let service: TasksService;

  const mockTasks = [
    { id: 1, title: 'Task 1', description: 'Description 1' },
    { id: 2, title: 'Task 2', description: 'Description 2' },
  ];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TasksController],
      providers: [
        {
          provide: TasksService,
          useValue: {
            create: jest.fn().mockImplementation((dto: CreateTaskDto) => ({ id: Date.now(), ...dto })),
            findAll: jest.fn().mockReturnValue(mockTasks),
            findOne: jest.fn().mockImplementation((id: number) => mockTasks.find(t => t.id === id)),
            update: jest.fn().mockImplementation((id, dto) => ({ id, ...dto })),
            remove: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<TasksController>(TasksController);
    service = module.get<TasksService>(TasksService);
  });

  it('Deve estar definido', () => {
    expect(controller).toBeDefined();
  });

  it('Deve retornar um array de tarefas', () => {
    expect(controller.findAll()).toEqual(mockTasks);
    expect(service.findAll).toHaveBeenCalled();
  });

  it('Deve retornar uma única tarefa', () => {
    expect(controller.findOne('1')).toEqual(mockTasks[0]);
    expect(service.findOne).toHaveBeenCalledWith(1);
  });

  it('Deve criar uma tarefa', () => {
    const dto: CreateTaskDto = { title: 'New Task', description: 'New Desc' };
    controller.create(dto);
    expect(service.create).toHaveBeenCalledWith(dto);
  });

  it('Deve remover uma tarefa', () => {
    controller.remove('1');
    expect(service.remove).toHaveBeenCalledWith(1);
  });
});