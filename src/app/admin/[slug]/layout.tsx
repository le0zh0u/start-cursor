"use client";

import { useAdminStore } from "@/store/admin-store";
import { useEffect } from "react";

export default function AdminLayout({
  params,
  children,
}: {
  params: { slug: string };
  children: React.ReactNode;
}) {
  const { setSlug } = useAdminStore();

  useEffect(() => {
    setSlug(params.slug);
  }, [params.slug, setSlug]);

  return <>{children}</>;
}
