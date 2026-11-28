import type { Metadata } from "next";
import { pageMetadata } from "@/app/pageMetadata";

export const metadata: Metadata = pageMetadata("About Me | Jack Keirnan", "Background, skills and education of Jack Keirnan, software developer.");

/** opens About Me, the (os) layout renders the actual window */
export default function AboutPage() {
  return null;
}
