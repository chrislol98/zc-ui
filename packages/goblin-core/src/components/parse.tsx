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

export function parse(data: DslType[] | DslType): React.ReactNode | null {
  function parseChildren(children?: DslType[] | DslType) {
    if (!children) return null;
    if (isArray(children)) {
      return children.map((child) => parse(child));
    }
    return parse(children);
  }
  if (isArray(data)) {
    return data.map((dsl) => parse(dsl));
  }
  const { name, children } = data;
  const config = BaseDsl.map.get(name);
  if (config?.parser) {
    return (
      <config.parser {...{ dsl: new config.dsl() }}>
        {parseChildren(children)}
      </config.parser>
    );
  }
  return null;
}
