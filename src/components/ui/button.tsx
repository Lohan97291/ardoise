import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl border border-transparent text-sm font-semibold cursor-pointer transition-[transform,box-shadow,background-color,border-color,color,opacity] duration-200 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/45 focus-visible:ring-offset-2 active:translate-y-px disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default:
          "border-primary/20 bg-primary text-primary-foreground shadow-[var(--shadow-card)] hover:-translate-y-0.5 hover:bg-primary/94 hover:shadow-[var(--shadow-raised)]",
        destructive:
          "border-destructive/15 bg-destructive text-destructive-foreground shadow-[var(--shadow-card)] hover:-translate-y-0.5 hover:bg-destructive/92 hover:shadow-[var(--shadow-raised)]",
        outline:
          "border-input/85 bg-card/88 text-foreground shadow-[var(--shadow-card)] backdrop-blur-sm hover:-translate-y-0.5 hover:border-primary/25 hover:bg-accent/75 hover:text-accent-foreground hover:shadow-[var(--shadow-raised)]",
        secondary:
          "border-border/70 bg-secondary text-secondary-foreground shadow-[var(--shadow-card)] hover:-translate-y-0.5 hover:border-primary/20 hover:bg-secondary/82 hover:shadow-[var(--shadow-raised)]",
        ghost:
          "text-foreground hover:bg-accent/80 hover:text-accent-foreground active:bg-accent",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-[var(--app-control-height,2.25rem)] px-4 py-2",
        sm: "h-[var(--app-control-height-sm,2rem)] rounded-lg px-3 text-xs",
        lg: "h-[var(--app-control-height-lg,2.75rem)] rounded-xl px-8",
        icon: "h-[var(--app-control-height,2.25rem)] w-[var(--app-control-height,2.25rem)]",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
