import { Test, TestingModule } from '@nestjs/testing';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';

describe('Testando o Controller', () => {
  let controller: TasksController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TasksController],
      providers: [TasksService],
    }).compile();

    controller = module.get<TasksController>(TasksController);
  });

  it('Deve estar definido', () => {
    expect(controller).toBeDefined();
  });

  it('Deve retornar um array de tarefas', () => {
    expect(controller.findAll()).toEqual([
      { id: 1, title: 'Falha ao acessar home', description: 'Ao acessar a página inicial, ocorreu um erro inesperado.' },
      { id: 2, title: 'Falha ao acessar dashboard', description: 'Ao acessar o dashboard, ocorreu um erro inesperado.' },
      { id: 3, title: 'Falha ao acessar perfil', description: 'Ao acessar o perfil, ocorreu um erro inesperado.' },
      { id: 4, title: 'Falha ao acessar configurações', description: 'Ao acessar as configurações, ocorreu um erro inesperado.' }
    ]);
  });
});