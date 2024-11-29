import AdminBreadcrumb from "@/app/_components/admin-breadcrumb";
import TutorialDataTable from "@/components/admin/tutorial/tutorial-table";
import { FlexContainer } from "@/components/flex-container";
import { Separator } from "@/components/ui/separator";

import React from "react";

const page = () => {
  return (
    <FlexContainer className="gap-4">
      <AdminBreadcrumb pageName="Tutorial" />

      <div className="flex w-full items-center justify-start gap-4">
        <h1 className="text-3xl font-bold">Totorials</h1>
      </div>
      <Separator />

      <div className="flex w-full flex-col gap-4">
        <TutorialDataTable />
      </div>
    </FlexContainer>
  );
};

export default page;
