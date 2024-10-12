import { DroppableDsl, DslType, FormDsl, FormFieldDsl, InputDsl } from './dsl'
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



export const DroppableDslSnippet = new DslSnippet({
  name: 'droppableDslSnippet',
  createDsl: () => new DroppableDsl()
})


export const InputDslSnippet = new DslSnippet({
  name: 'inputDslSnippet',
  createDsl: () => new InputDsl()
})


export const FormDslSnippet = new DslSnippet({
  name: 'formDslSnippet',
  createDsl: () => ({
    ... new FormDsl(), children: [new DroppableDsl()]
  })
})


export const FormFieldDslSnippet = new DslSnippet({
  name: 'formFieldDslSnippet',
  createDsl: () => ({
    ... new FormFieldDsl(), children: [new DroppableDsl()]
  })
})



