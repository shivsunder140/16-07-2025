import React from 'react';
import { useContentStore } from '../../stores/contentStore';
import ContentDashboard from './ContentDashboard';
import KanbanBoard from './KanbanBoard';
import ContentCalendar from './ContentCalendar';
import FilterPanel from './FilterPanel';

const ContentCommandCenter: React.FC = () => {
  const { currentView, showFilters } = useContentStore();

  const renderCurrentView = () => {
    switch (currentView) {
      case 'dashboard':
        return <ContentDashboard />;
      case 'kanban':
        return <KanbanBoard />;
      case 'calendar':
        return <ContentCalendar />;
      default:
        return <ContentDashboard />;
    }
  };

  return (
    <div className="h-full flex">
      <div className="flex-1 overflow-hidden">
        {renderCurrentView()}
      </div>
      
      {showFilters && (
        <div className="w-80 border-l border-gray-700/50 bg-gray-900/30">
          <FilterPanel />
        </div>
      )}
    </div>
  );
};

export default ContentCommandCenter;