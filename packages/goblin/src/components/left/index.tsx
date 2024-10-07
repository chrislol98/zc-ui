import { useState } from 'react';
import { cn } from '@zc-ui/shared';
import { useDraggable, useDndMonitor, CSS, DragOverlay } from '@zc-ui/shared';
import { Button } from '@zc-ui/shared';
import { DslSnippet } from '@zc-ui/goblin-core';

interface LeftProps extends React.HTMLAttributes<Element> {}
export function Left(props: LeftProps) {
  const { className } = props;
  const [activeId, setActiveId] = useState<string | number | null>(null);

  useDndMonitor({
    onDragStart(event) {
      setActiveId(event.active.id);
    },
    onDragMove(event) {
      
    },
    onDragOver(event) {},
    onDragEnd(event) {
      setActiveId(null);
    },
    onDragCancel(event) {},
  });
  function render() {
    return [...DslSnippet.map.keys()].map((name) => (
      <Draggable id={name} key={name}>
        <Item value={name} />
      </Draggable>
    ));
  }

  return (
    <div className={cn(className)}>
      {render()}
      <DragOverlay>{activeId ? <Item value={activeId} /> : null}</DragOverlay>
    </div>
  );
}

function Draggable(props: React.PropsWithChildren<{ id: string }>) {
  const { attributes, listeners, setNodeRef } = useDraggable({
    id: props.id,
  });

  return (
    <div ref={setNodeRef} {...listeners} {...attributes}>
      {props.children}
    </div>
  );
}

function Item(props: { value: string | number }) {
  return props.value;
}
