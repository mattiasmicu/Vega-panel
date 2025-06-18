import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ServerListPage } from '@/pages/server/ServerListPage';

export const AppRouter: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ServerListPage />} />
        {/* Add more routes as needed */}
      </Routes>
    </BrowserRouter>
  );
};
