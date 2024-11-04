"use client";
import React, { ReactNode } from "react";

import { Button } from "../ui/button";
import { useRulesStore } from "@/store/rules-store";
import SVGIcon from "./icons/svg-icon";
import { motion } from "framer-motion";

interface CategorySlugIconProps {
  slug: string;
}

export const CATEGORY_ICON_LIST: Array<CategorySlugIconProps> = [
  {
    slug: "next-js",
  },
  {
    slug: "java",
  },
  {
    slug: "java-script",
  },
  {
    slug: "typescript",
  },
  {
    slug: "tailwind",
  },
  {
    slug: "php",
  },
  {
    slug: "python",
  },
  {
    slug: "react",
  },
  {
    slug: "astro",
  },
  {
    slug: "go",
  },
  {
    slug: "swift",
  },
  {
    slug: "rust",
  },
];

const CategoryIconList = () => {
  const { categoryList, setSearchCategoryIdListBySlug } = useRulesStore();

  const CategoryIcon = ({ props }: { props: CategorySlugIconProps }) => {
    const { slug } = props;
    const category = categoryList.find((c) => c.slug === slug);
    if (!category) return null;
    return (
      <Button
        className="duration-400 h-8 transform rounded-md px-2 transition hover:-translate-y-1"
        size={"sm"}
        onClick={() => {
          setSearchCategoryIdListBySlug(slug);
        }}
        variant="ghost"
      >
        <SVGIcon
          iconSrc={
            category.icon && category.icon != ""
              ? category.icon
              : `/icons/${slug}.svg`
          }
          name="slug"
        />
      </Button>
    );
  };

  return (
    <div className="mx-auto flex max-w-screen-md flex-wrap items-center justify-center gap-1">
      {CATEGORY_ICON_LIST.map((c) => (
        <CategoryIcon props={c} key={c.slug} />
      ))}
    </div>
  );
};

export default CategoryIconList;
