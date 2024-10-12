export class TreeNode {
  rawData?: {}
  id: TreeId;
  parentId: TreeId 
  constructor({ id }: { id: TreeId }) {
    this.id = id;
  }
}

export type TreeId = string | number | undefined


