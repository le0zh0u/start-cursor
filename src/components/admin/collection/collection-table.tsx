"use client";

import React, { useEffect, useState } from "react";
import { useAdminStore } from "@/store/admin-store";
import { api } from "@/trpc/react";
import TableCellEditField from "@/components/common/table-cell-edit-field";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import CollectionDeleteButton from "./collection-delete-button";
import { CategoryCollection } from "@prisma/client";
// import CategoryAddButton from "./category-add-button";

const NameCell = ({
  collectionId,
  name,
}: {
  collectionId: number;
  name: string;
}) => {
  const [isEdit, setIsEdit] = useState(false);
  const { categoryCollectionList, setCategoryCollectionList } = useAdminStore();

  const { mutate: changeCollectionName } =
    api.category.changeCollectionName.useMutation({
      onSuccess: (data) => {
        toast.success("Collection name changed");
        setCategoryCollectionList(
          categoryCollectionList.map((collection) => {
            if (collection.id === collectionId) {
              return { ...collection, name: data };
            }
            return collection;
          }),
        );
        setIsEdit(false);
      },
      onError: () => {
        toast.error("Failed to change collection name");
      },
    });
  return (
    <div className="text-right font-medium">
      <TableCellEditField
        value={name}
        isEdit={isEdit}
        onChange={(value) => {
          changeCollectionName({
            collectionId: collectionId,
            name: value,
          });
        }}
        toggleEdit={() => setIsEdit(!isEdit)}
      />
    </div>
  );
};

const SortCell = ({
  collectionId,
  sort,
}: {
  collectionId: number;
  sort: string;
}) => {
  const { categoryCollectionList, setCategoryCollectionList } = useAdminStore();
  const [isEdit, setIsEdit] = useState(false);
  const { mutate: changeCollectionSort } =
    api.category.changeCollectionSort.useMutation({
      onSuccess: (data) => {
        toast.success("Collection sort changed");
        setCategoryCollectionList(
          categoryCollectionList.map((collection) => {
            if (collection.id === collectionId) {
              return { ...collection, sort: data };
            }
            return collection;
          }),
        );
        setIsEdit(false);
      },
      onError: () => {
        toast.error("Failed to change collection sort");
      },
    });
  return (
    <div className="text-right font-medium">
      <TableCellEditField
        value={sort}
        isEdit={isEdit}
        onChange={(value) => {
          changeCollectionSort({
            collectionId: collectionId,
            sort: parseInt(value),
          });
        }}
        toggleEdit={() => setIsEdit(!isEdit)}
      />
    </div>
  );
};

const CategoryCollectionDataTable = ({
  collectionList,
}: {
  collectionList: CategoryCollection[];
}) => {
  const { categoryCollectionList, setCategoryCollectionList } = useAdminStore();

  useEffect(() => {
    if (collectionList) {
      setCategoryCollectionList(collectionList);
    }
  }, [setCategoryCollectionList, collectionList]);

  return (
    <div className="flex flex-col gap-2">
      {categoryCollectionList
        .sort((a, b) => {
          const s = a.sort - b.sort;
          if (s === 0) {
            return a.createdAt.getTime() - b.createdAt.getTime();
          }
          return s;
        })
        .map((collection) => (
          <Card key={collection.id}>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between gap-4">
                <div className="flex w-full flex-col items-start justify-start gap-4">
                  <NameCell
                    collectionId={collection.id}
                    name={collection.name}
                  />

                  <div className="flex items-center gap-1 text-sm">
                    排序：
                    <SortCell
                      collectionId={collection.id}
                      sort={collection.sort.toString()}
                    />
                  </div>
                </div>

                <CollectionDeleteButton collectionId={collection.id} />
              </div>
            </CardContent>
          </Card>
        ))}
    </div>
  );
};

export default CategoryCollectionDataTable;
