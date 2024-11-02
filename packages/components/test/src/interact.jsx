import React, {
  useEffect,
  useImperativeHandle,
  forwardRef,
  useRef,
} from 'react';
import { Button } from '@zc-ui/button';
import { observable, autorun } from '@formily/reactive';
const refMap = new Map();

function useEvent(props, options) {
  const { domRef } = options;
  const { events } = props;
  useEffect(() => {
    events
      .filter((event) => event.type === 'native')
      .forEach((event) => {
        const { componentId, method } = event;
        const dom = refMap.get(componentId).dom;
        if (dom) {
          const handler = dom[method];
          if (typeof handler === 'function') {
            domRef.current.addEventListener(event.name, handler);
          }
        }
      });
  });
}
function useInteract(data) {
  const interact = data[1].interact;
  useEffect(() => {
    autorun(() => {
      interact.forEach((item) => {
        const { componentId, exec, method } = item;
        const handler = refMap.get(componentId)?.[method];
        const execFn = new Function('data', `return ${exec}`);
        if (execFn(data[0])) {
          handler();
        }
      });
    });
  });
}
export function Interact() {
  const data = observable([
    {
      id: 'A',
      count: 1,
      events: [
        {
          type: 'native',
          name: 'click',
          componentId: 'B',
          method: 'BHandler',
        },
      ],
    },
    {
      id: 'B',
      interact: [
        {
          componentId: 'A',
          exec: 'data.count',
          method: 'AHandler',
        },
        { target: ['A', 'B'], exec: '', method: 'BHandler' },
      ],
    },
  ]);
  useInteract(data);

  // useEffect(() => {
  //   const data = observable([
  //     {
  //       id: 'A',
  //       isClick: false,
  //       events: [
  //         {
  //           type: 'native',
  //           name: 'click',
  //           componentId: 'B',
  //           method: 'BHandler',
  //         },
  //       ],
  //     },
  //     {
  //       id: 'B',
  //       interact: [
  //         {
  //           componentId: 'A',
  //           exec: 'typeof data.isClick === "boolean"',
  //           method: 'AHandler',
  //         },
  //         { target: ['A', 'B'], exec: '', method: 'BHandler' },
  //       ],
  //     },
  //   ]);
  //   autorun(() => {
  //     console.log(data[0].isClick);
  //   });
  //   const id = setInterval(() => {
  //     data[0].isClick = !data[0].isClick;
  //   }, 1000);
  //   return () => clearInterval(id);
  // });

  return (
    <div>
      <Button
        onClick={() => {
          data[0].count++;
        }}
      >
        测试autoRun
      </Button>
      <AParser {...data[0]} ref={(ref) => refMap.set('A', ref)} />
      <BParser {...data[1]} ref={(ref) => refMap.set('B', ref)} />
    </div>
  );
}

const AParser = forwardRef((props, ref) => {
  const domRef = useRef();
  useEvent(props, {
    domRef: domRef,
  });

  useImperativeHandle(ref, () => ({
    dom: domRef.current,
    AHandler: () => {
      console.log('AHandler is called');
    },
  }));

  return <Button ref={domRef}>component A</Button>;
});

const BParser = forwardRef((props, ref) => {
  const domRef = useRef();
  useImperativeHandle(ref, () => ({
    dom: domRef.current,
  }));
  return <B ref={domRef}></B>;
});

const B = forwardRef((props, ref) => {
  useImperativeHandle(ref, () => ({
    BHandler: () => {
      console.log('BHandler is called');
    },
  }));
  return <div>Component B</div>;
});
