import type { Metadata } from "next";
import { pageMetadata } from "@/app/pageMetadata";

export const metadata: Metadata = pageMetadata("Contact | Jack Keirnan", "Get in touch with Jack Keirnan about freelance work or opportunities.");

/** opens Contact, the (os) layout renders the actual window */
export default function ContactPage() {
  return null;
}
