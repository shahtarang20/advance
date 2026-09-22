import { HTMLAttributes } from "react";

export function GlassCard({ className = "", children, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={`surface-glass dark:backdrop-blur-xl rounded-3xl border ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}
