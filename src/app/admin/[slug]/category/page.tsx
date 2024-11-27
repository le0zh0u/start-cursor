import AdminBreadcrumb from "@/app/_components/admin-breadcrumb";
import CategoryDataTable from "@/components/admin/category/category-table";
import { FlexContainer } from "@/components/flex-container";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { env } from "@/env";
import Link from "next/link";
import React from "react";

const page = () => {
  return (
    <FlexContainer className="gap-4">
      <AdminBreadcrumb pageName="Category" />

      <div className="flex w-full items-center justify-between gap-4">
        <h1 className="text-3xl font-bold">Category</h1>
        <Button variant="outline" asChild>
          <Link href={`/admin/${env.ADMIN_SLUG}/category/category-collection`}>
            Collections
          </Link>
        </Button>
      </div>
      <Separator />

      <div className="flex w-full flex-col gap-4">
        <CategoryDataTable />
      </div>
    </FlexContainer>
  );
};

export default page;
