import { Div, DivDsl, Droppable, DroppableDsl } from "./index";
import { uniqueId } from "@zc-ui/utils";
export class BaseDsl {
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
export type TypeOfDslType = typeof DivDsl | typeof DroppableDsl
export type DslType = DivDsl | DroppableDsl


// TODO 写在这里报错
// BaseDsl.add({ parser: Div, dsl: DivDsl });
// BaseDsl.add({ parser: Droppable, dsl: DroppableDsl });





