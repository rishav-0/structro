import type { ReactNode } from "react";
import Link from "next/link";

import { Container } from "@/components/ui/container";
import { cn } from "@/lib/utils";

type PageHeroProps = {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  backHref?: string;
  backLabel?: string;
  compact?: boolean;
  children?: ReactNode;
  className?: string;
};

export function PageHero({
  eyebrow,
  title,
  description,
  backHref,
  backLabel,
  compact = false,
  children,
  className,
}: PageHeroProps) {
  return (
    <section
      className={cn(
        "relative overflow-hidden border-b border-slate-800 bg-primary text-white",
        compact ? "pt-28 pb-10 md:pt-32 md:pb-12" : "pt-32 pb-16 md:pt-36 md:pb-20",
        className,
      )}
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.14),transparent_30%),linear-gradient(135deg,#091522_0%,#13283d_52%,#0b1624_100%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-size-[28px_28px] opacity-20" />
      <div className="absolute -left-16 top-14 h-40 w-40 rounded-full bg-primary/10 blur-3xl" />
      <div className="absolute right-0 top-0 h-64 w-64 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.12),transparent_70%)]" />

      <Container className="relative">
        <div className={cn("max-w-3xl", compact && "max-w-2xl")}>
          {backHref && backLabel ? (
            <Link
              href={backHref}
              className="mb-6 inline-flex items-center text-sm font-semibold text-white/72 transition-colors hover:text-white"
            >
              {backLabel}
            </Link>
          ) : null}

          {eyebrow ? (
            <div className="mb-5 flex items-center gap-3">
              <span className="h-px w-10 bg-primary/70" />
              <p className="text-xs font-bold uppercase tracking-[0.26em] text-accent">
                {eyebrow}
              </p>
            </div>
          ) : null}

          <h1
            className={cn(
              "max-w-4xl text-4xl font-black uppercase leading-[0.95] tracking-tight text-white md:text-6xl",
              compact && "text-3xl md:text-5xl",
            )}
          >
            {title}
          </h1>

          {description ? (
            <p
              className={cn(
                "mt-6 max-w-2xl text-base leading-relaxed text-white/78 md:text-lg",
                compact && "max-w-xl text-sm md:text-base",
              )}
            >
              {description}
            </p>
          ) : null}

          {children ? <div className="mt-8">{children}</div> : null}
        </div>
      </Container>
    </section>
  );
}