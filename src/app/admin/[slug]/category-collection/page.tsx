import AdminBreadcrumb from "@/app/_components/admin-breadcrumb";
import CategoryCollectionDataTable from "@/components/admin/collection/collection-table";
import { FlexContainer } from "@/components/flex-container";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { api } from "@/trpc/server";
import React from "react";

const page = async () => {
  const collectionList = await api.category.categoryCollectionList();

  return (
    <FlexContainer className="gap-4">
      <AdminBreadcrumb pageName="Category Collection" />

      <div className="flex w-full items-center justify-between gap-4">
        <h1 className="text-3xl font-bold">Category Collection</h1>
      </div>
      <Separator />

      <div className="flex w-full flex-col gap-4">
        <CategoryCollectionDataTable collectionList={collectionList} />
      </div>
    </FlexContainer>
  );
};

export default page;
