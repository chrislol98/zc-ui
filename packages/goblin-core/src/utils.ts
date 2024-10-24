import { DslName, } from "./dsl";
import { dslMap } from "./map";

export type Schema = {
  name: DslName
  children?: Schema[]
}

export function createDsl(schema: Schema, options: { map: typeof dslMap }) {
  const { name, children } = schema;
  const { map } = options
  const Dsl = map.get(name)?.dsl;
  console.log(map, 'map')
  if (!Dsl) throw new Error(`map does not have ${name} dsl`);
  const instance = new Dsl();
  !instance.children && (instance.children = [])
  if (children) {
    instance.children.push(...children.map(c => createDsl(c, options)))
  }
  return instance;
}
