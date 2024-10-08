import { Dialog, DialogOverlay, DialogContent } from '@radix-ui/react-dialog';
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage } from '@radix-ui/react-avatar';
import { ArrowUp, X } from '@phosphor-icons/react';
import gem from '@/app/gem.png';

interface ScoreModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ScoreModal = ({ isOpen, onClose }: ScoreModalProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogOverlay className="fixed inset-0 bg-black opacity-50" />
      <DialogContent className="fixed inset-0 flex items-center justify-center">
        <div className="bg-white p-6 rounded-lg shadow-lg relative">
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-2 right-2"
            onClick={onClose}
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
  );
};

export default ScoreModal;