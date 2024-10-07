import { isArray, omit } from '@zc-ui/shared';
import {
  BaseDsl,
  DslType,
  Div,
  Droppable,
  DivDsl,
  DroppableDsl,
} from 'goblin-core/materials';

BaseDsl.add({ parser: Div, dsl: DivDsl });
BaseDsl.add({ parser: Droppable, dsl: DroppableDsl });

export function parse(dsl: DslType[] | DslType): React.ReactNode | null {
  function parseChildren(children?: DslType[] | DslType) {
    if (!children) return null;
    if (isArray(children)) {
      return children.map((child) => parse(child));
    }
    return parse(children);
  }
  if (isArray(dsl)) {
    return dsl.map((dsl) => parse(dsl));
  }
  const { name, children } = dsl;
  const config = BaseDsl.map.get(name);
  if (config?.parser) {
    const parserProps = { dsl };
    return (
      <config.parser {...parserProps}>{parseChildren(children)}</config.parser>
    );
  }
  return null;
}
