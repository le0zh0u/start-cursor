import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { cursorRulesFinderLoader } from "@/server/loaders/cursor-rules-finder-loader";

function arrayToMap<T, K extends keyof T>(
  array: T[],
  keyField: K,
): Map<T[K], T> {
  return array.reduce((map, item) => {
    map.set(item[keyField], item);
    return map;
  }, new Map<T[K], T>());
}

export const ruleRouter = createTRPCRouter({
  fetchRuleList: publicProcedure
    .input(
      z.object({
        page: z.number().min(1).default(1),
        limit: z.number().min(1).default(18),
      }),
    )
    .query(async ({ ctx, input }) => {
      const { page, limit } = input;
      const rules = await ctx.db.ruleTemplate.findMany({
        skip: (page - 1) * limit,
        take: limit,
        include: {
          author: true,
          ruleTemplateCategory: true,
        },
      });

      const total = await ctx.db.ruleTemplate.count();
      return {
        items: rules,
        total,
      };
    }),
  searchRules: publicProcedure
    .input(
      z.object({
        keyword: z.string().default(""),
        cursor: z.number().min(0).default(0), // 使用cursor替代page
        limit: z.number().min(1).default(18),
        categoryIds: z.array(z.number()).default([]),
      }),
    )
    .query(async ({ ctx, input }) => {
      const { keyword, cursor, limit, categoryIds } = input;

      const rules = await ctx.db.ruleTemplate
        .findMany({
          where: {
            ruleTemplateCategory:
              categoryIds.length > 0
                ? {
                    some: {
                      categoryId: {
                        in: categoryIds,
                      },
                    },
                  }
                : undefined,
            OR: keyword
              ? [
                  {
                    title: { contains: keyword, mode: "insensitive" as const },
                  },
                  {
                    content: {
                      contains: keyword,
                      mode: "insensitive" as const,
                    },
                  },
                ]
              : undefined,
          },
          cursor: cursor ? { id: cursor } : undefined,
          take: limit + 1, // 多获取一条来判断是否还有更多
          include: {
            author: true,
            ruleTemplateCategory: true,
            githubProject: true,
          },
          orderBy: {
            id: "desc", // 假设有这个字段
          },
        })
        .catch((error: Error) => {
          throw new Error(`Failed to fetch rules: ${error.message}`);
        });

      let nextCursor: number | undefined;
      if (rules.length > limit) {
        const nextItem = rules.pop(); // 移除多余的一条
        nextCursor = nextItem!.id;
      }

      // const categoryIds = rules.flatMap((rule) =>
      //   rule.ruleTemplateCategory.map((item) => item.categoryId),
      // );

      // const categories = await ctx.db.category.findMany({
      //   where: {
      //     id: {
      //       in: categoryIds,
      //     },
      //   },
      // });

      // const categoryMap = arrayToMap(categories, "id");

      // const results = rules.map((rule) => {
      //   const { author, ruleTemplateCategory, ...ruleBasic } = rule;

      //   const categoryList = ruleTemplateCategory
      //     .map((rel) => {
      //       const category = categoryMap.get(rel.categoryId);
      //       return category ?? null;
      //     })
      //     .filter((category) => category !== null);

      //   return {
      //     ...ruleBasic,
      //     author,
      //     categoryList,
      //   };
      // });

      return {
        rules,
        nextCursor,
      };
    }),

  importDataFromCursorRulesFinder: publicProcedure.mutation(
    async ({ ctx, input }) => {
      // const ruleTemplates = await cursorRulesFinderLoader.load("");

      (async () => {
        try {
          // 执行后台任务
          await cursorRulesFinderLoader.load("");
        } catch (error) {
          console.error("Background task failed:", error);
        }
      })();

      // console.log("rule added: ", ruleTemplates);

      return {
        success: true,
      };
    },
  ),
  create: publicProcedure
    .input(
      z.object({
        title: z.string().min(1),
        content: z.string().min(1),
        slug: z.string().min(1),
        ruleAuthorName: z.string().min(1),
        ruleAuthorLink: z.string().min(1),
        ruleAuthorAvatar: z.string().min(1),
        categories: z.array(z.number()).default([]),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      //

      // create rule author
      const ruleAuthor = await ctx.db.ruleAuthor.create({
        data: {
          name: input.ruleAuthorName,
          link: input.ruleAuthorLink,
          avatar: input.ruleAuthorAvatar,
        },
      });

      return ctx.db.categoryCollection.create({
        data: {
          name: input.title,
        },
      });
    }),

  //   getLatest: publicProcedure.query(async ({ ctx }) => {
  //     const post = await ctx.db.post.findFirst({
  //       orderBy: { createdAt: "desc" },
  //     });

  //     return post ?? null;
  //   }),
});
