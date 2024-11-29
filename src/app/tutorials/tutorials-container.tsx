"use client";
import { api } from "@/trpc/react";
import React, { useCallback, useEffect, useState } from "react";
import { TweetCard } from "@/components/magicui/tweet-card";
import { ClientTweetCard } from "@/components/magicui/client-tweet-card";
import { YouTubeEmbed } from "@next/third-parties/google";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Tutorial } from "@prisma/client";
import { getTweetId, getYoutubeVideoId } from "@/lib/tutorial-utils";

import { useInView } from "react-intersection-observer";

import Link from "next/link";

import Image from "next/image";

import RuleCardSkeleton from "@/components/rules/rule-card-skeleton";

const YoutubeCard = ({ tutorial }: { tutorial: Tutorial }) => {
  const videoid = getYoutubeVideoId(tutorial.link);

  return (
    <Card className="group/bento flex h-full flex-col rounded-lg border border-transparent shadow-input transition duration-200 hover:shadow-xl">
      <CardHeader className="px-0 pt-0">
        <div className="overflow-hidden rounded-t-lg">
          {videoid && <YouTubeEmbed videoid={videoid} />}
          {!videoid && <div className="h-40 w-full bg-muted-foreground" />}
        </div>
      </CardHeader>
      <CardContent
        className="flex-1 cursor-pointer transition duration-200 group-hover/bento:translate-x-2"
        onClick={() => window.open(tutorial.link, "_blank")}
      >
        <p className="font-semibold">{tutorial.title}</p>

        <p className="text-sm text-muted-foreground">{tutorial.description}</p>
      </CardContent>
      <CardFooter className="flex w-full items-center justify-between gap-2 px-6 py-4">
        <Link
          href={tutorial.authorLink}
          className="truncate text-nowrap font-semibold text-foreground"
        >
          @ {tutorial.author}
        </Link>

        <Link
          href={tutorial.link}
          className="flex-shrink-0 text-sm text-muted-foreground"
        >
          <Image
            className="h-5 w-5"
            src="/icons/youtube.svg"
            alt="youtube"
            width={20}
            height={20}
          />
        </Link>
      </CardFooter>
    </Card>
  );
};

const TwitterCard = ({ tutorial }: { tutorial: Tutorial }) => {
  const tweetId = getTweetId(tutorial.link);
  if (!tweetId) return null;
  return <ClientTweetCard id={tweetId} />;
};

const TutorialsContainer = () => {
  const { ref, inView } = useInView();

  const {
    data: results,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
  } = api.tutorial.searchTutorials.useInfiniteQuery(
    {
      limit: 18,
    },
    {
      getNextPageParam: (lastPage) => lastPage.nextCursor,
    },
  );

  const loadMore = useCallback(async () => {
    try {
      await fetchNextPage();
    } catch (error) {
      console.error("load more error:", error);
    }
  }, [fetchNextPage]);

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      // 使用 void 操作符明确标记我们知道这是一个异步操作
      void loadMore();
    }
  }, [inView, hasNextPage, isFetchingNextPage, loadMore]);

  return (
    <div className="flex w-full flex-col">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-4">
        {results?.pages.map((page) => {
          return (
            <>
              {page.tutorials.map((tutorial) => {
                if (tutorial.source === "YOUTUBE") {
                  return <YoutubeCard key={tutorial.id} tutorial={tutorial} />;
                }
                return <TwitterCard key={tutorial.id} tutorial={tutorial} />;
              })}
            </>
          );
        })}
      </div>
      <div ref={ref} className="w-full py-4 text-foreground">
        {isLoading || isFetchingNextPage ? <TutorialsLoadingGrid /> : ""}
      </div>
    </div>
  );
};

const TutorialsLoadingGrid = () => {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-4">
      <RuleCardSkeleton />
      <RuleCardSkeleton />
      <RuleCardSkeleton />
      <RuleCardSkeleton className="hidden lg:block" />
    </div>
  );
};

export default TutorialsContainer;
