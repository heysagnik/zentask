"use client";

import { useState } from 'react';
import TaskList from '@/components/TaskList';
import ScoreModal from '@/components/ScoreModal';
import Illustration from '@/components/Illustration';
import AddTaskBar from '@/components/AddTaskBar';

export default function TodayPage() {
  const [tasks, setTasks] = useState<{ id: number; title: string; time: string; project: string; completed: boolean }[]>([]);
  const [isScoreModalOpen, setIsScoreModalOpen] = useState(false);

  const addTask = (task: string) => {
    setTasks([...tasks, { id: tasks.length + 1, title: task, time: '19:00 - 20:00', project: '', completed: false }]);
  };

  return (
    <>
      {tasks.length > 0 ? (
        <TaskList tasks={tasks} />
      ) : (
        <Illustration />
      )}
      
      <AddTaskBar addTask={addTask} />
      
      <ScoreModal isOpen={isScoreModalOpen} onClose={() => setIsScoreModalOpen(false)} />
    </>
  );
}