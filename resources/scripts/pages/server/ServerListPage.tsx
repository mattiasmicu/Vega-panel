import React, { useState, useEffect } from 'react';
import { Server, Search, Plus, Power, Settings, Terminal, Filter } from 'lucide-react';
import { Button } from '@/components/Button';
import { AppLayout } from '@/components/layout/AppLayout';
import axios from 'axios';

// ... (previous interfaces remain the same)

export const ServerListPage: React.FC = () => {
  // ... (previous state and functions remain the same)

  return (
    <AppLayout currentUser="mattiasmicu">
      <div className="p-6">
        {/* Your existing ServerListPage content */}
      </div>
    </AppLayout>
  );
};
