export const isFunction = (value: unknown): value is (this: any, ...args: any[]) => any => typeof value === 'function';
