import React, { useState } from 'react';
import { Shield, Server, Clock, Activity, User, Mail, Key } from 'lucide-react';
import { Button } from '@/components/Button';

interface UserProfile {
  id: string;
  username: string;
  email: string;
  role: 'admin' | 'moderator' | 'user';
  status: 'active' | 'suspended';
  lastLogin: string;
  created: string;
  servers: {
    id: string;
    name: string;
    status: 'running' | 'stopped' | 'installing';
  }[];
  activity: {
    id: string;
    action: string;
    timestamp: string;
    details: string;
  }[];
}

export const UserProfilePage: React.FC = () => {
  const [user] = useState<UserProfile>({
    id: '1',
    username: 'mattiasmicu',
    email: 'admin@example.com',
    role: 'admin',
    status: 'active',
    lastLogin: '2025-06-18 18:45:15',
    created: '2025-01-15',
    servers: [
      {
        id: '1',
        name: 'Minecraft Server #1',
        status: 'running'
      },
      {
        id: '2',
        name: 'CS:GO Server',
        status: 'stopped'
      }
    ],
    activity: [
      {
        id: '1',
        action: 'Server Start',
        timestamp: '2025-06-18 18:30:00',
        details: 'Started Minecraft Server #1'
      },
      {
        id: '2',
        action: 'Settings Update',
        timestamp: '2025-06-18 17:15:00',
        details: 'Updated server configuration'
      }
    ]
  });

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-white">User Profile</h1>
          <p className="text-gray-400 mt-1">View and manage user details</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="secondary">
            <Key className="w-4 h-4 mr-2" />
            Reset Password
          </Button>
          <Button variant="secondary">
            <Shield className="w-4 h-4 mr-2" />
            Permissions
          </Button>
          <Button>
            <Mail className="w-4 h-4 mr-2" />
            Contact User
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-6">
        {/* User Info */}
        <div className="col-span-1 space-y-6">
          <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6">
            <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <User className="w-5 h-5" />
              User Information
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">
                  Username
                </label>
                <div className="text-white">{user.username}</div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">
                  Email
                </label>
                <div className="text-white">{user.email}</div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">
                  Role
                </label>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary">
                  {user.role}
                </span>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">
                  Status
                </label>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-400/10 text-green-400">
                  {user.status}
                </span>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">
                  Member Since
                </label>
                <div className="text-white">{user.created}</div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">
                  Last Login
                </label>
                <div className="text-white">{user.lastLogin}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Servers & Activity */}
        <div className="col-span-2 space-y-6">
          {/* Servers */}
          <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6">
            <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <Server className="w-5 h-5" />
              Servers
            </h2>
            <div className="space-y-4">
              {user.servers.map(server => (
                <div
                  key={server.id}
                  className="flex items-center justify-between p-4 bg-gray-900/50 border border-gray-700 rounded-lg"
                >
                  <div>
                    <div className="font-medium text-white">{server.name}</div>
                    <div className="text-sm text-gray-400">ID: {server.id}</div>
                  </div>
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      server.status === 'running'
                        ? 'bg-green-400/10 text-green-400'
                        : server.status === 'stopped'
                        ? 'bg-red-400/10 text-red-400'
                        : 'bg-yellow-400/10 text-yellow-400'
                    }`}
                  >
                    {server.status}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Activity */}
          <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6">
            <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <Activity className="w-5 h-5" />
              Recent Activity
            </h2>
            <div className="space-y-4">
              {user.activity.map(item => (
                <div
                  key={item.id}
                  className="flex items-center justify-between p-4 bg-gray-900/50 border border-gray-700 rounded-lg"
                >
                  <div>
                    <div className="font-medium text-white">{item.action}</div>
                    <div className="text-sm text-gray-400">{item.details}</div>
                  </div>
                  <div className="text-sm text-gray-400">{item.timestamp}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
