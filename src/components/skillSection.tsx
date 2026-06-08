import { motion } from "framer-motion";
import SectionHeader from "./SectionHeader";
import Timeline from "./Timeline";
import { developer } from "@/data/portfolio";

export default function SkillSection() {
    const { skills, education, experience } = developer;

    // Flatten the comma-separated skill groups into individual chips.
    const skillChips = skills.groups.flatMap((group) =>
        group.text.split(",").map((skill) => skill.trim())
    );

    return (
        <motion.div
            className="max-w-3xl mx-auto px-5 py-16 space-y-24"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
        >
            {/* Skills */}
            <section>
                <SectionHeader title={skills.heading} subtitle={skills.subtitle} />
                <div className="flex flex-wrap justify-center gap-3">
                    {skillChips.map((skill, index) => (
                        <span
                            key={index}
                            className="px-4 py-2 rounded-full bg-neutral-800 border border-purple-900/40 text-gray-300 text-sm hover:border-purple-600 transition"
                        >
                            {skill}
                        </span>
                    ))}
                </div>
            </section>

            {/* Education */}
            <section>
                <SectionHeader title={education.heading} subtitle={education.subtitle} />
                <Timeline
                    items={education.items.map((item) => ({
                        title: item.degree,
                        subtitle: item.institution,
                        description: item.description,
                    }))}
                />
            </section>

            {/* Experience */}
            <section>
                <SectionHeader title={experience.heading} subtitle={experience.subtitle} />
                <Timeline
                    items={experience.items.map((item) => ({
                        title: item.role,
                        subtitle: item.meta,
                        description: item.description,
                    }))}
                />
            </section>
        </motion.div>
    );
}
