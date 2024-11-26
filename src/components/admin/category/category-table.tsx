"use client";

import { DataTable } from "@/components/common/data-table";
import React, { useEffect, useState } from "react";
import { Category, columns } from "./category-table-columns";
import { api } from "@/trpc/react";
import { useDebounce } from "@/hooks/use-debounce";
import { Input } from "@/components/ui/input";
import CategoryCollectionSelector from "./category-collection-selector";
import { useAdminStore } from "@/store/admin-store";
import CategoryAddButton from "./category-add-button";

const CategoryDataTable = () => {
  const { setRefetchCategoryList, setCategoryCollectionList } = useAdminStore();

  const { data: collectionList, refetch: refetchCollectionList } =
    api.category.categoryCollectionList.useQuery();

  useEffect(() => {
    if (collectionList) {
      setCategoryCollectionList(collectionList);
    }
  }, [setCategoryCollectionList, collectionList]);

  const [currentPage, setCurrentPage] = useState<number>(1);
  const rowsPerPage = 10;

  const [keyword, setKeyword] = useState<string>("");
  const debouncedKeyword = useDebounce(keyword, 500);

  const [selectedCollection, setSelectedCollection] = useState<number>(0);

  const { data, isLoading, refetch } = api.category.fetchCategoryList.useQuery({
    page: currentPage,
    limit: rowsPerPage,
    keyword: debouncedKeyword,
    collectionId: selectedCollection,
  });

  useEffect(() => {
    setRefetchCategoryList(refetch);
  }, [refetch, setRefetchCategoryList]);

  useEffect(() => {
    setCurrentPage(1);
  }, [debouncedKeyword]);

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-start gap-4">
        <CategoryAddButton />
        <Input
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          placeholder="Search"
        />

        <CategoryCollectionSelector
          selectedCollection={selectedCollection}
          setSelectedCollection={setSelectedCollection}
          refetchCollectionList={refetchCollectionList}
        />
      </div>
      <DataTable
        columns={columns}
        data={data?.items ?? []}
        pageCount={Math.ceil(Math.ceil(data?.total ?? 0) / rowsPerPage)}
        page={currentPage}
        onPageChange={(page) => {
          setCurrentPage(page);
        }}
        isLoading={isLoading}
      />
    </div>
  );
};

export default CategoryDataTable;
