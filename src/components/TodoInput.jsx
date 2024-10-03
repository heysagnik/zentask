"use client";

import React from 'react';
import { Clock } from 'lucide-react';

const TodoInput = ({ newTodo, setNewTodo, handleAddTodo, setShowTimePicker }) => {
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleAddTodo();
    }
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 flex justify-center items-center">
      <div className="relative w-full max-w-lg bg-orange-200 shadow-lg rounded-t-full" style={{ height: '100px' }}>
        <div className="absolute inset-x-0 bottom-0 flex justify-center items-center pb-4">
          <div className="flex items-center justify-center w-full">
            <div className="relative w-3/4">
              <input
                type="text"
                value={newTodo}
                onChange={(e) => setNewTodo(e.target.value)}
                onKeyPress={handleKeyPress}
                className="border rounded-lg px-2 py-1 w-full"
                placeholder="Add a new todo..."
                style={{ height: '40px' }}
              />
              <button
                onClick={() => setShowTimePicker(true)}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-blue-500 text-white p-1 rounded-full hover:bg-blue-600 transition-colors"
              >
                <Clock size={16} />
              </button>
              {newTodo.trim() !== '' && (
                <button
                  onClick={handleAddTodo}
                  className="absolute right-10 top-1/2 transform -translate-y-1/2 bg-green-500 text-white p-1 rounded-full hover:bg-green-600 transition-colors"
                >
                  <svg viewBox="0 0 24 24">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TodoInput;