import React from 'react';
import { useDroppable } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { Plus, MoreVertical } from 'lucide-react';
import { KanbanColumn as KanbanColumnType, Post } from '../../types/content';
import SortableContentCard from './SortableContentCard';

interface KanbanColumnProps {
  column: KanbanColumnType;
  posts: Post[];
  onCreatePost: () => void;
}

const KanbanColumn: React.FC<KanbanColumnProps> = ({ column, posts, onCreatePost }) => {
  const { setNodeRef, isOver } = useDroppable({
    id: column.id,
  });

  return (
    <div className="w-80 flex flex-col h-full">
      {/* Column Header */}
      <div className="flex items-center justify-between mb-4 px-4 py-3 bg-gray-800/30 rounded-lg border border-gray-700/50">
        <div className="flex items-center space-x-3">
          <div className={`w-3 h-3 rounded-full bg-gradient-to-r ${column.color.replace('/20', '/60')}`} />
          <div>
            <h3 className="font-semibold text-white">{column.title}</h3>
            <p className="text-xs text-gray-400">{posts.length} items</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <button
            onClick={onCreatePost}
            className="p-1 text-gray-400 hover:text-cyan-400 hover:bg-gray-700/50 rounded transition-all duration-300 hover:scale-110"
          >
            <Plus className="w-4 h-4" />
          </button>
          <button className="p-1 text-gray-400 hover:text-white hover:bg-gray-700/50 rounded transition-all duration-300 hover:scale-110">
            <MoreVertical className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Column Description */}
      <p className="text-xs text-gray-500 mb-4 px-2">{column.description}</p>

      {/* Drop Zone */}
      <div
        ref={setNodeRef}
        className={`flex-1 min-h-96 rounded-lg border-2 border-dashed transition-all duration-300 ${
          isOver
            ? `border-cyan-500/50 bg-cyan-500/10 ${column.color}`
            : `border-gray-700/30 ${column.color}`
        }`}
      >
        <div className="p-3 space-y-3 h-full overflow-y-auto">
          <SortableContext items={posts.map(post => post.id)} strategy={verticalListSortingStrategy}>
            {posts.map((post) => (
              <SortableContentCard key={post.id} post={post} />
            ))}
          </SortableContext>
          
          {posts.length === 0 && (
            <div className="flex flex-col items-center justify-center h-32 text-gray-500">
              <div className="w-12 h-12 rounded-full bg-gray-700/30 flex items-center justify-center mb-3">
                <Plus className="w-6 h-6" />
              </div>
              <p className="text-sm text-center">No content yet</p>
              <p className="text-xs text-center mt-1">Drag items here or create new content</p>
            </div>
          )}
        </div>
      </div>

      {/* Column Footer */}
      {column.limit && (
        <div className="mt-3 px-2">
          <div className="flex items-center justify-between text-xs text-gray-400">
            <span>Limit: {posts.length}/{column.limit}</span>
            <div className="w-16 bg-gray-700/50 rounded-full h-1">
              <div
                className={`h-1 rounded-full transition-all duration-300 ${
                  posts.length >= column.limit ? 'bg-red-500' : 'bg-cyan-500'
                }`}
                style={{ width: `${Math.min((posts.length / column.limit) * 100, 100)}%` }}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default KanbanColumn;