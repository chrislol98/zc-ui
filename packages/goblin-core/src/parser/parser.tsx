import { isArray } from '@zc-ui/utils';
import { Dsl } from '../dsl';
import { dslMap } from '../map';
import { useSyncExternalStore } from 'react';
export interface ParserProps {
  dsl: Dsl;
}
export function Parser(parserProps: ParserProps): React.ReactNode | null {
  const { dsl } = parserProps;

  return render();
  function render() {
    function parseChildren(children?: Dsl['children']) {
      if (!children) return null;
      return children.map((child) => Parser(child));
    }
    if (isArray(dsl)) {
      return dsl.map((dsl) => Parser(dsl));
    }
    const { name, children, id } = dsl;
    const config = dslMap.get(name);

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
}
