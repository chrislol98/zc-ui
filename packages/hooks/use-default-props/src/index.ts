import { useMemo } from 'react';

declare type Simplify<T> = T extends Function ? T : { [K in keyof T]: T[K] };
export type MergedProps<T extends Record<string, any>, A extends T> = Simplify<Omit<T, keyof A> & A>;

// export type MergedProps<T extends Record<string, any>, A extends T> =
// Pick<T, Exclude<keyof T, keyof A>> & A;

export function useDefaultProps<T extends Record<string, any>, A extends T>(
  originalProps: T,
  defaultProps: A,
) {
  return useMemo(() => {
    const props: MergedProps<T, A> = { ...originalProps };

    (Object.keys(defaultProps) as (keyof T)[]).forEach((key) => {
      if (props[key] === undefined) {
        props[key] = defaultProps[key];
      }
    });
    return props;
  }, [defaultProps, originalProps]);
}


