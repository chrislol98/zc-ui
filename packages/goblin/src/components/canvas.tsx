import { cn } from '@zc-ui/utils';
import type { DslType } from '@zc-ui/goblin-core';
import { Parser } from '@zc-ui/goblin-core';
interface CanvasData extends React.HTMLAttributes<HTMLDivElement> {
  data?: DslType[] | DslType;
}
export function Canvas(props: CanvasData) {
  const { className, data } = props;

  const parseNode = data ? Parser(data) : null;
  
  return <div className={cn(className)}>{parseNode}</div>;
}
