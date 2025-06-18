import React from 'react';
import { Header } from './Header';

interface AppLayoutProps {
  children: React.ReactNode;
  currentUser: string;
}

export const AppLayout: React.FC<AppLayoutProps> = ({ children, currentUser }) => {
  return (
    <div className="min-h-screen bg-gray-900">
      <Header currentUser={currentUser} />
      <main className="container mx-auto py-6">
        {children}
      </main>
    </div>
  );
};
