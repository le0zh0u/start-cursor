import { Category, RuleTemplate } from "@prisma/client";
import { ruleAuthorService } from "../service/rule-author-service";
import { CursorRulesFinderItem } from "../model/cursor-rules-finder";
import { categoryService } from "../service/category-service";
import { ruleService } from "../service/rule-service";
import { rules as CursorRulesFinderRules } from "../../data";

class CursorRulesFinderLoader {
  async load(content: string): Promise<RuleTemplate[]> {
    const rules = CursorRulesFinderRules;

    const ruleTemplates: RuleTemplate[] = [];
    for (const item of rules) {
      // save author
      const ruleAuthor = await ruleAuthorService.getOrCreateRuleAuthor({
        name: item.author.name,
        link: item.author.url,
        avatar: item.author.avatar,
      });

      if (!ruleAuthor) {
        throw new Error("Failed to create rule author");
      }

      // save to rule category
      // parser tags
      const categories: Category[] = [];
      if (item.tags && item.tags.length > 0) {
        for (const tag of item.tags) {
          const name = tag;
          const category = await categoryService.getOrCreateCategory({
            name,
          });
          categories.push(category);
        }
      }

      if (item.libs && item.libs.length > 0) {
        for (const lib of item.libs) {
          const name = lib;
          const category = await categoryService.getOrCreateCategory({
            name,
          });
          categories.push(category);
        }
      }

      // save to rule template
      if (!item.slug || item.slug === "") {
        throw new Error("Rule slug is required");
      }

      const rule = await ruleService.getOrCreateRule({
        title: item.title,
        content: item.content,
        slug: item.slug,
        ruleAuthorId: ruleAuthor.id,
        categories,
      });

      if (!rule) {
        throw new Error("Failed to get or create rule");
      }

      ruleTemplates.push(rule);
    }

    return ruleTemplates;
  }
}

export const cursorRulesFinderLoader = new CursorRulesFinderLoader();
