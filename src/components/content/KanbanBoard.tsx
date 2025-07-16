import React from 'react';
import {
  DndContext,
  DragEndEvent,
  DragOverEvent,
  DragOverlay,
  DragStartEvent,
  PointerSensor,
  useSensor,
  useSensors,
  closestCorners
} from '@dnd-kit/core';
import {
  SortableContext,
  verticalListSortingStrategy
} from '@dnd-kit/sortable';
import { Plus, MoreHorizontal, Filter, Search } from 'lucide-react';
import { useContentStore } from '../../stores/contentStore';
import { PostStatus } from '../../types/content';
import KanbanColumn from './KanbanColumn';
import ContentCard from './ContentCard';

const KanbanBoard: React.FC = () => {
  const {
    posts,
    filteredPosts,
    kanbanColumns,
    draggedItem,
    setDraggedItem,
    movePost,
    searchQuery,
    searchPosts,
    showFilters,
    toggleFilters
  } = useContentStore();

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    })
  );

  const getPostsByStatus = (status: PostStatus) => {
    return filteredPosts.filter(post => post.status === status);
  };

  const getDraggedPost = () => {
    return draggedItem ? posts.find(post => post.id === draggedItem) : null;
  };

  const handleDragStart = (event: DragStartEvent) => {
    setDraggedItem(event.active.id as string);
  };

  const handleDragOver = (event: DragOverEvent) => {
    // Handle drag over logic if needed
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    
    if (!over) {
      setDraggedItem(null);
      return;
    }

    const activeId = active.id as string;
    const overId = over.id as string;

    // Check if we're dropping on a column
    const targetColumn = kanbanColumns.find(col => col.id === overId);
    if (targetColumn) {
      movePost(activeId, targetColumn.id);
    }

    setDraggedItem(null);
  };

  const handleCreatePost = (status: PostStatus) => {
    // This would open a create post modal/form
    console.log('Create post for status:', status);
  };

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-4">
          <h2 className="text-xl font-semibold text-white">Content Pipeline</h2>
          <div className="flex items-center space-x-2">
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search content..."
                value={searchQuery}
                onChange={(e) => searchPosts(e.target.value)}
                className="w-64 pl-10 pr-4 py-2 bg-gray-800/50 border border-gray-700/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 text-white placeholder-gray-400 transition-all duration-300"
              />
            </div>
            <button
              onClick={toggleFilters}
              className={`p-2 rounded-lg transition-all duration-300 hover:scale-110 ${
                showFilters
                  ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30'
                  : 'text-gray-400 hover:text-cyan-400 hover:bg-gray-800/50'
              }`}
            >
              <Filter className="w-4 h-4" />
            </button>
          </div>
        </div>
        
        <div className="flex items-center space-x-3">
          <button className="px-4 py-2 bg-gradient-to-r from-violet-500 to-purple-600 hover:from-violet-600 hover:to-purple-700 text-white rounded-lg transition-all duration-300 flex items-center space-x-2 hover:scale-105 shadow-lg">
            <Plus className="w-4 h-4" />
            <span>New Content</span>
          </button>
          <button className="p-2 text-gray-400 hover:text-white hover:bg-gray-800/50 rounded-lg transition-all duration-300 hover:scale-110">
            <MoreHorizontal className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Kanban Board */}
      <div className="flex-1 overflow-hidden">
        <DndContext
          sensors={sensors}
          collisionDetection={closestCorners}
          onDragStart={handleDragStart}
          onDragOver={handleDragOver}
          onDragEnd={handleDragEnd}
        >
          <div className="h-full overflow-x-auto">
            <div className="flex space-x-6 h-full min-w-max pb-6">
              {kanbanColumns.map((column) => {
                const columnPosts = getPostsByStatus(column.id);
                
                return (
                  <SortableContext
                    key={column.id}
                    items={columnPosts.map(post => post.id)}
                    strategy={verticalListSortingStrategy}
                  >
                    <KanbanColumn
                      column={column}
                      posts={columnPosts}
                      onCreatePost={() => handleCreatePost(column.id)}
                    />
                  </SortableContext>
                );
              })}
            </div>
          </div>

          <DragOverlay>
            {draggedItem ? (
              <div className="rotate-2 scale-105">
                <ContentCard post={getDraggedPost()!} isDragging />
              </div>
            ) : null}
          </DragOverlay>
        </DndContext>
      </div>
    </div>
  );
};

export default KanbanBoard;