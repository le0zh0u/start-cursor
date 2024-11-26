import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { type Category, type CategoryCollection } from "@prisma/client";
import { categoryFormSchema } from "@/schemas/category-schema";

export const categoryRouter = createTRPCRouter({
  fetchCategoryList: publicProcedure
    .input(
      z.object({
        page: z.number().optional().default(1),
        limit: z.number().optional().default(10),
        keyword: z.string().optional(),
        collectionId: z.number().optional(),
      }),
    )
    .query(async ({ ctx, input }) => {
      const { page, limit, keyword, collectionId } = input;
      const categoryList = await ctx.db.category.findMany({
        where: {
          name: {
            contains: keyword,
            mode: "insensitive",
          },
          categoryCollectionId: collectionId === 0 ? undefined : collectionId,
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

  createCollection: publicProcedure
    .input(z.object({ name: z.string().min(1) }))
    .mutation(async ({ ctx, input }) => {
      const collection = await ctx.db.categoryCollection.findFirst({
        where: {
          name: input.name,
        },
      });

      if (collection) {
        return collection;
      } else {
        return ctx.db.categoryCollection.create({
          data: {
            name: input.name,
          },
        });
      }
    }),

  create: publicProcedure
    .input(categoryFormSchema)
    .mutation(async ({ ctx, input }) => {
      const category = await ctx.db.category.findFirst({
        where: {
          slug: input.slug,
        },
      });
      if (category) {
        return category;
      } else {
        const collection = await ctx.db.categoryCollection.findUnique({
          where: {
            id: input.categoryCollectionId,
          },
        });

        if (!collection) {
          throw new Error("Category collection not found");
        }

        return ctx.db.category.create({
          data: {
            ...input,
            desc: input.desc ?? "",
            icon: input.icon ?? "",
          },
        });
      }
    }),

  delete: publicProcedure
    .input(z.object({ categoryId: z.number() }))
    .mutation(async ({ ctx, input }) => {
      return ctx.db.category.delete({
        where: { id: input.categoryId },
      });
    }),

  changeCategoryCollection: publicProcedure
    .input(z.object({ categoryId: z.number(), collectionId: z.number() }))
    .mutation(async ({ ctx, input }) => {
      await ctx.db.category.update({
        where: {
          id: input.categoryId,
        },
        data: {
          categoryCollectionId: input.collectionId,
        },
      });

      const collection = await ctx.db.categoryCollection.findUnique({
        where: {
          id: input.collectionId,
        },
      });

      return collection;
    }),

  changeCategoryName: publicProcedure
    .input(z.object({ categoryId: z.number(), name: z.string().min(1) }))
    .mutation(async ({ ctx, input }) => {
      await ctx.db.category.update({
        where: { id: input.categoryId },
        data: { name: input.name },
      });
    }),

  changeCategorySlug: publicProcedure
    .input(z.object({ categoryId: z.number(), slug: z.string().min(1) }))
    .mutation(async ({ ctx, input }) => {
      await ctx.db.category.update({
        where: { id: input.categoryId },
        data: { slug: input.slug },
      });
    }),

  changeCollectionName: publicProcedure
    .input(z.object({ collectionId: z.number(), name: z.string().min(1) }))
    .mutation(async ({ ctx, input }) => {
      await ctx.db.categoryCollection.update({
        where: { id: input.collectionId },
        data: { name: input.name },
      });

      return input.name;
    }),

  changeCollectionSort: publicProcedure
    .input(z.object({ collectionId: z.number(), sort: z.number() }))
    .mutation(async ({ ctx, input }) => {
      await ctx.db.categoryCollection.update({
        where: { id: input.collectionId },
        data: { sort: input.sort },
      });

      return input.sort;
    }),

  deleteCollection: publicProcedure
    .input(z.object({ collectionId: z.number() }))
    .mutation(async ({ ctx, input }) => {
      await ctx.db.categoryCollection.delete({
        where: { id: input.collectionId },
      });
    }),

  //   getLatest: publicProcedure.query(async ({ ctx }) => {
  //     const post = await ctx.db.post.findFirst({
  //       orderBy: { createdAt: "desc" },
  //     });

  //     return post ?? null;
  //   }),
});
