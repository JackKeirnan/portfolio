import type { Metadata } from "next";
import { pageMetadata } from "@/app/pageMetadata";

export const metadata: Metadata = pageMetadata("My Projects | Jack Keirnan", "Freelance, personal, university and game development projects by Jack Keirnan.");

/** opens My Projects, the (os) layout renders the actual window */
export default function WorkPage() {
  return null;
}
