import CategoryRuleContailer from "@/components/categories/category-rule-container";
import SVGIcon from "@/components/categories/icons/svg-icon";
import { Container } from "@/components/Container";
import { FlexContainer } from "@/components/flex-container";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { db } from "@/server/db";
import { api, HydrateClient } from "@/trpc/server";
import React from "react";

const notFound = () => {
  return <div> Category Not Found</div>;
};

const page = async ({ params }: { params: { slug: string } }) => {
  const category = await db.category.findFirst({
    where: {
      slug: params.slug,
    },
  });

  if (!category) {
    return notFound();
  }

  void api.category.categoryCollectionList.prefetch();

  return (
    <HydrateClient>
      <FlexContainer>
        <div className="flex w-full items-center justify-start gap-4">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/">Home</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              {/* <BreadcrumbItem>
              <BreadcrumbLink href="/components">Category</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator /> */}
              <BreadcrumbItem>
                <BreadcrumbPage>{category.name}</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
        <div className="flex w-full flex-col gap-8">
          {/* header */}
          <div className="flex flex-col gap-4">
            <div className="flex gap-4">
              <SVGIcon iconSrc={category.icon} name={category.name} size={40} />
              <h1 className="text-4xl font-semibold">{category.name}</h1>
            </div>
            <p className="text-wrap font-mono text-muted-foreground">
              {category.desc}
            </p>
          </div>
        </div>

        <CategoryRuleContailer category={category} />
      </FlexContainer>
    </HydrateClient>
  );
};

export default page;
