import React from "react";
import ProjectsPage from "./_projects";
import { db } from "@/server/db";

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
