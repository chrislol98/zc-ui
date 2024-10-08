import { cn } from '@zc-ui/utils';
interface RightProps extends React.HTMLAttributes<Element> {}
export function Right(props: RightProps) {
  const { className } = props;
  return <div className={cn(className)}></div>;
}
