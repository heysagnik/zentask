"use client";
import React, { useState, useRef, useEffect } from "react";
import { Trash2, Check, Clock } from "lucide-react";
import CircularTimePicker from "./CircularTimePicker";

const EisenhowerMatrix = () => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");
  const [, setShowCheckIcon] = useState(false);
  const [selectedTime, setSelectedTime] = useState("");
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [timePickerTodoIndex, setTimePickerTodoIndex] = useState(null);
  const dragItem = useRef();
  const dragOverItem = useRef();

  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem("todos")) || [];
    const storedDate = localStorage.getItem("date");
    const currentDate = new Date().toLocaleDateString();

    if (storedDate !== currentDate) {
      localStorage.clear();
      localStorage.setItem("date", currentDate);
    } else {
      setTodos(storedTodos);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
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

    if (dragItemContent.quadrant === "delete" && quadrant !== "delete") {
      return;
    }

    dragItemContent.quadrant = quadrant;
    if (quadrant === "delete") {
      dragItemContent.completed = true;
    } else if (quadrant === "schedule" && !dragItemContent.time) {
      setTimePickerTodoIndex(dragItem.current);
      setShowTimePicker(true);
    } else if (quadrant === "do") {
      dragItemContent.time = "";
    }

    copyListItems.splice(dragItem.current, 1);
    const newPosition =
      dragOverItem.current === undefined
        ? copyListItems.length
        : dragOverItem.current;
    copyListItems.splice(newPosition, 0, dragItemContent);

    dragItem.current = null;
    dragOverItem.current = null;
    setTodos(copyListItems);
  };

  const handleAddTodo = () => {
    if (newTodo.trim() !== "") {
      const quadrant = selectedTime ? "schedule" : "do";
      setTodos([
        ...todos,
        { text: newTodo, completed: false, quadrant, time: selectedTime },
      ]);
      setNewTodo("");
      setShowCheckIcon(false);
      setSelectedTime("");
    }
  };

  const handleCompleteTodo = (index) => {
    const newTodos = [...todos];
    newTodos[index].completed = true;
    newTodos[index].quadrant = "delete";
    setTodos(newTodos);
  };

  const handleDeleteAll = () => {
    const newTodos = todos.filter((todo) => todo.quadrant !== "delete");
    setTodos(newTodos);
  };

  const handleTimePickerDone = () => {
    if (timePickerTodoIndex !== null) {
      const newTodos = [...todos];
      newTodos[timePickerTodoIndex].time = selectedTime || "12:00"; // Default time if none is set
      setTodos(newTodos);
      setTimePickerTodoIndex(null);
    }
    setShowTimePicker(false);
    setSelectedTime("");
  };
  

  const renderQuadrant = (title, quadrant) => (
    <div
      className="border p-1 h-64 overflow-hidden rounded-lg"
      onDragOver={(e) => e.preventDefault()}
      onDrop={(e) => handleDrop(e, quadrant)}
    >
      <div className="flex justify-between items-center mb-1">
        <h2 className="text-md font-bold">{title}</h2>
        {quadrant === "delete" && (
          <button onClick={handleDeleteAll} className="text-red-500">
            <Trash2 size={16} />
          </button>
        )}
      </div>
      <div className="h-full overflow-y-auto hide-scrollbar">
        {todos
          .filter((todo) => todo.quadrant === quadrant)
          .map((todo, index) => (
            <div
              key={index}
              className={`flex flex-col justify-between p-2 mb-1 bg-white rounded-lg shadow h-16 ${
                todo.completed ? "line-through text-gray-500" : ""
              }`}
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
                      disabled={todo.quadrant === "delete"}
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
                  <span>
                    {new Date(`1970-01-01T${todo.time}:00`).toLocaleTimeString(
                      "en-US",
                      { hour: "2-digit", minute: "2-digit", hour12: true }
                    )}
                  </span>
                </div>
              )}
            </div>
          ))}
      </div>
    </div>
  );

  return (
    <div className="h-screen flex flex-col p-2">
      <div className="flex justify-between mb-2">
        <h2 className="text-gray-500">Urgent</h2>
        <h2 className="text-gray-500">Non-urgent</h2>
      </div>
      <div className="flex-grow grid grid-cols-2 grid-rows-2 gap-2 overflow-hidden">
        <div className="flex flex-col">
          {renderQuadrant("Do", "do")}
          {renderQuadrant("Delegate", "delegate")}
        </div>
        <div className="flex flex-col">
          {renderQuadrant("Schedule", "schedule")}
          {renderQuadrant("Delete", "delete")}
        </div>
      </div>

      <div className="fixed bottom-0 left-0 right-0 flex justify-center items-center">
        <div
          className="relative w-full max-w-lg bg-orange-200 shadow-lg rounded-t-full"
          style={{ height: "100px" }}
        >
          <div className="absolute inset-x-0 bottom-0 flex justify-center items-center pb-4">
            <div className="flex items-center justify-center w-full">
              <div className="relative w-3/4">
                <input
                  type="text"
                  value={newTodo}
                  onChange={(e) => {
                    setNewTodo(e.target.value);
                    setShowCheckIcon(e.target.value.trim() !== "");
                  }}
                  onKeyPress={(e) => {
                    if (e.key === "Enter") {
                      handleAddTodo();
                    }
                  }}
                  className="border rounded-lg px-2 py-1 w-full"
                  placeholder="Add a new todo..."
                  style={{ height: "40px" }}
                />
                <button
                  onClick={() => setShowTimePicker(true)}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-blue-500 text-white p-1 rounded-full hover:bg-blue-600 transition-colors"
                >
                  <Clock size={16} />
                </button>
                {newTodo.trim() !== "" && (
                  <button
                    onClick={handleAddTodo}
                    className="absolute right-10 top-1/2 transform -translate-y-1/2 bg-green-500 text-white p-1 rounded-full hover:bg-green-600 transition-colors"
                  >
                    <Check size={16} />
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {showTimePicker && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-gray-100 w-[80vw] h-[70vh] p-8 rounded-lg flex flex-col">
            <h2 className="text-2xl font-bold mb-4 text-center">Select Time</h2>
            <div className="inset-0 flex items-center justify-center bg-gray-100 bg-opacity-50 p-4">
              <CircularTimePicker
                onSelectTime={(time) => setSelectedTime(time)}
                onDone={handleTimePickerDone}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EisenhowerMatrix;


