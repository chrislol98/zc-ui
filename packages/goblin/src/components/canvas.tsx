import { cn } from '@zc-ui/shared';
import type { DslType } from '@zc-ui/goblin-core';
import { parse } from '@zc-ui/goblin-core';
interface CanvasData extends React.HTMLAttributes<HTMLDivElement> {
  data?: DslType[] | DslType;
}
export function Canvas(props: CanvasData) {
  const { className, data } = props;

  const parseNode = data ? parse(data) : null;
  
  return <div className={cn(className)}>{parseNode}</div>;
}
