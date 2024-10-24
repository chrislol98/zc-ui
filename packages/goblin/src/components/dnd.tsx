import { useDndMonitor } from '@zc-ui/dnd';
import {
  DndContext,
  useSensors,
  useSensor,
  PointerSensor,
  MouseSensor,
  KeyboardSensor,
  sortableKeyboardCoordinates,
} from '@zc-ui/dnd';
import { useDslStore, createDsl, Dsl, dslMap, Schema } from 'goblin-core';

export interface DndProps extends React.PropsWithChildren {}
export function Dnd(props: DndProps) {
  const { children } = props;
  const add = useDslStore((state) => state.add);
  const insert = useDslStore((state) => state.insert);
  const swap = useDslStore((state) => state.swap);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        delay: 100,
        tolerance: 5,
      },
    })
  );

  return (
    <DndContext
      id="zc-ui"
      sensors={sensors}
      onDragOver={({ active, over }) => {
        // console.log(active, over, 'over......');
        // console.log(active.rect.current.translated, 'over....')
      }}
      onDragEnd={({ active, over }) => {
        console.log(active, over, 'END......');
        // 1 active
        const activeCurrent = active.data.current;
        const activeObj: { dsl?: Dsl; sortable: any } = {
          dsl: undefined,
          sortable: undefined,
        };
        // 1.1 dslSnippet
        if (activeCurrent?.sortable) {
          activeObj.sortable = activeCurrent.sortable;
        } else {
          activeObj.dsl = createDsl(activeCurrent as Schema, { map: dslMap });
        }

        // 2 over
        const overDataCurrentSortable = over?.data.current?.sortable;
        if (overDataCurrentSortable) {
          // 2.1 sortable
          const isBelowOverItem =
            over &&
            active.rect.current.translated &&
            active.rect.current.translated.top >
              over.rect.top + over.rect.height;
          const modifier = isBelowOverItem ? 1 : 0;
          if (activeObj.dsl) {
            insert({
              id: overDataCurrentSortable.containerId,
              index: overDataCurrentSortable.index + modifier + 1,
              dsl: activeObj.dsl,
            });
          } else if (activeObj.sortable) {
            const activeSortable = activeObj.sortable;
            if (
              activeSortable.containerId === overDataCurrentSortable.containerId
            ) {
              swap(
                overDataCurrentSortable.containerId,
                activeSortable.index,
                overDataCurrentSortable.index
              );
            } else {
            }
          }
        } else {
          // 2.2 draggable
          activeObj.dsl && add({ dsl: activeObj.dsl, id: over?.id });
        }
      }}
    >
      {children}
    </DndContext>
  );
}
