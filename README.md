# todo

## bug: 【goblin-core 循环依赖】  【register 模块里面要执行的逻辑放在哪里最合理】
##

```ts
// ts 不会报错，但是代码运行错误
function x(a: number | []) {
  const b = a as [];
  return b;
}

const g = x(11);
g.forEach(() => {
  console.log(222);
});

//
function xxx<T>(a: number) {
  const c = a as T;
  return c;
}

const g = xxx<boolean>(2);
```



