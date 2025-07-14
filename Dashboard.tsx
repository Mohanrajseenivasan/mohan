import React from 'react';
import { Menu, Bell, Filter, Download, User } from 'lucide-react';
import MachineList from './MachineList';

const Dashboard: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Top Navigation */}
      <nav className="bg-gray-800 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Menu className="w-6 h-6" />
          <h1 className="text-xl font-bold text-blue-400">SmartMonitor</h1>
        </div>
        <div className="flex items-center space-x-4">
          <div className="relative">
            <Bell className="w-6 h-6" />
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
              3
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
              <User className="w-5 h-5" />
            </div>
            <span>John Doe</span>
          </div>
        </div>
      </nav>

      <div className="p-6">
        {/* Dashboard Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-3xl font-bold">Dashboard</h2>
              <p className="text-gray-400">Monitor your spare parts performance</p>
            </div>
            <div className="flex space-x-3">
              <button className="bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors">
                <Filter className="w-4 h-4" />
                <span>Filter</span>
              </button>
              <button className="bg-blue-600 hover:bg-blue-500 px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors">
                <Download className="w-4 h-4" />
                <span>Export</span>
              </button>
            </div>
          </div>

          {/* Status Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <div className="bg-gray-800 p-6 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-gray-400">Active Spares</h3>
                <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                  <span className="text-lg">📊</span>
                </div>
              </div>
              <p className="text-3xl font-bold">3</p>
            </div>
            <div className="bg-gray-800 p-6 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-gray-400">Good Status</h3>
                <div className="w-10 h-10 bg-green-600 rounded-lg flex items-center justify-center">
                  <span className="text-lg">✅</span>
                </div>
              </div>
              <p className="text-3xl font-bold">1</p>
            </div>
            <div className="bg-gray-800 p-6 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-gray-400">Warning</h3>
                <div className="w-10 h-10 bg-orange-600 rounded-lg flex items-center justify-center">
                  <span className="text-lg">⚠️</span>
                </div>
              </div>
              <p className="text-3xl font-bold">1</p>
            </div>
            <div className="bg-gray-800 p-6 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-gray-400">Critical</h3>
                <div className="w-10 h-10 bg-red-600 rounded-lg flex items-center justify-center">
                  <span className="text-lg">❗</span>
                </div>
              </div>
              <p className="text-3xl font-bold">1</p>
            </div>
          </div>
        </div>

        {/* Machine List */}
        <div>
          <h3 className="text-xl font-semibold mb-4">Machines</h3>
          <MachineList />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;