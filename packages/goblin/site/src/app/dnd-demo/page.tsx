'use client';
import {
  DndContext,
  SortableContext,
  useSortable,
  CSS,
  useDndMonitor,
} from 'components/dnd';
import { useState } from 'react';
export default function DndDemo() {
  const [items, setItems] = useState([1, 2, 3]);

  return (
    <div className="h-full bg-green-500">
      <DndContext>
        <SortableContext items={items}>
          {items.map((item) => (
            <Sortable key={item} id={item} item={item}></Sortable>
          ))}
        </SortableContext>
      </DndContext>
    </div>
  );
}

function Sortable({ id, item }: any) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: id });

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
      className="bg-red-500"
    >
      {item}
    </div>
  );
}
