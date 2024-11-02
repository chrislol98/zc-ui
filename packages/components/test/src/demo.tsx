import { isFunction } from 'lodash-es';
export function Demo() {
  console.log(isFunction('xzc'),isFunction, 'xzc');
  return <div className="flex bg-gray-500">Demo</div>;
}
