"use client";

import { useState } from "react";

import { api } from "@/trpc/react";

export function LatestCategoryCollection() {
  const [categoryCollections] =
    api.category.categoryCollectionList.useSuspenseQuery();

  const utils = api.useUtils();
  const [name, setName] = useState("");
  const createPost = api.category.create.useMutation({
    onSuccess: async () => {
      await utils.category.invalidate();
      setName("");
    },
  });

  return (
    <div className="w-full max-w-xs">
      {categoryCollections ? (
        <>
          {categoryCollections.map((item) => {
            return (
              <p key={item.id} className="truncate">
                {item.name} - {item.categories.length}
              </p>
            );
          })}
        </>
      ) : (
        <p>You have no category list yet.</p>
      )}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          createPost.mutate({ name });
        }}
        className="flex flex-col gap-2"
      >
        <input
          type="text"
          placeholder="Title"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full rounded-full px-4 py-2 text-black"
        />
        <button
          type="submit"
          className="rounded-full bg-white/10 px-10 py-3 font-semibold transition hover:bg-white/20"
          disabled={createPost.isPending}
        >
          {createPost.isPending ? "Submitting..." : "Submit"}
        </button>
      </form>
    </div>
  );
}
