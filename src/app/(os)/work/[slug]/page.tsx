import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { pageMetadata } from "@/app/pageMetadata";
import { getProjectBySlug, projects } from "@/data/portfolio";

/** Route params for /work/[slug]. */
type Params = { slug: string };

/** Pre-renders every enabled project at build time. */
export function generateStaticParams(): Params[] {
  return projects.map((project) => ({ slug: project.slug }));
}

/** Per-project title and description for search results and link previews. */
export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return { title: "File not found | Jack Keirnan" };
  return pageMetadata(`${project.title} | Jack Keirnan`, project.description);
}

/** Unknown or disabled slugs return a real 404; the not-found page shows the themed dialog. */
export default async function ProjectRoute({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  if (!getProjectBySlug(slug)) notFound();
  return null;
}
