import { ProjectGrid } from "@/components/projects";
import { developer } from "@/data/portfolio";

export default function workpage() {
  return (
    <section className="px-5 py-20">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl text-purple-900 font-bold">{developer.work.heading}</h1>
        <div className="w-16 h-[2px] bg-purple-600/50 mx-auto mt-4" />
        <p className="text-gray-400 mt-4 max-w-2xl mx-auto">
          A selection of projects I&apos;ve built. Click any project to read more about it.
        </p>
      </div>
      <ProjectGrid />
    </section>
  );
}
