import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { ruleService } from "@/server/service/rule-service";
import { TutorialFormSchema } from "@/schemas/tutorial-schema";
import { z } from "zod";
export const tutorialRouter = createTRPCRouter({
  checkUrlExists: publicProcedure
    .input(z.object({ link: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const tutorial = await ctx.db.tutorial.findFirst({
        where: {
          link: input.link,
        },
      });

      if (tutorial) {
        return {
          exists: true,
        };
      }
      return {
        exists: false,
      };
    }),

  add: publicProcedure
    .input(TutorialFormSchema)
    .mutation(async ({ ctx, input }) => {
      try {
        let slug = input.slug;
        if (slug === "") {
          slug = input.link.split("/").pop() ?? "";
        }

        const tutorial = await ctx.db.tutorial.findFirst({
          where: {
            slug: slug,
          },
        });

        if (tutorial) {
          return {
            success: false,
            message: "Slug already exists",
          };
        }

        // start to save
        const newTutorial = await ctx.db.tutorial.create({
          data: {
            link: input.link,
            slug: slug,
            title: input.title,
            description: input.description,
            source: input.source,
            rawValue: input.rawValue,
            author: input.author,
            authorLink: input.authorLink,
            authorAvatar: input.authorAvatar,
            language: input.language,
          },
        });

        return {
          success: true,
          tutorial: newTutorial,
        };
      } catch (error) {
        console.error(error);
        throw new Error("Error adding tutorial");
      }
    }),

  fetchTutorialList: publicProcedure
    .input(
      z.object({
        page: z.number().optional().default(1),
        limit: z.number().optional().default(10),
        keyword: z.string().optional().default(""),
      }),
    )
    .query(async ({ ctx, input }) => {
      const { page, limit, keyword } = input;

      const tutorialList = await ctx.db.tutorial.findMany({
        where: {
          title: {
            contains: keyword,
            mode: "insensitive",
          },
        },
        skip: (page - 1) * limit,
        take: limit,
        orderBy: {
          id: "asc",
        },
      });

      const total = await ctx.db.tutorial.count({
        where: {
          title: {
            contains: keyword,
            mode: "insensitive",
          },
        },
      });

      return {
        items: tutorialList,
        total,
      };
    }),

  searchTutorials: publicProcedure
    .input(
      z.object({
        source: z.string().default(""),
        cursor: z.number().min(0).default(0),
        limit: z.number().min(1).default(12),
      }),
    )
    .query(async ({ ctx, input }) => {
      const { cursor, limit, source } = input;

      const tutorials = await ctx.db.tutorial
        .findMany({
          where: {
            source: source && source !== "" ? source : undefined,
          },
          cursor: cursor ? { id: cursor } : undefined,
          take: limit + 1, // 多获取一条来判断是否还有更多
          orderBy: {
            id: "desc", // 假设有这个字段
          },
        })
        .catch((error: Error) => {
          throw new Error(`Failed to fetch tutorials: ${error.message}`);
        });

      let nextCursor: number | undefined;
      if (tutorials.length > limit) {
        const nextItem = tutorials.pop(); // 移除多余的一条
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
        tutorials,
        nextCursor,
      };
    }),

  //   getLatest: publicProcedure.query(async ({ ctx }) => {
  //     const post = await ctx.db.post.findFirst({
  //       orderBy: { createdAt: "desc" },
  //     });

  //     return post ?? null;
  //   }),
});
