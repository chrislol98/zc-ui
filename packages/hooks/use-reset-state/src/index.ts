import { useRef, useState } from 'react';
import useMemoizedFn from '@zc-ui/use-memoized-fn';

export default function useResetState<S>(initialState: S) {
  const initialStateRef = useRef(initialState);
  const [state, setState] = useState(initialState);

  const resetState = useMemoizedFn(() => {
    setState(initialStateRef.current);
  });
  return [state, setState, resetState] as const;
}
