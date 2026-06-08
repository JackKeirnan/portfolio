"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { developer, navLinks } from "@/data/portfolio";

export default function Navbar() {
    const pathname = usePathname();

    const isActive = (href: string) =>
        href === "/" ? pathname === "/" : pathname.startsWith(href);

    return (
        <header className="sticky top-0 z-50 bg-neutral-950/80 backdrop-blur border-b border-purple-900/30">
            <nav className="max-w-5xl mx-auto flex items-center justify-between px-5 py-4">
                <Link href="/" className="text-purple-600 font-bold text-lg hover:text-purple-400 transition">
                    {developer.name}
                </Link>

                <ul className="flex items-center gap-6 text-gray-400">
                    {navLinks.map((link) => (
                        <li key={link.href}>
                            <Link
                                href={link.href}
                                className={`pb-1 border-b-2 transition duration-200 hover:text-purple-400 ${
                                    isActive(link.href)
                                        ? "border-purple-600 text-purple-400"
                                        : "border-transparent"
                                }`}
                            >
                                {link.label}
                            </Link>
                        </li>
                    ))}
                </ul>
            </nav>
        </header>
    );
}
