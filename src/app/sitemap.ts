import { env } from "@/env";
import { db } from "@/server/db";

export const revalidate = 30;

export default async function Sitemap() {
  const baseUrl = env.NEXT_PUBLIC_APP_URL;

  // get category
  const categories = await db.category.findMany();

  const categoryList = categories.map((category) => ({
    url: `${baseUrl}/category/${category.slug}`,
    lastModified: new Date().toISOString(),
    changeFrequency: "weekly",
    priority: 0.5,
  }));

  // get rules
  const rules = await db.ruleTemplate.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  const ruleList = rules.map((rule) => ({
    url: `${baseUrl}/rule/${rule.slug}`,
    lastModified: new Date().toISOString(),
    changeFrequency: "weekly",
    priority: 0.5,
  }));

  // get projects
  const projects = await db.githubProject.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  const projectList = projects.map((project) => ({
    url: `${baseUrl}/projects/${project.slug}`,
    lastModified: new Date().toISOString(),
    changeFrequency: "weekly",
    priority: 0.5,
  }));

  // get tutorials
  const tutorials = await db.tutorial.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  const tutorialList = tutorials.map((tutorial) => ({
    url: `${baseUrl}/tutorials/${tutorial.slug}`,
    lastModified: new Date().toISOString(),
    changeFrequency: "weekly",
    priority: 0.5,
  }));

  return [
    {
      url: baseUrl,
      lastModified: new Date().toISOString(),
      changeFrequency: "yearly",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date().toISOString(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/projects`,
      lastModified: new Date().toISOString(),
      changeFrequency: "weekly",
      priority: 0.5,
    },
    {
      url: `${baseUrl}/tutorials`,
      lastModified: new Date().toISOString(),
      changeFrequency: "weekly",
      priority: 0.5,
    },
    {
      url: `${baseUrl}/cursorignore`,
      lastModified: new Date().toISOString(),
      changeFrequency: "weekly",
      priority: 0.5,
    },

    ...ruleList,
    ...categoryList,
    ...projectList,
    ...tutorialList,

    // {
    //   url: `${baseUrl}/rule`,
    //   lastModified: new Date().toISOString(),
    //   changeFrequency: "weekly",
    //   priority: 0.5,
    // },
  ];
}
