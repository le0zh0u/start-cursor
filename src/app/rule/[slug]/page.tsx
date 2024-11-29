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

import { db } from "@/server/db";

import React from "react";
import RulePage from "./_rule-page";
import { replaceLastOccurrence } from "@/server/lib/utils";
import { Metadata, ResolvingMetadata } from "next";

type Props = {
  params: { slug: string };
  searchParams: Record<string, string | string[] | undefined>;
};

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  // 从 params 中读取 slug
  const slug = params.slug;
  if (!slug) {
    return {};
  }

  // 获取数据
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
    return {};
  }

  // 可选：读取父级 metadata
  const previousImages = (await parent).openGraph?.images ?? [];

  const description =
    rule.content && rule.content.length > 0
      ? rule.content.slice(0, 100)
      : `Start Cursor Rule for ${rule.title}`;

  const title = `Start Cursor | ${rule.title} | Cursor Rule`;

  return {
    title: title,
    description: description,
    openGraph: {
      title: title,
      description: description,
      images: [...previousImages],
    },
    twitter: {
      card: "summary_large_image",
      title: title,
      description: description,
      images: [...previousImages],
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

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
