"use client";

import { useDebounce } from "@/hooks/use-debounce";
import { api } from "@/trpc/react";
import { Category } from "@prisma/client";
import React, { useCallback, useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import { Input } from "../ui/input";
import NotFoundRules from "../rules/not-found-rules";
import RuleCard from "../rules/rule-card";
import RuleCardSkeleton from "../rules/rule-card-skeleton";
import RulesLoadingGrid from "../rules/rules-loading-grid";
import { useRulesStore } from "@/store/rules-store";

interface CategoryRuleContailerProps {
  category: Category;
}
const CategoryRuleContailer = ({ category }: CategoryRuleContailerProps) => {
  const [keyword, setKeyword] = useState("");
  const debouncedKeyword = useDebounce(keyword, 500);

  const { setCategoryCollectionList } = useRulesStore();

  const { data: categoryCollectionList } =
    api.category.categoryCollectionList.useQuery();

  useEffect(() => {
    setCategoryCollectionList(categoryCollectionList ?? []);
  }, [categoryCollectionList, setCategoryCollectionList]);

  const { ref, inView } = useInView();
  const {
    data: results,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
  } = api.rule.searchRules.useInfiniteQuery(
    {
      keyword: debouncedKeyword,
      limit: 18,
      categoryIds: [category.id],
    },
    {
      getNextPageParam: (lastPage) => lastPage.nextCursor,
    },
  );

  const loadMore = useCallback(async () => {
    try {
      await fetchNextPage();
    } catch (error) {
      console.error("load more error:", error);
    }
  }, [fetchNextPage]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [debouncedKeyword]);

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      // 使用 void 操作符明确标记我们知道这是一个异步操作
      void loadMore();
    }
  }, [inView, hasNextPage, isFetchingNextPage, loadMore]);

  return (
    <>
      {/* search params */}
      <div className="border-dark-800 flex w-full items-start justify-end border-b pb-4">
        <div className="flex items-start justify-start gap-4">
          <Input
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            className="w-80"
            placeholder="Search Rules"
          />
        </div>
      </div>

      {/* not found rules */}
      {!isLoading &&
        (!results ||
          (results.pages.length === 1 &&
            results.pages[0]!.rules.length === 0)) && <NotFoundRules />}

      {/* rules grid */}
      {results && results.pages.length > 0 && (
        <div className="grid grid-cols-1 grid-rows-1 gap-6 py-4 lg:grid-cols-2 xl:grid-cols-3">
          {results.pages.map((page) => {
            return (
              <>
                {page.rules.map(({ ruleTemplateCategory, author, ...rule }) => {
                  return (
                    <RuleCard
                      key={rule.id}
                      rule={rule}
                      author={author}
                      categoryIds={ruleTemplateCategory.map(
                        (item) => item.categoryId,
                      )}
                      searchKeyword={debouncedKeyword}
                    />
                  );
                })}
              </>
            );
          })}
        </div>
      )}

      {/* loading grid */}
      <div
        ref={ref}
        className="flex w-full items-center justify-center text-foreground"
      >
        {isLoading || isFetchingNextPage ? <RulesLoadingGrid /> : ""}
      </div>
    </>
  );
};

export default CategoryRuleContailer;
