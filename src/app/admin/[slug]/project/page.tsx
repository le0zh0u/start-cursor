import AdminBreadcrumb from "@/app/_components/admin-breadcrumb";
import AddProjectModal from "@/components/admin/project/add-project-modal";
import { FlexContainer } from "@/components/flex-container";
import { Separator } from "@/components/ui/separator";

import React from "react";

const page = () => {
  return (
    <FlexContainer className="gap-4">
      <AdminBreadcrumb pageName="Project" />

      <div className="flex w-full items-center justify-start gap-4">
        <h1 className="text-3xl font-bold">Projects</h1>
      </div>
      <Separator />

      <div className="flex w-full flex-col gap-4">
        <div>
          <AddProjectModal />
        </div>
        <div>Data table</div>
      </div>
    </FlexContainer>
  );
};

export default page;
