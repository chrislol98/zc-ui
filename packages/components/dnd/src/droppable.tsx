import { cn } from '@zc-ui/shared';
import { useDroppable, UniqueIdentifier } from '@dnd-kit/core';

export interface DroppableProps {
  id: UniqueIdentifier;
}

export function Droppable(props: React.PropsWithChildren<DroppableProps>) {
  const { id, children } = props;

  const { isOver, setNodeRef } = useDroppable({
    id: id,
  });

  return (
    <div
      className={cn('h-full', 'flex items-center justify-center', {
        'bg-orange-200': true,
        'bg-red-200': isOver,
      })}
      ref={setNodeRef}
    >
      {children}
    </div>
  );
}
