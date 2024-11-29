"use client";

import { Button } from "@/components/ui/button";
import { Tutorial } from "@prisma/client";

import { ColumnDef } from "@tanstack/react-table";

export const columns: ColumnDef<Tutorial>[] = [
  {
    accessorKey: "source",
    header: "Source",
  },
  {
    accessorKey: "link",
    header: () => <div className="text-start">Link</div>,
    cell: ({ row }) => {
      return <div className="text-start font-medium">{row.original.link}</div>;
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
