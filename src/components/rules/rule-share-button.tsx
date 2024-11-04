import React from "react";
import { Button } from "../ui/button";
import { toast } from "sonner";
import { Share } from "lucide-react";
import { env } from "@/env";

interface RuleShareButtonProps {
  ruleSlug: string;
}

const RuleShareButton = ({ ruleSlug }: RuleShareButtonProps) => {
  return (
    <Button
      size={"sm"}
      variant={"outline"}
      onClick={async () => {
        try {
          await navigator.clipboard.writeText(
            `${env.NEXT_PUBLIC_APP_URL}/rule/${ruleSlug}`,
          );
          toast.success("Rule url is copied");
        } catch (error) {
          console.error("Failed to copy text:", error);
          toast.error("Failed to copy rule url");
        }
      }}
    >
      <Share />
    </Button>
  );
};

export default RuleShareButton;
