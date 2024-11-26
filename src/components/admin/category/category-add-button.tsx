"use client";

import React, { useState } from "react";
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

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Plus } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { api } from "@/trpc/react";
import { categoryFormSchema } from "@/schemas/category-schema";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useAdminStore } from "@/store/admin-store";

const CategoryAddButton = () => {
  const { categoryCollectionList, refetchCategoryList } = useAdminStore();

  const [open, setOpen] = useState(false);
  const form = useForm<z.infer<typeof categoryFormSchema>>({
    resolver: zodResolver(categoryFormSchema),
    defaultValues: {
      name: "",
      slug: "",
      desc: "",
      icon: "",
      categoryCollectionId: 0,
    },
  });

  const [createCategoryLoading, setCreateCategoryLoading] = useState(false);

  const { mutate: createCategory } = api.category.create.useMutation({
    onSuccess: () => {
      toast.success("Category created successfully");
      setOpen(false);
      form.reset();
      if (refetchCategoryList) {
        refetchCategoryList();
      }
    },
    onError: (error) => {
      toast.error(error.message);
    },
    onSettled: () => {
      setCreateCategoryLoading(false);
    },
  });

  function onSubmit(values: z.infer<typeof categoryFormSchema>) {
    setCreateCategoryLoading(true);
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    createCategory(values);
  }

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <Button variant="outline">
          <Plus className="h-4 w-4" />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Create Category</AlertDialogTitle>
        </AlertDialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category Name</FormLabel>
                  <FormControl>
                    <Input placeholder="shadcn" {...field} />
                  </FormControl>
                  <FormDescription>
                    This is category public display name.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="slug"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category Slug</FormLabel>
                  <FormControl>
                    <Input placeholder="shadcn" {...field} />
                  </FormControl>
                  <FormDescription>This is category slug.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="desc"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category Description</FormLabel>
                  <FormControl>
                    <Textarea placeholder="shadcn" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="icon"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category Icon</FormLabel>
                  <FormControl>
                    <Input placeholder="shadcn" {...field} />
                  </FormControl>
                  <FormDescription>This is category icon.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="categoryCollectionId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category Collection</FormLabel>
                  <Select
                    onValueChange={(value) => {
                      field.onChange(Number(value));
                    }}
                    defaultValue={field.value.toString()}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a verified email to display" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {categoryCollectionList.map((collection) => (
                        <SelectItem
                          key={collection.id}
                          value={collection.id.toString()}
                        >
                          {collection.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <AlertDialogFooter>
              <AlertDialogCancel disabled={createCategoryLoading}>
                Cancel
              </AlertDialogCancel>
              <Button type="submit" disabled={createCategoryLoading}>
                Submit
              </Button>
            </AlertDialogFooter>
          </form>
        </Form>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default CategoryAddButton;
