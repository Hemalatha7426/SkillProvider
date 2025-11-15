// utils for className merging
const cn = (...classes) => classes.filter(Boolean).join(" ");

function Skeleton({ className, ...props }) {
  return (
    <div
      className={cn("animate-pulse rounded-md bg-gray-300", className)}
      {...props}
    />
  );
}

export { Skeleton };
