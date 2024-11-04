"use client";

import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";
import { useAdminStore } from "@/store/admin-store";
import React from "react";

interface AdminBreadcrumbProps {
  pageName: string;
}

const AdminBreadcrumb = ({ pageName }: AdminBreadcrumbProps) => {
  const { slug } = useAdminStore();

  return (
    <div className="flex w-full items-center justify-start gap-4">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href={`/admin/${slug}`}>Admin</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          {/* <BreadcrumbItem>
              <BreadcrumbLink href="/components">Category</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator /> */}
          <BreadcrumbItem>
            <BreadcrumbPage>{pageName}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
    </div>
  );
};

export default AdminBreadcrumb;
