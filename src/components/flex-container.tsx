import React from "react";

import clsx from "clsx";
import { cn } from "@/lib/utils";

export function FlexContainer({
  className,
  ...properties
}: React.ComponentPropsWithoutRef<"div">) {
  return (
    <div
      className={cn(
        "container mx-auto flex w-full flex-col items-center justify-center gap-8 px-4 py-4 sm:px-6 lg:px-8",
        className,
      )}
      {...properties}
    />
  );
}
