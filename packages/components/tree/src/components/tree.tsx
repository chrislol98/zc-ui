'use client';
import { useContext, useSyncExternalStore } from 'react';
import type { GetChildren, GetId } from '../type';
import { TreeConfig } from './tree-provider';
import { FixedSizeList } from 'react-window';
import { TreeNodeManagerContext, useTreeNodeManager } from '../context';
import { Checkbox } from '@zc-ui/checkbox';
export interface TreeProps<T> {
  data: T[];
  getId?: GetId<T>;
  getChildren?: GetChildren<T>;
}
export function Tree<T>(props: TreeProps<T>) {
  const {
    data,
    getId = (record: any) => record.id,
    getChildren = (record: any) => record.children,
  } = props;
  return (
    <TreeConfig<T> data={data} getId={getId} getChildren={getChildren}>
      <TreeImpl<T> />
    </TreeConfig>
  );
}

export function TreeImpl<T>() {
  const treeNodeManager = useTreeNodeManager<T>();
  const flattenData = useSyncExternalStore(
    treeNodeManager?.subscribe,
    () => treeNodeManager.flattenData,
    () => treeNodeManager.flattenData
  );

  function render() {
    if (!flattenData) return null;
    return (
      <FixedSizeList
        itemCount={flattenData.length}
        height={100}
        width={2000}
        itemSize={20}
      >
        {Row}
      </FixedSizeList>
    );
  }
  return render();
}

export function Row<T>(props: { index: number; style: React.CSSProperties }) {
  const { index, style } = props;
  const treeNodeManager = useTreeNodeManager<T>();

  const record = useSyncExternalStore(
    treeNodeManager?.subscribe,
    () => treeNodeManager.flattenData?.[index],
    () => treeNodeManager.flattenData?.[index]
  );
  function render() {
    if (!record) return null;
    return (
      <div style={style}>
        <input
          type="checkbox"
          checked={record.selected}
          onChange={(e) => {
            treeNodeManager.edit(record, { selected: e.target.checked });
          }}
        />
        {JSON.stringify(
          record,
          function removeCircularReferences(key: string, value: any) {
            if (key === 'parent') {
              return undefined; // 跳过 `parent` 字段
            }
            return value;
          }
        )}
      </div>
    );
  }
  return render();
}
