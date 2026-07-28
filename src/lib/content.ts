import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { marked } from "marked";
import DOMPurify from "isomorphic-dompurify";

const CONTENT_DIR = path.join(process.cwd(), "content");

export interface MarkdownDoc<T = Record<string, unknown>> {
  slug: string;
  frontmatter: T;
  /** Sanitized HTML rendered from the markdown body. */
  html: string;
}

/**
 * Loads a markdown file from `content/<collection>/<slug>.md` (or
 * `content/<collection>.md` when no slug is given), parses its frontmatter,
 * and renders + sanitizes the body to HTML.
 *
 * Sanitization matters even though content is authored via the invite-only
 * CMS: it's a defense-in-depth measure against a compromised/malicious
 * editor account producing stored XSS.
 */
export function getMarkdownDoc<T = Record<string, unknown>>(
  collection: string,
  slug?: string,
): MarkdownDoc<T> {
  const filePath = slug
    ? path.join(CONTENT_DIR, collection, `${slug}.md`)
    : path.join(CONTENT_DIR, `${collection}.md`);

  const raw = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(raw);
  const rawHtml = marked.parse(content, { async: false }) as string;
  const html = DOMPurify.sanitize(rawHtml);

  return { slug: slug ?? collection, frontmatter: data as T, html };
}

export function getCollectionSlugs(collection: string): string[] {
  const dir = path.join(CONTENT_DIR, collection);
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((file) => file.endsWith(".md"))
    .map((file) => file.replace(/\.md$/, ""));
}

export function getCollection<T = Record<string, unknown>>(
  collection: string,
): MarkdownDoc<T>[] {
  return getCollectionSlugs(collection).map((slug) =>
    getMarkdownDoc<T>(collection, slug),
  );
}

export function getJson<T>(relativePath: string): T {
  const filePath = path.join(CONTENT_DIR, relativePath);
  return JSON.parse(fs.readFileSync(filePath, "utf8")) as T;
}
