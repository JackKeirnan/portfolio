import type { Metadata } from "next";
import { pageMetadata } from "@/app/pageMetadata";

export const metadata: Metadata = pageMetadata("About Me | Jack Keirnan", "Background, skills and education of Jack Keirnan, software developer.");

/** Opens About Me; the window itself is rendered by the (os) layout. */
export default function AboutPage() {
  return null;
}
