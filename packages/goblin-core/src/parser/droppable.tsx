import {
  Droppable,
  DroppableProps,
  SortableContext,
  verticalListSortingStrategy,
} from '@zc-ui/dnd';
import { DroppableDsl } from '../dsl';

export interface DroppableParserProps extends React.PropsWithChildren {
  dsl: DroppableDsl;
}
export function DroppableParser(props: DroppableParserProps) {
  const { dsl, children } = props;
  const { children: dslChildren = [] } = dsl;
  const droppableProps: DroppableProps = { id: dsl.id };
  return (
    <Droppable {...droppableProps}>
      <SortableContext id={String(dsl.id)} items={dslChildren}>
        {children}
      </SortableContext>
    </Droppable>
  );
}
