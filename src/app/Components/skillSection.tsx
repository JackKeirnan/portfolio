import { motion } from "framer-motion";
import { Code, Web, DesignServices, Storage, GitHub, School, Work } from "@mui/icons-material";

export default function SkillSection() {
    return (
        <section className="py-10 text-center min-h-screen">
            <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 1, ease: "easeOut" }}
            >
                <div className="w-full flex justify-center my-8">
                    <div className="w-2/3 h-[1px] bg-purple-600 opacity-30" />
                </div>

                {/* Skills */}
                <div className="md:flex gap-8 p-5 justify-center items-center">
                    <div className="flex-1 flex justify-end">
                        <div className="max-w-md w-full p-6 text-left">
                            <h2 className="text-2xl font-semibold mb-2 text-purple-600">Skills</h2>
                            <p className="text-gray-400">Tools and technologies I work with</p>
                        </div>
                    </div>

                    <div className="flex-1 flex justify-start">
                        <div className="max-w-md w-full p-5 flex flex-col items-start md:text-left md:text-lg text-gray-400 space-y-2">
                            <li className="flex items-center gap-2">
                                <Code className="text-purple-600" /> JavaScript, TypeScript, Python, Java
                            </li>
                            <li className="flex items-center gap-2">
                                <Web className="text-purple-600" /> React, Next.js, Node.js
                            </li>
                            <li className="flex items-center gap-2">
                                <DesignServices className="text-purple-600" /> Tailwind CSS, Figma, Framer Motion
                            </li>
                            <li className="flex items-center gap-2">
                                <Storage className="text-purple-600" /> MySQL, AWS, SpringBoot
                            </li>
                            <li className="flex items-center gap-2">
                                <GitHub className="text-purple-600" /> Git, GitHub, Serverless
                            </li>
                        </div>
                    </div>
                </div>

                <div className="w-full flex justify-center my-8">
                    <div className="w-2/3 h-[1px] bg-purple-600 opacity-30" />
                </div>

                {/* Education */}
                <div className="md:flex gap-8 p-5 justify-center items-center md:flex-row-reverse">
                    <div className="flex-1 flex justify-start">
                        <div className="max-w-md w-full p-6 text-left">
                            <h2 className="text-2xl font-semibold mb-2 text-purple-600">Education</h2>
                            <p className="text-gray-400">Academic background and achievements</p>
                        </div>
                    </div>

                    <div className="flex-1 flex justify-end">
                        <div className="max-w-md w-full p-5 flex flex-col items-start md:text-left md:text-lg text-gray-400">
                            <p>
                                <strong className="text-purple-600">BSc in Computer Science</strong>
                                <br />
                                Brunel University, London
                                <br />
                                <br />
                                Covered core concepts like software engineering, algorithms, and full-stack development, with a speciality in Game Development.
                            </p>
                        </div>
                    </div>
                </div>

                <div className="w-full flex justify-center my-8">
                    <div className="w-2/3 h-[1px] bg-purple-600 opacity-30" />
                </div>

                {/* Experience */}
                <div className="md:flex gap-8 p-5 justify-center items-center">
                    <div className="flex-1 flex justify-end">
                        <div className="max-w-md w-full p-6 text-left">
                            <h2 className="text-2xl font-semibold mb-2 text-purple-600">Experience</h2>
                            <p className="text-gray-400">Work I've done professionally and independently</p>
                        </div>
                    </div>

                    <div className="flex-1 flex justify-start">
                        <div className="max-w-md w-full p-5 flex flex-col items-start md:text-left md:text-lg text-gray-400 space-y-4">
                            <div className="flex items-center gap-4">
                                <Work className="text-purple-600" /> <strong className="text-purple-600">Freelance Developer</strong>
                                <br />
                                2024 – Present
                                <br />
                                Worked with several clients on primarily web-based projects. Involved rapid-prototyping and personal development.
                            </div>
                            <div className="flex items-center gap-4">
                                <Work className="text-purple-600" /> <strong className="text-purple-600">Software Developer Intern</strong>
                                <br />
                                AuraVision – 2022
                                <br />
                                Built internal tools (e.g. AWS and Serverless) for data control alongside learning how to work with a team.
                            </div>
                        </div>
                    </div>
                </div>

                <div className="w-full flex justify-center my-8">
                    <div className="w-2/3 h-[1px] bg-purple-600 opacity-30" />
                </div>
            </motion.div>
        </section>
    );
}
