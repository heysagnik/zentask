"use client";

import { useState } from 'react';
import TaskList from '@/components/TaskList';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PlusCircle } from '@phosphor-icons/react';
import ScoreModal from '@/components/ScoreModal';
import Illustration from '@/components/Illustration';

export default function TodayPage() {
  const [tasks, setTasks] = useState([
    // { id: 1, title: 'Read a book', time: '08:00 - 09:00', project: '', completed: false },
    // { id: 2, title: 'Wireframing new product', time: '09:00 - 11:00', project: '', completed: false },
    // { id: 3, title: 'Moodboard Landing Page', time: '11:00 - 13:00', project: 'Mobal Project', completed: false },
    // { id: 4, title: 'Weekly meeting', time: '13:00 - 14:00', project: 'Futur Project', completed: false },
    // { id: 5, title: 'Design PPT for Sharing Session #2', time: '14:00 - 16:00', project: '', completed: false },
    // { id: 6, title: 'Ngopi with Bojo', time: '17:00 - 18:30', project: '', completed: false },
  ]);

  const [newTask, setNewTask] = useState('');
  const [isScoreModalOpen, setIsScoreModalOpen] = useState(false);

//   const addTask = () => {
//     if (newTask.trim() !== '') {
//       setTasks([...tasks, { id: tasks.length + 1, title: newTask, time: '19:00 - 20:00', project: '', completed: false }]);
//       setNewTask('');
//     }
//   };

  return (
    <>
      {tasks.length > 0 ? (
        <TaskList tasks={tasks} />
      ) : (
        <Illustration />
      )}
    <div className="fixed bottom-8 right-8 bg-white p-6 rounded-lg shadow-lg z-50">
      <Label htmlFor="new-task" className="text-black">Create new task</Label>
      <div className="flex mt-2">
        <Input
        id="new-task"
        placeholder="Type your task here..."
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
        className="border-black"
        />
        <Button onClick={()=>{}} className="ml-2 bg-black text-white">
        <PlusCircle className="h-4 w-4 mr-2" /> Create new task
        </Button>
      </div>
    </div>
      <ScoreModal isOpen={isScoreModalOpen} onClose={() => setIsScoreModalOpen(false)} />
    </>
  );
}