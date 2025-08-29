import { create } from "zustand";

type Store = {
  count: number;
};

type TActions = {
  inc: () => void;
};

const useCounter = create<Store & TActions>()((set) => ({
  count: 1,
  inc: () => set((state) => ({ count: state.count + 1 })),
}));

export default useCounter;
