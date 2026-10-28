import type { ReactNode } from "react";
import PageHero from "@/components/PageHero";

const WEBSITE = "https://www.basetfinance.com.au/";

// Shared layout for legal pages (Privacy Policy, Terms & Conditions)
export function LegalDocument({
  title,
  subtitle,
  href,
  effectiveDate,
  sections,
  children,
}: {
  title: string;
  subtitle: string;
  href: string;
  effectiveDate: string;
  sections: Record<string, string>;
  children: ReactNode;
}) {
  return (
    <>
      <PageHero eyebrow="Legal" title={title} subtitle={subtitle} breadcrumb={[{ label: title, href }]} />

      <section className="section-padding bg-white">
        <div className="max-w-3xl mx-auto">
          <div className="bg-marble-100 border border-marble-300 p-6 mb-12">
            <p className="font-inter text-sm text-charcoal/70">
              <span className="font-medium text-charcoal">Effective date:</span> {effectiveDate}
            </p>
            <p className="font-inter text-sm text-charcoal/70 mt-1">
              <span className="font-medium text-charcoal">Website:</span>{" "}
              <a href={WEBSITE} className="text-gold hover:underline">
                {WEBSITE}
              </a>
            </p>

            <nav aria-label={`${title} contents`} className="mt-6 pt-6 border-t border-marble-300">
              <p className="font-inter text-xs uppercase tracking-wider text-charcoal/60 mb-3">Contents</p>
              <ol className="grid sm:grid-cols-2 gap-x-6 gap-y-2">
                {Object.entries(sections).map(([id, sectionTitle]) => (
                  <li key={id}>
                    <a href={`#${id}`} className="font-inter text-sm text-charcoal/70 hover:text-gold transition-colors">
                      {sectionTitle}
                    </a>
                  </li>
                ))}
              </ol>
            </nav>
          </div>

          {children}
        </div>
      </section>
    </>
  );
}

export function LegalSection({ id, title, children }: { id: string; title: string; children: ReactNode }) {
  return (
    <section id={id} className="scroll-mt-28 pt-12 first:pt-0">
      <h2 className="font-playfair text-2xl font-semibold text-charcoal">{title}</h2>
      <div className="w-10 h-px bg-gold mt-3 mb-6" />
      <div className="space-y-4">{children}</div>
    </section>
  );
}

export function SubHeading({ children }: { children: ReactNode }) {
  return <h3 className="font-playfair text-lg font-semibold text-charcoal pt-2">{children}</h3>;
}

export function P({ children }: { children: ReactNode }) {
  return <p className="font-inter text-[15px] text-charcoal/75 leading-relaxed">{children}</p>;
}

export function List({ items }: { items: string[] }) {
  return (
    <ul className="list-disc pl-5 space-y-2 marker:text-gold">
      {items.map((item) => (
        <li key={item} className="font-inter text-[15px] text-charcoal/75 leading-relaxed">
          {item}
        </li>
      ))}
    </ul>
  );
}

export function TextLink({ href, children }: { href: string; children: ReactNode }) {
  const external = /^https?:/.test(href) && !href.includes("basetfinance.com.au");
  return (
    <a
      href={href}
      className="text-gold hover:underline"
      {...(external && { target: "_blank", rel: "noopener noreferrer" })}
    >
      {children}
    </a>
  );
}

export function ContactCard() {
  return (
    <div className="bg-marble-100 border border-marble-300 p-6 space-y-1">
      <p className="font-inter text-[15px] text-charcoal/75">
        <span className="font-medium text-charcoal">Business:</span> Baset Finance
      </p>
      <p className="font-inter text-[15px] text-charcoal/75">
        <span className="font-medium text-charcoal">Website:</span> <TextLink href={WEBSITE}>{WEBSITE}</TextLink>
      </p>
      <p className="font-inter text-[15px] text-charcoal/75">
        <span className="font-medium text-charcoal">Email:</span>{" "}
        <TextLink href="mailto:baset@basetfinance.com.au">baset@basetfinance.com.au</TextLink>
      </p>
    </div>
  );
}
