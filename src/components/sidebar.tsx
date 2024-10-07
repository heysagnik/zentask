import { useState } from 'react';
import { Button } from './ui/button';
import { Plus } from 'lucide-react';
import { Separator } from '@radix-ui/react-separator';
import { Avatar, AvatarFallback } from './ui/avatar';

const Sidebar = () => {
  const [width, setWidth] = useState(256); // Default width in pixels

  const handleMouseDown = (e: { clientX: any; }) => {
    const startX = e.clientX;
    const startWidth = width;

    const onMouseMove = (e: { clientX: number; }) => {
      const newWidth = startWidth + (e.clientX - startX);
      if (newWidth >= 256) { // Minimum width
        setWidth(newWidth);
      }
    };

    const onMouseUp = () => {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  };

  return (
    <div
      className="relative bg-white p-6 shadow-md rounded-lg ml-4 overflow-auto mt-4 mb-4"
      style={{ width: `${width}px` }}
    >
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Private</h2>
        <Button variant="ghost" size="icon"><Plus className="h-4 w-4" /></Button>
      </div>
      <nav>
        {['Home', 'Completed', 'Personal', 'Work', 'Diet', 'List of Book', 'Road trip list'].map((item, index) => (
          <div key={index} className="flex items-center justify-between py-2">
            <span>{item}</span>
            <span className="text-gray-400">{Math.floor(Math.random() * 10) + 1}</span>
          </div>
        ))}
      </nav>
      <Button variant="outline" className="w-full mt-4">
        <Plus className="h-4 w-4 mr-2" /> Create new list
      </Button>
      <Separator className="my-6" />
      
      <div
        className="absolute top-0 right-0 h-full w-2 cursor-ew-resize"
        onMouseDown={handleMouseDown}
      />
    </div>
  );
};

export default Sidebar;