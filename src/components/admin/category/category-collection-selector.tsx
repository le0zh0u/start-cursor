"use client";

import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { useAdminStore } from "@/store/admin-store";
import { api } from "@/trpc/react";
import { Check, ChevronsUpDown, Loader2, PlusCircle } from "lucide-react";
import React, { useEffect } from "react";
const frameworks = [
  {
    value: "next.js",
    label: "Next.js",
  },
  {
    value: "sveltekit",
    label: "SvelteKit",
  },
  {
    value: "nuxt.js",
    label: "Nuxt.js",
  },
  {
    value: "remix",
    label: "Remix",
  },
  {
    value: "astro",
    label: "Astro",
  },
];

interface CategoryCollectionSelectorProps {
  selectedCollection: number;
  setSelectedCollection: (value: number) => void;
  refetchCollectionList: () => void;
}

const CategoryCollectionSelector = ({
  selectedCollection,
  setSelectedCollection,
  refetchCollectionList,
}: CategoryCollectionSelectorProps) => {
  const { categoryCollectionList, setCategoryCollectionList } = useAdminStore();

  const [open, setOpen] = React.useState(false);
  const [searchKeyword, setSearchKeyword] = React.useState("");

  const [createCollectionLoading, setCreateCollectionLoading] =
    React.useState(false);
  const { mutate: createCollection } =
    api.category.createCollection.useMutation({
      onSuccess: (data) => {
        setCategoryCollectionList([...categoryCollectionList, data]);
        setSelectedCollection(data.id);
        setSearchKeyword("");

        refetchCollectionList();
      },
      onError: () => {
        setCreateCollectionLoading(false);
      },
      onSettled: () => {
        setOpen(false);
        setCreateCollectionLoading(false);
      },
    });

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
        >
          {createCollectionLoading ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : selectedCollection ? (
            categoryCollectionList.find((c) => c.id === selectedCollection)
              ?.name
          ) : (
            "Select collection..."
          )}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput
            value={searchKeyword}
            placeholder="Search Collection..."
            onValueChange={(value) => setSearchKeyword(value)}
          />
          <CommandList>
            <CommandEmpty>
              {searchKeyword.length > 0 ? (
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => {
                    //add
                    if (searchKeyword.length > 0) {
                      createCollection({ name: searchKeyword });
                      setCreateCollectionLoading(true);
                    }
                  }}
                >
                  {createCollectionLoading ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  ) : (
                    <PlusCircle className={cn("mr-2 h-4 w-4 opacity-100")} />
                  )}
                  Add Collection
                </Button>
              ) : (
                <div className="text-sm text-gray-500">
                  No collection found, please add a new collection
                </div>
              )}
            </CommandEmpty>
            <CommandGroup>
              {categoryCollectionList.map((collection) => (
                <CommandItem
                  key={collection.id}
                  value={collection.name}
                  onSelect={(currentValue) => {
                    setSelectedCollection(
                      currentValue === selectedCollection.toString()
                        ? 0
                        : collection.id,
                    );
                    setOpen(false);
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      selectedCollection === collection.id
                        ? "opacity-100"
                        : "opacity-0",
                    )}
                  />
                  {collection.name}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default CategoryCollectionSelector;
