import { create } from 'zustand'
import { immer } from 'zustand/middleware/immer'
import { DslType, DivDslSnippet, } from 'goblin-core'
import { isArray } from '@zc-ui/shared'
type StateAction = {
  add: (data: { dsl: DslType[] | DslType; id?: number | string }) => void
  find: (data: { dsl: DslType[] | DslType; id?: number | string }) => DslType | undefined
  delete?: (dsl: DslType) => void
}
type State = {
  dsl: DslType[] | DslType
}
export const useDslStore = create<State & StateAction>()(immer((set, get) => ({
  dsl: DivDslSnippet.createDsl(),
  find: (data: { dsl: DslType[] | DslType; id?: number | string }) => {
    const { id, dsl } = data;
    let res: DslType | undefined = undefined;
    if (isArray(dsl)) {
      dsl.forEach(findImpl);
    } else {
      findImpl(dsl);
    }
    return res;
    function findImpl(dsl: DslType) {
      if (dsl.id === id) {
        res = dsl;
        return
      }
      if (!dsl.children) return undefined;
      dsl.children.forEach(findImpl)
    }
  },
  add: (data: { dsl: DslType[] | DslType; id?: number | string }) => {
    set((state) => {
      const { dsl } = state;
      const { dsl: addDsl, id } = data;

      const find = get().find({ dsl, id })

      if (!find) return;
      if (!find.children) find.children = [];
      if (isArray(addDsl)) {
        find.children.push(...addDsl)
      } else {
        find.children.push(addDsl)
      }
      // TODO immer 无效 需要修复
      state.dsl = { ...dsl }
    });
  },
})))

