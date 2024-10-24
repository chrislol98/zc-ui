import { isArray, omit } from '@zc-ui/utils';
import { Dsl } from '../dsl';
import { dslMap } from '../map';

export function Parser(dsl: Dsl[] | Dsl): React.ReactNode | null {
  function parseChildren(children?: Dsl['children']) {
    if (!children) return null;
    return children.map((child) => Parser(child));
  }
  if (isArray(dsl)) {
    return dsl.map((dsl) => Parser(dsl));
  }
  const { name, children, id } = dsl;
  const config = dslMap.get(name);


  // 修改dsl后，外面可以拿到怎么弄
  // const dsl = useDslStore((state) => state.dsl);
  // const useDslStore = useContext(parser);
  // const {add} = useDslStore((state=> state.add))
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
