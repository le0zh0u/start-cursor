import { Category, CategoryCollection } from "@prisma/client";
import { RefetchOptions } from "@tanstack/react-query";
import { create } from "zustand";

interface AdminStoreState {
  slug: string;

  categoryCollectionList: CategoryCollection[];
  refetchCategoryList?: () => void;
}

interface AdminStoreAction {
  setSlug: (slug: string) => void;
  setCategoryCollectionList: (
    categoryCollectionList: CategoryCollection[],
  ) => void;
  setRefetchCategoryList: (refetchCategoryList: () => void) => void;
}

export const useAdminStore = create<AdminStoreState & AdminStoreAction>(
  (set, get) => ({
    slug: "",
    categoryCollectionList: [],
    refetchCategoryList: undefined,
    setSlug: (slug: string) => set((state) => ({ ...state, slug })),
    setCategoryCollectionList: (categoryCollectionList: CategoryCollection[]) =>
      set((state) => ({ ...state, categoryCollectionList })),
    setRefetchCategoryList: (refetchCategoryList: () => void) =>
      set((state) => ({ ...state, refetchCategoryList })),

    // bears: 0,
    // increasePopulation: () => set((state) => ({ bears: state.bears + 1 })),
    // removeAllBears: () => set({ bears: 0 }),
    // updateBears: (newBears) => set({ bears: newBears })
  }),
);
