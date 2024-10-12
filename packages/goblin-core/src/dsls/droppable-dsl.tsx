'use client';
import {
  Droppable,
  DroppableProps,
  SortableContext,
  DndContext,
  useDndMonitor,
  UniqueIdentifier,
  DragOverlay,
  restrictToParentElement,
  verticalListSortingStrategy,
} from '@zc-ui/dnd';
import { useState } from 'react';
import { DroppableDsl, DslType } from './dsl';
import { DslSnippet } from './dsl-snippet';
import { useDslStore } from '../stores';
export interface DroppableParserProps extends React.PropsWithChildren {
  dsl: DroppableDsl;
}
export function DroppableParser(props: DroppableParserProps) {
  const { dsl, children } = props;
  const droppableProps: DroppableProps = { id: dsl.id };
  return (
    <Droppable {...droppableProps}>
      <Children dsl={dsl}>{children}</Children>
    </Droppable>
  );
}

function Children(props: React.PropsWithChildren<{ dsl: DslType }>) {
  const { dsl, children } = props;
  const { children: dslChildren = [] } = dsl;
  const swap = useDslStore((state) => state.swap);

  useDndMonitor({
    onDragStart(event) {},
    onDragMove(event) {},
    onDragOver(event) {},
    onDragEnd(event) {
      if (!dsl.children) return;
      const { active, over } = event;
      if (!over) return;
      if (active.id !== over.id) {
        const lFind = dsl.children.findIndex(
          (record) => record.id === active.id
        );
        const rFind = dsl.children.findIndex((record) => record.id === over.id);
        if (lFind !== -1 && rFind !== -1) swap(dsl, lFind, rFind);
      }
    },
    onDragCancel(event) {},
  });
  return (
    <SortableContext items={dslChildren} strategy={verticalListSortingStrategy}>
      {children}
    </SortableContext>
  );
}
