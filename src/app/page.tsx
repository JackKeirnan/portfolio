import Head from 'next/head';
import Image from 'next/image';
import image from './Images/500px.jpg'

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
        <header className="py-10 text-center">

          <div className='flex gap-8'>
            
            {/* Introductory Text */}
            <div className="bg-gray-700 p-6 rounded-lg flex-1 flex flex-col justify-center items-center">
              <h3 className="text-xl font-semibold text-white mb-4">Intro Text</h3>
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
            <div className="bg-gray-700 p-6 rounded-lg flex-1">
              <Image className='mx-auto'src={image} alt='Image'></Image>
              <p className="text-gray-400"></p>
            </div>

          </div>
          
        </header>

        {/* About Section */}
        <section className="py-20 text-center">
        <div className='flex gap-8'>

            {/* Portrait */}
            <div className="bg-gray-700 p-6 rounded-lg flex-1">
              <Image className='mx-auto'src={image} alt='Image'></Image>
              <p className="text-gray-400"></p>
            </div>

            {/* Explanation Text */}
            <div className="bg-gray-700 p-6 rounded-lg flex-1 flex flex-col justify-center items-center">
              <p className="text-gray-400">
              I've been interested in computer science since I was 14, always taking my chances inside or outside of school to further my knowledge.
              After graduating from university with a Bachelors in Computer Science, I set out to begin my work in freelance to occupy my time whilst I look for more permanent work. 
              I not only take pride in what I create, but more importantly I strive to always improve on my work; a perfectionist at heart.
              </p>
            </div>

          </div>
        </section>

        {/* Projects Section */}
        <section className="py-20">

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Project 1 */}
            <div className="bg-gray-700 p-6 rounded-lg">
              <Image className='mx-auto w-full h-1/2'src={image} alt='Image'></Image>
              <h3 className="text-xl font-semibold text-white mb-4">Project 1</h3>
              <p className="text-gray-400">A description of this awesome project.</p>
            </div>
            {/* Project 2 */}
            <div className="bg-gray-700 p-6 rounded-lg">
              <Image className='mx-auto w-full h-1/2'src={image} alt='Image'></Image>
              <h3 className="text-xl font-semibold text-white mb-4">Project 2</h3>
              <p className="text-gray-400">A description of this awesome project.</p>
            </div>
            {/* Project 3 */}
            <div className="bg-gray-700 p-6 rounded-lg">
              <Image className='mx-auto w-full h-1/2'src={image} alt='Image'></Image>
              <h3 className="text-xl font-semibold text-white mb-4">Project 3</h3>
              <p className="text-gray-400">A description of this awesome project.</p>
            </div>
          </div>

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
