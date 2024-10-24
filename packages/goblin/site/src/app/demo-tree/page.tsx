'use client';
import { Tree } from 'components/tree';
export default function Page() {
  const data = [{ id: 1, children: [{ id: 2 }, { id: 3 }] }, { id: 4 }];
  return <Tree data={data}></Tree>;
}
