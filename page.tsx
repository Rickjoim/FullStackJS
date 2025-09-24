"use client";

import { useEffect, useState } from 'react';

interface Task {
  id: number;
  name: string;
}

export default function Page() {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    // You can fetch data or perform other client-side actions here
  }, []);

  return (
    <main>
      <h1>My Tasks</h1>
      {/* You can now render your stateful component */}
    </main>
  );
}