import type { HTMLAttributes } from "react";
import { cn } from "@/lib/cn";

type ContainerProps = HTMLAttributes<HTMLDivElement> & {
  size?: "narrow" | "default" | "wide";
};

const widthMap: Record<NonNullable<ContainerProps["size"]>, string> = {
  narrow: "max-w-2xl",
  default: "max-w-5xl",
  wide: "max-w-6xl",
};

export function Container({
  size = "default",
  className,
  children,
  ...rest
}: ContainerProps) {
  return (
    <div
      className={cn("mx-auto w-full px-5 sm:px-8 lg:px-10", widthMap[size], className)}
      {...rest}
    >
      {children}
    </div>
  );
}
