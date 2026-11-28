import type { Metadata } from "next";
import { OS } from "@/os/OS";

export const metadata: Metadata = { title: "File not found | Jack Keirnan" };

/** 404s render JackOS with a File not found window (OS picks it from the URL) */
export default function NotFound() {
  return <OS />;
}
