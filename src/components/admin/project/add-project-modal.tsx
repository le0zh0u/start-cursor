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
import { createSlug } from "@/server/lib/utils";
import {
  GithubProjectAPIResponse,
  GithubProjectInfo,
} from "@/server/model/github";
import { api } from "@/trpc/react";
import { GithubProject } from "@prisma/client";
import { Label } from "@radix-ui/react-label";
import { Check, Loader2 } from "lucide-react";
import React, { useState } from "react";
import { toast } from "sonner";

interface AddProjectModalProps {
  buttonVariant?: "default" | "outline" | "ghost";
}

const AddProjectModal = ({
  buttonVariant = "default",
}: AddProjectModalProps) => {
  const [open, setOpen] = useState(false);
  const [githubUrl, setGithubUrl] = useState("");
  const [loadingForUrl, setLoadingForUrl] = useState(false);
  const [loadCursorUrl, setLoadCursorUrl] = useState(false);
  const [loadCursorUrlOk, setLoadCursorUrlOk] = useState(false);

  const [githubProject, setGithubProject] = useState<GithubProjectInfo | null>(
    null,
  );

  const loadGithubUrl = async () => {
    // valid github url
    const validGithubUrl = githubUrl.includes("https://github.com");
    if (!validGithubUrl) {
      toast.error("Invalid Github URL");
      return;
    }

    const apiGithubUrl = githubUrl.replaceAll(
      "https://github.com",
      "https://api.github.com/repos",
    );

    setLoadingForUrl(true);

    await fetch(apiGithubUrl)
      .then((res) => res.json())
      .then(async (data: GithubProjectAPIResponse) => {
        if (!data) {
          toast.error("Invalid Github URL");
          return;
        }

        // get project info
        const cursorFileUrl = `https://raw.githubusercontent.com/${data.full_name}/refs/heads/main/.cursorrules`;

        const projectInfo: GithubProjectInfo = {
          name: data.full_name,
          slug: createSlug(data.full_name),
          stars: data.stargazers_count ?? 0,
          description: data.description ?? "",
          url: data.html_url,
          cursorRuleUrl: cursorFileUrl,
          language: data.language ?? "",
          cursorRule: "",
        };

        setGithubProject(projectInfo);

        await loadCursorRule(projectInfo);
      })
      .finally(() => {
        setLoadingForUrl(false);
      });
  };

  const loadCursorRule = async (project?: GithubProjectInfo | null) => {
    let p = project;
    if (!p) {
      p = githubProject;

      if (!p) {
        toast.error("Error loading project");
        return;
      }
    }

    setLoadCursorUrl(true);

    await fetch(p.cursorRuleUrl)
      .then((res) => {
        if (!res.ok) {
          return;
        }
        return res.text();
      })
      .then((data) => {
        if (!data) {
          toast.error(
            "Cursor rule file in Github is not found, please check the url",
          );
          return;
        }
        setLoadCursorUrlOk(true);
        if (githubProject) {
          setGithubProject({
            ...githubProject,
            cursorRuleUrl: p.cursorRuleUrl,
            cursorRule: data,
          });
        } else {
          setGithubProject({
            ...p,
            cursorRule: data,
          });
        }
      })
      .catch(() => {
        toast.error("Error loading cursor rule");
        setLoadCursorUrl(false);
      })
      .finally(() => {
        setLoadCursorUrl(false);
      });
  };

  const clearData = () => {
    setGithubProject(null);
    setGithubUrl("");
    setLoadCursorUrl(false);
    setLoadCursorUrlOk(false);
  };

  const [isSaving, setIsSaving] = useState(false);
  const { mutate: addProject } = api.project.addProject.useMutation({
    onSuccess: () => {
      toast.success("Project added");
      setOpen(false);
      clearData();
    },
    onError: () => {
      toast.error("Error adding project");
    },
    onSettled: () => {
      setIsSaving(false);
    },
  });

  const saveProject = async () => {
    if (!githubProject) {
      toast.error("Error loading project");
      return;
    }

    if (isSaving) {
      return;
    }

    if (!githubProject.url || githubProject.url === "") {
      toast.error("url is empty");
      return;
    }

    if (!loadCursorUrlOk) {
      toast.error("Cursor rule not loaded");
      return;
    }

    setIsSaving(true);

    addProject(githubProject);
  };

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <Button variant={buttonVariant} size={"sm"}>
          Add Project
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Add Project</AlertDialogTitle>
        </AlertDialogHeader>
        <div className="flex w-full flex-col gap-1">
          <div className="flex items-center justify-start gap-2">
            <Input
              placeholder="Github URL"
              value={githubUrl}
              onChange={(e) => setGithubUrl(e.target.value)}
            />
          </div>
          <div className="flex w-full items-center justify-between gap-2">
            <Button
              variant={"ghost"}
              size={"sm"}
              onClick={() => {
                const url = "https://github.com/midday-ai/v1";
                void navigator.clipboard.writeText(url);
                setGithubUrl(url);
                toast.success("Test Github URL copied");
              }}
            >
              Copy Test Github URL
            </Button>
            <Button
              variant="outline"
              size={"sm"}
              onClick={async () => await loadGithubUrl()}
              disabled={loadingForUrl}
            >
              {loadingForUrl && (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              )}
              Load
            </Button>
          </div>
          <div className="flex flex-col gap-2">
            <div className="flex flex-col items-start justify-start gap-2">
              <Label>Name</Label>
              <Input
                disabled={!githubProject}
                placeholder="Project Name"
                value={githubProject?.name}
                onChange={(e) => {
                  if (githubProject) {
                    setGithubProject({
                      ...githubProject,
                      name: e.target.value,
                    });
                  } else {
                    toast.error("Error loading project");
                  }
                }}
              />
            </div>

            <div className="flex flex-col items-start justify-start gap-2">
              <Label>Slug</Label>
              <Input
                disabled={!githubProject}
                placeholder="slug"
                value={githubProject?.slug}
                onChange={(e) => {
                  if (githubProject) {
                    setGithubProject({
                      ...githubProject,
                      slug: e.target.value,
                    });
                  } else {
                    toast.error("Error loading project");
                  }
                }}
              />
            </div>

            <div className="flex flex-col items-start justify-start gap-2">
              <Label>Description</Label>
              <Textarea
                disabled={!githubProject}
                placeholder="Project Description"
                value={githubProject?.description}
                onChange={(e) => {
                  if (githubProject) {
                    setGithubProject({
                      ...githubProject,
                      description: e.target.value,
                    });
                  } else {
                    toast.error("Error loading project");
                  }
                }}
              />
            </div>

            <div className="flex flex-col items-start justify-start gap-2">
              <Label>Stars</Label>
              <Input
                disabled
                placeholder="Project Stars"
                value={githubProject?.stars}
              />
            </div>

            <div className="flex flex-col items-start justify-start gap-2">
              <div className="flex w-full items-center justify-between gap-2">
                <Label>Cursor Rule Url</Label>
                <Button
                  variant="outline"
                  size={"sm"}
                  onClick={async () => {
                    if (githubProject) {
                      await loadCursorRule();
                    } else {
                      toast.error("Error loading project");
                    }
                  }}
                  disabled={loadCursorUrlOk || loadCursorUrl}
                >
                  {loadCursorUrlOk ? (
                    <Check className="mr-2 h-4 w-4 text-green-500" />
                  ) : (
                    <>
                      {loadCursorUrl && (
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      )}
                      Check
                    </>
                  )}
                </Button>
              </div>

              <Textarea
                disabled={!githubProject}
                placeholder="Project Cursor Rule"
                value={githubProject?.cursorRuleUrl}
                onChange={(e) => {
                  setLoadCursorUrl(false);
                  setLoadCursorUrlOk(false);
                  if (githubProject) {
                    setGithubProject({
                      ...githubProject,
                      cursorRuleUrl: e.target.value,
                    });
                  } else {
                    toast.error("Error loading project");
                  }
                }}
              />
            </div>
          </div>
        </div>
        <AlertDialogFooter>
          <AlertDialogCancel
            onClick={() => {
              setOpen(false);
              clearData();
            }}
          >
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={async (e) => {
              e.preventDefault();
              await saveProject();
            }}
            disabled={isSaving || !loadCursorUrlOk}
          >
            {isSaving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Add
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default AddProjectModal;
