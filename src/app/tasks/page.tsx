import EisenhowerMatrix from '@/components/method';

export default function Home() {
  return (
    <div className="h-screen flex flex-col items-center justify-center ">
      <h1 className="text-2xl font-bold text-center mb-4">Eisenhower Matrix Todo App</h1>
      <div className="w-full max-w-4xl p-4 flex-grow">
        <EisenhowerMatrix />
      </div>
    </div>
  );
}