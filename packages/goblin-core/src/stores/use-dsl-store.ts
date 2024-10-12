import { create } from 'zustand'
import { immer } from 'zustand/middleware/immer'
import { DslType } from '../dsls/dsl'
import { DroppableDslSnippet } from '../dsls/dsl-snippet'
import { isArray } from '@zc-ui/utils'
type StateAction = {
  add: (data: { dsl: DslType[] | DslType; id?: number | string }) => void
  swap: (dsl: DslType, lIndex: number, RIndex: number) => void
  find: (data: { dsl: DslType[] | DslType; id?: number | string }) => DslType | undefined
  delete?: (dsl: DslType) => void
}
type State = {
  dsl: DslType[] | DslType
}
export const useDslStore = create<State & StateAction>()(immer((set, get) => ({
  dsl: DroppableDslSnippet.createDsl(),
  swap: (dsl, lIndex, rIndex) => {
    set(state => {
      const find = get().find({ dsl: state.dsl, id: dsl.id })
      if (find?.children) {
        const children = find.children;
        [children[lIndex], children[rIndex]] = [children[rIndex], children[lIndex]]
      }
    })
  },
  find: (data) => {
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
  add: (data) => {
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
    });
  },
})))

