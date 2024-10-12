import { cn } from '@zc-ui/utils';
import { useDroppable, UniqueIdentifier } from '@dnd-kit/core';
export interface DroppableProps extends React.PropsWithChildren {
  id: UniqueIdentifier;
}

export function Droppable(props: DroppableProps) {
  const { id, children } = props;

  const { isOver, setNodeRef } = useDroppable({
    id: id,
  });

  return (
    <div
      className={cn('h-full  overflow-auto', {
        'bg-orange-200': true,
        'bg-red-200': isOver,
      })}
      ref={setNodeRef}
    >
      {children}
    </div>
  );
}
