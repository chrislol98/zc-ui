
import { uniqueId } from "@zc-ui/utils";
import { immerable } from 'immer'
export class Dsl {
  [immerable] = true;
  name: string;
  id: number | string = uniqueId();
  children?: DslType[]

  constructor(data: { name: string }) {
    const { name } = data;
    this.name = name;
  }

  static map = new Map<string, { parser: React.ComponentType<any>; dsl: TypeOfDslType }>();
  static add({ dsl, parser }: { parser: React.ComponentType<any>; dsl: TypeOfDslType }) {
    const { name } = new dsl();
    this.map.set(name, { dsl, parser })
  }

}

export class FormDsl extends Dsl {
  constructor() {
    super({ name: 'form' });
  }
}


export class DroppableDsl extends Dsl {
  constructor() {
    super({ name: 'droppable' });
  }
}

export class FormFieldDsl extends Dsl {
  field: string;
  constructor() {
    super({ name: 'formField' });
    this.field = uniqueId('name_');
  }
}
export class InputDsl extends Dsl {
  constructor() {
    super({ name: 'input' });
  }
}
export type TypeOfDslType =
  | typeof DroppableDsl
  | typeof FormDsl
  | typeof FormFieldDsl
  | typeof InputDsl;
export type DslType = DroppableDsl | FormDsl | FormFieldDsl | InputDsl;

// TODO 写在这里报错
// Dsl.add({ parser: Droppable, dsl: DroppableDsl });





