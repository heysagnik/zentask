import { Button } from "@/components/ui/button";
import { ArrowsVertical } from '@phosphor-icons/react';

interface Task {
  id: number;
  title: string;
  time: string;
  project: string;
  completed: boolean;
}

interface TaskListProps {
  tasks: Task[];
}

const TaskList = ({ tasks }: TaskListProps) => {
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
  );
};

export default TaskList;