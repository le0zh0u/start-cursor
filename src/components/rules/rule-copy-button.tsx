"use client";

import React from "react";
import { Button } from "../ui/button";
import { toast } from "sonner";
import { Copy } from "lucide-react";

interface RuleCopyButtonProps {
  ruleContent: string;
}

const RuleCopyButton = ({ ruleContent }: RuleCopyButtonProps) => {
  return (
    <Button
      size={"sm"}
      variant={"outline"}
      onClick={async () => {
        try {
          await navigator.clipboard.writeText(ruleContent);
          console.log("Rule is copied to clipboard");
          toast.success("Rule is copied");
        } catch (error) {
          console.error("Failed to copy rule:", error);
          toast.error("Failed to copy rule");
        }
      }}
    >
      <Copy />
    </Button>
  );
};

export default RuleCopyButton;
