import { cn } from '@zc-ui/utils';
import { Parser, useDslStore } from '@zc-ui/goblin-core';
interface CanvasData extends React.HTMLAttributes<HTMLDivElement> {}
export function Canvas(props: CanvasData) {
  const { className } = props;

  const dsl = useDslStore((state) => state.dsl);

  return <div className={cn(className)}>{dsl ? Parser(dsl) : null}</div>;
}
