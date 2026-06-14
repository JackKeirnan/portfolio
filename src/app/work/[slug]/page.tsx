import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { projects, getProjectBySlug } from "@/data/portfolio";
import ProjectPage from "@/views/projectpage";

type Params = { slug: string };

// Pre-render a static page for every enabled project at build time.
export function generateStaticParams(): Params[] {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata(
  { params }: { params: Promise<Params> }
): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    return { title: "Project Not Found | Jack Keirnan" };
  }

  return {
    title: `${project.title} | Jack Keirnan`,
    description: project.description,
  };
}

export default async function Page({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  return <ProjectPage project={project} />;
}
