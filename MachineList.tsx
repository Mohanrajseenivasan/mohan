import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronRight, Plus, AlertTriangle, Activity } from 'lucide-react';
import { apiService, Component } from '../services/api';

const MachineList: React.FC = () => {
  const navigate = useNavigate();
  const [components, setComponents] = useState<Component[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchComponents();
  }, []);

  const fetchComponents = async () => {
    try {
      setLoading(true);
      const data = await apiService.getComponents();
      setComponents(data);
      setError(null);
    } catch (err) {
      console.error('Error fetching components:', err);
      setError('Failed to load components. Please check if the backend server is running.');
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status?: string) => {
    switch (status) {
      case 'good':
        return 'bg-green-600';
      case 'warning':
        return 'bg-orange-600';
      case 'critical':
        return 'bg-red-600';
      default:
        return 'bg-gray-600';
    }
  };

  const getStatusIcon = (status?: string) => {
    switch (status) {
      case 'critical':
        return <AlertTriangle className="w-4 h-4 text-red-400" />;
      case 'warning':
        return <Activity className="w-4 h-4 text-orange-400" />;
      default:
        return <Activity className="w-4 h-4 text-green-400" />;
    }
  };

  const handleComponentClick = (componentId: number) => {
    navigate(`/component/${componentId}`);
  };

  const handleAddComponent = () => {
    navigate('/add-component');
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
        <span className="ml-3 text-gray-400">Loading components...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-900/20 border border-red-500/50 rounded-lg p-6">
        <div className="flex items-center mb-4">
          <AlertTriangle className="w-6 h-6 text-red-400 mr-3" />
          <h3 className="text-lg font-semibold text-red-400">Connection Error</h3>
        </div>
        <p className="text-red-300 mb-4">{error}</p>
        <div className="space-y-2 text-sm text-red-300">
          <p>• Make sure the backend server is running on port 5000</p>
          <p>• Check if the database is properly configured</p>
          <p>• Verify the API endpoints are accessible</p>
        </div>
        <button
          onClick={fetchComponents}
          className="mt-4 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-md transition-colors"
        >
          Retry Connection
        </button>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto pb-4 scrollbar-thin">
      <style>{`
        .scrollbar-thin {
          scrollbar-width: thin;
          scrollbar-color: rgba(75, 85, 99, 0.8) transparent;
        }
        
        .scrollbar-thin::-webkit-scrollbar {
          height: 6px;
        }
        
        .scrollbar-thin::-webkit-scrollbar-track {
          background: transparent;
        }
        
        .scrollbar-thin::-webkit-scrollbar-thumb {
          background-color: rgba(75, 85, 99, 0.8);
          border-radius: 3px;
          opacity: 0;
          transition: opacity 0.3s ease;
        }
        
        .scrollbar-thin:hover::-webkit-scrollbar-thumb {
          opacity: 1;
        }
        
        .scrollbar-thin::-webkit-scrollbar-thumb:hover {
          background-color: rgba(107, 114, 128, 0.9);
        }
      `}</style>

      <div className="flex space-x-6 min-w-max">
        {components.map((component) => (
          <div
            key={component.id}
            className="bg-gray-800 rounded-lg p-6 border border-gray-700 hover:border-gray-600 transition-colors flex-shrink-0 w-80"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-semibold">{component.name}</h3>
              <div className="flex items-center space-x-2">
                {getStatusIcon(component.status)}
                <div className={`w-3 h-3 rounded-full ${getStatusColor(component.status)}`}></div>
              </div>
            </div>

            <div className="space-y-3 mb-4">
              {component.last_maintenance && (
                <div className="text-sm text-gray-400">
                  <span className="font-medium">Last Maintenance:</span>
                  <br />
                  {new Date(component.last_maintenance).toLocaleDateString()}
                </div>
              )}
              {component.next_maintenance && (
                <div className="text-sm text-gray-400">
                  <span className="font-medium">Next Maintenance:</span>
                  <br />
                  {new Date(component.next_maintenance).toLocaleDateString()}
                </div>
              )}
            </div>

            <button
              onClick={() => handleComponentClick(component.id)}
              className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white px-4 py-3 rounded-md transition-all duration-200 flex items-center justify-between group shadow-lg"
            >
              <span className="font-medium">View Details</span>
              <ChevronRight className="w-4 h-4 opacity-70 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-200" />
            </button>
          </div>
        ))}

        {/* Add Component Button */}
        <div
          onClick={handleAddComponent}
          className="bg-gray-800 border-2 border-dashed border-gray-600 hover:border-gray-500 rounded-lg p-6 flex-shrink-0 w-80 flex flex-col items-center justify-center cursor-pointer transition-all duration-200 hover:bg-gray-750 group"
        >
          <div className="w-16 h-16 bg-gray-700 group-hover:bg-gray-600 rounded-full flex items-center justify-center mb-4 transition-colors">
            <Plus className="w-8 h-8 text-gray-400 group-hover:text-gray-300 transition-colors" />
          </div>
          <h3 className="text-lg font-semibold text-gray-400 group-hover:text-gray-300 transition-colors">
            Add Component
          </h3>
          <p className="text-sm text-gray-500 group-hover:text-gray-400 transition-colors mt-2">
            Click to add a new component
          </p>
        </div>
      </div>
    </div>
  );
};

export default MachineList;