import { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

interface PageHeaderProps extends HTMLAttributes<HTMLDivElement> {
  title: string;
  description?: string;
}

export const PageHeader = ({ title, description, className, ...props }: PageHeaderProps) => {
  return (
    <div className={cn("space-y-2 pb-8", className)} {...props}>
      <h1 className="text-4xl font-bold tracking-tight">{title}</h1>
      {description && <p className="text-muted-foreground">{description}</p>}
    </div>
  );
};