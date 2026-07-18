import { readdir } from "node:fs/promises";
import { join, posix } from "node:path";
import type { VercelRequest, VercelResponse } from "@vercel/node";

const COLLECTION_DIRS: Record<string, string> = {
  blog: "content/blog",
  events: "content/events",
  gallery: "content/gallery",
};

async function listMarkdownFiles(dir: string): Promise<string[]> {
  try {
    const absoluteDir = join(process.cwd(), dir);
    const entries = await readdir(absoluteDir, { withFileTypes: true });

    return entries
      .filter((entry) => entry.isFile() && entry.name.endsWith(".md"))
      .map((entry) => posix.join(dir, entry.name))
      .sort((a, b) => a.localeCompare(b));
  } catch {
    return [];
  }
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const [blog, events, gallery] = await Promise.all([
    listMarkdownFiles(COLLECTION_DIRS.blog),
    listMarkdownFiles(COLLECTION_DIRS.events),
    listMarkdownFiles(COLLECTION_DIRS.gallery),
  ]);

  res.json({ blog, events, gallery });
}
