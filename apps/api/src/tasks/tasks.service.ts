import { Injectable } from '@nestjs/common';

@Injectable()
export class TasksService {
  findAll() {
    return [
      { id: 1, title: 'Falha ao acessar home', description: 'Ao acessar a página inicial, ocorreu um erro inesperado.' },
      { id: 2, title: 'Falha ao acessar dashboard', description: 'Ao acessar o dashboard, ocorreu um erro inesperado.' },
      { id: 3, title: 'Falha ao acessar perfil', description: 'Ao acessar o perfil, ocorreu um erro inesperado.' },
      { id: 4, title: 'Falha ao acessar configurações', description: 'Ao acessar as configurações, ocorreu um erro inesperado.' },

    ];
  }
}