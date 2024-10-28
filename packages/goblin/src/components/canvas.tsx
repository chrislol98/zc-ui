import { cn } from '@zc-ui/utils';
import { Parser, useDslStore, dslMap, createDsl } from '@zc-ui/goblin-core';
interface CanvasData extends React.HTMLAttributes<HTMLDivElement> {}
export function Canvas(props: CanvasData) {
  const { className } = props;

  const dsl = createDsl({ name: 'droppable' }, { map: dslMap });

  return (
    <div className={cn(className)}>
      <Parser dsl={dsl} />
    </div>
  );
}
