import { render, screen, waitFor } from '@testing-library/react';
import Page from './page';
import '@testing-library/jest-dom';

global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () =>
      Promise.resolve([
        { id: 1, title: 'Falha ao acessar home', description: 'Ao acessar a página inicial, ocorreu um erro inesperado.' },
        { id: 2, title: 'Falha ao acessar dashboard', description: 'Ao acessar o dashboard, ocorreu um erro inesperado.' },
        { id: 3, title: 'Falha ao acessar perfil', description: 'Ao acessar o perfil, ocorreu um erro inesperado.' },
        { id: 4, title: 'Falha ao acessar configurações', description: 'Ao acessar as configurações, ocorreu um erro inesperado.' }
      ]),
  })
) as jest.Mock;

describe('Page', () => {
  it('Deve renderizar o componente Page', () => {
    render(<Page />);

    const heading = screen.getByRole('heading', {
      name: /lista de tarefas/i,
    });

    expect(heading).toBeInTheDocument();
  });

  it('Deve renderizar a lista de tarefas', async () => {
    render(<Page />);

    await waitFor(() => {
      expect(screen.getByText('Falha ao acessar home')).toBeInTheDocument();
      expect(screen.getByText('Falha ao acessar dashboard')).toBeInTheDocument();
      expect(screen.getByText('Falha ao acessar perfil')).toBeInTheDocument();
      expect(screen.getByText('Falha ao acessar configurações')).toBeInTheDocument();
    });
  });
});