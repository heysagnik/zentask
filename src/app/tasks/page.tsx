"use client"

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Sidebar from '@/components/sidebar'
import { ArrowsVertical, ArrowUp, Bell, PlusCircle, Trophy, X } from '@phosphor-icons/react'
import gem from '@/app/gem.png'
import { Avatar, AvatarImage } from '@radix-ui/react-avatar'
import { Dialog, DialogOverlay, DialogContent } from '@radix-ui/react-dialog'
import { Popover, PopoverContent, PopoverTrigger } from '@radix-ui/react-popover'

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
  const [currentView, setCurrentView] = useState('Today')
  const [isScoreModalOpen, setIsScoreModalOpen] = useState(false)
  const [isNotificationOpen, setIsNotificationOpen] = useState(false)

  const addTask = () => {
    if (newTask.trim() !== '') {
      setTasks([...tasks, { id: tasks.length + 1, title: newTask, time: '19:00 - 20:00', project: '', completed: false }])
      setNewTask('')
    }
  }

  const renderView = () => {
    switch (currentView) {
      case 'Today':
        return (
          <div className="space-y-4">
            {tasks.map((task) => (
              <div key={task.id} className="flex items-center justify-between bg-white p-4 rounded-lg shadow">
                <div className="flex items-center space-x-4">
                  <input type="checkbox" className="rounded" checked={task.completed} onChange={() => {}} />
                  <div>
                    <h3 className="font-medium">{task.title}</h3>
                    {task.project && (
                      <span className="text-sm text-gray-500">#{task.project}</span>
                    )}
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <span className="text-sm text-gray-500">{task.time}</span>
                  <Button variant="ghost" size="icon">
                    <ArrowsVertical className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )
      case 'Schedule':
        return (
          <div>
            <h2 className="text-xl font-semibold mb-4 text-black">Scheduled Tasks</h2>
            {/* Add logic to display calendar view */}
          </div>
        )
      case 'Trash':
        return (
          <div>
            <h2 className="text-xl font-semibold mb-4 text-black">Completed Tasks</h2>
            {/* Add logic to display completed tasks */}
          </div>
        )
      default:
        return null;
    }
  }

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar setCurrentView={setCurrentView} />

      {/* Main Content */}
      <div className="flex-1 p-8">
        <header className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl font-bold text-black">Good Morning, Sagnik! 👋</h1>
            <p className="text-gray-500">Today, Wed 26 July 2023</p>
          </div>
          <div className="flex items-center space-x-4">
            <Button
              variant="default"
              className="border-purple-100 bg-purple-200 text-white hover:bg-purple-200 relative overflow-visible"
              onClick={() => setIsScoreModalOpen(true)}
            >
              <div className="transform transition-transform duration-300 hover:scale-150">
                <Avatar className="h-4 w-4">
                  <AvatarImage src={gem.src} alt="Avatar" className="rounded-full h-8" />
                </Avatar>
              </div>
              <span className="ml-1 text-purple-800">384</span>
            </Button>
            <Popover open={isNotificationOpen} onOpenChange={setIsNotificationOpen}>
              <PopoverTrigger asChild>
              <Button variant="ghost" size="icon" className="text-black">
                <Bell className="h-6 w-6" />
              </Button>
              </PopoverTrigger>
              <PopoverContent className="bg-white p-4 rounded-lg shadow-lg mt-4">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-lg font-semibold">Notifications</h3>
                <Button variant="ghost" size="icon" className="text-black">
                <Trophy className="h-6 w-6" />
                </Button>
              </div>
              <p className="text-gray-500">You have no new notifications.</p>
              </PopoverContent>
            </Popover>
          </div>
        </header>

        {renderView()}

        {currentView === 'Today' && (
          <div className="mt-8 bg-white p-6 rounded-lg shadow">
            <Label htmlFor="new-task" className="text-black">Create new task</Label>
            <div className="flex mt-2">
              <Input
                id="new-task"
                placeholder="Type your task here..."
                value={newTask}
                onChange={(e) => setNewTask(e.target.value)}
                className="border-black"
              />
              <Button onClick={addTask} className="ml-2 bg-black text-white">
                <PlusCircle className="h-4 w-4 mr-2" /> Create new task
              </Button>
            </div>
          </div>
        )}

        <Dialog open={isScoreModalOpen} onOpenChange={setIsScoreModalOpen}>
          <DialogOverlay className="fixed inset-0 bg-black opacity-50" />
          <DialogContent className="fixed inset-0 flex items-center justify-center">
            <div className="bg-white p-6 rounded-lg shadow-lg relative">
              <Button
                variant="ghost"
                size="icon"
                className="absolute top-2 right-2"
                onClick={() => setIsScoreModalOpen(false)}
              >
                <X className="h-6 w-6" />
              </Button>
              <div className="flex items-center">
                <Avatar className="h-16 w-16 mr-2">
                  <AvatarImage src={gem.src} alt="Gem" className="rounded-full h-14" />
                </Avatar>
                <div>
                  <h2 className="text-5xl font-semibold mb-2 text-purple-800">384</h2>
                </div>
                <ArrowUp className="h-10 text-purple-500 mb-6" />
              </div>
              <p className="text-gray-500 text-lg">Congrats on completing 384 tasks!</p>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}