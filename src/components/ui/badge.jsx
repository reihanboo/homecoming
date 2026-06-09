import * as React from "react";
import { cva } from "class-variance-authority";
import { cn } from "../../lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default: "border-transparent bg-warm-100 text-warm-800",
        secondary: "border-transparent bg-warm-200 text-warm-700",
        destructive: "border-transparent bg-red-100 text-red-700",
        outline: "text-warm-700 border-warm-300",
        accent: "border-transparent bg-accent-100 text-accent-700",
        primary: "border-transparent bg-primary-100 text-primary-700",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

function Badge({ className, variant, ...props }) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />;
}

export { Badge, badgeVariants };
