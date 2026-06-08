import Image from "next/image";
import Link from "next/link";
import { LanguageWidget } from "@/components/languagewidget";
import type { ProjectType } from "@/data/types";

export default function ProjectPage({ project }: { project: ProjectType }) {
  return (
    <article className="max-w-3xl mx-auto px-5 py-16">
      <Link href="/work" className="text-purple-400 hover:text-purple-300 transition">
        ← Back to Work
      </Link>

      {/* Hero image */}
      <div className="relative w-full h-[18rem] md:h-[22rem] overflow-hidden rounded-lg border border-purple-900/40 mt-6">
        <Image
          className="object-cover"
          src={project.image}
          alt={`Image describing ${project.title}`}
          fill
        />
      </div>

      {/* Title + tagline */}
      <header className="text-center mt-10">
        <h1 className="text-4xl md:text-5xl font-bold text-purple-900">{project.title}</h1>
        <div className="w-16 h-[2px] bg-purple-600/50 mx-auto mt-4" />
        <p className="text-lg italic text-gray-400 mt-4">{project.description}</p>
      </header>

      {/* Body */}
      <div className="space-y-5 text-gray-400 leading-relaxed mt-10">
        {project.longdescription.map((paragraph, index) => (
          <p key={index}>{paragraph}</p>
        ))}
      </div>

      {/* Tech used */}
      <div className="mt-12">
        <h2 className="text-sm uppercase tracking-wide font-semibold text-purple-600 mb-4 text-center">
          Technologies Used
        </h2>
        <div className="flex justify-center">
          <LanguageWidget languageinput={project.languages} />
        </div>
      </div>
    </article>
  );
}
