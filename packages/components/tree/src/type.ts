export type TreeId = string | number;
export type GetId<T> = (record: T) => TreeId;
export type GetChildren<T> = (record: T) => T[];