import { cn } from '@zc-ui/utils';
import { BaseDsl } from './types';

export { Div } from '@zc-ui/div';
export class DivDsl extends BaseDsl {
  constructor() {
    super({ name: 'div' });
  }
}
