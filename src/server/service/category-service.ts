import { type Category, type CategoryCollection } from "@prisma/client";
import { db } from "../db";
import { createSlug } from "../lib/utils";

export interface SaveCategoryProps {
  name: string;
  slug?: string;
  desc?: string;
  icon?: string;
  categoryCollectionId?: number;
}

class CategoryService {
  async getDefaultCategoryCollection(): Promise<CategoryCollection> {
    const defaultName = "Default";

    const categoryCollection = await db.categoryCollection.findFirst({
      where: {
        name: defaultName,
      },
    });

    if (categoryCollection) {
      return categoryCollection;
    }

    // create
    return await db.categoryCollection.create({
      data: {
        name: defaultName,
      },
    });
  }

  async getOrCreateCategory({
    name,
    slug,
    desc,
    icon,
    categoryCollectionId,
  }: SaveCategoryProps): Promise<Category> {
    if (name === "") {
      throw new Error("Category name is required");
    }

    const slugValue = slug ? createSlug(slug) : createSlug(name);

    // get by slug
    const category = await db.category.findFirst({
      where: {
        slug: slugValue,
      },
    });

    if (category) {
      return category;
    }

    let collectionId = categoryCollectionId;
    if (!collectionId) {
      const collection = await this.getDefaultCategoryCollection();
      collectionId = collection.id;
    }

    // create
    return await db.category.create({
      data: {
        name,
        slug: slugValue,
        desc: desc ?? "",
        icon: icon ?? "",
        categoryCollectionId: collectionId,
      },
    });
  }
}

export const categoryService = new CategoryService();
