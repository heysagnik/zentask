"use client"

import { useState } from 'react'
import { Bell, ChevronDown, MoreVertical, Plus, Users } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import Sidebar from '@/components/sidebar'

export default function TodoApp() {
  const [tasks, setTasks] = useState([
    { id: 1, title: 'Read a book', time: '08:00 - 09:00', project: '', completed: false },
    { id: 2, title: 'Wireframing new product', time: '09:00 - 11:00', project: '', completed: false },
    { id: 3, title: 'Moodboard Landing Page', time: '11:00 - 13:00', project: 'Mobal Project', completed: false },
    { id: 4, title: 'Weekly meeting', time: '13:00 - 14:00', project: 'Futur Project', completed: false },
    { id: 5, title: 'Design PPT for Sharing Session #2', time: '14:00 - 16:00', project: '', completed: false },
    { id: 6, title: 'Ngopi with Bojo', time: '17:00 - 18:30', project: '', completed: false },
  ])

  const [newTask, setNewTask] = useState('')

  const addTask = () => {
    if (newTask.trim() !== '') {
      setTasks([...tasks, { id: tasks.length + 1, title: newTask, time: '19:00 - 20:00', project: '', completed: false }])
      setNewTask('')
    }
  }

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar/>

      {/* Main Content */}
      <div className="flex-1 p-8">
        <header className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl font-bold">Good Morning, Sullivan! 👋</h1>
            <p className="text-gray-500">Today, Wed 26 July 2023</p>
          </div>
          <div className="flex items-center space-x-4">
            <Button variant="outline">
              Today <ChevronDown className="h-4 w-4 ml-2" />
            </Button>
            <Button variant="ghost" size="icon">
              <Bell className="h-6 w-6" />
            </Button>
          </div>
        </header>

        <div className="space-y-4">
          {tasks.map((task) => (
            <div key={task.id} className="flex items-center justify-between bg-white p-4 rounded-lg shadow">
              <div className="flex items-center space-x-4">
                <input type="checkbox" className="rounded" checked={task.completed} onChange={() => {}} />
                <div>
                  <h3 className="font-medium">{task.title}</h3>
                  {task.project && (
                    <span className="text-sm text-blue-500">#{task.project}</span>
                  )}
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <span className="text-sm text-gray-500">{task.time}</span>
                <Button variant="ghost" size="icon">
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 bg-white p-6 rounded-lg shadow">
          <Label htmlFor="new-task">Create new task</Label>
          <div className="flex mt-2">
            <Input
              id="new-task"
              placeholder="Type your task here..."
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
            />
            <Button onClick={addTask} className="ml-2">
              <Plus className="h-4 w-4 mr-2" /> Create new task
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}