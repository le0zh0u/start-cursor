import { type RuleAuthor } from "@prisma/client";
import { db } from "../db";

export interface getOrCreateRuleAuthorProps {
  name: string;
  link: string;
  avatar: string;
}

class RuleAuthorService {
  async getOrCreateRuleAuthor({
    name,
    link,
    avatar,
  }: getOrCreateRuleAuthorProps): Promise<RuleAuthor> {
    if (name === "") {
      // return unknown author
      return await this.getUnknownAuthor();
    }

    // get author by name or url
    let author = null;

    if (link && link != "") {
      // link is not empty, get by link
      author = await db.ruleAuthor
        .findFirst({
          where: {
            link: link,
          },
        })
        .catch((error: Error) => {
          throw new Error(`Failed to fetch rules: ${error.message}`);
        });
    }

    if (!author) {
      // get by name
      author = await db.ruleAuthor
        .findFirst({
          where: {
            name: name,
          },
        })
        .catch((error: Error) => {
          throw new Error(`Failed to fetch rules: ${error.message}`);
        });
    }

    if (author) {
      // update author
      return await db.ruleAuthor.update({
        where: {
          id: author.id,
        },
        data: {
          name,
          link: link,
          avatar,
        },
      });
    } else {
      // create author
      return await db.ruleAuthor.create({
        data: {
          name,
          link,
          avatar,
        },
      });
    }
  }

  async getUnknownAuthor(): Promise<RuleAuthor> {
    const name = "Unknown";
    const link = "";
    const avatar = "";

    const author = await db.ruleAuthor
      .findFirst({
        where: {
          name: name,
        },
      })
      .catch((error: Error) => {
        throw new Error(`Failed to fetch rules: ${error.message}`);
      });

    if (author) {
      return author;
    } else {
      return await db.ruleAuthor.create({
        data: {
          name,
          link,
          avatar,
        },
      });
    }
  }
}

export const ruleAuthorService = new RuleAuthorService();
