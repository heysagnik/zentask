"use client";
import Sidebar from '@/components/sidebar';
import Header from '@/components/Header';
import { useState } from 'react';
import { GlobalStateProvider } from '@/context/GlobalStateContext';

export default function Layout({ children }: { children: React.ReactNode }) {
  const [, setIsScoreModalOpen] = useState(false);

  return (
    <>
    <GlobalStateProvider>
      <div className="flex h-screen bg-gray-100">
        {/* Sidebar */}
        <Sidebar />

        {/* Main Content */}
        <div className="flex-1 p-8">
          <Header setIsScoreModalOpen={setIsScoreModalOpen} />
          {children}
        </div>
      </div>
    </GlobalStateProvider>
    </>
  );
}