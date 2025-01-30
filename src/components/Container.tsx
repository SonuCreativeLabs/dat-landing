import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface ContainerProps {
  children: ReactNode;
  className?: string;
  id?: string;
}

export function Container({ children, className, id }: ContainerProps) {
  return (
    <div
      id={id}
      className={cn(
        "w-full mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl",
        className
      )}
    >
      {children}
    </div>
  );
}

interface SectionProps {
  children: ReactNode;
  className?: string;
  id?: string;
}

export function Section({ children, className, id }: SectionProps) {
  return (
    <section
      id={id}
      className={cn(
        "py-16 sm:py-20 md:py-24 lg:py-32",
        className
      )}
    >
      {children}
    </section>
  );
} 