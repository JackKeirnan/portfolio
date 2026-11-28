import type { Metadata } from "next";
import { alt, size } from "./opengraph-image";

// Next.js drops the file-based card image once a page sets its own openGraph, so name it here.
const cardImage = { url: "/opengraph-image", ...size, alt };

/**
 * Title and description for a page, repeated in its social-card tags.
 * Next.js inherits openGraph/twitter whole, so each page must set them or shares show the home card.
 */
export function pageMetadata(title: string, description: string): Metadata {
  return {
    title,
    description,
    openGraph: { type: "website", siteName: "JackOS", title, description, images: [cardImage] },
    twitter: { card: "summary_large_image", title, description, images: [cardImage] },
  };
}
