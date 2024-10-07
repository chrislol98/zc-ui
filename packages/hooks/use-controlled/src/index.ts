import upperFirst from 'lodash/upperFirst';
import { SetStateAction, useMemo, useRef } from 'react';
import { useMemoizedFn } from '@zc-ui/use-memoized-fn';
import { isFunction } from '@zc-ui/shared';
import { useUpdate } from '@zc-ui/use-update';

function keyToDefaultKey<T extends string>(key: T) {
  const upperCase = upperFirst(key) as Capitalize<T>;
  return `default${upperCase}` as const;
}

type DefaultKey<K extends string> = `default${Capitalize<K>}`;

export default function useControlled<
  V extends P[K],
  P extends { [key in K]?: V } & { [key in DefaultKey<K>]?: V } & { [key: string]: any },
  K extends string,
>(props: P, options: { key?: K; trigger?: string } & { [key in DefaultKey<K>]?: V }) {
  const { key = 'value' as K, trigger = 'onChange' } = options;
  const isControlled = Reflect.has(props, key);
  const value: V = props[key];
  const update = useUpdate();
  const initialValue = useMemo(() => {
    if (isControlled) {
      return props[key] as V;
    }
    const defaultKey = keyToDefaultKey(key);

    if (Object.prototype.hasOwnProperty.call(props, defaultKey)) {
      return props[defaultKey] as V;
    }
    return options[defaultKey] as V;
  }, [isControlled, key, options, props]);

  const stateRef = useRef(initialValue);
  if (isControlled) {
    stateRef.current = value;
  }
  function setState(v: SetStateAction<V>, ...args: any[]) {
    const r = isFunction(v) ? v(stateRef.current) : v;
    if (!isControlled) {
      stateRef.current = r;
      update();
    }

    if (props[trigger]) {
      props[trigger](r, ...args);
    }
  }
  return [stateRef.current, useMemoizedFn(setState)] as const;
}
