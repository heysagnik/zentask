"use client";
import Sidebar from '@/components/sidebar';
import Header from '@/components/Header';
import { useState } from 'react';

export default function Layout({ children }: { children: React.ReactNode }) {
  const [isScoreModalOpen, setIsScoreModalOpen] = useState(false);

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 p-8">
        <Header setIsScoreModalOpen={setIsScoreModalOpen} />
        {children}
      </div>
    </div>
  );
}