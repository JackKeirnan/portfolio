import { developer } from "@/data/portfolio";
import styles from "../apps.module.css";

/** Education entries as a small timeline. */
export function EducationList() {
  // One timeline entry per education item.
  return (
    <>
      {developer.education.items.map((item) => (
        <div key={item.degree} className={styles.timelineItem}>
          <h3>{item.degree}</h3>
          <p className={styles.meta}>{item.institution}</p>
          <p className={styles.paragraph}>{item.description}</p>
        </div>
      ))}
    </>
  );
}
