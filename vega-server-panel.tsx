import React, { useState, useEffect } from 'react';
import { 
  Server, 
  Activity, 
  Users, 
  HardDrive, 
  Cpu, 
  Play, 
  Square, 
  RotateCcw, 
  Settings, 
  Terminal, 
  Database,
  Network,
  Shield,
  Bell,
  Search,
  Plus,
  Menu,
  X,
  ChevronRight,
  Box,
  Globe,
  Hexagon,
  MoreVertical,
  Power,
  PowerOff,
  LogOut,
  User,
  Eye,
  EyeOff,
  Upload,
  Save,
  Trash2,
  Edit,
  Check,
  AlertTriangle
} from 'lucide-react';

const App = () => {
  // Auth state
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [showLoginForm, setShowLoginForm] = useState(true);
  
  // Panel customization
  const [panelConfig, setPanelConfig] = useState({
    name: 'Vega',
    tagline: 'Server Panel',
    logo: null // Will be base64 or URL
  });
  
  // Main app state
  const [activeTab, setActiveTab] = useState('overview');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  
  // Nodes management
  const [nodes, setNodes] = useState([
    { 
      id: 1, 
      name: 'Node-US-East-1', 
      location: 'New York, USA',
      status: 'online',
      specs: { cpu: 16, ram: 64, disk: 1000 },
      usage: { cpu: 23, ram: 45, disk: 30 },
      servers: 12,
      maxServers: 20,
      ip: '192.168.1.100',
      daemon: 'v1.11.0'
    },
    { 
      id: 2, 
      name: 'Node-EU-West-1', 
      location: 'London, UK',
      status: 'online',
      specs: { cpu: 24, ram: 128, disk: 2000 },
      usage: { cpu: 67, ram: 78, disk: 55 },
      servers: 18,
      maxServers: 30,
      ip: '192.168.1.101',
      daemon: 'v1.11.0'
    },
    { 
      id: 3, 
      name: 'Node-Asia-1', 
      location: 'Tokyo, Japan',
      status: 'offline',
      specs: { cpu: 12, ram: 32, disk: 500 },
      usage: { cpu: 0, ram: 8, disk: 12 },
      servers: 0,
      maxServers: 15,
      ip: '192.168.1.102',
      daemon: 'v1.10.5'
    }
  ]);
  
  // Servers state
  const [servers, setServers] = useState([
    { 
      id: 1, 
      name: 'Production SMP', 
      status: 'online', 
      players: '47/100', 
      cpu: 34, 
      ram: 68, 
      uptime: '12d 4h', 
      type: 'minecraft', 
      version: '1.20.4',
      nodeId: 1,
      owner: 'admin'
    },
    { 
      id: 2, 
      name: 'Creative Realm', 
      status: 'online', 
      players: '23/50', 
      cpu: 18, 
      ram: 42, 
      uptime: '8d 12h', 
      type: 'minecraft', 
      version: '1.20.4',
      nodeId: 1,
      owner: 'user1'
    },
    { 
      id: 3, 
      name: 'Modded Frontier', 
      status: 'offline', 
      players: '0/60', 
      cpu: 0, 
      ram: 8, 
      uptime: '0m', 
      type: 'minecraft', 
      version: '1.19.2',
      nodeId: 2,
      owner: 'user2'
    }
  ]);
  
  // Modal states
  const [showCreateServer, setShowCreateServer] = useState(false);
  const [showCreateNode, setShowCreateNode] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  
  // Mock users
  const users = [
    { username: 'admin', password: 'admin', role: 'admin' },
    { username: 'user1', password: 'password', role: 'user' },
    { username: 'user2', password: 'password', role: 'user' }
  ];

  // Authentication component
  const AuthForm = () => {
    const [formData, setFormData] = useState({ username: '', password: '', confirmPassword: '' });
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = (e) => {
      e.preventDefault();
      setError('');
      
      if (showLoginForm) {
        // Login
        const user = users.find(u => u.username === formData.username && u.password === formData.password);
        if (user) {
          setCurrentUser(user);
          setIsAuthenticated(true);
        } else {
          setError('Invalid credentials');
        }
      } else {
        // Register
        if (formData.password !== formData.confirmPassword) {
          setError('Passwords do not match');
          return;
        }
        if (formData.password.length < 6) {
          setError('Password must be at least 6 characters');
          return;
        }
        
        // Mock registration
        const newUser = { username: formData.username, role: 'user' };
        setCurrentUser(newUser);
        setIsAuthenticated(true);
      }
    };

    return (
      <div className="min-h-screen bg-black flex items-center justify-center p-6">
        <div className="bg-white/5 border border-white/10 rounded-2xl p-8 w-full max-w-md">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Hexagon className="w-10 h-10 text-white" fill="currentColor" />
              <h1 className="text-2xl font-bold text-white">{panelConfig.name}</h1>
            </div>
            <p className="text-white/60">{showLoginForm ? 'Sign in to your account' : 'Create your account'}</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-3 text-red-400 text-sm">
                {error}
              </div>
            )}
            
            <div>
              <label className="block text-sm font-medium text-white/80 mb-2">Username</label>
              <input
                type="text"
                required
                value={formData.username}
                onChange={(e) => setFormData({...formData, username: e.target.value})}
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:border-white/30"
                placeholder="Enter your username"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-white/80 mb-2">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  value={formData.password}
                  onChange={(e) => setFormData({...formData, password: e.target.value})}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:border-white/30 pr-12"
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/40 hover:text-white/60"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>
            
            {!showLoginForm && (
              <div>
                <label className="block text-sm font-medium text-white/80 mb-2">Confirm Password</label>
                <input
                  type="password"
                  required
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:border-white/30"
                  placeholder="Confirm your password"
                />
              </div>
            )}
            
            <button
              type="submit"
              className="w-full bg-white text-black hover:bg-white/90 rounded-lg py-3 font-medium transition-colors"
            >
              {showLoginForm ? 'Sign In' : 'Sign Up'}
            </button>
          </form>
          
          <div className="text-center mt-6">
            <button
              onClick={() => setShowLoginForm(!showLoginForm)}
              className="text-white/60 hover:text-white text-sm"
            >
              {showLoginForm ? "Don't have an account? Sign up" : "Already have an account? Sign in"}
            </button>
          </div>
          
          {showLoginForm && (
            <div className="mt-4 p-4 bg-white/5 rounded-lg">
              <p className="text-xs text-white/60 mb-2">Demo accounts:</p>
              <p className="text-xs text-white/40">Admin: admin / admin</p>
              <p className="text-xs text-white/40">User: user1 / password</p>
            </div>
          )}
        </div>
      </div>
    );
  };

  // Create Server Modal
  const CreateServerModal = () => {
    const [serverForm, setServerForm] = useState({
      name: '',
      type: 'minecraft',
      version: '1.20.4',
      nodeId: nodes[0]?.id || 1,
      cpu: 2,
      ram: 4,
      disk: 10,
      maxPlayers: 20
    });

    const selectedNode = nodes.find(n => n.id === serverForm.nodeId);
    const canCreate = selectedNode && 
      selectedNode.usage.cpu + (serverForm.cpu / selectedNode.specs.cpu * 100) <= 90 &&
      selectedNode.usage.ram + (serverForm.ram / selectedNode.specs.ram * 100) <= 90;

    const handleCreate = () => {
      if (!canCreate) return;
      
      const newServer = {
        id: servers.length + 1,
        name: serverForm.name,
        status: 'offline',
        players: '0/' + serverForm.maxPlayers,
        cpu: 0,
        ram: 0,
        uptime: '0m',
        type: serverForm.type,
        version: serverForm.version,
        nodeId: serverForm.nodeId,
        owner: currentUser.username
      };
      
      setServers([...servers, newServer]);
      setShowCreateServer(false);
      setServerForm({
        name: '',
        type: 'minecraft',
        version: '1.20.4',
        nodeId: nodes[0]?.id || 1,
        cpu: 2,
        ram: 4,
        disk: 10,
        maxPlayers: 20
      });
    };

    if (!showCreateServer) return null;

    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
        <div className="bg-black border border-white/10 rounded-2xl p-6 w-full max-w-2xl">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-white">Create Server</h2>
            <button onClick={() => setShowCreateServer(false)}>
              <X className="w-5 h-5 text-white/60" />
            </button>
          </div>

          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-white/80 mb-2">Server Name</label>
                <input
                  type="text"
                  value={serverForm.name}
                  onChange={(e) => setServerForm({...serverForm, name: e.target.value})}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white"
                  placeholder="My Minecraft Server"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-white/80 mb-2">Node</label>
                <select
                  value={serverForm.nodeId}
                  onChange={(e) => setServerForm({...serverForm, nodeId: parseInt(e.target.value)})}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white"
                >
                  {nodes.filter(n => n.status === 'online').map(node => (
                    <option key={node.id} value={node.id}>{node.name}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-white/80 mb-2">CPU Cores</label>
                <input
                  type="number"
                  min="1"
                  max={selectedNode?.specs.cpu || 16}
                  value={serverForm.cpu}
                  onChange={(e) => setServerForm({...serverForm, cpu: parseInt(e.target.value)})}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-white/80 mb-2">RAM (GB)</label>
                <input
                  type="number"
                  min="1"
                  max={selectedNode?.specs.ram || 64}
                  value={serverForm.ram}
                  onChange={(e) => setServerForm({...serverForm, ram: parseInt(e.target.value)})}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-white/80 mb-2">Disk (GB)</label>
                <input
                  type="number"
                  min="5"
                  max={selectedNode?.specs.disk || 1000}
                  value={serverForm.disk}
                  onChange={(e) => setServerForm({...serverForm, disk: parseInt(e.target.value)})}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white"
                />
              </div>
            </div>

            {selectedNode && (
              <div className="bg-white/5 border border-white/10 rounded-lg p-4">
                <h3 className="text-white font-medium mb-2">Node Resources</h3>
                <div className="grid grid-cols-3 gap-4 text-sm">
                  <div>
                    <p className="text-white/60">CPU: {selectedNode.usage.cpu}% + {Math.round(serverForm.cpu / selectedNode.specs.cpu * 100)}%</p>
                    <div className="w-full bg-white/10 rounded-full h-2 mt-1">
                      <div 
                        className={`h-2 rounded-full ${selectedNode.usage.cpu + (serverForm.cpu / selectedNode.specs.cpu * 100) > 90 ? 'bg-red-500' : 'bg-white'}`}
                        style={{width: `${Math.min(selectedNode.usage.cpu + (serverForm.cpu / selectedNode.specs.cpu * 100), 100)}%`}}
                      />
                    </div>
                  </div>
                  <div>
                    <p className="text-white/60">RAM: {selectedNode.usage.ram}% + {Math.round(serverForm.ram / selectedNode.specs.ram * 100)}%</p>
                    <div className="w-full bg-white/10 rounded-full h-2 mt-1">
                      <div 
                        className={`h-2 rounded-full ${selectedNode.usage.ram + (serverForm.ram / selectedNode.specs.ram * 100) > 90 ? 'bg-red-500' : 'bg-white'}`}
                        style={{width: `${Math.min(selectedNode.usage.ram + (serverForm.ram / selectedNode.specs.ram * 100), 100)}%`}}
                      />
                    </div>
                  </div>
                  <div>
                    <p className="text-white/60">Servers: {selectedNode.servers + 1}/{selectedNode.maxServers}</p>
                  </div>
                </div>
              </div>
            )}

            <div className="flex gap-3">
              <button
                onClick={() => setShowCreateServer(false)}
                className="flex-1 bg-white/5 hover:bg-white/10 text-white border border-white/10 rounded-xl py-3 font-medium transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleCreate}
                disabled={!canCreate || !serverForm.name}
                className="flex-1 bg-white text-black hover:bg-white/90 disabled:bg-white/20 disabled:text-white/40 rounded-xl py-3 font-medium transition-colors"
              >
                Create Server
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Settings Modal
  const SettingsModal = () => {
    const [tempConfig, setTempConfig] = useState({...panelConfig});

    const handleSave = () => {
      setPanelConfig(tempConfig);
      setShowSettings(false);
    };

    if (!showSettings) return null;

    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
        <div className="bg-black border border-white/10 rounded-2xl p-6 w-full max-w-md">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-white">Panel Settings</h2>
            <button onClick={() => setShowSettings(false)}>
              <X className="w-5 h-5 text-white/60" />
            </button>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-white/80 mb-2">Panel Name</label>
              <input
                type="text"
                value={tempConfig.name}
                onChange={(e) => setTempConfig({...tempConfig, name: e.target.value})}
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-white/80 mb-2">Tagline</label>
              <input
                type="text"
                value={tempConfig.tagline}
                onChange={(e) => setTempConfig({...tempConfig, tagline: e.target.value})}
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white"
              />
            </div>
            
            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setShowSettings(false)}
                className="flex-1 bg-white/5 hover:bg-white/10 text-white border border-white/10 rounded-xl py-3 font-medium transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="flex-1 bg-white text-black hover:bg-white/90 rounded-xl py-3 font-medium transition-colors"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Node Card Component
  const NodeCard = ({ node }) => (
    <div className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:border-white/20 transition-all duration-200">
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-lg font-semibold text-white mb-1">{node.name}</h3>
          <p className="text-sm text-white/60">{node.location}</p>
          <p className="text-xs text-white/40 mt-1">Daemon {node.daemon}</p>
        </div>
        <div className="flex items-center gap-2">
          <div className={`w-2 h-2 rounded-full ${node.status === 'online' ? 'bg-green-400' : 'bg-red-400'}`} />
          <span className="text-sm text-white/80 capitalize">{node.status}</span>
        </div>
      </div>

      <div className="space-y-3 mb-4">
        <div>
          <div className="flex justify-between text-sm mb-1">
            <span className="text-white/60">CPU ({node.specs.cpu} cores)</span>
            <span className="text-white">{node.usage.cpu}%</span>
          </div>
          <div className="w-full bg-white/10 rounded-full h-2">
            <div className="bg-white h-2 rounded-full" style={{width: `${node.usage.cpu}%`}} />
          </div>
        </div>
        <div>
          <div className="flex justify-between text-sm mb-1">
            <span className="text-white/60">RAM ({node.specs.ram}GB)</span>
            <span className="text-white">{node.usage.ram}%</span>
          </div>
          <div className="w-full bg-white/10 rounded-full h-2">
            <div className="bg-white h-2 rounded-full" style={{width: `${node.usage.ram}%`}} />
          </div>
        </div>
        <div>
          <div className="flex justify-between text-sm mb-1">
            <span className="text-white/60">Disk ({node.specs.disk}GB)</span>
            <span className="text-white">{node.usage.disk}%</span>
          </div>
          <div className="w-full bg-white/10 rounded-full h-2">
            <div className="bg-white h-2 rounded-full" style={{width: `${node.usage.disk}%`}} />
          </div>
        </div>
      </div>

      <div className="flex justify-between items-center text-sm">
        <span className="text-white/60">Servers: {node.servers}/{node.maxServers}</span>
        <span className="text-white/60">{node.ip}</span>
      </div>
    </div>
  );

  // Main dashboard components (keeping previous components but updating sidebar)
  const sidebarItems = [
    { id: 'overview', icon: Activity, label: 'Overview' },
    { id: 'servers', icon: Server, label: 'Servers', badge: servers.filter(s => s.status === 'online').length },
    { id: 'nodes', icon: Network, label: 'Nodes', badge: nodes.filter(n => n.status === 'online').length },
    ...(currentUser?.role === 'admin' ? [
      { id: 'users', icon: Users, label: 'Users' },
      { id: 'security', icon: Shield, label: 'Security' }
    ] : []),
    { id: 'settings', icon: Settings, label: 'Settings' }
  ];

  if (!isAuthenticated) {
    return <AuthForm />;
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <style jsx>{`
        .button-scale {
          transition: all 0.15s ease;
        }
        .button-scale:hover {
          transform: scale(1.05);
        }
        .button-scale:active {
          transform: scale(0.95);
        }
      `}</style>

      {/* Sidebar */}
      <div className={`fixed left-0 top-0 h-full w-72 bg-black border-r border-white/10 z-50 transition-transform duration-200 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="p-6">
          {/* Logo */}
          <div className="flex items-center gap-4 mb-8">
            <div className="relative">
              <Hexagon className="w-10 h-10 text-white" fill="currentColor" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-3 h-3 bg-black rounded-full" />
              </div>
            </div>
            <div>
              <h1 className="text-xl font-semibold text-white">{panelConfig.name}</h1>
              <p className="text-xs text-white/60">{panelConfig.tagline}</p>
            </div>
          </div>

          {/* User info */}
          <div className="bg-white/5 rounded-xl p-4 mb-6">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                <User className="w-4 h-4" />
              </div>
              <div>
                <p className="text-sm font-medium text-white">{currentUser.username}</p>
                <p className="text-xs text-white/60 capitalize">{currentUser.role}</p>
              </div>
              <button
                onClick={() => setIsAuthenticated(false)}
                className="ml-auto p-1 hover:bg-white/10 rounded"
              >
                <LogOut className="w-4 h-4 text-white/60" />
              </button>
            </div>
          </div>

          {/* Navigation */}
          <nav className="space-y-1">
            {sidebarItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-all duration-200 ${
                  activeTab === item.id
                    ? 'bg-indigo-600/20 text-indigo-400 border border-indigo-600/30'
                    : 'text-gray-300 hover:bg-gray-800/60 hover:text-white'
                }`}
              >
                <item.icon className="w-5 h-5" />
                <span className="font-medium flex-1">{item.label}</span>
                {item.badge && (
                  <span className="bg-gray-700/60 text-gray-300 text-xs px-2 py-1 rounded-lg">
                    {item.badge}
                  </span>
                )}
                <ChevronRight className="w-4 h-4 opacity-40" />
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className={`transition-all duration-200 ${sidebarOpen ? 'ml-72' : 'ml-0'}`}>
        {/* Header */}
        <header className="bg-black border-b border-white/10 p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="button-scale p-2 rounded-xl bg-white/5 hover:bg-white/10 transition-colors"
              >
                {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
              <div>
                <h2 className="text-xl font-semibold capitalize text-white">{activeTab}</h2>
                <p className="text-sm text-white/60">
                  {activeTab === 'nodes' ? 'Manage your infrastructure nodes' : 'Manage your game servers'}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              {activeTab === 'servers' && (
                <button
                  onClick={() => setShowCreateServer(true)}
                  className="button-scale bg-white text-black hover:bg-white/90 rounded-xl px-4 py-2.5 text-sm font-medium transition-all duration-200 flex items-center gap-2"
                >
                  <Plus className="w-4 h-4" />
                  New Server
                </button>
              )}
              {activeTab === 'settings' && (
                <button
                  onClick={() => setShowSettings(true)}
                  className="button-scale bg-white text-black hover:bg-white/90 rounded-xl px-4 py-2.5 text-sm font-medium transition-all duration-200 