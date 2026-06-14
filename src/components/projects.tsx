'use client';
import Image from 'next/image';
import Link from 'next/link';
import { LanguageWidget } from './languagewidget';
import { motion } from 'motion/react';
import { ProjectType } from '@/data/types';
import { projects, projectCategories } from '@/data/portfolio';

type CardVariant = 'horizontal' | 'vertical';

const ProjectCard = ({
    project,
    index,
    variant = 'horizontal',
}: {
    project: ProjectType;
    index: number;
    variant?: CardVariant;
}) => {
    const isVertical = variant === 'vertical';

    return (
        <motion.div
            className="h-full"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: index * 0.08 }}
        >
            <Link
                href={`/work/${project.slug}`}
                className={`group flex h-full bg-neutral-800 overflow-hidden border border-neutral-700 rounded-lg hover:border-purple-700 transition ${
                    isVertical ? "flex-col" : "flex-col md:flex-row"
                }`}
            >
                {/* Image */}
                <div className={isVertical ? "w-full" : "md:w-2/5 shrink-0"}>
                    <Image
                        className={`w-full object-cover ${isVertical ? "h-48" : "h-56 md:h-full"}`}
                        src={project.image}
                        alt={`Image describing ${project.title}`}
                        width={1200}
                        height={800}
                    />
                </div>

                {/* Content */}
                <div className={`flex flex-col p-6 ${isVertical ? "flex-1" : "md:w-3/5"}`}>
                    <h3 className="text-2xl font-semibold text-purple-400 group-hover:text-purple-300 transition">
                        {project.title}
                    </h3>
                    <p className="text-gray-400 mt-3 leading-relaxed">{project.description}</p>
                    <div className="mt-auto pt-5">
                        <LanguageWidget languageinput={project.languages} />
                    </div>
                </div>
            </Link>
        </motion.div>
    );
};

// Pick a responsive column layout based on how many projects a category has.
const gridClassFor = (count: number) => {
    if (count === 2) return "grid gap-8 sm:grid-cols-2";
    return "grid gap-8 sm:grid-cols-2 lg:grid-cols-3";
};

export const ProjectGrid = () => {
    if (!Array.isArray(projects) || projects.length === 0) {
        return (
            <div className="p-16 flex flex-col items-center text-center text-gray-400">
                <p className="text-xl text-purple-400">No projects to show yet</p>
                <p className="max-w-md mt-2">Work is on its way — check back soon.</p>
            </div>
        );
    }

    return (
        <div className="max-w-6xl mx-auto px-5 flex flex-col gap-16">
            {projectCategories.map((category) => {
                const items = projects.filter((project) => project.category === category);
                if (items.length === 0) return null;

                const isSingle = items.length === 1;

                return (
                    <section key={category} className="flex flex-col gap-8">
                        <h2 className="text-2xl md:text-3xl font-semibold text-purple-300 border-b border-neutral-700 pb-3">
                            {category}
                        </h2>

                        {isSingle ? (
                            // A lone project keeps the wide, detailed horizontal card.
                            <div className="max-w-3xl">
                                <ProjectCard project={items[0]} index={0} variant="horizontal" />
                            </div>
                        ) : (
                            // Multiple projects flow into a responsive grid of compact cards.
                            <div className={gridClassFor(items.length)}>
                                {items.map((project: ProjectType, index: number) => (
                                    <ProjectCard
                                        key={project.id}
                                        project={project}
                                        index={index}
                                        variant="vertical"
                                    />
                                ))}
                            </div>
                        )}
                    </section>
                );
            })}
        </div>
    );
};
