"use client";

import dynamic from 'next/dynamic';
import animationData from "@/lotties/BrickBuilding.json";
import { motion } from 'motion/react';
import SkillSection from "@/components/skillSection";
import { developer } from "@/data/portfolio";

// Defined at module scope so it isn't recreated on every render.
const Lottie = dynamic(() => import('lottie-react'), { ssr: false });

export default function aboutpage() {

  const { about } = developer;

  return (
    <>
      {/* About Section — Lottie stacked above the bio text */}
      <section className="px-5 py-20">
        <motion.div
          className="max-w-2xl mx-auto flex flex-col items-center text-center"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          {/* Animation */}
          <div className="w-56 flex justify-center items-center">
            <Lottie animationData={animationData} loop={true} />
          </div>

          <h1 className="text-4xl md:text-5xl font-bold text-purple-900 mt-6">About Me</h1>
          <div className="w-16 h-[2px] bg-purple-600/50 mx-auto mt-4" />

          {/* Bio text */}
          <div className="text-gray-400 md:text-lg mt-8 space-y-5 leading-relaxed">
            {about.paragraphs.map((para, index) => (
              <p key={index}>{para}</p>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Skills / Education / Experience */}
      <SkillSection />
    </>
  );
}
