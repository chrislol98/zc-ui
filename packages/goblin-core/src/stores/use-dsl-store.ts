import { create } from 'zustand'
import { immer } from 'zustand/middleware/immer'
import { Dsl } from '../dsl'
import { dslMap } from '../map'
import { createDsl, Schema } from '../utils'
import { isArray } from '@zc-ui/utils'


type StateAction = {
  add: (data: { dsl: Dsl[] | Dsl; id?: number | string }) => void
  insert: (data: { dsl: Dsl; index: number; id: number | string }) => void
  swap: (id: number | string, lIndex: number, RIndex: number) => void
  find: (data: { dsl: Dsl[] | Dsl; id?: number | string }) => Dsl | undefined
  findByName: (data: { id: number | string, name: string; depth?: number }) => void
  delete?: (dsl: Dsl) => void
}

type State = {
  dsl: Dsl[] | Dsl
}

export const useDslStore = create<State & StateAction>()(immer((set, get) => ({
  dsl: createDsl({ name: 'droppable' }, { map: dslMap }),
  findByName: (data) => {
    const dsl = get().dsl;
    const { depth = 1, name, id } = data;
    const parentDsl = get().find({ id, dsl })
    const res: Dsl[] = [];
    parentDsl && findImpl(parentDsl, depth)
    return res;

    function findImpl(dsl: Dsl, depth: number) {
      if (!depth) return;
      if (dsl.name === name) {
        res.push(dsl);
        dsl.children && dsl.children.forEach(item => findImpl(item, depth - 1))
        return;
      }

      dsl.children && dsl.children.forEach(item => findImpl(item, depth))
    }
  },
  find: (data) => {
    let { id, dsl } = data;

    let ret: Dsl | undefined = undefined;
    if (isArray(dsl)) {
      dsl.forEach(findImpl);
    } else {
      findImpl(dsl);
    }
    return ret;

    function findImpl(dsl: Dsl) {
      if (dsl.id === id) {
        ret = dsl;
        return;
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
  insert: (data) => {
    set(state => {
      const { dsl } = state;
      const { dsl: dslData, index, id } = data;
      const find = get().find({ dsl, id })
      if (!find) return;
      if (!find.children) find.children = [];
      find.children.splice(index, 0, dslData)
    })
  },
  swap: (id, lIndex, rIndex) => {
    set(state => {
      const find = get().find({ dsl: state.dsl, id: id })

      if (find?.children) {
        const children: Dsl[] = [...find.children];
        [children[lIndex], children[rIndex]] = [children[rIndex], children[lIndex]]
        find.children = children;
      }
    })
  },
})))

