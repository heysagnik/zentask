import { useState, MouseEvent } from 'react';
import { Button } from './ui/button';
import { Calendar, Clock, PlusCircle, Trash } from '@phosphor-icons/react';
import { Separator } from '@radix-ui/react-separator';
import { Avatar, AvatarFallback } from './ui/avatar';
import Link from 'next/link';

const Sidebar = () => {
  const [width, setWidth] = useState(256); // Default width in pixels
  const [selectedNav, setSelectedNav] = useState('Today');

  const handleMouseDown = (e: MouseEvent<HTMLDivElement>) => {
    const startX = e.clientX;
    const startWidth = width;

    const onMouseMove = (e: MouseEvent) => {
      const newWidth = startWidth + (e.clientX - startX);
      if (newWidth >= 256) { // Minimum width
        setWidth(newWidth);
      }
    };

    const onMouseUp = () => {
      document.removeEventListener('mousemove', onMouseMove as unknown as EventListener);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove as unknown as EventListener);
    document.addEventListener('mouseup', onMouseUp);
  };

  const handleNavClick = (view: string) => {
    setSelectedNav(view);
  };

  return (
    <div
      className="relative bg-white p-6 shadow-md rounded-lg ml-4 overflow-auto mt-4 mb-4"
      style={{ width: `${width}px` }}
    >
      <div className="flex justify-between items-center mb-6">
        <Avatar className="border-2 border-white">
          <AvatarFallback>SS</AvatarFallback>
        </Avatar>
        <h2 className="text-xl font-semibold text-black">Private</h2>
        <Button variant="ghost" size="icon" className="text-black"><PlusCircle size={32} weight='fill'/></Button>
      </div>
      <nav>
        <Link href="/tasks/today">
          <Button
            variant="ghost"
            className={`flex items-start justify-start py-2 w-full mt-4 ${selectedNav === 'Today' ? 'text-black bg-gray-200' : 'text-black'}`}
            onClick={() => handleNavClick('Today')}
          >
            {selectedNav === 'Today' ? <Calendar className="h-5 w-5 mr-2" weight='fill' /> : <Calendar className="h-5 w-5 mr-2" />} Today
          </Button>
        </Link>
        <Link href="/tasks/schedule">
          <Button
            variant="ghost"
            className={`flex items-start justify-start py-2 w-full mt-4 ${selectedNav === 'Schedule' ? 'text-black bg-gray-200' : 'text-black'}`}
            onClick={() => handleNavClick('Schedule')}
          >
            {selectedNav === 'Schedule' ? <Clock className="h-5 w-5 mr-2" weight='fill' /> : <Clock className="h-5 w-5 mr-2" />} Schedule
          </Button>
        </Link>
        <Link href="/tasks/trash">
          <Button
            variant="ghost"
            className={`flex items-start justify-start py-2 w-full mt-4 ${selectedNav === 'Trash' ? 'text-black bg-gray-200' : 'text-black'}`}
            onClick={() => handleNavClick('Trash')}
          >
            {selectedNav === 'Trash' ? <Trash className="h-5 w-5 mr-2" weight='fill' size={32} /> : <Trash className="h-5 w-5 mr-2" />} Trash
          </Button>
        </Link>
      </nav>
      <Separator className="my-6" />
      
      <div
        className="absolute top-0 right-0 h-full w-2 cursor-ew-resize"
        onMouseDown={handleMouseDown}
      />
    </div>
  );
};

export default Sidebar;