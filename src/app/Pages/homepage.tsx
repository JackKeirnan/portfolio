"use client";

import Head from 'next/head';
import Image from 'next/image';
import portrait from '/public/Images/Jack.png'
//import { ProjectGrid } from '../Components/projects';
import dynamic from 'next/dynamic';
import animationData from "../Lotties/BrickBuilding.json";
import { motion } from 'motion/react';
import ContentSection from '../Components/contentSection';
import SkillSection from "../Components/skillSection";
import ContactSection from "../Components/contactSection";


export default function homepage() {

  const Lottie = dynamic(() => import('lottie-react'), { ssr: false });

  return (
    <>
      <Head>
        <title>My Portfolio</title>
        <meta name="description" content="My portfolio built with Next.js and Tailwind CSS" />
        <link rel="icon" href="" />
      </Head>

      <div className="min-h-screen bg-neutral-950">
        {/* Header */}
        <header className="py-5 text-center text-gray-400"></header>

        {/* Intro Section */}
        <section className='py-10 text-center'>
        <motion.div className='gap-8 p-5'
          initial={{opacity:0}}
          whileInView={{opacity:1}}
          transition={{duration:1, ease:"easeOut"}}>
            
            {/* Dynamic Image */}
            <div className="p-5 rounded-lg flex-1 flex justify-center items-center">
              <Image className='max-w-[15rem] max-h-[25rem] rounded-full' src={portrait} alt='Image'></Image>
            </div>

            {/* Introductory Text */}
            <div className="p-5 rounded-lg flex-1 flex flex-col justify-start items-center">
              <h1 className='text-6xl text-purple-900 text-bold'>Hi!</h1>
              <div className="text-gray-400 max-w-[50%] md:text-xl">
                <p>
                  <br />
                    I'm Jack – a Software Developer passionate about building clean, effective solutions.
                  <br />
                  <br />
                    This website is a space where I showcase my projects, skills, and development journey in more detail.
                  <br />
                  <br />
                    Currently, I work as a freelance developer, offering a range of services to clients who need reliable, high-quality software solutions. I'm always open to new freelance opportunities — whether it’s building something from the ground up or jumping in to support an existing project.
                  <br />
                  <br />
                  At the same time, I'm actively seeking a full-time role where I can contribute to a dynamic team, grow alongside experienced developers, and take on long-term challenges that push me to improve.
                </p>
              </div>
            </div>


          </motion.div>
        </section>

        {/* About Section */}
        <section className="py-10 text-center">
        <motion.div className='md:flex gap-8 p-5'
          initial={{opacity:0}}
          whileInView={{opacity:1}}
          transition={{duration:1, ease:"easeOut"}}>

            {/* Portrait */}
            <div className="p-6 rounded-lg flex-1 flex justify-center items-center md:justify-end">
              <Lottie 
              animationData={animationData} 
              className='flex justify-center items-center w-[50%]'
              loop={true}>
              </Lottie>
            </div>


            {/* Explanation Text */}
            <div className="p-5 rounded-lg flex-1 flex flex-col items-center md:text-xl md:items-start">
              <p className="text-gray-400 max-w-[50%]">
                  Originally from the UK and raised in the Middle East, my background has given me a broad perspective and adaptability — qualities I bring into every project I take on.
                <br />
                <br />
                  With a BSc in Computer Science and hands-on experience in freelance development, I’m committed to continuous learning and refining my craft. I'm a perfectionist at heart, always looking for ways to make things better.
                <br />
                <br />
                  If you're interested in working together — freelance or full-time — feel free to reach out through any of my socials or contact links.
              </p>
            </div>

          </motion.div>
        </section>

        {/* Skills Section */}
        <section>
          <div>
            <SkillSection />
          </div>
        </section>


        {/* Newer Projects Section */}
        <section>
          <div className={'text-center'}>
            <h2 className="text-4xl text-purple-900 font-bold">Examples of my Work</h2>
          </div>
          <ContentSection />
          <div className="w-full flex justify-center my-8">
            <div className="w-2/3 h-[1px] bg-purple-600 opacity-30" />
          </div>
        </section>

        {/* WIP Projects Section */}
        {/*<section className="py-10 text-center min-h-screen">
          <ProjectGrid />
        </section>
        */}

        {/* WIP Services Section */}
        {/*
        <section className='py-20 text-center text-gray-400'>
          <h2 className='text-3xl font-semibold mb-6'>Services</h2>
          <p className="max-w-2xl mx-auto mb-8">
            I offer website creation services too! If you are interested, please visit the page below to see the details
          </p>
          <a href="" className="btn w-[8rem] bg-purple-900 text-neutral-300 hover:bg-purple-900 hover:border-5 hover:border-white">Services Page</a>
        </section>
        */}

        {/* Contact Section */}
        <section>
          <ContactSection />
        </section>


        {/* Footer */}
        <footer className="py-6 text-center text-gray-400">
          <p>&copy; 2025 Jack Keirnan. Built with NextJS and Tailwind, hosted by Vercel. Uses DaisyUI and MaterialUI.</p>
        </footer>
      </div>
    </>
  );
}
