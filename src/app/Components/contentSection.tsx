'use client';
import React, { useState } from 'react';
import { projects } from '../Data/projectdata';
import { motion } from 'framer-motion';

export default function ProjectSection() {
    const [activeIndex, setActiveIndex] = useState(0);

    if (!Array.isArray(projects) || projects.length === 0) {
        return <div className="text-gray-400 p-10">No projects available.</div>;
    }

    const {
        image,
        title,
        description,
        longdescription,
        languages,
    } = projects[activeIndex];

    return (
        <section className="text-center text-gray-400 flex items-center justify-center px-4 py-10">
            <motion.div
                className="flex flex-col md:flex-row gap-8 p-5"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 1, ease: 'easeOut' }}
            >
                {/* Left Sticky Navbar */}
                <div className="w-full md:w-1/3 h-full flex flex-col items-center md:items-start p-5 text-gray-400 space-y-4 overflow-y-auto mb-8 md:mb-0">
                    {projects.map((project, index) => (
                        <button
                            key={project.id}
                            onClick={() => setActiveIndex(index)}
                            className={`hover:text-purple-900 border-b-2 transition duration-200 ${
                                activeIndex === index
                                    ? 'border-purple-900 text-purple-900' // Permanent border for active tab
                                    : 'border-transparent'
                            }`}
                        >
                            {project.title}
                        </button>
                    ))}
                </div>

                {/* Right Area for Content */}
                <div className="w-full md:w-[90vh] md:h-[80vh] h-auto p-6 flex flex-col justify-start items-center md:items-start text-gray-400 overflow-y-auto space-y-4">
                    <img src={image} alt={title} className="w-full h-auto rounded shadow" />
                    <h2 className="text-2xl font-bold text-purple-900">{title}</h2>
                    <p className="text-lg italic text-gray-400">{description}</p>
                    <div className="space-y-2 mt-2 text-left">
                        {longdescription.map((para, index) => (
                            <p key={index} className="text-sm text-gray-400">{para}</p>
                        ))}
                    </div>
                    <div className="mt-4">
                        <h4 className="text-md font-semibold text-purple-900">Technologies Used:</h4>
                        <ul className="flex flex-wrap gap-2 mt-1 text-sm">
                            {languages.map((lang, index) => (
                                <li
                                    key={index}
                                    className="bg-purple-900 text-gray-400 px-2 py-1 rounded-full"
                                >
                                    {lang}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </motion.div>
        </section>
    );
}
