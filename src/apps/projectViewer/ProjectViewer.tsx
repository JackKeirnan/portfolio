"use client";

import Image from "next/image";
import { useState } from "react";
import { getProjectBySlug, projectScreenshots } from "@/data/portfolio";
import type { AppProps } from "@/os/apps";
import { PixelIcon } from "@/os/PixelIcon";
import { NotFound } from "../notFound/NotFound";
import styles from "../apps.module.css";

/** one project - screenshot gallery, description, tech tags and live link */
export function ProjectViewer({ params }: AppProps) {
  const project = getProjectBySlug(params?.slug ?? "");
  const [shown, setShown] = useState(0);
  // track failures per image so one broken shot doesn't hide the rest
  const [failed, setFailed] = useState<ReadonlySet<string>>(new Set());

  // stale or hand-typed slug gets the same File not found as the URL route
  if (!project) return <NotFound />;

  const screenshots = projectScreenshots(project);
  const current = screenshots[shown] ?? screenshots[0];
  const markFailed = (src: string) => setFailed((previous) => new Set(previous).add(src));

  return (
    <article className={styles.page}>
      {/* broken screenshot falls back to an icon instead of a broken-image box */}
      {failed.has(current) ? (
        <div className={styles.shotFallback}><PixelIcon name="document" size={48} /></div>
      ) : (
        <Image
          className={styles.shot}
          src={current}
          alt={`Screenshot ${shown + 1} of ${screenshots.length}: ${project.title}`}
          width={1200}
          height={750}
          sizes="(max-width: 767px) 100vw, 640px"
          onError={() => markFailed(current)}
        />
      )}

      {screenshots.length > 1 && (
        <div role="group" aria-label="Screenshots" className={styles.thumbs}>
          {screenshots.map((src, index) => (
            <button
              key={src}
              type="button"
              aria-label={`Show screenshot ${index + 1}`}
              aria-pressed={index === shown}
              className={`os-sunken ${styles.thumb}`}
              onClick={() => setShown(index)}
            >
              {failed.has(src) ? (
                <PixelIcon name="document" size={24} />
              ) : (
                <Image src={src} alt="" width={96} height={60} sizes="96px" onError={() => markFailed(src)} />
              )}
            </button>
          ))}
        </div>
      )}

      <h1 className={styles.heading}>{project.title}</h1>
      <p className={styles.meta}>
        {project.category}
        {project.collaborator && (
          <>
            {" · Made with "}
            {project.collaborator.href ? (
              <a href={project.collaborator.href} target="_blank" rel="noopener noreferrer">{project.collaborator.name}</a>
            ) : (
              project.collaborator.name
            )}
          </>
        )}
      </p>
      <div className={styles.tags}>
        {project.languages.map((language) => <span key={language} className={styles.tag}>{language}</span>)}
      </div>
      {project.longdescription.map((paragraph) => <p key={paragraph} className={styles.paragraph}>{paragraph}</p>)}
      {(project.liveUrl || project.repoUrl) && (
        <div className={styles.buttons}>
          {project.liveUrl && (
            <a className="os-raised os-button" href={project.liveUrl} target="_blank" rel="noopener noreferrer">Visit site</a>
          )}
          {project.repoUrl && (
            <a className="os-raised os-button" href={project.repoUrl} target="_blank" rel="noopener noreferrer">View on GitHub</a>
          )}
        </div>
      )}
    </article>
  );
}
