import Image from 'next/image';
import illustration from '@/app/image.svg'; 

const Illustration = () => {
  return (
    <div className="flex flex-col items-center justify-center h-full">
      <Image src={illustration} alt="No tasks illustration" width={500} height={500} />
      <p className="text-gray-500 mt-4">No tasks available. Add a new task to get started!</p>
    </div>
  );
};

export default Illustration;