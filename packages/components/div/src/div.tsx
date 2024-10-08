import { cn } from '@zc-ui/utils'
export function Div(props: DivProps) {
  const { children } = props;

  return (<div className= { cn('h-full bg-gray-200') } > { children } </div>);
}
export interface DivProps extends React.PropsWithChildren {

}