import { isArray, omit } from '@zc-ui/utils';
import { Dsl, DslType } from './dsl';
export function Parser(dsl: DslType[] | DslType): React.ReactNode | null {
  function parseChildren(children?: DslType['children']) {
    if (!children) return null;
    return children.map((child) => Parser(child));
  }
  if (isArray(dsl)) {
    return dsl.map((dsl) => Parser(dsl));
  }
  const { name, children, id } = dsl;
  const config = Dsl.map.get(name);
  if (config?.parser) {
    const parserProps = { dsl };
    return (
      <config.parser key={id} {...parserProps}>
        {parseChildren(children)}
      </config.parser>
    );
  }
  return null;
}
