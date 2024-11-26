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
import { Label } from "@radix-ui/react-label";
import { Loader2, Check } from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";
import { toast } from "sonner";

interface RuleImportModalProps {
  buttonVariant?: "default" | "outline" | "ghost";
}

const RuleImportModal = ({
  buttonVariant = "default",
}: RuleImportModalProps) => {
  const [open, setOpen] = useState(false);

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <Button variant={buttonVariant} size={"sm"}>
          Import Rule
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Import Rule</AlertDialogTitle>
          <AlertDialogDescription>
            Load rule from other sites{" "}
            <Link
              className="underline"
              target="_blank"
              href="https://www.google.com/search?q=site%3Awww.cursordirectory.com"
            >
              Cursor Directory
            </Link>
            ,{" "}
            <Link
              target="_blank"
              className="underline"
              href="https://www.google.com/search?q=site%3Adotcursorrules.com"
            >
              Cursor Rules
            </Link>
            ,{" "}
            <Link
              className="underline"
              target="_blank"
              href="https://www.google.com/search?q=site%3Acursor.directory"
            >
              cursor.directory
            </Link>
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel
            onClick={() => {
              setOpen(false);
            }}
          >
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={async (e) => {
              e.preventDefault();
              // await saveProject();
            }}
          >
            Import
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default RuleImportModal;
