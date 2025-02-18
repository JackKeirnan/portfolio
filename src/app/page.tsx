"use client";

import Head from 'next/head';
import Image from 'next/image';
import image from '/public/Images/500px.jpg'
import { ProjectGrid } from './Components/projects';

export default function Home() {
  return (
    <>
      <Head>
        <title>My Portfolio</title>
        <meta name="description" content="My portfolio built with Next.js and Tailwind CSS" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="min-h-screen bg-gray-950 text-white">
        {/* Header */}
        <header className="py-5 text-center text-gray-400">
        </header>

        {/* Intro Section */}
        <section className='py-10 text-center'>
        <div className='flex gap-8 p-5 h-screen'>
            
            {/* Introductory Text */}
            <div className="p-6 rounded-lg flex-1 flex flex-col justify-center text-lg">
              <p className="text-gray-400">
              Hey, I'm Jack and I'm an aspiring Software Developer.
              <br>
              </br>
              This website serves as my Portfolio for all of my projects ranging from games, websites and more!
              <br>
              </br>
              I'm currently working freelance but I'm looking for permanent work, if you would like to chat feel free to contact any of my socials.
              </p>
            </div>

            {/* Dynamic Image */}
            <div className="p-6 rounded-lg flex-1 flex items-center">
              <Image className='mx-auto'src={image} alt='Image'></Image>
              <p className="text-gray-400"></p>
            </div>

          </div>
        </section>

        {/* About Section */}
        <section className="py-20 text-center">
        <div className='flex gap-8 p-5 h-screen'>

            {/* Portrait */}
            <div className="p-5 rounded-lg flex-1 flex items-center">
              <Image className='mx-auto'src={image} alt='Image'></Image>
              <p className="text-gray-400"></p>
            </div>

            {/* Explanation Text */}
            <div className="p-5 rounded-lg flex-1 flex flex-col justify-center items-center text-lg">
              <p className="text-gray-400">
              I've been interested in computer science since I was 14, always taking my chances inside or outside of school to further my knowledge.
              <br>
              </br>
              After graduating from university with a Bachelors in Computer Science, I set out to begin my work in freelance to occupy my time whilst I look for more permanent work. 
              <br>
              </br>
              I not only take pride in what I create, but more importantly I strive to always improve on my work; a perfectionist at heart.
              </p>
            </div>

          </div>
        </section>

        {/* Projects Section */}
        <section>
          <ProjectGrid />
        </section>



        {/* Contact Section */}
        <section className="py-20 text-center">
          <h2 className="text-3xl font-semibold mb-6">Contact</h2>
          <p className="max-w-2xl mx-auto mb-8">
            Feel free to reach out if you want to collaborate or just say hi!
          </p>
          <a
            href="jackkeirnan@gmail.com"
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
          >
            Email Me
          </a>
        </section>

        {/* Footer */}
        <footer className="bg-gray-800 py-6 text-center text-gray-400">
          <p>&copy; 2025 Jack Keirnan. All rights reserved.</p>
        </footer>
      </div>
    </>
  );
}
