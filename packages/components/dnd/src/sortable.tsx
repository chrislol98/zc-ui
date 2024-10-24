import React, { useState } from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { UniqueIdentifier, DragOverlay, useDndMonitor } from '@dnd-kit/core';

export function Sortable(props: SortableProps) {
  const { id, children } = props;
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      {children}
    </div>
  );
}

export interface SortableProps extends React.PropsWithChildren {
  id: UniqueIdentifier;
}
