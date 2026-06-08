"use client";

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'motion/react';
import ContactSection from "@/components/contactSection";
import { developer } from "@/data/portfolio";

export default function homepage() {

  const { intro } = developer;

  return (
    <>
      {/* Intro / Hero Section */}
      <section className="px-5 py-20">
        <motion.div
          className="max-w-2xl mx-auto flex flex-col items-center text-center"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          {/* Portrait */}
          <Image
            className="w-48 h-48 rounded-full object-cover border-2 border-purple-900/50"
            src={developer.portrait}
            alt={developer.name}
            width={300}
            height={300}
          />

          {/* Heading + role */}
          <h1 className="text-5xl md:text-6xl font-bold text-purple-900 mt-8">{intro.heading}</h1>
          <p className="text-purple-400 text-lg mt-2">{developer.name} — {developer.title}</p>

          {/* Intro paragraphs */}
          <div className="text-gray-400 md:text-lg mt-8 space-y-12 leading-relaxed">
            {intro.paragraphs.map((para, index) => (
              <p key={index}>{para}</p>
            ))}
          </div>

          {/* Calls to action into the deeper routes */}
          <div className="mt-16 flex flex-wrap justify-center gap-8">
            <Link href="/work" className="btn bg-purple-900 text-neutral-300 border-none hover:bg-purple-800">
              View My Work
            </Link>
            <Link href="/about" className="btn bg-transparent text-purple-400 border border-purple-900 hover:bg-purple-900 hover:text-neutral-300">
              About Me
            </Link>
          </div>
        </motion.div>
      </section>

      {/* Contact Section */}
      <ContactSection />
    </>
  );
}
