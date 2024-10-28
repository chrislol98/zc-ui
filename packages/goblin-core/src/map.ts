import type { DslName, Dsl, TypeofSpecificDsl } from './dsl'
import { FormDsl, FormFieldDsl, InputDsl, DroppableDsl } from './dsl'
import { FormParser, FormFieldParser, InputParser, DroppableParser } from './parser'
import { Schema } from './utils';
export const dslMap = new Map<DslName, { dsl: TypeofSpecificDsl; parser: React.ComponentType<any>; configureSchema?: Schema }>();


dslMap.set(FormDsl.$$name, { dsl: FormDsl, parser: FormParser });
dslMap.set(FormFieldDsl.$$name, { dsl: FormFieldDsl, parser: FormFieldParser });
dslMap.set(InputDsl.$$name, { dsl: InputDsl, parser: InputParser });
dslMap.set(DroppableDsl.$$name, { dsl: DroppableDsl, parser: DroppableParser });



export const snippetMap = new Map<string, { schema: Schema }>();
snippetMap.set('droppable', { schema: { name: 'droppable' } });
snippetMap.set('input', { schema: { name: "input" } });
snippetMap.set('form', { schema: { name: "form", children: [{ name: 'droppable' }] } });
snippetMap.set('formField', { schema: { name: "formField", children: [{ name: 'droppable' }] } });

