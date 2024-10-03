"use client";
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState, useRef, useEffect } from 'react';
import { Trash2 } from 'lucide-react';
import TodoInput from './TodoInput';
import Quadrant from './Quadrant';
import TimePickerModal from './TimePickerModal';
import { initializeTodos, updateLocalStorage } from './utils';

const EisenhowerMatrix = () => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');
  // const [selectedTime, setSelectedTime] = useState('');
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [timePickerTodoIndex, setTimePickerTodoIndex] = useState(null);
  const dragItem = useRef();
  const dragOverItem = useRef();

  useEffect(() => {
    const { storedTodos } = initializeTodos();
    setTodos(storedTodos);
  }, []);

  useEffect(() => {
    updateLocalStorage(todos);
  }, [todos]);

  const handleDragStart = (e, position) => {
    dragItem.current = position;
  };

  const handleDragEnter = (e, position) => {
    dragOverItem.current = position;
  };

  const handleDrop = (e, quadrant) => {
    const copyListItems = [...todos];
    const dragItemContent = copyListItems[dragItem.current];

    if (dragItemContent.quadrant === 'delete' && quadrant !== 'delete') {
      return;
    }

    dragItemContent.quadrant = quadrant;
    if (quadrant === 'delete') {
      dragItemContent.completed = true;
    } else if (quadrant === 'schedule' && !dragItemContent.time) {
      setTimePickerTodoIndex(dragItem.current);
      setShowTimePicker(true);
    } else if (quadrant === 'do') {
      dragItemContent.time = '';
    }
    copyListItems.splice(dragItem.current, 1);
    const newPosition = dragOverItem.current === undefined ? copyListItems.length : dragOverItem.current;
    copyListItems.splice(newPosition, 0, dragItemContent);
    dragItem.current = null;
    dragOverItem.current = null;
    setTodos(copyListItems);
  };

  const handleAddTodo = () => {
    if (newTodo.trim() !== '') {
      const quadrant = selectedTime ? 'schedule' : 'do';
      setTodos([...todos, { text: newTodo, completed: false, quadrant, time: selectedTime }]);
      setNewTodo('');
      setSelectedTime('');
    }
  };

  const handleCompleteTodo = (index) => {
    const newTodos = [...todos];
    newTodos[index].completed = true;
    newTodos[index].quadrant = 'delete';
    setTodos(newTodos);
  };

  const handleDeleteAll = () => {
    const newTodos = todos.filter(todo => todo.quadrant !== 'delete');
    setTodos(newTodos);
  };

  const handleTimePickerDone = () => {
    if (timePickerTodoIndex !== null) {
      const newTodos = [...todos];
      newTodos[timePickerTodoIndex].time = selectedTime || '15:40';
      setTodos(newTodos);
      setTimePickerTodoIndex(null);
    }
    setShowTimePicker(false);
    setSelectedTime('');
  };

  return (
    <div className="h-screen flex flex-col p-2">
      <div className="flex justify-between mb-2">
        <h2 className="text-gray-500">Urgent</h2>
        <h2 className="text-gray-500">Non-urgent</h2>
      </div>
      <div className="flex-grow grid grid-cols-2 grid-rows-2 gap-2 overflow-hidden">
        <div className="flex flex-col">
          <Quadrant title="Do" quadrant="do" todos={todos} handleDragStart={handleDragStart} handleDragEnter={handleDragEnter} handleDrop={handleDrop} handleCompleteTodo={handleCompleteTodo} />
          <Quadrant title="Delegate" quadrant="delegate" todos={todos} handleDragStart={handleDragStart} handleDragEnter={handleDragEnter} handle Drop={handleDrop} handleCompleteTodo={handleCompleteTodo} />
        </div>
        <div className="flex flex-col">
          <Quadrant title="Schedule" quadrant="schedule" todos={todos} handleDragStart={handleDragStart} handleDragEnter={handleDragEnter} handleDrop={handleDrop} handleCompleteTodo={handleCompleteTodo} />
          <Quadrant title="Delete" quadrant="delete" todos={todos} handleDragStart={handleDragStart} handleDragEnter={handleDragEnter} handleDrop={handleDrop} handleCompleteTodo={handleCompleteTodo} handleDeleteAll={handleDeleteAll} />
        </div>
      </div>

      <TodoInput
  newTodo={newTodo}
  setNewTodo={setNewTodo}
  handleAddTodo={handleAddTodo}
  setShowTimePicker={setShowTimePicker}
/>
      {showTimePicker && (
        <TimePickerModal selectedTime={selectedTime} setSelectedTime={setSelectedTime} handleTimePickerDone={handleTimePickerDone} />
      )}
    </div>
  );
};

export default EisenhowerMatrix;