"use client";
import React, { useState } from "react";
import { Card, CardFooter, CardHeader, CardTitle } from "../ui/card";
import { Button, buttonVariants } from "../ui/button";
import { api } from "@/trpc/react";
import { toast } from "sonner";
import { useAdminStore } from "@/store/admin-store";
import { undefined } from "zod";
import Link from "next/link";
import AddProjectModal from "./project/add-project-modal";

const DataManagePanel = () => {
  const { slug } = useAdminStore();

  const [
    loadingDataFromCursorRulesFinder,
    setLoadingDataFromCursorRulesFinder,
  ] = useState(false);

  const { mutate: importDataFromCursorRulesFinder } =
    api.rule.importDataFromCursorRulesFinder.useMutation({
      onSuccess: (data) => {
        if (data.success) {
          toast.success("Data imported successfully");
        } else {
          toast.error("Failed to import data");
        }
        setLoadingDataFromCursorRulesFinder(false);
      },
      onError: (error) => {
        toast.error(error.message);
        setLoadingDataFromCursorRulesFinder(false);
      },
      onSettled: () => {
        setLoadingDataFromCursorRulesFinder(true);
      },
    });

  return (
    <div className="flex w-full flex-col items-start justify-start gap-4">
      <h2 className="text-start text-xl font-bold">Data Management</h2>
      <div className="flex flex-col items-center justify-start gap-4 md:flex-row">
        <Card>
          <CardHeader>
            <CardTitle>Rules</CardTitle>
          </CardHeader>
          <CardFooter>
            <div className="flex items-center justify-center gap-2">
              <Link
                href={`/admin/${slug}/rule`}
                className={buttonVariants({ variant: "default", size: "sm" })}
              >
                Rules
              </Link>

              <Button
                size={"sm"}
                onClick={async () => {
                  importDataFromCursorRulesFinder();
                }}
                disabled={loadingDataFromCursorRulesFinder}
              >
                From Cursor Rules Finder
              </Button>
            </div>
          </CardFooter>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Category</CardTitle>
          </CardHeader>
          <CardFooter>
            <div className="flex items-center justify-center gap-2">
              <Link
                href={`/admin/${slug}/category`}
                className={buttonVariants({ variant: "default", size: "sm" })}
              >
                Categories
              </Link>
            </div>
          </CardFooter>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Project</CardTitle>
          </CardHeader>
          <CardFooter>
            <div className="flex items-center justify-center gap-2">
              <AddProjectModal buttonVariant="outline" />
              <Link
                href={`/admin/${slug}/project`}
                className={buttonVariants({ variant: "default", size: "sm" })}
              >
                Projects
              </Link>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default DataManagePanel;
