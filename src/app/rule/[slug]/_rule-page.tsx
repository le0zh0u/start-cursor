"use client";

import RuleCopyButton from "@/components/rules/rule-copy-button";
import RuleShareButton from "@/components/rules/rule-share-button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { RuleAuthor, RuleTemplate } from "@prisma/client";
import { SquareArrowOutUpRight, Copy, Share } from "lucide-react";
import Link from "next/link";
import React from "react";
import { RxAvatar } from "react-icons/rx";

interface RulePageProps {
  rule: RuleTemplate & {
    author: RuleAuthor;
  };
}

const RulePage = ({ rule }: RulePageProps) => {
  return (
    <>
      {/* header */}
      <div className="flex w-full flex-col gap-4 border-b pb-4">
        <h1 className="text-4xl font-semibold">{rule.title}</h1>
        <Link
          href={rule.author.link}
          className="flex items-center justify-start gap-4"
        >
          <Avatar>
            {rule.author.avatar && rule.author.avatar != "" ? (
              <AvatarImage src={rule.author.avatar} alt={rule.author.name} />
            ) : (
              <AvatarImage
                src="https://github.com/shadcn.png"
                alt={rule.author.name}
              />
            )}

            <AvatarFallback>
              <RxAvatar size={28} />
            </AvatarFallback>
          </Avatar>

          <div className="flex items-center justify-start gap-1">
            {rule.author.name}
            <SquareArrowOutUpRight
              size={16}
              className="text-muted-foreground"
            />
          </div>
        </Link>
      </div>

      <div className="flex w-full items-center justify-end gap-4">
        <RuleCopyButton ruleContent={rule.content} />
        <RuleShareButton ruleSlug={rule.slug} />
      </div>

      <div className="flex w-full flex-col gap-8 bg-gray-100 p-4">
        <p className="whitespace-pre-line text-wrap font-mono text-sm text-muted-foreground">
          {rule.content}
        </p>
      </div>
    </>
  );
};

export default RulePage;
