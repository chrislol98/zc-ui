import { useState } from 'react';
import { cn } from '@zc-ui/utils';
import { useDndMonitor, DragOverlay, useDraggable } from '@zc-ui/dnd';
import { snippetMap } from '@zc-ui/goblin-core';
import { Button } from 'components/ui/button/src';

interface LeftProps extends React.HTMLAttributes<Element> {}
export function Left(props: LeftProps) {
  const { className } = props;
  const [activeId, setActiveId] = useState<string | number | null>(null);

  useDndMonitor({
    onDragStart(event) {
      setActiveId(event.active.id);
    },
    onDragEnd(event) {
      setActiveId(null);
    },
  });

  function render() {
    return [...snippetMap.keys()].map(function (key) {
      return (
        <Draggable id={key} key={key}>
          <Item value={key} />
        </Draggable>
      );
    });
  }

  return (
    <div className={cn(className)}>
      {render()}
      <DragOverlay>{activeId ? <Item value={activeId} /> : null}</DragOverlay>
    </div>
  );
}

function Draggable(props: { id: string; children: React.ReactNode }) {
  const { id, children } = props;
  const get = snippetMap.get(id);
  if (!get) throw new Error('snippetMap.get(id) is undefined');
  const { attributes, listeners, setNodeRef } = useDraggable({
    id: id,
    data: get.schema,
  });

  return (
    <div ref={setNodeRef} {...listeners} {...attributes}>
      {children}
    </div>
  );
}

function Item(props: { value: string | number }) {
  return <Button>{props.value}</Button>;
}
