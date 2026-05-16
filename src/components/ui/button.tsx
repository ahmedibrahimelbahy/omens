import { cva, type VariantProps } from "class-variance-authority";
import { forwardRef, type ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/cn";

const buttonStyles = cva(
  [
    "inline-flex items-center justify-center gap-2",
    "font-medium tracking-tight",
    "transition-[transform,background,box-shadow,color] duration-200 ease-out",
    "focus-visible:outline-none focus-visible:ring-0",
    "disabled:opacity-50 disabled:pointer-events-none",
    "active:translate-y-px",
  ],
  {
    variants: {
      variant: {
        primary: [
          "bg-ink text-cream",
          "shadow-[var(--shadow-lift)]",
          "hover:bg-ink-soft",
        ],
        gold: [
          "bg-gold text-ink",
          "shadow-[var(--shadow-gold)]",
          "hover:bg-gold-deep hover:text-cream",
        ],
        ghost: [
          "bg-transparent text-ink",
          "ring-1 ring-inset ring-[var(--line-strong)]",
          "hover:bg-[var(--surface-1)] hover:ring-ink/40",
        ],
        quiet: [
          "bg-transparent text-ink-soft",
          "hover:text-ink",
        ],
      },
      size: {
        sm: "h-9 px-4 text-sm rounded-full",
        md: "h-11 px-5 text-[15px] rounded-full",
        lg: "h-13 px-7 text-[16px] rounded-full",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  },
);

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonStyles>;

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...rest }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(buttonStyles({ variant, size }), className)}
        {...rest}
      />
    );
  },
);
Button.displayName = "Button";
