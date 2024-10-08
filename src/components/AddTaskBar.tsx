"use client";

import { useState, useEffect, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus } from '@phosphor-icons/react';
import { useGlobalState } from '@/context/GlobalStateContext';

interface AddTaskBarProps {
  addTask: (task: string) => void;
}

const AddTaskBar = ({ addTask }: AddTaskBarProps) => {
  const [newTask, setNewTask] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const { isAddTaskBarVisible, setAddTaskBarVisible } = useGlobalState();

  const handleAddTask = () => {
    if (newTask.trim() !== '') {
      addTask(newTask);
      setNewTask('');
      setAddTaskBarVisible(false);
    }
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.shiftKey && event.key === 'N') {
        event.preventDefault();
        setAddTaskBarVisible(true);
        inputRef.current?.focus();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [setAddTaskBarVisible]);

  if (!isAddTaskBarVisible) return null;

  return (
    <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 flex mt-2 bg-white rounded-full shadow-lg z-50 w-full max-w-lg">
      <Input
        ref={inputRef}
        id="new-task"
        placeholder="Type anything ..."
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
        className="w-full rounded-full p-6"
      />
      <Button
        onClick={handleAddTask}
        className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black text-white rounded-full flex items-center justify-center"
      >
        <Plus className="h-6 w-6" />
      </Button>
    </div>
  );
};

export default AddTaskBar;