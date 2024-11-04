"use client";

import { Button } from "@/components/ui/button";
import { RuleAuthor, RuleTemplate } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";

type RuleTemplateWithAuthor = RuleTemplate & {
  author: RuleAuthor;
};

export const columns: ColumnDef<RuleTemplateWithAuthor>[] = [
  {
    accessorKey: "title",
    header: "Title",
  },
  {
    accessorKey: "slug",
    header: () => <div className="text-start">Slug</div>,
    cell: ({ row }) => {
      return <div className="text-start font-medium">{row.original.slug}</div>;
    },
  },
  {
    accessorKey: "author",
    header: "Author",
    cell: ({ row }) => {
      return <>{row.original.author.name}</>;
    },
  },
  //   {
  //     accessorKey: "category",
  //     header: "Category",
  //     cell: ({ row }) => {
  //       return <>{row.original.category.name}</>;
  //     },
  //   },
  {
    accessorKey: "createdAt",
    header: "Created At",
    cell: ({ row }) => {
      return <>{row.original.createdAt.toLocaleDateString()}</>;
    },
  },
  // {
  //   accessorKey: "action",
  //   header: "Action",
  //   cell: ({ row }) => {
  //     return (
  //       <div className="flex items-center justify-start gap-2">
  //         <Button>Edit</Button>
  //         <Button>Delete</Button>
  //       </div>
  //     );
  //   },
  // },
];
