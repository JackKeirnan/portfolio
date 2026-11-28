import type { Metadata } from "next";
import { pageMetadata } from "@/app/pageMetadata";

export const metadata: Metadata = pageMetadata("My Projects | Jack Keirnan", "Freelance, personal, university and game development projects by Jack Keirnan.");

/** Opens My Projects; the window itself is rendered by the (os) layout. */
export default function WorkPage() {
  return null;
}
