"use client";

import { useEffect, useState } from 'react';

interface Task {
  id: number;
  title: string;
  description: string;
}

export default function Page() {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    async function fetchTasks() {
      const apiUrlBase = process.env.NEXT_PUBLIC_API_URL;
      if (!apiUrlBase) {
        console.error('A variável de ambiente NEXT_PUBLIC_API_URL não está definida.');
        return;
      }

      try {
        const apiUrl = `${apiUrlBase}/tasks`;
        console.log(`Buscando dados de: ${apiUrl}`);

        const response = await fetch(apiUrl);
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
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center p-24 bg-gray-900 text-white">
      <div className="z-10 max-w-5xl w-full items-center font-mono text-sm">
        <h1 className="text-4xl font-bold text-center mb-12">Lista de Tarefas</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tasks.map((task) => (
            <div key={task.id} className="bg-gray-800 rounded-lg p-6 shadow-lg border border-gray-700 hover:border-blue-500 transition-all duration-200">
              <h2 className="text-xl font-bold mb-2 text-blue-400">{task.title}</h2>
              <p className="text-gray-300">{task.description}</p>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}