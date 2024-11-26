"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { useAdminStore } from "@/store/admin-store";
import { api } from "@/trpc/react";
import React, { useState } from "react";
import { toast } from "sonner";

const CollectionDeleteButton = ({ collectionId }: { collectionId: number }) => {
  const { categoryCollectionList, setCategoryCollectionList } = useAdminStore();

  const [open, setOpen] = useState(false);

  const { mutate: deleteCollection } =
    api.category.deleteCollection.useMutation({
      onSuccess: () => {
        toast.success("Collection deleted successfully");
        setCategoryCollectionList(
          categoryCollectionList.filter(
            (collection) => collection.id !== collectionId,
          ),
        );
      },
      onError: (error) => {
        toast.error(error.message);
      },
    });

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <Button variant="destructive" size="sm">
          Delete
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete category
            and remove data.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            className="bg-red-500"
            onClick={() => {
              deleteCollection({ collectionId: collectionId });
            }}
          >
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default CollectionDeleteButton;
