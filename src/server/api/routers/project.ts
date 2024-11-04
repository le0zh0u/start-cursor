import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { ruleService } from "@/server/service/rule-service";

export const projectRouter = createTRPCRouter({
  addProject: publicProcedure
    .input(
      z.object({
        name: z.string().min(1),
        slug: z.string().min(1),
        description: z.string().default(""),
        stars: z.number().default(0),
        url: z.string().min(1),
        cursorRuleUrl: z.string().min(1),
        cursorRule: z.string().min(1),
        language: z.string().default(""),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const project = await ctx.db.githubProject.findFirst({
        where: {
          slug: input.slug,
        },
      });

      const { cursorRule, language, ...projectRest } = input;

      if (project) {
        // update project
        const updatedProject = await ctx.db.githubProject.update({
          where: {
            id: project.id,
          },
          data: projectRest,
        });

        // update cursor rule
        await ctx.db.ruleTemplate.update({
          where: {
            id: project.ruleTemplateId,
          },
          data: {
            content: cursorRule,
          },
        });

        return updatedProject;
      }

      // create rule template
      const rule = await ruleService.saveRuleFromGithubProject(input);

      return await ctx.db.githubProject.create({
        data: {
          ...projectRest,
          ruleTemplateId: rule.id,
        },
      });
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
