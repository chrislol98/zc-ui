import { BaseDsl } from './types';
import { cn } from '@zc-ui/shared';
import { useDroppable } from '@zc-ui/shared';
export function Droppable(props: React.PropsWithChildren<DroppableProps>) {
  const {
    dsl: { id },
    children,
  } = props;
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

export interface DroppableProps {
  dsl: DroppableDsl;
}

export class DroppableDsl extends BaseDsl {
  constructor() {
    super({ name: 'droppable' });
  }
}
