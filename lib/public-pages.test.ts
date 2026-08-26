import { readdirSync } from "node:fs";
import { dirname, join, relative, sep } from "node:path";
import { afterEach, describe, expect, it, vi } from "vitest";

import {
  buildPublicSitemap,
  formatPageDate,
  publicPages,
  type PublicPageFrontmatter,
} from "./public-pages";
import { absoluteUrl } from "./site";

function findPageFiles(directory: string): string[] {
  return readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const path = join(directory, entry.name);

    if (entry.isDirectory()) {
      return findPageFiles(path);
    }

    return entry.name === "page.tsx" ? [path] : [];
  });
}

function routeFromPageFile(file: string): string {
  const appRoot = join(process.cwd(), "app");
  const routeDirectory = relative(appRoot, dirname(file));
  const segments = routeDirectory
    .split(sep)
    .filter(Boolean)
    .filter((segment) => !(segment.startsWith("(") && segment.endsWith(")")));

  const dynamicSegment = segments.find((segment) => segment.startsWith("["));
  if (dynamicSegment) {
    throw new Error(
      `Add explicit sitemap coverage for dynamic route segment ${dynamicSegment}.`,
    );
  }

  return segments.length === 0 ? "/" : `/${segments.join("/")}/`;
}

afterEach(() => {
  vi.useRealTimers();
});

describe("public page frontmatter", () => {
  it("covers every public page route once", () => {
    const appRoot = join(process.cwd(), "app");
    const pageRoutes = findPageFiles(appRoot).map(routeFromPageFile).sort();
    const frontmatterRoutes = publicPages.map((page) => page.path).sort();

    expect(frontmatterRoutes).toEqual(pageRoutes);
    expect(new Set(frontmatterRoutes).size).toBe(frontmatterRoutes.length);
  });

  it("builds each sitemap entry from its page-owned values", () => {
    expect(buildPublicSitemap()).toEqual(
      publicPages.map((page) => ({
        url: absoluteUrl(page.path),
        lastModified: page.lastModified,
        changeFrequency: page.changeFrequency,
        priority: page.priority,
      })),
    );
  });

  it("keeps different page dates stable when the system time changes", () => {
    const fixture = [
      {
        path: "/first/",
        lastModified: "2024-03-04",
        changeFrequency: "monthly",
        priority: 0.5,
      },
      {
        path: "/second/",
        lastModified: "2025-06-07",
        changeFrequency: "yearly",
        priority: 0.4,
      },
    ] as const satisfies readonly PublicPageFrontmatter[];

    vi.useFakeTimers();
    vi.setSystemTime(new Date("2035-01-01T12:00:00.000Z"));
    const firstBuild = buildPublicSitemap(fixture);

    vi.setSystemTime(new Date("2099-12-31T23:59:59.000Z"));
    const secondBuild = buildPublicSitemap(fixture);

    expect(firstBuild.map((entry) => entry.lastModified)).toEqual([
      "2024-03-04",
      "2025-06-07",
    ]);
    expect(secondBuild).toEqual(firstBuild);
  });

  it("rejects a missing or impossible lastModified date", () => {
    const missingDate = [
      {
        path: "/missing/",
        lastModified: undefined,
        changeFrequency: "monthly",
        priority: 0.5,
      },
    ] as unknown as readonly PublicPageFrontmatter[];
    const impossibleDate = [
      {
        path: "/impossible/",
        lastModified: "2026-02-31",
        changeFrequency: "monthly",
        priority: 0.5,
      },
    ] as readonly PublicPageFrontmatter[];

    expect(() => buildPublicSitemap(missingDate)).toThrow(/lastModified.*missing/i);
    expect(() => buildPublicSitemap(impossibleDate)).toThrow(
      /lastModified.*impossible/i,
    );
  });

  it("rejects duplicate sitemap paths", () => {
    const duplicatePages = [publicPages[0], publicPages[0]];

    expect(() => buildPublicSitemap(duplicatePages)).toThrow(
      /duplicate public page path/i,
    );
  });

  it("formats a page date without a timezone shift", () => {
    expect(formatPageDate("2026-08-25")).toBe("August 25, 2026");
  });
});
