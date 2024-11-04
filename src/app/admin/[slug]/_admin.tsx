"use client";

import DataManagePanel from "@/components/admin/data-manage";
import { FlexContainer } from "@/components/flex-container";

import { Separator } from "@/components/ui/separator";
import { useAdminStore } from "@/store/admin-store";
import { api } from "@/trpc/react";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";

interface AdminPageProps {
  slug: string;
}

const AdminPage = ({ slug }: AdminPageProps) => {
  // will use slug and secret key with request
  const key = slug;

  const { setSlug } = useAdminStore();

  useEffect(() => {
    setSlug(slug);
  }, [slug]);

  return (
    <FlexContainer className="gap-4">
      <div className="flex w-full items-start justify-start gap-4">
        <h1 className="text-3xl font-bold">Admin</h1>
      </div>
      <Separator />

      <DataManagePanel />
    </FlexContainer>
  );
};

export default AdminPage;
