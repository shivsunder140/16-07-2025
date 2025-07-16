import React from 'react';
import { 
  LayoutDashboard, 
  Kanban, 
  Calendar as CalendarIcon,
  BarChart3
} from 'lucide-react';
import { useContentStore } from '../stores/contentStore';
import { ViewType } from '../types/content';
import ContentCommandCenter from '../components/content/ContentCommandCenter';

const ContentCenter: React.FC = () => {
  const { currentView, setView } = useContentStore();

  const viewOptions: { id: ViewType; label: string; icon: React.ComponentType<any>; description: string }[] = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: LayoutDashboard,
      description: 'Overview and analytics'
    },
    {
      id: 'kanban',
      label: 'Pipeline',
      icon: Kanban,
      description: 'Content workflow'
    },
    {
      id: 'calendar',
      label: 'Calendar',
      icon: CalendarIcon,
      description: 'Schedule and timeline'
    }
  ];

  return (
    <div className="h-full flex flex-col">
      {/* View Switcher */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center bg-gray-800/50 rounded-xl p-1 shadow-lg">
          {viewOptions.map((option) => (
            <button
              key={option.id}
              onClick={() => setView(option.id)}
              className={`px-4 py-3 rounded-lg text-sm font-medium transition-all duration-300 flex items-center space-x-2 ${
                currentView === option.id
                  ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg scale-105'
                  : 'text-gray-400 hover:text-white hover:bg-gray-700/50 hover:scale-105'
              }`}
            >
              <option.icon className="w-4 h-4" />
              <span>{option.label}</span>
            </button>
          ))}
        </div>

        <div className="text-sm text-gray-400">
          {viewOptions.find(v => v.id === currentView)?.description}
        </div>
      </div>

      {/* Content Area */}
      <div className="flex-1 overflow-hidden">
        <ContentCommandCenter />
      </div>
    </div>
  );
};

export default ContentCenter;