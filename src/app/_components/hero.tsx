"use client";

import { CheckCircle2, Globe, Lock, Star, Zap } from "lucide-react";

import { Container } from "@/components/Container";
import CategoryIconList from "@/components/categories/category-icon-list";
import { Button } from "@/components/ui/button";
import { api } from "@/trpc/react";

const HeroSection = () => {
  return (
    // <section className="">
    <Container className="relative py-8 md:py-16">
      <div className="absolute inset-0 -z-10 mx-auto size-full max-w-3xl bg-[linear-gradient(to_right,hsl(var(--muted))_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--muted))_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_50%_100%_at_50%_50%,#000_60%,transparent_100%)]"></div>
      <div className="relative mx-auto mb-8 max-w-3xl flex-wrap text-center text-4xl font-semibold md:mb-10 md:text-6xl md:leading-snug">
        <h1>
          Boost Your <span className="ml-1 opacity-50">Projects</span> 10X
          Faster with Cursor AI
        </h1>
        <div className="underline-offset-3 absolute -left-20 -top-10 hidden w-fit -rotate-12 gap-1 border-b border-dashed border-muted-foreground text-sm font-normal text-muted-foreground lg:flex">
          <Zap className="h-auto w-3" />
          Fast
        </div>
        <div className="underline-offset-3 absolute -left-24 top-14 hidden w-fit -rotate-12 gap-1 border-b border-dashed border-muted-foreground text-sm font-normal text-muted-foreground lg:flex">
          <Lock className="h-auto w-3" />
          Customization
        </div>
        <div className="underline-offset-3 absolute -right-24 -top-10 hidden w-fit rotate-12 gap-1 border-b border-dashed border-muted-foreground text-sm font-normal text-muted-foreground lg:flex">
          Professional
          <Star className="h-auto w-3" />
        </div>
        <div className="underline-offset-3 absolute -right-28 top-14 hidden w-fit rotate-12 gap-1 border-b border-dashed border-muted-foreground text-sm font-normal text-muted-foreground lg:flex">
          Optimized
          <CheckCircle2 className="h-auto w-3" />
        </div>
      </div>
      <p className="mx-auto mb-4 max-w-screen-md text-center font-medium text-muted-foreground md:text-xl">
        Start Cursor let you as quick as possible be familiar with Cursor AI,
        helping you build different types of projects with ease.
      </p>

      <CategoryIconList />
      {/* <Button
        onClick={async () => {
          await importDataFromCursorRulesFinder({});
        }}
      >
        Load Data
      </Button> */}
      {/* <div className="flex flex-col items-center justify-center gap-3 pb-12 pt-3">
          <Button size="lg">Start free 14-day trial</Button>
          <div className="text-sm text-muted-foreground md:text-balance">
            Powered by GPT-4
          </div>
        </div> */}
    </Container>
    // </section>
  );
};

export default HeroSection;
