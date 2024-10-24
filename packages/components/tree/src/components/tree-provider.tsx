import type { GetId, GetChildren } from '../type';
import { useState } from 'react';
import { TreeNodeManager } from '../tree-node';
import { TreeNodeManagerContext } from '../context';

interface TreeConfigProps<T> extends React.PropsWithChildren {
  data: T[];
  getId: GetId<T>;
  getChildren: GetChildren<T>;
}

export function TreeConfig<T>(props: TreeConfigProps<T>) {
  const { getId, getChildren, data, children } = props;
  const [treeNodeManager, _] = useState(() => {
    const treeNodeManager = new TreeNodeManager<T>();
    treeNodeManager.init(data, { getId, getChildren });
    return treeNodeManager;
  });

  return (
    <TreeNodeManagerContext.Provider value={treeNodeManager}>
      {children}
    </TreeNodeManagerContext.Provider>
  );
}
