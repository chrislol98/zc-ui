import React, { useState } from 'react';
import {
  UniqueIdentifier,
  DragOverlay,
  useDraggable,
  useDndMonitor,
} from '@dnd-kit/core';
import { restrictToWindowEdges } from '@dnd-kit/modifiers';
export function Draggable(props: DraggableProps) {
  const { id, data, children } = props;
  const [activeId, setActiveId] = useState<UniqueIdentifier | undefined>(
    undefined
  );
  const { attributes, listeners, setNodeRef } = useDraggable({
    id,
    data,
  });
  
  return (
    <>
      <div ref={setNodeRef} {...listeners} {...attributes}>
        {children}
      </div>
      <DragOverlay modifiers={[restrictToWindowEdges]}>
        {activeId ? children : null}
      </DragOverlay>
    </>
  );
}
interface DraggableProps extends React.PropsWithChildren {
  id: UniqueIdentifier;
  data?: any;
}
