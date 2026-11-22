import type { Metadata } from "next";
import { developer, projects } from "@/data/portfolio";
import styles from "./plain.module.css";

export const metadata: Metadata = {
  title: "Plain view | Jack Keirnan",
  description: "Jack Keirnan's CV, projects and contact details as a simple text page.",
};

/** Fallback for screen readers and hurried recruiters: everything, no desktop. */
export default function PlainPage() {
  // Pull every section out of the shared portfolio data.
  const { name, title, intro, about, cvPdf, experience, education, skills, contact, footer } = developer;
  // One flat page: header and intro, then each section as a heading and list.
  return (
    <div className={styles.scroll}>
      <main className={styles.page}>
        <p><a href="/">Back to JackOS</a></p>
        <h1>{name}</h1>
        <p className={styles.lead}>{title}</p>
        {[...intro.paragraphs, ...about.paragraphs].map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
        {cvPdf && <p><a href={cvPdf} download>Download CV (PDF)</a></p>}

        <h2>{experience.heading}</h2>
        <ul>
          {experience.items.map((item) => (
            <li key={item.role + item.meta}><strong>{item.role}</strong>, {item.meta}. {item.description}</li>
          ))}
        </ul>

        <h2>{education.heading}</h2>
        <ul>
          {education.items.map((item) => (
            <li key={item.degree}><strong>{item.degree}</strong>, {item.institution}. {item.description}</li>
          ))}
        </ul>

        <h2>{skills.heading}</h2>
        <ul>
          {skills.groups.map((group) => <li key={group.label}><strong>{group.label}:</strong> {group.text}</li>)}
        </ul>

        <h2>Projects</h2>
        <ul>
          {projects.map((project) => (
            <li key={project.slug}><a href={`/work/${project.slug}`}>{project.title}</a>: {project.description}</li>
          ))}
        </ul>

        <h2>{contact.heading}</h2>
        <ul>
          {contact.links.map((link) => <li key={link.label}><a href={link.href}>{link.label}</a></li>)}
        </ul>

        <footer className={styles.footer}>{footer}</footer>
      </main>
    </div>
  );
}
