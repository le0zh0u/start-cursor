import { Category, CategoryCollection } from "@prisma/client";
import { create } from "zustand";

interface RulesStoreState {
  count: number;
  // rule search
  searchCategoryIdList: number[];

  // category
  categoryList: Category[];
  categoryCollectionList: ({ categories: Category[] } & CategoryCollection)[];
}

interface RulesStoreAction {
  setCount: (count: number) => void;
  setSearchCategoryIdList: (categoryIdList: number[]) => void;
  setSearchCategoryIdListBySlug: (slug: string) => void;
  setCategoryCollectionList: (
    list: ({ categories: Category[] } & CategoryCollection)[],
  ) => void;
  getCategoryListByIds: (ids: number[]) => Category[];
}

export const useRulesStore = create<RulesStoreState & RulesStoreAction>(
  (set, get) => ({
    count: 0,
    searchCategoryIdList: [],
    categoryList: [],
    categoryCollectionList: [],
    setCount: (count: number) => set((state) => ({ ...state, count })),
    setSearchCategoryIdList: (categoryIdList: number[]) =>
      set((state) => ({ ...state, searchCategoryIdList: categoryIdList })),
    setSearchCategoryIdListBySlug: (slug: string) =>
      set((state) => ({
        ...state,
        searchCategoryIdList: [
          state.categoryList.find((c) => c.slug === slug)?.id ?? 0,
        ],
      })),

    setCategoryCollectionList: (
      list: ({ categories: Category[] } & CategoryCollection)[],
    ) => {
      const cList = list.reduce((acc, curr) => {
        acc.push(...curr.categories);
        return acc;
      }, [] as Category[]);
      set((state) => ({
        ...state,
        categoryCollectionList: list,
        categoryList: cList,
      }));
    },

    getCategoryListByIds: (ids: number[]) => {
      return get().categoryList.filter((category) => ids.includes(category.id));
    },

    // bears: 0,
    // increasePopulation: () => set((state) => ({ bears: state.bears + 1 })),
    // removeAllBears: () => set({ bears: 0 }),
    // updateBears: (newBears) => set({ bears: newBears })
  }),
);
