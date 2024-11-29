import React from "react";
import ProjectsPage from "./_projects";
import { db } from "@/server/db";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Start Cursor | Projects",
  description:
    "Discover how open source project using Cursor AI , making it easier to analyze using in projects we building",
};

const page = async () => {
  const githubProjects = await db.githubProject.findMany({
    include: {
      ruleTemplate: true,
    },
    orderBy: {
      id: "desc",
    },
  });

  return <ProjectsPage githubProjects={githubProjects} />;
};

export default page;
