import { forwardRef } from 'React'
type G = Simplify<{a: 1}>
type H = GG
const Input = forwardRef((props, ref: React.ForwardedRef<Element>) => {
  return <div></div>
})