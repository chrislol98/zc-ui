import { useState } from 'react';
import { cn } from '@zc-ui/utils';
import {
  useDndMonitor,
  DragOverlay,
  useDraggable,
  restrictToWindowEdges,
} from '@zc-ui/dnd';
import { DslSnippet, useDslStore } from '@zc-ui/goblin-core';
import { Button } from 'components/button';
interface LeftProps extends React.HTMLAttributes<Element> {}
export function Left(props: LeftProps) {
  const { className } = props;
  const add = useDslStore((state) => state.add);
  const [activeId, setActiveId] = useState<string | number | null>(null);

  useDndMonitor({
    onDragStart(event) {
      setActiveId(event.active.id);
    },
    onDragMove(event) {},
    onDragOver(event) {},
    onDragEnd(event) {
      const id = event.over?.id;
      const current = event.active.data.current as DslSnippet;
      const dsl = current.createDsl();
      dsl && add({ dsl, id });
      setActiveId(null);
    },
    onDragCancel(event) {},
  });

  function render() {
    return [...DslSnippet.map.values()].map(function (value) {
      const { name } = value;
      return (
        <Draggable dslSnippet={value} key={name}>
          <Item value={name} />
        </Draggable>
      );
    });
  }

  return (
    <div className={cn(className)}>
      {render()}
      <DragOverlay modifiers={[restrictToWindowEdges]}>
        {activeId ? <Item value={activeId} /> : null}
      </DragOverlay>
    </div>
  );
}

function Draggable(props: React.PropsWithChildren<{ dslSnippet: DslSnippet }>) {
  const { dslSnippet } = props;
  const { attributes, listeners, setNodeRef } = useDraggable({
    id: dslSnippet.name,
    data: dslSnippet,
  });

  return (
    <div ref={setNodeRef} {...listeners} {...attributes}>
      {props.children}
    </div>
  );
}

function Item(props: { value: string | number }) {
  return <Button>{props.value}</Button>;
}
