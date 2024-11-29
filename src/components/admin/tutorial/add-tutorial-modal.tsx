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
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Language,
  TutorialFormSchema,
  TutorialSource,
} from "@/schemas/tutorial-schema";
import { createSlug } from "@/server/lib/utils";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { api } from "@/trpc/react";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import slugify from "@sindresorhus/slugify";
import { cn } from "@/lib/utils";

const YouTubeEmbedSchema = z.object({
  title: z.string().optional(),
  author_name: z.string().optional(),
  author_url: z.string().url().optional(),
  type: z.string().optional(),
  height: z.number().optional(),
  width: z.number().optional(),
  version: z.string().optional(),
  provider_name: z.string().optional(),
  provider_url: z.string().url().optional(),
  thumbnail_height: z.number().optional(),
  thumbnail_width: z.number().optional(),
  thumbnail_url: z.string().url().optional(),
  html: z.string().optional(),
});

// 类型推断
type YouTubeEmbedModel = z.infer<typeof YouTubeEmbedSchema>;

interface AddTutorialModalProps {
  buttonVariant?: "default" | "outline" | "ghost";
}

const AddTutorialModal = ({
  buttonVariant = "default",
}: AddTutorialModalProps) => {
  const [open, setOpen] = useState(false);

  const form = useForm<z.infer<typeof TutorialFormSchema>>({
    resolver: zodResolver(TutorialFormSchema),
    defaultValues: {
      link: "",
      source: TutorialSource.YOUTUBE,
      title: "",
      slug: "",
      description: "",
      author: "",
      language: Language.EN,
    },
  });

  const { mutate: checkUrlExists } = api.tutorial.checkUrlExists.useMutation({
    onSuccess: (data) => {
      if (data.exists) {
        form.setError("link", {
          type: "custom",
          message: "Link already exists",
        });
      } else {
        form.clearErrors("link");
      }
    },
    onError: () => {
      toast.error("Error checking url");
    },
  });

  // 如果需要部分验证（返回部分结果而不是抛出错误）
  const validateYouTubeEmbedSafe = (data: unknown) => {
    return YouTubeEmbedSchema.safeParse(data);
  };

  const loadYoutube = async (url: URL) => {
    // get youtube info from youtube api
    // const videoId = form.getValues("link").split("v=")[1];

    const videoId = url.searchParams.get("v");
    if (!videoId) {
      form.setError("link", {
        type: "custom",
        message: "Get youtube video id failed",
      });
      return;
    }

    await fetch(
      `https://www.youtube.com/oembed?url=http%3A//youtube.com/watch%3Fv%3D${videoId}&format=json`,
    )
      .then((res) => res.json())
      .then((data) => {
        const result = validateYouTubeEmbedSafe(data);
        if (result.success) {
          const youtubeData = result.data;
          form.setValue("title", youtubeData.title ?? "");
          form.setValue("slug", slugify(form.getValues("title")));
          form.setValue("author", youtubeData.author_name ?? "");
          form.setValue("authorLink", youtubeData.author_url ?? "");
          form.setValue("rawValue", JSON.stringify(youtubeData));
        } else {
          console.log("data", result.error);
        }
      });

    return;
  };

  const handleLink = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const link = e.target.value;
    if (!link) return;

    void checkUrlExists({ link });

    // clear data
    form.resetField("title");
    form.resetField("slug");
    form.resetField("description");
    form.resetField("author");
    form.resetField("authorLink");
    form.resetField("authorAvatar");
    form.resetField("language");
    form.resetField("rawValue");

    try {
      const url = new URL(link);
      if (url.hostname.includes("youtube.com")) {
        // form.reset({
        //   ...form.getValues(), // 保持其他字段不变
        //   source: TutorialSource.YOUTUBE
        // })
        form.setValue("source", TutorialSource.YOUTUBE);
        await loadYoutube(url);
      } else if (
        url.hostname.includes("x.com") ||
        url.hostname.includes("twitter.com")
      ) {
        //https://x.com/sharingbebetter/status/1860192257351250189
        // form.reset({
        //   ...form.getValues(), // 保持其他字段不变
        //   source: TutorialSource.TWITTER,
        // });
        form.setValue("source", TutorialSource.TWITTER);
      } else {
        form.setValue("source", TutorialSource.ARTICLE);
        return;
      }
    } catch (error) {
      // set default
      console.log("error", error);
      form.setValue("source", TutorialSource.YOUTUBE);
    }
  };

  //   const loadCursorRule = async (project?: GithubProjectInfo | null) => {
  //     let p = project;
  //     if (!p) {
  //       p = githubProject;

  //       if (!p) {
  //         toast.error("Error loading project");
  //         return;
  //       }
  //     }

  //     setLoadCursorUrl(true);

  //     await fetch(p.cursorRuleUrl)
  //       .then((res) => {
  //         if (!res.ok) {
  //           return;
  //         }
  //         return res.text();
  //       })
  //       .then((data) => {
  //         if (!data) {
  //           toast.error(
  //             "Cursor rule file in Github is not found, please check the url",
  //           );
  //           return;
  //         }
  //         setLoadCursorUrlOk(true);
  //         if (githubProject) {
  //           setGithubProject({
  //             ...githubProject,
  //             cursorRuleUrl: p.cursorRuleUrl,
  //             cursorRule: data,
  //           });
  //         } else {
  //           setGithubProject({
  //             ...p,
  //             cursorRule: data,
  //           });
  //         }
  //       })
  //       .catch(() => {
  //         toast.error("Error loading cursor rule");
  //         setLoadCursorUrl(false);
  //       })
  //       .finally(() => {
  //         setLoadCursorUrl(false);
  //       });
  //   };

  const clearData = () => {
    form.reset();
  };

  const [addTutorialLoading, setAddTutorialLoading] = useState(false);

  const { mutate: addTutorial } = api.tutorial.add.useMutation({
    onSuccess: (data) => {
      if (data.success) {
        toast.success("Tutorial added");
        setOpen(false);
        clearData();
      } else {
        toast.error(data.message);
      }
    },
    onError: () => {
      toast.error("Error adding tutorial");
    },
    onSettled: () => {
      setAddTutorialLoading(false);
    },
  });

  function onSubmit(values: z.infer<typeof TutorialFormSchema>) {
    setAddTutorialLoading(true);
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    addTutorial(values);
  }

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <Button variant={buttonVariant} size={"sm"}>
          Add Tutorial
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="max-h-[80vh] overflow-y-auto">
        <AlertDialogHeader>
          <AlertDialogTitle>Add Tutorial</AlertDialogTitle>
        </AlertDialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="link"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tutorial Link</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Link"
                      type="url"
                      {...field}
                      // onChange={handleLink}
                      onChange={async (e) => {
                        field.onChange(e);
                        await handleLink(e);
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="source"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tutorial Source</FormLabel>
                  <Select
                    {...field}
                    onValueChange={(value) => {
                      field.onChange(value);
                    }}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select Source" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {Object.values(TutorialSource).map((source) => (
                        <SelectItem
                          key={source.toString()}
                          value={source.toString()}
                        >
                          {source}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem
                  className={cn("block", {
                    hidden:
                      form.getValues("source") ===
                      TutorialSource.TWITTER.toString(),
                  })}
                >
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Tilte"
                      {...field}
                      onChange={(e) => {
                        field.onChange(e);
                        form.setValue("slug", slugify(e.target.value));
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="slug"
              render={({ field }) => (
                <FormItem
                  className={cn("block", {
                    hidden:
                      form.getValues("source") ===
                      TutorialSource.TWITTER.toString(),
                  })}
                >
                  <FormLabel>Slug</FormLabel>
                  <FormControl>
                    <Input placeholder="Slug" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem
                  className={cn("block", {
                    hidden:
                      form.getValues("source") ===
                      TutorialSource.TWITTER.toString(),
                  })}
                >
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Description" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="author"
              render={({ field }) => (
                <FormItem
                  className={cn("block", {
                    hidden:
                      form.getValues("source") ===
                      TutorialSource.TWITTER.toString(),
                  })}
                >
                  <FormLabel>Tutorial Author</FormLabel>
                  <Input placeholder="Author" {...field} />
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="authorLink"
              render={({ field }) => (
                <FormItem
                  className={cn("block", {
                    hidden:
                      form.getValues("source") ===
                      TutorialSource.TWITTER.toString(),
                  })}
                >
                  <FormLabel>Tutorial Author Link</FormLabel>
                  <Input placeholder="Author Link" type="url" {...field} />
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="authorAvatar"
              render={({ field }) => (
                <FormItem
                  className={cn("block", {
                    hidden:
                      form.getValues("source") ===
                      TutorialSource.TWITTER.toString(),
                  })}
                >
                  <FormLabel>Tutorial Author Avatar</FormLabel>
                  <Input placeholder="Author Avatar" type="url" {...field} />
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="language"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tutorial Language</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select Language" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {Object.values(Language).map((language) => (
                        <SelectItem key={language} value={language}>
                          {language}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <AlertDialogFooter>
              <AlertDialogCancel disabled={addTutorialLoading}>
                Cancel
              </AlertDialogCancel>
              <Button type="submit" disabled={addTutorialLoading}>
                Submit
              </Button>
            </AlertDialogFooter>
          </form>
        </Form>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default AddTutorialModal;
