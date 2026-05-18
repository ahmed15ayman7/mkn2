"use client";

import { ScrollSection } from "@/components/motion/scroll-section";
import { cn } from "@/lib/utils";

export function ContactInfoSection({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <ScrollSection
      preset="contact-info"
      as="section"
      className={cn(
        "relative border-b border-brand-navy/8 bg-white py-14 md:py-16",
        className,
      )}
    >
      {children}
    </ScrollSection>
  );
}

export function ContactCareersSection({
  children,
  className,
  isRtl = false,
}: {
  children: React.ReactNode;
  className?: string;
  isRtl?: boolean;
}) {
  return (
    <ScrollSection
      preset="contact-careers"
      as="section"
      isRtl={isRtl}
      className={cn("relative min-h-[300px] md:min-h-[340px]", className)}
    >
      {children}
    </ScrollSection>
  );
}
