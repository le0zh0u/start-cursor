"use client";

import { Button } from "@/components/ui/button";
import { CategoryCollection } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";

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
  },
  {
    accessorKey: "slug",
    header: () => <div className="text-right">Slug</div>,
    cell: ({ row }) => {
      return <div className="text-right font-medium">{row.original.slug}</div>;
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
      return <>{row.original.categoryCollection.name}</>;
    },
  },
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
