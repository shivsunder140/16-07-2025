import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Post } from '../../types/content';
import ContentCard from './ContentCard';

interface SortableContentCardProps {
  post: Post;
}

const SortableContentCard: React.FC<SortableContentCardProps> = ({ post }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: post.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={`${isDragging ? 'z-50' : ''}`}
    >
      <ContentCard post={post} isDragging={isDragging} />
    </div>
  );
};

export default SortableContentCard;