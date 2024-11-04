import React from "react";
import RuleCardSkeleton from "./rule-card-skeleton";

const RulesLoadingGrid = () => {
  return (
    <div className="grid w-full grid-cols-1 grid-rows-1 gap-6 lg:grid-cols-2 xl:grid-cols-3">
      <RuleCardSkeleton />
      <RuleCardSkeleton />
      <RuleCardSkeleton />
    </div>
  );
};

export default RulesLoadingGrid;
