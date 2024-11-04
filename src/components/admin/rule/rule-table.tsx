"use client";

import { DataTable } from "@/components/common/data-table";
import React, { useEffect, useState } from "react";
import { columns } from "./rule-table-columns";
import { api } from "@/trpc/react";
import { useDebounce } from "@/hooks/use-debounce";
import { Input } from "@/components/ui/input";

const RuleDataTable = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const rowsPerPage = 10;

  const [keyword, setKeyword] = useState<string>("");
  const debouncedKeyword = useDebounce(keyword, 500);

  const { data, isLoading, refetch } = api.rule.fetchRuleList.useQuery({
    page: currentPage,
    limit: rowsPerPage,
    // keyword: debouncedKeyword,
  });

  useEffect(() => {
    setCurrentPage(1);
  }, [debouncedKeyword]);

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-start gap-4">
        <Input
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          placeholder="Search"
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

export default RuleDataTable;
