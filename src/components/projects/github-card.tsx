"use client";
import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Button } from "../ui/button";
import { GithubIcon, Star } from "lucide-react";
import { FaGithub } from "react-icons/fa";
import { Separator } from "../ui/separator";
import Link from "next/link";
import { ScrollArea } from "../ui/scroll-area";
import { Skeleton } from "../ui/skeleton";
import { GithubProject } from "@prisma/client";

interface GithubCardProps {
  githubProject: GithubProject;
  cursorRule?: string;
}
const GithubCard = ({ githubProject, cursorRule }: GithubCardProps) => {
  // const urlConvertor = () => {
  //   return githubUrl.replaceAll(
  //     "https://github.com",
  //     "https://api.github.com/repos",
  //   );
  // };

  // const [loading, setLoading] = useState<boolean>(true);
  // const [loadingCursorRule, setLoadingCursorRule] = useState<boolean>(true);
  // const [projectInfo, setProjectInfo] = useState<any>(null);
  // const [cursorRule, setCursorRule] = useState<string>("");

  // useEffect(() => {
  //   setLoading(true);
  //   setLoadingCursorRule(true);
  //   fetch(urlConvertor())
  //     .then((res) => res.json())
  //     .then((data) => {
  //       setProjectInfo(data);

  //       let fileUrl = cursorFileUrl;
  //       if (!fileUrl) {
  //         fileUrl = `https://raw.githubusercontent.com/${data.full_name}/refs/heads/main/.cursorrules`;
  //       }

  //       fetch(fileUrl)
  //         .then((res) => res.text())
  //         .then((data) => {
  //           setCursorRule(data);
  //         })
  //         .finally(() => {
  //           setLoadingCursorRule(false);
  //         });
  //     })
  //     .finally(() => {
  //       setLoading(false);
  //     });
  // }, [githubUrl, cursorFileUrl]);

  function formatGitHubNumber(num: number): string {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1).replace(/\.0$/, "") + "M";
    }
    if (num >= 1000) {
      return (num / 1000).toFixed(1).replace(/\.0$/, "") + "k";
    }
    return num.toString();
  }

  return (
    <Card className="group relative flex h-full w-full flex-col overflow-hidden">
      <CardHeader className="py-4">
        <div className="flex flex-row items-center justify-between">
          <CardTitle className="text-md flex items-center justify-start gap-2">
            <FaGithub className="h-4 w-4" />
            <span className="text-wrap">{githubProject.name}</span>
          </CardTitle>

          <Link
            href={`${githubProject.url}`}
            className="flex items-center justify-start gap-2 rounded-md border p-1 text-xs"
          >
            <Star className="h-4 w-4" />
            {formatGitHubNumber(githubProject.stars)}
          </Link>
          {/* <CardDescription className="text-xs">
Card Description
</CardDescription> */}
        </div>
      </CardHeader>
      <Separator />

      <CardContent className="p-0">
        <ScrollArea className="h-96 bg-gray-100 p-4">
          <p className="whitespace-pre-line text-sm">{cursorRule}</p>
        </ScrollArea>
      </CardContent>
      <CardFooter className="flex flex-row items-center justify-start gap-2 p-4">
        <p className="text-wrap text-xs text-secondary-foreground">
          {githubProject.description}
        </p>
      </CardFooter>
    </Card>
  );
};

export default GithubCard;
