import { cn } from '@zc-ui/shared';
import { cloneElement } from 'react';
import { Droppable, DroppableDsl } from './droppable';
import { BaseDsl, DslType } from './types';

export function Div(props: React.PropsWithChildren<{}>) {
  const { children } = props;

  return <div className={cn('h-full bg-gray-200')}>{children}</div>;
}

export class DivDsl extends BaseDsl {
  constructor() {
    super({ name: 'div' });
  }
}
