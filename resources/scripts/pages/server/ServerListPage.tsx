import React, { useState, useEffect } from 'react';
import { Server, Search, Plus, Power, Settings, Terminal, Filter } from 'lucide-react';
import { Button } from '@/components/Button';
import axios from 'axios';
import { toast } from 'react-toastify';

interface GameServer {
  id: string;
  name: string;
  game: string;
  status: 'running' | 'stopped' | 'installing';
  owner: string;
  ip: string;
  port: number;
  memory: {
    used: number;
    total: number;
  };
  cpu: number;
  players: {
    current: number;
    max: number;
  };
}

export const ServerListPage: React.FC = () => {
  const [servers, setServers] = useState<GameServer[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'running' | 'stopped' | 'installing'>('all');
  const [showCreateServer, setShowCreateServer] = useState(false);

  // Fetch servers from API
  useEffect(() => {
    fetchServers();
  }, []);

  const fetchServers = async () => {
    try {
      setLoading(true);
      // Replace with your actual API endpoint
      const response = await axios.get('/api/servers');
      setServers(response.data);
    } catch (error) {
      toast.error('Failed to fetch servers');
      console.error('Error fetching servers:', error);
    } finally {
      setLoading(false);
    }
  };

  // Server control functions
  const startServer = async (serverId: string) => {
    try {
      await axios.post(`/api/servers/${serverId}/start`);
      toast.success('Server starting...');
      fetchServers(); // Refresh server list
    } catch (error) {
      toast.error('Failed to start server');
      console.error('Error starting server:', error);
    }
  };

  const stopServer = async (serverId: string) => {
    try {
      await axios.post(`/api/servers/${serverId}/stop`);
      toast.success('Server stopping...');
      fetchServers(); // Refresh server list
    } catch (error) {
      toast.error('Failed to stop server');
      console.error('Error stopping server:', error);
    }
  };

  const createServer = async (serverData: any) => {
    try {
      await axios.post('/api/servers', serverData);
      toast.success('Server created successfully');
      setShowCreateServer(false);
      fetchServers(); // Refresh server list
    } catch (error) {
      toast.error('Failed to create server');
      console.error('Error creating server:', error);
    }
  };

  // Filter servers based on search and status
  const filteredServers = servers.filter(server => {
    const matchesSearch = server.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         server.game.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || server.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-white">Game Servers</h1>
          <p className="text-gray-400 mt-1">Manage your game servers</p>
        </div>
        <Button onClick={() => setShowCreateServer(true)}>
          <Plus className="w-4 h-4 mr-2" />
          New Server
        </Button>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-4 mb-6">
        <div className="flex-1 relative">
          <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search servers..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-gray-800/50 border border-gray-700 rounded-lg pl-10 pr-4 py-2 text-white placeholder-gray-500"
          />
        </div>
        <div className="relative">
          <Filter className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as any)}
            className="appearance-none bg-gray-800/50 border border-gray-700 rounded-lg pl-10 pr-8 py-2 text-white"
          >
            <option value="all">All Status</option>
            <option value="running">Running</option>
            <option value="stopped">Stopped</option>
            <option value="installing">Installing</option>
          </select>
        </div>
      </div>

      {/* Server Grid */}
      {loading ? (
        <div className="text-center text-gray-400">Loading servers...</div>
      ) : filteredServers.length === 0 ? (
        <div className="text-center text-gray-400">
          {searchQuery || statusFilter !== 'all' 
            ? 'No servers match your filters'
            : 'No servers found. Create one to get started!'}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredServers.map(server => (
            <div
              key={server.id}
              className="bg-gray-800/50 border border-gray-700 rounded-xl p-6 space-y-4"
            >
              {/* Server Header */}
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-semibold text-white">{server.name}</h3>
                  <p className="text-sm text-gray-400">{server.game}</p>
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

              {/* Server Stats */}
              <div className="grid grid-cols-2 gap-4 py-4">
                <div>
                  <div className="text-sm font-medium text-gray-400">Memory</div>
                  <div className="text-white">
                    {server.memory.used}MB / {server.memory.total}MB
                  </div>
                </div>
                <div>
                  <div className="text-sm font-medium text-gray-400">CPU</div>
                  <div className="text-white">{server.cpu}%</div>
                </div>
                <div>
                  <div className="text-sm font-medium text-gray-400">Players</div>
                  <div className="text-white">
                    {server.players.current} / {server.players.max}
                  </div>
                </div>
                <div>
                  <div className="text-sm font-medium text-gray-400">Port</div>
                  <div className="text-white">{server.port}</div>
                </div>
              </div>

              {/* Server Actions */}
              <div className="flex items-center justify-between pt-4 border-t border-gray-700">
                <div className="text-sm text-gray-400">
                  Owner: {server.owner}
                </div>
                <div className="flex items-center gap-2">
                  <button 
                    className="p-2 text-gray-400 hover:text-white rounded-lg hover:bg-gray-700"
                    onClick={() => window.location.href = `/server/${server.id}/console`}
                  >
                    <Terminal className="w-4 h-4" />
                  </button>
                  <button 
                    className="p-2 text-gray-400 hover:text-white rounded-lg hover:bg-gray-700"
                    onClick={() => window.location.href = `/server/${server.id}/settings`}
                  >
                    <Settings className="w-4 h-4" />
                  </button>
                  <button 
                    className="p-2 text-gray-400 hover:text-white rounded-lg hover:bg-gray-700"
                    onClick={() => server.status === 'running' ? stopServer(server.id) : startServer(server.id)}
                  >
                    <Power className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Create Server Modal */}
      {showCreateServer && (
        <CreateServerModal 
          onClose={() => setShowCreateServer(false)}
          onCreate={createServer}
        />
      )}
    </div>
  );
};

// Add CreateServerModal component
const CreateServerModal: React.FC<{
  onClose: () => void;
  onCreate: (data: any) => void;
}> = ({ onClose, onCreate }) => {
  // Add your modal implementation here
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
      {/* Add your modal content here */}
    </div>
  );
};
