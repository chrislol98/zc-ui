import { useMemo } from 'react';

export type MergedProps<T extends Record<string, any>, A extends T> = Omit<T, keyof A> & A;
// export type MergedProps<T extends Record<string, any>, A extends T> =
// Pick<T, Exclude<keyof T, keyof A>> & A;

export default function useDefaultProps<T extends Record<PropertyKey, any>, A extends T>(
  originalProps: T,
  defaultProps: A,
) {
  return useMemo(() => {
    const props: MergedProps<T, A> = { ...originalProps };

    (Object.keys(originalProps) as (keyof T)[]).forEach((key) => {
      if (props[key] === undefined) {
        props[key] = defaultProps[key];
      }
    });

    return props;
  }, [defaultProps, originalProps]);
}


