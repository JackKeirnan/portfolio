"use client";

import Image from "next/image";
import { useState } from "react";
import { getProjectBySlug } from "@/data/portfolio";
import type { AppProps } from "@/os/apps";
import { PixelIcon } from "@/os/PixelIcon";
import { NotFound } from "../notFound/NotFound";
import styles from "../apps.module.css";

/** One project: screenshot, description, tech tags and live link. */
export function ProjectViewer({ params }: AppProps) {
  const project = getProjectBySlug(params?.slug ?? "");
  const [imageFailed, setImageFailed] = useState(false);

  // A stale or hand-typed slug shows the same File not found as the URL route.
  if (!project) return <NotFound />;

  return (
    <article className={styles.page}>
      {/* A broken screenshot falls back to an icon instead of a broken-image box. */}
      {imageFailed ? (
        <div className={styles.shotFallback}><PixelIcon name="document" size={48} /></div>
      ) : (
        <Image
          className={styles.shot}
          src={project.image}
          alt={`Screenshot of ${project.title}`}
          width={1200}
          height={750}
          sizes="(max-width: 767px) 100vw, 640px"
          onError={() => setImageFailed(true)}
        />
      )}
      <h1 className={styles.heading}>{project.title}</h1>
      <p className={styles.meta}>{project.category}</p>
      <div className={styles.tags}>
        {project.languages.map((language) => <span key={language} className={styles.tag}>{language}</span>)}
      </div>
      {project.longdescription.map((paragraph) => <p key={paragraph} className={styles.paragraph}>{paragraph}</p>)}
      {project.liveUrl && (
        <div className={styles.buttons}>
          <a className="os-raised os-button" href={project.liveUrl} target="_blank" rel="noopener noreferrer">Visit site</a>
        </div>
      )}
    </article>
  );
}
