/**
 * Simplifies the display of a type (without modifying it).
 * Taken from https://effectivetypescript.com/2022/02/25/gentips-4-display/
 */
declare type Simplify<T> = T extends Function ? T : { [K in keyof T]: T[K] };



