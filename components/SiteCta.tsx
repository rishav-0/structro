import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";

type SiteCtaProps = {
  eyebrow?: string;
  title?: string;
  description?: string;
  primaryLabel?: string;
  primaryHref?: string;
  secondaryLabel?: string;
  secondaryHref?: string;
};

export default function SiteCta({
  eyebrow = "Ready To Start Your Project?",
  title = "Let's define the right structure before the work begins.",
  description = "Talk to Structro about scope, specifications, and execution direction for bridges, industrial buildings, and steel infrastructure projects.",
  primaryLabel = "Get a Quote",
  primaryHref = "/contact",
  secondaryLabel = "View Projects",
  secondaryHref = "/projects",
}: SiteCtaProps) {
  return (
    <section className="bg-white py-24">
      <Container>
        <div className="relative overflow-hidden rounded-[2rem] border border-gray-200 px-8 py-14 text-center shadow-[0_24px_60px_rgba(15,23,42,0.12)] md:px-14">
          <Image
            src="/images/cta.png"
            alt="Structro project background"
            fill
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-[#11181d]/78" />
          <div className="absolute inset-0 bg-linear-to-r from-[#11181d]/88 via-[#11181d]/68 to-[#11181d]/82" />
          <div className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-accent/70 to-transparent" />
          <div className="absolute left-1/2 top-0 h-40 w-40 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/12 blur-3xl" />

          <div className="relative mx-auto max-w-3xl">
            <p className="mb-4 text-accent text-sm font-bold uppercase tracking-[0.2em]">
              {eyebrow}
            </p>

            <h2 className="text-4xl font-bold leading-tight text-white md:text-5xl">
              {title}
            </h2>

            <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-white/68 md:text-lg">
              {description}
            </p>

            <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link href={primaryHref}>
                <Button variant="red" size="lg" className="rounded-sm font-bold uppercase tracking-widest text-xs shadow-[0_14px_34px_rgba(225,29,72,0.25)]">
                  {primaryLabel}
                  <ArrowUpRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>

              {secondaryLabel && secondaryHref ? (
                <Link href={secondaryHref}>
                  <Button variant="white-outline" size="lg" className="rounded-sm border-white/20 bg-transparent font-bold uppercase tracking-widest text-xs text-white hover:bg-white hover:text-gray-900">
                    {secondaryLabel}
                  </Button>
                </Link>
              ) : null}
            </div>

            <div className="mt-10 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-sm text-white/58">
              <span>25+ years of experience</span>
              <span className="hidden h-1 w-1 rounded-full bg-white/30 sm:block" />
              <span>500+ completed projects</span>
              <span className="hidden h-1 w-1 rounded-full bg-white/30 sm:block" />
              <span>ISO 9001:2015 certified</span>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}