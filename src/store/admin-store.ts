import { Category, CategoryCollection } from "@prisma/client";
import { create } from "zustand";

interface AdminStoreState {
  slug: string;
}

interface AdminStoreAction {
  setSlug: (slug: string) => void;
}

export const useAdminStore = create<AdminStoreState & AdminStoreAction>(
  (set, get) => ({
    slug: "",
    setSlug: (slug: string) => set((state) => ({ ...state, slug })),

    // bears: 0,
    // increasePopulation: () => set((state) => ({ bears: state.bears + 1 })),
    // removeAllBears: () => set({ bears: 0 }),
    // updateBears: (newBears) => set({ bears: newBears })
  }),
);
