import type { Metadata } from "next";
import { pageMetadata } from "@/app/pageMetadata";

export const metadata: Metadata = pageMetadata("Contact | Jack Keirnan", "Get in touch with Jack Keirnan about freelance work or opportunities.");

/** Opens Contact; the window itself is rendered by the (os) layout. */
export default function ContactPage() {
  return null;
}
