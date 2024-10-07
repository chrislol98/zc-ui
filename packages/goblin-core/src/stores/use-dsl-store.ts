import { create } from 'zustand'
import { immer } from 'zustand/middleware/immer'
import { DslType, DivDslSnippet, } from 'goblin-core'
import { isArray } from '@zc-ui/shared'
type StateAction = {
  add: (data: { dsl: DslType[] | DslType; id: number | string }) => void
  find: (data: { id: number | string }) => DslType | undefined
  delete?: (dsl: DslType) => void
}
type State = {
  dsl: DslType[] | DslType
}
export const useDslStore = create<State & StateAction>()(immer((set, get) => ({
  dsl: DivDslSnippet.dsl,
  find: (data: { id: number | string }) => {
    const dsl = get().dsl;
    const findNode = (node: DslType): DslType | undefined => {
      if (node.id === data.id) {
        return node;
      }
      if (isArray(node.children)) {
        for (const child of node.children) {
          const found = findNode(child);
          if (found) {
            return found;
          }
        }
      }
      return undefined;
    };

    if (isArray(dsl)) {
      for (const snippet of dsl) {
        const found = findNode(snippet);
        if (found) {
          return found;
        }
      }
    } else {
      return findNode(dsl);
    }

    return undefined;
  },
  add: (data: { dsl: DslType[] | DslType; id: number | string }) => {
    set((state) => {
      const dsl = state.dsl;
      const { dsl: addDsl, id } = data;
      const find = get().find({ id })
      if (!find) return;
      if (!find.children) find.children = [];
      if (isArray(dsl)) {
        find.children.push(...dsl)
      } else {
        find.children.push(dsl)
      }
    });
  },
})))

