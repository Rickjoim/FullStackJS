"use client";

import { useEffect, useState, FormEvent } from 'react';

interface Task {
  id: number;
  title: string;
  description: string;
}

export default function Page() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  const apiUrlBase = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    async function fetchTasks() {
      if (!apiUrlBase) {
        console.error('A variável de ambiente NEXT_PUBLIC_API_URL não está definida.');
        return;
      }

      try {
        const response = await fetch(`${apiUrlBase}/tasks`);
        if (!response.ok) {
          throw new Error(`Erro na rede: ${response.statusText}`);
        }
        const data = await response.json();
        setTasks(data);
      } catch (error) {
        console.error('Erro ao buscar tarefas:', error);
      }
    }

    fetchTasks();
  }, [apiUrlBase]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!apiUrlBase) return;

    const taskData = { title, description };

    const url = editingTask ? `${apiUrlBase}/tasks/${editingTask.id}` : `${apiUrlBase}/tasks`;
    const method = editingTask ? 'PATCH' : 'POST';

    try {
      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(taskData),
      });

      if (!response.ok) {
        throw new Error(`Falha ao ${editingTask ? 'atualizar' : 'criar'} tarefa`);
      }

      const result = await response.json();

      if (editingTask) {
        setTasks(tasks.map(task => (task.id === result.id ? result : task)));
        setEditingTask(null);
      } else {
        setTasks([...tasks, result]);
      }

      setTitle('');
      setDescription('');
    } catch (error) {
      console.error(`Erro ao ${editingTask ? 'atualizar' : 'criar'} tarefa:`, error);
    }
  };

  const handleDelete = async (taskId: number) => {
    if (!apiUrlBase) return;
    try {
      await fetch(`${apiUrlBase}/tasks/${taskId}`, { method: 'DELETE' });
      setTasks(tasks.filter(task => task.id !== taskId));
    } catch (error) {
      console.error('Erro ao deletar tarefa:', error);
    }
  };

  const handleEdit = (task: Task) => {
    setEditingTask(task);
    setTitle(task.title);
    setDescription(task.description);
  };

  return (
    <main className="flex min-h-screen flex-col items-center p-8 md:p-24 bg-gray-900 text-white">
      <div className="z-10 max-w-5xl w-full font-mono text-sm">
        <h1 className="text-4xl font-bold text-center mb-8">
          {editingTask ? 'Editar Tarefa' : 'Criar Nova Tarefa'}
        </h1>

        <form onSubmit={handleSubmit} className="mb-12 bg-gray-800 p-6 rounded-lg shadow-lg">
          <div className="mb-4">
            <input type="text" placeholder="Título da Tarefa" value={title} onChange={(e) => setTitle(e.target.value)} className="w-full p-3 bg-gray-700 rounded border border-gray-600 focus:outline-none focus:border-blue-500" required />
          </div>
          <div className="mb-4">
            <textarea placeholder="Descrição da Tarefa" value={description} onChange={(e) => setDescription(e.target.value)} className="w-full p-3 bg-gray-700 rounded border border-gray-600 focus:outline-none focus:border-blue-500" rows={3} required />
          </div>
          <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded transition-colors">
            {editingTask ? 'Atualizar Tarefa' : 'Adicionar Tarefa'}
          </button>
          {editingTask && (<button type="button" onClick={() => { setEditingTask(null); setTitle(''); setDescription(''); }} className="w-full mt-2 bg-gray-600 hover:bg-gray-700 text-white font-bold py-3 px-4 rounded transition-colors">Cancelar Edição</button>)}
        </form>

        <h2 className="text-3xl font-bold text-center mb-12">Lista de Tarefas</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tasks.map((task) => (
            <div key={task.id} className="bg-gray-800 rounded-lg p-6 shadow-lg border border-gray-700 flex flex-col justify-between hover:border-blue-500 transition-all duration-200">
              <div>
                <h3 className="text-xl font-bold mb-2 text-blue-400">{task.title}</h3>
                <p className="text-gray-300 mb-4">{task.description}</p>
              </div>
              <div className="flex justify-end gap-2 mt-4">
                <button onClick={() => handleEdit(task)} className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-1 px-3 rounded text-sm transition-colors">Editar</button>
                <button onClick={() => handleDelete(task.id)} className="bg-red-600 hover:bg-red-700 text-white font-bold py-1 px-3 rounded text-sm transition-colors">Deletar</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}