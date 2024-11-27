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
  items?:
    | {
        name: string;
        slug: string;
      }[]
    | undefined;
}

const AdminBreadcrumb = ({ pageName, items }: AdminBreadcrumbProps) => {
  const { getAdminBaseUrl } = useAdminStore();

  return (
    <div className="flex w-full items-center justify-start gap-4">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href={getAdminBaseUrl()}>Admin</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          {/* <BreadcrumbItem>
              <BreadcrumbLink href="/components">Category</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator /> */}
          {items?.map((item) => (
            <>
              <BreadcrumbItem key={item.slug}>
                <BreadcrumbLink href={`${getAdminBaseUrl()}/${item.slug}`}>
                  {item.name}
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
            </>
          ))}
          <BreadcrumbItem>
            <BreadcrumbPage>{pageName}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
    </div>
  );
};

export default AdminBreadcrumb;
