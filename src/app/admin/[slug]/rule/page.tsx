import AdminBreadcrumb from "@/app/_components/admin-breadcrumb";
import RuleDataTable from "@/components/admin/rule/rule-table";
import { FlexContainer } from "@/components/flex-container";
import { Separator } from "@/components/ui/separator";
import React from "react";

const page = () => {
  return (
    <FlexContainer className="gap-4">
      <AdminBreadcrumb pageName="Rule" />

      <div className="flex w-full items-center justify-start gap-4">
        <h1 className="text-3xl font-bold">Rule</h1>
      </div>
      <Separator />

      <div className="flex w-full flex-col gap-4">
        <RuleDataTable />
      </div>
    </FlexContainer>
  );
};

export default page;
