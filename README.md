# todo

## bug: @/src 报错找不到原因

## perf：register 卸载parse里面

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

# 组件

pagination todo
loading
rate
configProvider
popup
dialog

> notification
> select
> button

> input 待研究
> tree long https://github.com/brimdata/react-arborist
> form long react-hook-form
> table long tastack-table
