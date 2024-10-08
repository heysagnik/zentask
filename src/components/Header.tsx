import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage } from '@radix-ui/react-avatar';
import gem from '@/app/gem.png';

interface HeaderProps {
  setIsScoreModalOpen: (open: boolean) => void;
}

const Header = ({ setIsScoreModalOpen }: HeaderProps) => {
  return (
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
    
      </div>
    </header>
  );
};

export default Header;