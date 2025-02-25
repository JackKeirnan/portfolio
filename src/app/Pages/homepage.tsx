"use client";

import Head from 'next/head';
import Image from 'next/image';
import portrait from '/public/Images/Jack.png'
import { ProjectGrid } from '../Components/projects';
import dynamic from 'next/dynamic';
import animationData from "../Lotties/BrickBuilding.json";
import { motion } from 'motion/react';


export default function homepage() {

  const Lottie = dynamic(() => import('lottie-react'), { ssr: false });

  return (
    <>
      <Head>
        <title>My Portfolio</title>
        <meta name="description" content="My portfolio built with Next.js and Tailwind CSS" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="min-h-screen bg-neutral-950">
        {/* Header */}
        <header className="py-5 text-center text-gray-400">
        </header>

        {/* Intro Section */}
        <section className='py-10 text-center '>
        <motion.div className='gap-8 p-5'
          initial={{opacity:0}}
          whileInView={{opacity:1}}
          transition={{duration:1, ease:"easeOut"}}>
            
            {/* Dynamic Image */}
            <div className="p-5 rounded-lg flex-1 flex justify-center items-center">
              <Image className='max-w-[15rem] max-h-[25rem] rounded-full'src={portrait} alt='Image'></Image>
            </div>

            {/* Introductory Text */}
            <div className="p-5 rounded-lg flex-1 flex flex-col justify-center items-center ">
              <h1 className='text-6xl text-purple-900 text-bold'>Hi!</h1>
              <div className="text-gray-400 max-w-[50%] text-xl">
                <p>
                  <br />
                    My name's Jack and I'm an aspiring Software Developer.
                  <br />
                  <br />
                    I've designed and created this website with the purpose that is to showcase my work in a more convinient and detailed way!
                  <br />
                  <br />
                    I'm currently working freelance but I'm looking for permanent work, if you would like to chat feel free to contact me on any of my socials.
                  <br />
                  <br />
                </p>
              </div>
            </div>


          </motion.div>
        </section>

        {/* About Section */}
        <section className="py-10 text-center ">
        <motion.div className='md:flex gap-8 p-5 h-screen'
          initial={{opacity:0}}
          whileInView={{opacity:1}}
          transition={{duration:1, ease:"easeOut"}}>

            {/* Portrait */}
            
            <div className="p-6 rounded-lg flex-1 flex justify-center items-center">
              <Lottie 
              animationData={animationData} 
              className='flex justify-center items-center w-[50%]'
              loop={true}>
              </Lottie>
            </div>


            {/* Explanation Text */}
            <div className="p-5 rounded-lg flex-1 flex flex-col justify-center items-center text-xl">
              <p className="text-gray-400 max-w-[50%]">
                Born in the UK but raised in the Middle East, I've lived a life of travel and vast experiences.
                <br />
                <br />
              After graduating from university with a Bachelors in Computer Science, I set out to begin my work in freelance to occupy my time whilst I look for more permanent work. 
              <br />
              <br />
              I not only take pride in what I create, but more importantly I strive to always improve on my work; a perfectionist at heart.
              </p>
            </div>

          </motion.div>
        </section>

        {/* Projects Section */}
        <section className="py-10 text-center min-h-screen">
          <ProjectGrid />
        </section>

        {/* Contact Section */}
        <section className="py-20 text-center text-gray-400">
          <h2 className="text-3xl font-semibold mb-6">Contact</h2>
          <p className="max-w-2xl mx-auto mb-8">
            Feel free to reach out if you want to collaborate or just say hi!
          </p>
          <div className='flex justify-center gap-3'>
            <a href="mailto:jackkeirnan@gmail.com" className="btn w-[8rem] bg-purple-900 text-white hover:bg-purple-900 hover:border-5 hover:border-white">Email</a>
            <a href="https://www.linkedin.com/in/jackkeirnan/" className="btn w-[8rem] bg-purple-900 text-white hover:bg-purple-900 hover:border-5 hover:border-white">LinkedIn</a>
            <a href="https://github.com/JackKeirnan" className="btn w-[8rem] bg-purple-900 text-white hover:bg-purple-900 hover:border-5 hover:border-white">GitHub</a>
          </div>

        </section>

        {/* Footer */}
        <footer className="py-6 text-center text-gray-400">
          <p>&copy; 2025 Jack Keirnan. Built with NextJS and Tailwind, hosted by Vercel. Uses DaisyUI for some components.</p>
        </footer>
      </div>
    </>
  );
}
