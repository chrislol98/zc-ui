import { useRef, useMemo } from 'react';
// fn 永远是最新的
// 但是 memoizedFnRef.current 引用永远不变，为了依赖造成的重渲染优化
type noop = (this: any, ...args: any[]) => any;
type PickFunction<T extends noop> = (this: ThisParameterType<T>, ...args: Parameters<T>) => ReturnType<T>;
export default function useMemoizedFn<T extends noop>(fn: T) {
  const fnRef = useRef(fn);
  fnRef.current = useMemo(() => fn, [fn]);

  const memoizedFnRef = useRef<PickFunction<T>>();
  if (!memoizedFnRef.current) {
    memoizedFnRef.current = function (this, ...args) {
      return fnRef.current.apply(this, args);
    };
  }

  return memoizedFnRef.current;
}
