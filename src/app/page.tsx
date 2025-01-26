import Head from 'next/head';

export default function Home() {
  return (
    <>
      <Head>
        <title>My Portfolio</title>
        <meta name="description" content="My portfolio built with Next.js and Tailwind CSS" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="min-h-screen bg-gray-900 text-white">
        {/* Header */}
        <header className="py-10 text-center">
          <h1 className="text-4xl font-bold">Jack Keirnan</h1>
          <p className="text-lg mt-2">Web Developer & Designer</p>
        </header>

        {/* About Section */}
        <section className="py-20 text-center">
          <h2 className="text-3xl font-semibold mb-6">About Me</h2>
          <p className="max-w-2xl mx-auto">
            I'm a passionate web developer with a focus on front-end technologies like React and Next.js.
            I love creating fast, accessible, and user-friendly websites.
          </p>
        </section>

        {/* Projects Section */}
        <section className="bg-gray-800 py-20">
          <h2 className="text-3xl font-semibold text-center mb-8 text-white">Projects</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Project 1 */}
            <div className="bg-gray-700 p-6 rounded-lg">
              <h3 className="text-xl font-semibold text-white mb-4">Project 1</h3>
              <p className="text-gray-400">A description of this awesome project.</p>
            </div>
            {/* Project 2 */}
            <div className="bg-gray-700 p-6 rounded-lg">
              <h3 className="text-xl font-semibold text-white mb-4">Project 2</h3>
              <p className="text-gray-400">A description of this awesome project.</p>
            </div>
            {/* Project 3 */}
            <div className="bg-gray-700 p-6 rounded-lg">
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
            href="mailto:youremail@example.com"
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
          >
            Email Me
          </a>
        </section>

        {/* Footer */}
        <footer className="bg-gray-800 py-6 text-center text-gray-400">
          <p>&copy; 2025 John Doe. All rights reserved.</p>
        </footer>
      </div>
    </>
  );
}
