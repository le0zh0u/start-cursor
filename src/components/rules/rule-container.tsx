"use client";
import React, { useCallback, useEffect, useState } from "react";
import { Container } from "../Container";
import RuleCard from "./rule-card";
import { api } from "@/trpc/react";
import { Input } from "../ui/input";
import { useDebounce } from "@/hooks/use-debounce";
import RuleCardSkeleton from "./rule-card-skeleton";
import { useInView } from "react-intersection-observer";
import { useRulesStore } from "@/store/rules-store";
import { MultiSelect } from "../ui/multi-select";
import { Badge } from "../ui/badge";
import { SlidersHorizontal, XIcon } from "lucide-react";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import { Checkbox } from "../ui/checkbox";
import NotFoundRules from "./not-found-rules";
import RulesLoadingGrid from "./rules-loading-grid";
import { ScrollArea, ScrollBar } from "../ui/scroll-area";

const RuleContainer = () => {
  const [keyword, setKeyword] = useState("");
  const [filterOpen, setFilterOpen] = useState(false);
  const {
    categoryList,
    searchCategoryIdList,
    setSearchCategoryIdList,
    setCategoryCollectionList,
  } = useRulesStore();

  const debouncedKeyword = useDebounce(keyword, 500);
  const debouncedCategoryIdList = useDebounce(searchCategoryIdList, 500);
  const { ref, inView } = useInView();

  const { data: categoryCollectionList } =
    api.category.categoryCollectionList.useQuery();

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
      categoryIds: debouncedCategoryIdList,
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

  useEffect(() => {
    setCategoryCollectionList(categoryCollectionList ?? []);
  }, [categoryCollectionList, setCategoryCollectionList]);

  return (
    <Container className="flex w-full flex-col items-center justify-center gap-4 py-4">
      <h2 className="sr-only">Rule List</h2>
      {/* search params */}
      <div className="border-dark-800 flex w-full flex-col items-center justify-start gap-4 border-b pb-4">
        <div className="flex w-full items-start justify-between gap-4">
          <div className="flex flex-1 items-start justify-start gap-4">
            <Button
              size="sm"
              variant={"default"}
              onClick={() => {
                setFilterOpen(!filterOpen);
              }}
            >
              {filterOpen ? <XIcon /> : <SlidersHorizontal />}
              Filter
            </Button>

            <div className="hidden flex-wrap items-center gap-2 md:flex">
              {searchCategoryIdList.map((id) => {
                return (
                  <Badge
                    key={id}
                    variant="secondary"
                    className="rounded-md p-2"
                  >
                    {categoryList.find((item) => item.id === id)?.name}
                    <XIcon
                      className="ml-2 h-4 w-4 cursor-pointer"
                      onClick={(e) => {
                        setSearchCategoryIdList(
                          searchCategoryIdList.filter((item) => item !== id),
                        );
                      }}
                    />
                  </Badge>
                );
              })}
            </div>
          </div>
          <Input
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            className="min-w-40 max-w-80"
            placeholder="Search Rules"
          />

          {/* <div className="flex items-center justify-end">
          <Button
            size={"sm"}
            onClick={async () => {
              await refetch();
            }}
          >
            Search
          </Button>
        </div> */}
        </div>

        {searchCategoryIdList && searchCategoryIdList.length > 0 && (
          <ScrollArea className="flex w-full pb-2 md:hidden" type="always">
            <div className="flex flex-row flex-nowrap gap-2">
              {searchCategoryIdList.map((id) => {
                return (
                  <Badge
                    key={id}
                    variant="secondary"
                    className="text-nowrap rounded-md p-2"
                  >
                    {categoryList.find((item) => item.id === id)?.name}
                    <XIcon
                      className="ml-2 h-4 w-4 cursor-pointer"
                      onClick={(e) => {
                        setSearchCategoryIdList(
                          searchCategoryIdList.filter((item) => item !== id),
                        );
                      }}
                    />
                  </Badge>
                );
              })}
            </div>
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
        )}

        {filterOpen && (
          <div className="flex w-full flex-col gap-4 px-4">
            {categoryCollectionList
              ?.filter((item) => item.categories.length > 0)
              .map((collection) => (
                <div className="flex w-full flex-col gap-2" key={collection.id}>
                  <p className="text-md font-semibold">{collection.name}</p>
                  <Separator />
                  <div className="flex flex-wrap gap-1">
                    {collection.categories.map((category) => (
                      <div
                        key={category.id}
                        className="flex cursor-pointer items-center gap-1 px-2 hover:bg-muted"
                        onClick={() => {
                          if (searchCategoryIdList.includes(category.id)) {
                            setSearchCategoryIdList(
                              searchCategoryIdList.filter(
                                (id) => id !== category.id,
                              ),
                            );
                          } else {
                            setSearchCategoryIdList([
                              ...searchCategoryIdList,
                              category.id,
                            ]);
                          }
                        }}
                      >
                        <Checkbox
                          id={category.id.toString()}
                          checked={searchCategoryIdList.includes(category.id)}
                          onCheckedChange={(checked) => {
                            if (checked) {
                              setSearchCategoryIdList([
                                ...searchCategoryIdList,
                                category.id,
                              ]);
                            } else {
                              setSearchCategoryIdList(
                                searchCategoryIdList.filter(
                                  (id) => id !== category.id,
                                ),
                              );
                            }
                          }}
                        />
                        {category.name}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
          </div>
        )}
      </div>
      {!isLoading &&
        (!results ||
          (results.pages.length === 1 &&
            results.pages[0]!.rules.length === 0)) && <NotFoundRules />}

      {results && results.pages.length > 0 && (
        <div className="grid grid-cols-1 grid-rows-1 gap-6 py-4 md:grid-cols-2 xl:grid-cols-3">
          {/* <Card className="group relative flex h-full w-full flex-col overflow-hidden">
              <CardHeader>
                <CardTitle className="text-md">Card Title</CardTitle>
                <CardDescription className="text-xs">
                  Card Description
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p>Card Content</p>
              </CardContent>
              <CardFooter>
                <p>Card Footer</p>
              </CardFooter>
            </Card> */}

          {results.pages.map((page) => {
            return (
              <>
                {page.rules.map(({ ruleTemplateCategory, author, ...rule }) => {
                  return (
                    <RuleCard
                      key={rule.id}
                      rule={rule}
                      author={author}
                      project={rule.githubProject}
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

          {/* <div className="grid grid-cols-1 grid-rows-1 lg:grid-cols-6 xl:grid-cols-4">
              <div className="hidden lg:col-span-2 lg:block xl:col-span-1">
                <div className="relative mr-8 rounded-md border">
                  <div className="border-dark-800 flex items-center justify-between border-b px-3 py-3">
                    sort
                  </div>
                  <div className="border-dark-800 flex items-center justify-between border-b px-3 py-3">
                    Framework
                  </div>
                </div>
              </div>
              <div className="lg:col-span-4 xl:col-span-3">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
                  
                </div>
              </div>
            </div> */}
        </div>
      )}

      <div
        ref={ref}
        className="flex w-full items-center justify-center py-4 text-foreground"
      >
        {isLoading || isFetchingNextPage ? <RulesLoadingGrid /> : ""}
      </div>
    </Container>
  );
};

export default RuleContainer;
