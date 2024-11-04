interface TableSkeletonProps {
  columns: number;
  rows?: number;
}

export function TableSkeleton({ columns, rows = 5 }: TableSkeletonProps) {
  return (
    <div className="w-full">
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className="flex animate-pulse gap-4 border-b p-4">
          {Array.from({ length: columns }).map((_, j) => (
            <div key={j} className="h-4 w-full rounded bg-gray-200" />
          ))}
        </div>
      ))}
    </div>
  );
}
