import { ButtonHTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/utils";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost" | "glass";
  size?: "sm" | "md" | "lg";
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", ...props }, ref) => {
    return (
      <button
        className={cn(
          "inline-flex items-center justify-center rounded-xl font-medium transition-smooth",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
          "disabled:pointer-events-none disabled:opacity-50",
          {
            // Primary - Solid blue button
            "bg-primary text-primary-foreground hover:opacity-90 shadow-lg shadow-primary/25":
              variant === "primary",
            
            // Secondary - Subtle gray button
            "bg-background-secondary text-foreground hover:bg-border":
              variant === "secondary",
            
            // Ghost - Transparent with hover
            "hover:bg-background-secondary text-foreground":
              variant === "ghost",
            
            // Glass - Glassmorphism effect
            "glass hover:bg-white/80 dark:hover:bg-black/40":
              variant === "glass",
            
            // Sizes
            "h-9 px-4 text-sm": size === "sm",
            "h-11 px-6 text-base": size === "md",
            "h-13 px-8 text-lg": size === "lg",
          },
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button };
