'use client';
import Image from 'next/image';
import Link from 'next/link';
import { LanguageWidget } from './languagewidget';
import { motion } from 'motion/react';
import { ProjectType } from '@/data/types';
import { projects } from '@/data/portfolio';

const ProjectCard = ({ project, index }: { project: ProjectType, index: number }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: index * 0.08 }}
        >
            <Link
                href={`/work/${project.slug}`}
                className="group flex flex-col md:flex-row bg-neutral-800 overflow-hidden border border-neutral-700 rounded-lg hover:border-purple-700 transition"
            >
                {/* Image */}
                <div className="md:w-2/5 shrink-0">
                    <Image
                        className="w-full h-56 md:h-full object-cover"
                        src={project.image}
                        alt={`Image describing ${project.title}`}
                        width={1200}
                        height={800}
                    />
                </div>

                {/* Content */}
                <div className="flex flex-col p-6 md:w-3/5">
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
        <div className="max-w-3xl mx-auto px-5 flex flex-col gap-8">
            {projects.map((project: ProjectType, index: number) => (
                <ProjectCard key={project.id} project={project} index={index} />
            ))}
        </div>
    );
};
