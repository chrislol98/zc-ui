import { Div, DivDsl, Droppable, DroppableDsl, TypeOfDslType, DslType } from 'goblin-core/materials'

export class DslSnippet {
  name: string;
  dsl: DslType[] | DslType;

  constructor({ name, dsl }: DslSnippet) {
    this.name = name
    this.dsl = dsl

  }

  static map = new Map<string, DslSnippet>();
  static add({ dsl, name }: DslSnippet) {
    this.map.set(name, { dsl, name })
  }
}

export const DivDslSnippet = new DslSnippet({
  name: 'divDslSnippet',
  dsl: { ...new DivDsl(), children: [new DroppableDsl()] }
})

DslSnippet.add(DivDslSnippet)


