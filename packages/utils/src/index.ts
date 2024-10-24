/**
 * lodash
 * */
export * from 'lodash-es'
export const isFunction = (value: unknown): value is (this: any, ...args: any[]) => any => typeof value === 'function';

/**
 * shadcn
 * */
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * ahooks
 */

export * from 'ahooks'






