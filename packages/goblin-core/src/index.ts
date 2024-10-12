// 1. 先导入所需的模块
import { Dsl, DroppableParser, DroppableDsl, FormFieldParser, FormFieldDsl, FormParser, FormDsl, InputParser, InputDsl } from 'goblin-core/dsls';
import { DslSnippet, InputDslSnippet, DroppableDslSnippet, FormDslSnippet, FormFieldDslSnippet } from 'goblin-core/dsls';

Dsl.add({ parser: DroppableParser, dsl: DroppableDsl });
Dsl.add({ parser: FormFieldParser, dsl: FormFieldDsl });
Dsl.add({ parser: FormParser, dsl: FormDsl });
Dsl.add({ parser: InputParser, dsl: InputDsl });

DslSnippet.add(InputDslSnippet)
DslSnippet.add(DroppableDslSnippet)
DslSnippet.add(FormDslSnippet)
DslSnippet.add(FormFieldDslSnippet)

export * from 'goblin-core/stores'
export * from 'goblin-core/dsls'
