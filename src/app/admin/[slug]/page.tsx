import { env } from "@/env";
import { redirect } from "next/navigation";
import React from "react";
import AdminPage from "./_admin";

const page = ({ params }: { params: { slug: string } }) => {
  const { slug } = params;

  const adminSlug = env.ADMIN_SLUG;

  if (slug !== adminSlug) {
    return redirect("/404");
  }

  return <AdminPage slug={slug} />;
};

export default page;
