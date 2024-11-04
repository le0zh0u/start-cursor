import { db } from "@/server/db";
import { Category, RuleTemplate } from "@prisma/client";
import { createSlug } from "../lib/utils";
import { GithubProjectInfo } from "../model/github";
import { ruleAuthorService } from "./rule-author-service";
import { categoryService } from "./category-service";

export interface CreateRuleProps {
  title: string;
  content: string;
  slug: string;
  ruleAuthorId: number;
  categories: Category[];
}

class RuleService {
  async getOrCreateRule({
    title,
    content,
    slug,
    ruleAuthorId,
    categories,
  }: CreateRuleProps): Promise<RuleTemplate> {
    if (slug === "") {
      throw new Error("Rule slug is required");
    }

    const slugValue = createSlug(slug);
    // get rule by slug
    let rule = await db.ruleTemplate.findFirst({
      where: {
        slug: slugValue,
      },
    });

    if (rule) {
      return rule;
    }

    content = content.trim();

    // create rule
    rule = await db.ruleTemplate.create({
      data: {
        title,
        content,
        slug: slugValue,
        author: {
          connect: {
            id: ruleAuthorId,
          },
        },
      },
    });

    // save categories
    const categoryList = categories.filter(
      (item, index) => categories.findIndex((t) => t.id === item.id) === index,
    );
    for (const category of categoryList) {
      const ruleTemplateCategory = await db.ruleTemplateCategory.findUnique({
        where: {
          ruleTemplateId_categoryId: {
            ruleTemplateId: rule.id,
            categoryId: category.id,
          },
        },
      });

      if (!ruleTemplateCategory) {
        await db.ruleTemplateCategory.create({
          data: {
            ruleTemplateId: rule.id,
            categoryId: category.id,
          },
        });
      }
    }

    return rule;
  }

  async saveRuleFromGithubProject(
    project: GithubProjectInfo,
  ): Promise<RuleTemplate> {
    // create rule template
    const ruleSlug = `github-${project.slug}`;

    const ruleAuthor = await ruleAuthorService.getUnknownAuthor();

    const categories: Category[] = [];
    const githubCategory = await categoryService.getOrCreateCategory({
      name: "Github",
    });
    categories.push(githubCategory);

    if (project.language && project.language !== "") {
      const languageCategory = await categoryService.getOrCreateCategory({
        name: project.language,
      });
      categories.push(languageCategory);
    }

    const rule = await this.getOrCreateRule({
      title: project.name,
      content: project.cursorRule,
      slug: ruleSlug,
      ruleAuthorId: ruleAuthor.id,
      categories,
    });

    return rule;
  }
}

export const ruleService = new RuleService();
