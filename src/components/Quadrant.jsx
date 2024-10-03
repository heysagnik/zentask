"use client";

import React from 'react';
import { Trash2 } from 'lucide-react';
import { Clock } from 'lucide-react';

const Quadrant = ({ title, quadrant, todos, handleDragStart, handleDragEnter, handleDrop, handleCompleteTodo, handleDeleteAll }) => {
  return (
    <div 
      className="border p-1 h-64 overflow-hidden rounded-lg"
      onDragOver={(e) => e.preventDefault()}
      onDrop={(e) => handleDrop(e, quadrant)}
    >
      <div className="flex justify-between items-center mb-1">
        <h2 className="text-md font-bold">{title}</h2>
        {quadrant === 'delete' && (
          <button onClick={handleDeleteAll} className="text-red-500">
            <Trash2 size={16} />
          </button>
        )}
      </div>
      <div className="h-full overflow-y-auto hide-scrollbar">
        {todos.filter(todo => todo.quadrant === quadrant).map((todo, index) => (
          <div
            key={index}
            className={`flex flex-col justify-between p-2 mb-1 bg-white rounded-lg shadow h-16 ${todo.completed ? 'line-through text-gray-500' : ''}`}
            draggable
            onDragStart={(e) => handleDragStart(e, todos.indexOf(todo))}
            onDragEnter={(e) => handleDragEnter(e, todos.indexOf(todo))}
          >
            <div className="flex justify-between items-center">
              <span className="text-lg font-bold">{todo.text}</span>
              <div className="flex items-center">
                <label className="checkbox-container">
                  <input
                    type="checkbox"
                    checked={todo.completed}
                    onChange={() => handleCompleteTodo(todos.indexOf(todo))}
                    disabled={todo.quadrant === 'delete'}
                  />
                  <span className="checkbox">
                    <svg viewBox="0 0 24 24">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </span>
                </label>
              </div>
            </div>
            {todo.time && (
              <div className="flex items-center text-sm text-gray-500">
                <Clock size={16} className="mr-1" />
                <span>{new Date(`1970-01-01T${todo.time}:00`).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true })}</span>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Quadrant;