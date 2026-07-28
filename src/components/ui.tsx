import { type ReactNode } from "react";
import clsx from "clsx";

export function Container({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  return (
    <div className={clsx("mx-auto max-w-6xl px-4 sm:px-6 lg:px-8", className)}>
      {children}
    </div>
  );
}

export function Section({
  className,
  children,
  id,
}: {
  className?: string;
  children: ReactNode;
  id?: string;
}) {
  return (
    <section id={id} className={clsx("py-14 sm:py-20", className)}>
      <Container>{children}</Container>
    </section>
  );
}

export function PageHeader({
  eyebrow,
  title,
  description,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
}) {
  return (
    <div className="bg-brand-700 py-16 text-cream-50 sm:py-20">
      <Container>
        {eyebrow && (
          <p className="text-sm font-semibold uppercase tracking-widest text-olive-200">
            {eyebrow}
          </p>
        )}
        <h1 className="mt-2 font-display text-3xl font-bold sm:text-4xl">
          {title}
        </h1>
        {description && (
          <p className="mt-4 max-w-2xl text-base text-brand-100 sm:text-lg">
            {description}
          </p>
        )}
      </Container>
    </div>
  );
}

export function Prose({
  html,
  className,
}: {
  html: string;
  className?: string;
}) {
  return (
    <div
      className={clsx(
        "prose prose-headings:font-display prose-headings:text-brand-800 prose-a:text-brand-600 prose-blockquote:border-olive-400 prose-blockquote:text-olive-800 max-w-none",
        className,
      )}
      // Content comes from getMarkdownDoc(), which sanitizes with DOMPurify
      // before this point (see src/lib/content.ts).
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}

export function Card({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  return (
    <div
      className={clsx(
        "rounded-xl border border-brand-200/60 bg-cream-50 p-6 shadow-sm",
        className,
      )}
    >
      {children}
    </div>
  );
}
