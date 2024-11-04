import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { type Category, type CategoryCollection } from "@prisma/client";

export const categoryRouter = createTRPCRouter({
  fetchCategoryList: publicProcedure
    .input(
      z.object({
        page: z.number().optional().default(1),
        limit: z.number().optional().default(10),
        keyword: z.string().optional(),
      }),
    )
    .query(async ({ ctx, input }) => {
      const { page, limit, keyword } = input;
      const categoryList = await ctx.db.category.findMany({
        where: {
          name: {
            contains: keyword,
            mode: "insensitive",
          },
        },
        include: {
          categoryCollection: true,
        },
        skip: (page - 1) * limit,
        take: limit,
        orderBy: {
          id: "asc",
        },
      });

      const total = await ctx.db.category.count({
        where: {
          name: {
            contains: keyword,
            mode: "insensitive",
          },
        },
      });

      return {
        items: categoryList,
        total,
      };
    }),

  categoryCollectionList: publicProcedure.query<
    ({
      categories: Category[];
    } & CategoryCollection)[]
  >(async ({ ctx }) => {
    console.log("fetchCategoryCollectionList");
    const categoryCollections = await ctx.db.categoryCollection
      .findMany({
        include: {
          categories: true,
        },
        orderBy: {
          sort: "desc",
        },
      })
      .catch((error: Error) => {
        throw new Error(
          `Failed to fetch category collections: ${error.message}`,
        );
      });
    return categoryCollections ?? [];
  }),

  create: publicProcedure
    .input(z.object({ name: z.string().min(1) }))
    .mutation(async ({ ctx, input }) => {
      return ctx.db.categoryCollection.create({
        data: {
          name: input.name,
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
