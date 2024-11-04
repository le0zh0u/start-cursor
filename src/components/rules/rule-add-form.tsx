"use client";
import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
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
import { Textarea } from "../ui/textarea";

const addRuleSchema = z.object({
  title: z.string().optional(),
  content: z.string().min(1, {
    message: "Rule content must be at least 1 characters.",
  }),
  slug: z.string().min(1, {
    message: "slug must be at least 1 characters.",
  }),
  // ruleAuthor: z.number().default(0),
  ruleAuthorName: z.string().optional(),
  ruleAuthorLink: z.string().optional(),
  ruleAuthorAvatar: z.string().optional(),
  categories: z.array(z.number()).default([]),
});

const RuleAddForm = () => {
  const form = useForm<z.infer<typeof addRuleSchema>>({
    resolver: zodResolver(addRuleSchema),
    defaultValues: {
      title: "",
      content: "",
      slug: "",
      // ruleAuthor: 0,
      ruleAuthorName: "",
      ruleAuthorLink: "",
      ruleAuthorAvatar: "",
      categories: [],
    },
  });

  function onSubmit(values: z.infer<typeof addRuleSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Rule Title</FormLabel>
              <FormControl>
                <Input placeholder="title" {...field} />
              </FormControl>
              <FormDescription>This is rule title to display</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Rule Content</FormLabel>
              <FormControl>
                <Textarea placeholder="Type your content here." {...field} />
              </FormControl>
              <FormDescription>This is rule content to display</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="slug"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Rule Slug</FormLabel>
              <FormControl>
                <Input placeholder="slug" {...field} />
              </FormControl>
              <FormDescription>This is rule slug for url</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="ruleAuthorName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Author Name</FormLabel>
              <FormControl>
                <Input placeholder="Please enter author name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="ruleAuthorLink"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Author Link</FormLabel>
              <FormControl>
                <Input
                  placeholder="Please enter author link"
                  type="url"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="ruleAuthorAvatar"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Author Avatar</FormLabel>
              <FormControl>
                <Input
                  placeholder="Please enter author avatar"
                  type="url"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
};

export default RuleAddForm;
