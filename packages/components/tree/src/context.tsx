import { createContext, useContext, useSyncExternalStore } from 'react';
import { TreeNodeManager } from './tree-node';

export const TreeNodeManagerContext = createContext<
  TreeNodeManager<any> | undefined
>(undefined);

export function useTreeNodeManager<T>() {
  const treeNodeManager = useContext<TreeNodeManager<T> | undefined>(
    TreeNodeManagerContext
  );
  if (!treeNodeManager) {
    throw new Error('no TreeNodeManagerContext.Provider provided');
  }
  return treeNodeManager;
}
