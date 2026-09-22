import { HTMLAttributes } from "react";

export function GlassCard({ className = "", children, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={`surface-glass rounded-3xl border backdrop-blur-xl ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}
