import Image from "next/image";
import { developer } from "@/data/portfolio";
import { EducationList } from "../shared/EducationList";
import styles from "../apps.module.css";

/** portrait, intro, background, skills and education */
export function About() {
  const { name, title, portrait, intro, about, skills, education } = developer;
  // first intro paragraph sits next to the portrait, the rest flow below
  const [lead, ...restOfIntro] = intro.paragraphs;

  return (
    <div className={styles.page}>
      <div className={styles.row}>
        <Image className={`${styles.portrait} os-sunken`} src={portrait} alt={`Portrait of ${name}`} width={224} height={224} />
        <div>
          <h1 className={styles.heading}>{name}</h1>
          <p className={styles.meta}>{title}</p>
          <p className={styles.paragraph}>{lead}</p>
        </div>
      </div>
      {[...restOfIntro, ...about.paragraphs].map((paragraph) => (
        <p key={paragraph} className={styles.paragraph}>{paragraph}</p>
      ))}

      <h2 className={styles.subheading}>{skills.heading}</h2>
      <ul className={styles.list}>
        {skills.groups.map((group) => (
          <li key={group.label}><strong>{group.label}:</strong> {group.text}</li>
        ))}
      </ul>

      <h2 className={styles.subheading}>{education.heading}</h2>
      <EducationList />
    </div>
  );
}
