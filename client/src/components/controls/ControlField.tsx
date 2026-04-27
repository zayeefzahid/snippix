import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

interface ControlFieldProps {
  label: string;
  value?: string;
  children: ReactNode;
  className?: string;
}

export default function ControlField({
  label,
  value,
  children,
  className,
}: ControlFieldProps) {
  return (
    <div className={cn("space-y-2", className)}>
      <div className="flex min-h-4 items-center justify-between gap-3">
        <label className="text-[0.7rem] font-semibold uppercase tracking-wide text-muted-foreground">
          {label}
        </label>
        {value ? (
          <span className="glass-control rounded-md px-1.5 py-0.5 text-[0.65rem] font-medium text-muted-foreground">
            {value}
          </span>
        ) : null}
      </div>
      {children}
    </div>
  );
}
