import React, { useState } from 'react';
import { Users, Search, Plus, Filter, Mail, Key, Shield } from 'lucide-react';
import { Button } from '@/components/Button';

interface User {
  id: string;
  username: string;
  email: string;
  role: 'admin' | 'moderator' | 'user';
  status: 'active' | 'suspended';
  lastLogin: string;
  servers: number;
  created: string;
}

export const UserListPage: React.FC = () => {
  const [users] = useState<User[]>([
    {
      id: '1',
      username: 'mattiasmicu',
      email: 'admin@example.com',
      role: 'admin',
      status: 'active',
      lastLogin: '2025-06-18 18:45:15',
      servers: 3,
      created: '2025-01-15'
    }
  ]);

  const [searchQuery, setSearchQuery] = useState('');
  const [roleFilter, setRoleFilter] = useState<'all' | 'admin' | 'moderator' | 'user'>('all');
  const [showCreateUser, setShowCreateUser] = useState(false);

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-white">User Management</h1>
          <p className="text-gray-400 mt-1">Manage user accounts and permissions</p>
        </div>
        <Button onClick={() => setShowCreateUser(true)}>
          <Plus className="w-4 h-4 mr-2" />
          New User
        </Button>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-4 mb-6">
        <div className="flex-1 relative">
          <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search users..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-gray-800/50 border border-gray-700 rounded-lg pl-10 pr-4 py-2 text-white placeholder-gray-500"
          />
        </div>
      </div>

      {/* User List */}
      <div className="bg-gray-800/50 border border-gray-700 rounded-xl overflow-hidden">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-gray-700">
              <th className="px-6 py-4 text-sm font-medium text-gray-400">User</th>
              <th className="px-6 py-4 text-sm font-medium text-gray-400">Role</th>
              <th className="px-6 py-4 text-sm font-medium text-gray-400">Status</th>
              <th className="px-6 py-4 text-sm font-medium text-gray-400">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user.id} className="border-b border-gray-700">
                <td className="px-6 py-4">
                  <div>
                    <div className="font-medium text-white">{user.username}</div>
                    <div className="text-sm text-gray-400">{user.email}</div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary">
                    {user.role}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-400/10 text-green-400">
                    {user.status}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <button className="p-2 text-gray-400 hover:text-white rounded-lg hover:bg-gray-700">
                      <Key className="w-4 h-4" />
                    </button>
                    <button className="p-2 text-gray-400 hover:text-white rounded-lg hover:bg-gray-700">
                      <Shield className="w-4 h-4" />
                    </button>
                    <button className="p-2 text-gray-400 hover:text-white rounded-lg hover:bg-gray-700">
                      <Mail className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
