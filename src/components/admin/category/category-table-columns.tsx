"use client";

import { CategoryCollection } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import CategoryCollectionSelector from "./category-collection-selector";
import { api } from "@/trpc/react";
import { toast } from "sonner";
import CategoryDeleteButton from "./category-delete-button";
import EditCategoryName from "./edit-category-name";
import EditCategorySlug from "./edit-category-slug";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Category = {
  id: number;

  name: string;
  slug: string;
  icon: string;
  desc: string;
  categoryCollection: CategoryCollection;
  createdAt: Date;
};

export const columns: ColumnDef<Category>[] = [
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => {
      return (
        <div className="text-right font-medium">
          <EditCategoryName
            name={row.original.name}
            categoryId={row.original.id}
          />
        </div>
      );
    },
  },
  {
    accessorKey: "slug",
    header: "Slug",
    cell: ({ row }) => {
      return (
        <div className="text-right font-medium">
          <EditCategorySlug
            slug={row.original.slug}
            categoryId={row.original.id}
          />
        </div>
      );
    },
  },
  {
    accessorKey: "icon",
    header: "Icon",
  },
  {
    accessorKey: "desc",
    header: "Description",
  },
  {
    accessorKey: "categoryCollection",
    header: "Collection",
    cell: ({ row }) => {
      const { mutate: changeCategoryCollection } =
        api.category.changeCategoryCollection.useMutation({
          onSuccess: (data) => {
            toast.success("Category collection updated");
            if (data) {
              row.original.categoryCollection = data;
            }
          },
        });
      return (
        <CategoryCollectionSelector
          selectedCollection={row.original.categoryCollection.id}
          setSelectedCollection={(value) => {
            // update categoryCollection
            changeCategoryCollection({
              categoryId: row.original.id,
              collectionId: value,
            });
          }}
          refetchCollectionList={() => {
            console.log("refetchCollectionList");
          }}
        />
      );
    },
  },
  {
    accessorKey: "createdAt",
    header: "Created At",
    cell: ({ row }) => {
      return <>{row.original.createdAt.toLocaleDateString()}</>;
    },
  },
  {
    accessorKey: "action",
    header: "Action",
    cell: ({ row }) => {
      return (
        <div className="flex items-center justify-start gap-2">
          <CategoryDeleteButton categoryId={row.original.id} />
        </div>
      );
    },
  },
];
