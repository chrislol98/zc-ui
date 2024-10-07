import {
  Droppable as _Droppable,
  DroppableProps as _DroppableProps,
} from '@zc-ui/dnd';
import { BaseDsl } from 'goblin-core/materials/types';
function DroppableHoc(Compoent: typeof _Droppable) {
  return function Droppable(props: DroppableProps) {
    const { dsl, children } = props;
    const _droppableProps: _DroppableProps = { id: dsl.id };
    return <Compoent {..._droppableProps}>{children}</Compoent>;
  };
}

export const Droppable = DroppableHoc(_Droppable);
export interface DroppableProps extends React.PropsWithChildren {
  dsl: DroppableDsl;
}
export class DroppableDsl extends BaseDsl {
  constructor() {
    super({ name: 'droppable' });
  }
}
