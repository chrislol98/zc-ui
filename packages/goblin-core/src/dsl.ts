import { uniqueId } from "@zc-ui/utils";
import { immerable } from 'immer'
import { createContext } from "react";
export type DslId = number | string
export type DslName = 'form' | "formField" | 'input' | 'droppable'

export class Dsl<T extends DslName = DslName> {
  [immerable] = true;
  name: T;
  id: DslId
  children?: Dsl[]

  constructor(data: { name: T }) {
    const { name } = data;
    this.id = uniqueId();
    this.name = name;
  }

}
export class FormDsl extends Dsl<'form'> {
  static $$name = 'form' as const

  constructor() {
    super({ name: FormDsl.$$name })
  }
}

export class FormFieldDsl extends Dsl<'formField'> {
  static $$name = 'formField' as const
  field: string;
  constructor() {
    super({ name: FormFieldDsl.$$name });
    this.field = uniqueId('name_');
  }
}
export class InputDsl extends Dsl<'input'> {
  static $$name = 'input' as const
  constructor() {
    super({ name: InputDsl.$$name });
  }
}


export class DroppableDsl extends Dsl<'droppable'> {
  static $$name = 'droppable' as const
  constructor() {
    super({ name: DroppableDsl.$$name });
  }
}


export type SpecificDsl = FormDsl | FormFieldDsl | InputDsl | DroppableDsl
export type TypeofSpecificDsl = typeof FormDsl | typeof FormFieldDsl | typeof InputDsl | typeof DroppableDsl

export class DslManager {
  dslMap = new Map<DslId, Dsl>();
  dsl?: Dsl;
  find = (id: DslId) => {
    return this.dslMap.get(id)
  }
  add = (data: { dsl: Dsl, parentId: DslId }) => {
    const { dsl, parentId } = data;
    const parent = this.dslMap.get(parentId);
    if (parent) {
      parent.children = parent.children || [];
      parent.children.push(dsl);
    }
  }

}



export const DslManagerContext = createContext({})


