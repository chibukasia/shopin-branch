"use client";
import { ReactNode, useEffect } from "react";
import { cn } from "@/lib/utils";

interface DialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title?: ReactNode;
  description?: ReactNode;
  children: ReactNode;
  className?: string;
}

export function Dialog(props: DialogProps) {
  const { open, onOpenChange, title, description, children, className } = props;

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={() => onOpenChange(false)}
      />
      <div
        className={cn(
          "relative z-10 w-full max-w-2xl rounded-xl border border-border bg-card shadow-strong animate-scale-in",
          className
        )}
      >
        {(title || description) && (
          <div className="px-6 pt-6 pb-4 border-b border-border bg-muted/20">
            {title && <div className="text-xl font-semibold text-foreground">{title}</div>}
            {description && (
              <div className="text-sm text-muted-foreground mt-1">{description}</div>
            )}
          </div>
        )}
        <div className="p-6 max-h-[70vh] overflow-y-auto bg-background">{children}</div>
      </div>
    </div>
  );
}


