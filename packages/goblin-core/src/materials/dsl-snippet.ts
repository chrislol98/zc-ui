import { Div, DivDsl, Droppable, DroppableDsl, TypeOfDslType, DslType } from 'goblin-core/materials'

export class DslSnippet {
  name: string;
  createDsl: () => DslType[] | DslType
  constructor({ name, createDsl }: DslSnippet) {
    this.name = name
    this.createDsl = createDsl

  }

  static map = new Map<string, DslSnippet>();
  static add({ createDsl, name }: DslSnippet) {
    this.map.set(name, { createDsl, name })
  }
}

export const DivDslSnippet = new DslSnippet({
  name: 'divDslSnippet',
  createDsl: () => ({ ...new DivDsl(), children: [new DroppableDsl()] })
})
DslSnippet.add(DivDslSnippet)

export const DroppableDslSnippet = new DslSnippet({
  name: 'droppableDslSnippet',
  createDsl: () => new DroppableDsl()
})
DslSnippet.add(DroppableDslSnippet)

