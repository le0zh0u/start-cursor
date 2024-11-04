import React from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Skeleton } from "../ui/skeleton";

const RuleCardSkeleton = () => {
  return (
    <Card className="group relative flex h-full w-full flex-col overflow-hidden">
      <CardHeader className="py-4">
        <div className="flex flex-row items-center justify-start">
          <CardTitle className="text-md">
            <Skeleton className="h-[20px] w-[100px] rounded-sm" />
          </CardTitle>
          {/* <CardDescription className="text-xs">
Card Description
</CardDescription> */}
        </div>
      </CardHeader>
      <CardContent className="p-4">
        <Skeleton className="h-96 w-full rounded-sm" />
      </CardContent>
      <CardFooter className="flex flex-row items-center justify-start gap-2 p-4">
        <Skeleton className="h-[20px] w-[100px] rounded-full" />
        <Skeleton className="h-[20px] w-[100px] rounded-full" />
      </CardFooter>
    </Card>
  );
};

export default RuleCardSkeleton;
