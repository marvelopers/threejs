import { create } from "zustand";

export const useStore = create<{
  isEntered: boolean;
  setIsEntered: (isEntered: boolean) => void;
}>((set) => ({
  isEntered: false,
  setIsEntered: (value) => set({ isEntered: value }),
}));
