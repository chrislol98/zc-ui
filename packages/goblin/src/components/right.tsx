import { cn } from '@zc-ui/shared';
interface RightProps extends React.HTMLAttributes<Element> {}
export function Right(props: RightProps) {
  const { className } = props;
  return <div className={cn(className)}></div>;
}