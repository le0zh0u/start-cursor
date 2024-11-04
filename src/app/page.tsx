import Link from "next/link";

import { LatestCategoryCollection } from "@/app/_components/post";
import { api, HydrateClient } from "@/trpc/server";
import HeroSection from "./_components/hero";
import Navbar from "./_components/header";
import { Container } from "@/components/Container";
import MultipleSelectorDemo from "./_components/multiple-select-demo";
import RuleCard from "@/components/rules/rule-card";
import RuleContainer from "@/components/rules/rule-container";
import RuleAddForm from "@/components/rules/rule-add-form";
import Footer from "./_components/footer";

export default async function Home() {
  const hello = await api.post.hello({ text: "from tRPC" });

  void api.category.categoryCollectionList.prefetch();

  // void api.post.getLatest.prefetch();

  // void api.category.categoryCollectionList.prefetch();

  // void api.rule.searchRules.prefetch();

  return (
    <>
      <HydrateClient>
        <HeroSection />
        <RuleContainer />

        {/* <RuleAddForm /> */}

        {/* <main className="flex flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
          <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16">
            <h1 className="text-5xl font-extrabold tracking-tight sm:text-[5rem]">
              Create <span className="text-[hsl(280,100%,70%)]">T3</span> App
            </h1>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-8">
              <Link
                className="flex max-w-xs flex-col gap-4 rounded-xl bg-white/10 p-4 hover:bg-white/20"
                href="https://create.t3.gg/en/usage/first-steps"
                target="_blank"
              >
                <h3 className="text-2xl font-bold">First Steps →</h3>
                <div className="text-lg">
                  Just the basics - Everything you need to know to set up your
                  database and authentication.
                </div>
              </Link>
              <Link
                className="flex max-w-xs flex-col gap-4 rounded-xl bg-white/10 p-4 hover:bg-white/20"
                href="https://create.t3.gg/en/introduction"
                target="_blank"
              >
                <h3 className="text-2xl font-bold">Documentation →</h3>
                <div className="text-lg">
                  Learn more about Create T3 App, the libraries it uses, and how
                  to deploy it.
                </div>
              </Link>
            </div>
            <div className="flex flex-col items-center gap-2">
              <p className="text-2xl text-white">
                {hello ? hello.greeting : "Loading tRPC query..."}
              </p>
            </div>

            <MultipleSelectorDemo />
            <LatestCategoryCollection />
          </div>
        </main> */}
      </HydrateClient>
    </>
  );
}
