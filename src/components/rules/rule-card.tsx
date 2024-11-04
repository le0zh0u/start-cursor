import { Copy } from "lucide-react";
import React from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { RxAvatar } from "react-icons/rx";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import {
  GithubProject,
  type Category,
  type RuleAuthor,
  type RuleTemplate,
} from "@prisma/client";
import Link from "next/link";
import { toast } from "sonner";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { useRulesStore } from "@/store/rules-store";
import RuleCopyButton from "./rule-copy-button";
import RuleShareButton from "./rule-share-button";
import { FaGithub } from "react-icons/fa";

function highlightText(text: string, query: string): JSX.Element {
  if (!query) {
    return <>{text}</>;
  }

  const parts = text.split(new RegExp(`(${query})`, "gi"));

  return (
    <>
      {parts.map((part, i) =>
        part.toLowerCase() === query.toLowerCase() ? (
          <mark key={i} className="rounded-sm bg-yellow-200">
            {part}
          </mark>
        ) : (
          part
        ),
      )}
    </>
  );
}

interface RuleCardProps {
  rule: RuleTemplate;
  author: RuleAuthor;
  project?: GithubProject | null;
  categoryIds: number[];
  searchKeyword: string;
}

const RuleCard = ({
  rule,
  author,
  project,
  categoryIds,
  searchKeyword,
}: RuleCardProps) => {
  const { getCategoryListByIds } = useRulesStore();
  const categories = getCategoryListByIds(categoryIds);

  const GithubTitle = () => {
    if (!project) return null;
    return (
      <Link
        href={project.url}
        className="flex flex-row items-center justify-start gap-2"
      >
        <FaGithub className="m-1 h-8 w-8" />
        <span className="text-wrap">{project.name}</span>
      </Link>
    );
  };

  const AuthorTitle = () => {
    return (
      <Link
        href={author.link}
        className="flex flex-row items-center justify-start gap-2"
      >
        <Avatar>
          {author.avatar && author.avatar != "" ? (
            <AvatarImage src={author.avatar} alt={author.name} />
          ) : (
            <AvatarImage
              src="https://github.com/shadcn.png"
              alt={author.name}
            />
          )}

          <AvatarFallback>
            <RxAvatar size={28} />
          </AvatarFallback>
        </Avatar>
        {author.name}
      </Link>
    );
  };

  return (
    <Card className="group relative flex h-full w-full flex-col overflow-hidden">
      <CardHeader className="py-4">
        <div className="flex flex-row items-center justify-between">
          <CardTitle className="text-md">
            {project ? <GithubTitle /> : <AuthorTitle />}
          </CardTitle>
          {/* <CardDescription className="text-xs">
        Card Description
      </CardDescription> */}
          <div className="flex items-center justify-center">
            <RuleCopyButton ruleContent={rule.content} />
            {/* <RuleShareButton ruleSlug={rule.slug} /> */}
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <ScrollArea className="h-96 bg-gray-100 p-4">
          <p className="whitespace-pre-line text-sm">
            {searchKeyword
              ? highlightText(rule.content, searchKeyword)
              : rule.content}
          </p>
        </ScrollArea>
      </CardContent>
      <CardFooter className="px-0 py-4">
        {categories.length == 0 && <div>No categories </div>}
        {categories.length > 0 && (
          <ScrollArea className="w-full px-4" type="scroll">
            <div className="flex flex-row flex-nowrap gap-2">
              {categories.map((item) => {
                return (
                  <Badge
                    key={item.id}
                    className="text-nowrap"
                    variant="secondary"
                  >
                    {item.name}
                  </Badge>
                );
              })}
            </div>
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
        )}
      </CardFooter>
    </Card>
  );
};

export default RuleCard;
