import Link from "next/link";

export default function NotFound() {
  return (
    <section className="min-h-[60vh] flex flex-col items-center justify-center text-center px-5 py-20">
      <h1 className="text-6xl font-bold text-purple-900">404</h1>
      <h2 className="text-2xl text-purple-400 mt-4">Nothing here yet</h2>
      <p className="text-gray-400 max-w-md mt-3">
        The page you&apos;re looking for doesn&apos;t exist or hasn&apos;t been built out yet.
        It might be a project that&apos;s still in the works.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-4">
        <Link href="/" className="btn bg-purple-900 text-neutral-300 border-none hover:bg-purple-800">
          Back Home
        </Link>
        <Link href="/work" className="btn bg-transparent text-purple-400 border border-purple-900 hover:bg-purple-900 hover:text-neutral-300">
          View My Work
        </Link>
      </div>
    </section>
  );
}
