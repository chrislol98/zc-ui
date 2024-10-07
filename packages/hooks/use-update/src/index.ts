import { useState, useCallback } from 'react';
export function useUpdate() {
  const [_, setState] = useState({});
  return useCallback(() => {
    setState({});
  }, []);
}
