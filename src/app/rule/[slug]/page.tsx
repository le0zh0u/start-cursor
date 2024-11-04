import { FlexContainer } from "@/components/flex-container";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { db } from "@/server/db";
import { Copy, SquareArrowOutUpRight } from "lucide-react";
import Link from "next/link";
import React from "react";
import { RxAvatar } from "react-icons/rx";
import { toast } from "sonner";
import RulePage from "./_rule-page";
import { replaceLastOccurrence } from "@/server/lib/utils";

const page = async ({ params }: { params: { slug: string } }) => {
  let slug = params.slug;

  if (slug.endsWith("-cursor-rule")) {
    slug = replaceLastOccurrence(slug, "-cursor-rule", "");
  }

  const rule = await db.ruleTemplate.findFirst({
    where: {
      slug: slug,
    },
    include: {
      author: true,
      ruleTemplateCategory: true,
    },
  });

  if (!rule) {
    return <div>Rule is not found</div>;
  }
  return (
    <FlexContainer>
      <div className="flex w-full items-center justify-start gap-4">
        {/* bread crumb */}
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>{rule.title}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>

      <RulePage rule={rule} />
    </FlexContainer>
  );
};

export default page;
