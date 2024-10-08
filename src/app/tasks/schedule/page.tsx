"use client";

import AddTaskBar from "@/components/AddTaskBar";
import { useState } from "react";

export default function SchedulePage() {
  const [tasks, setTasks] = useState<{ id: number; title: string; time: string; project: string; completed: boolean }[]>([]);
  const addTask = (task: string) => {
    setTasks([...tasks, { id: tasks.length + 1, title: task, time: '19:00 - 20:00', project: '', completed: false }]);
  };
  return (
    <div>
      <h2 className="text-xl font-semibold mb-4 text-black">Scheduled Tasks</h2>
      {/* Add logic to display calendar view */}
      <AddTaskBar addTask={addTask} />
    </div>
  );
}