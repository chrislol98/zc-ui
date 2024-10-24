import type { TreeId, GetChildren, GetId } from './type';

class TreeNode<T> {
  data: T;
  id: TreeId;
  checked: boolean;
  indeterminate?: boolean;
  depth: number;
  children?: TreeNode<T>[];
  parent?: TreeNode<T>;
  constructor(data: {
    data: T;
    id: TreeId;
    checked: boolean;
    depth: number;
    parent?: TreeNode<T>;
  }) {
    this.id = data.id;
    this.data = data.data;
    this.checked = data.checked;
    this.depth = data.depth;
    this.parent = data.parent;
  }
}

export class TreeNodeManager<T> {
  data?: TreeNode<T>[];
  listeners: (() => void)[] = [];
  flattenData: TreeNode<T>[] = [];
  getChildren?: GetChildren<any>;
  getId?: GetId<any>;
  private createProxy = (data: TreeNode<T>[]) => {
    return new Proxy(data, {
      set: (target, property, value) => {
        target[property as any] = value;
        this.notifyListeners();
        return true;
      },
    });
  };

  notifyListeners = () => {
    this.listeners.forEach((listener) => listener());
  };
  subscribe = (listener: () => void) => {
    this.listeners.push(listener);
    return () => {
      let index = this.listeners.indexOf(listener);
      this.listeners.splice(index, 1);
    };
  };

  init(
    data: T[],
    options: {
      getId: GetId<any>;
      getChildren: GetChildren<any>;
    }
  ) {
    this.getChildren = options.getChildren;
    this.getId = options.getId;
    this.data = this.build(data);
    console.log(this.data, 'this.data');
    this.flattenData = this.createProxy(this.flatten(this.data));
  }
  build(data: T[]) {
    const buildImpl = (
      data: T[],
      options: { parent?: TreeNode<T>; depth?: number }
    ) => {
      const { parent, depth = 0 } = options;
      return data.map((record) => {
        const id = this.getId?.(record);
        if (id === undefined) throw new Error('id is required');
        const treeNode = new TreeNode({
          data: record,
          id,
          depth,
          checked: false,
          parent,
        });

        const children = this.getChildren?.(record);
        if (children && children.length) {
          treeNode.children = buildImpl(children, {
            parent: treeNode,
            depth: depth + 1,
          });
        }
        return treeNode;
      });
    };
    return buildImpl(data, { depth: 0 });
  }

  flatten(data: TreeNode<T>[]) {
    const flattenData: TreeNode<T>[] = [];
    impl(data);
    return flattenData;
    function impl(data: TreeNode<T>[]) {
      data.forEach((record) => {
        flattenData.push(record);
        if (record.children && record.children.length) {
          impl(record.children);
        }
      });
    }
  }
  edit = (
    data: TreeNode<T>,
    options: {
      checked?: boolean;
      indeterminate?: boolean;
    }
  ) => {
    const { checked, indeterminate } = options;
    const find = this.flattenData.find(
      (record) => this.getId?.(record) === this.getId?.(data)
    );
    if (find) {
      typeof checked === 'boolean' && (find.checked = checked);
      typeof indeterminate === 'boolean' &&
        (find.indeterminate = indeterminate);
      this.flattenData[this.flattenData.indexOf(find)] = { ...find };
      this.checkIndeterminate(data);
    }
  };
  checkIndeterminate = (data: TreeNode<T>) => {
    const parent = data.parent;
    if (!parent) return;
    const children = parent.children;
    if (!children) return;
    const indeterminate =
      children.some((record) => record.checked) &&
      children.some((record) => !record.checked);
    indeterminate && this.edit(data, { indeterminate });
  };
}
