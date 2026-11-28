import { developer } from "@/data/portfolio";
import { EducationList } from "../shared/EducationList";
import styles from "../apps.module.css";

/** experience timeline, education and the PDF download (hidden until a PDF is set) */
export function Cv() {
  const { experience, education, cvPdf } = developer;
  return (
    <div className={styles.page}>
      <h1 className={styles.heading}>Curriculum Vitae</h1>
      {cvPdf && (
        <div className={styles.buttons}>
          <a className="os-raised os-button" href={cvPdf} download>Download CV (PDF)</a>
        </div>
      )}
      <h2 className={styles.subheading}>{experience.heading}</h2>
      {experience.items.map((item) => (
        <div key={item.role + item.meta} className={styles.timelineItem}>
          <h3>{item.role}</h3>
          <p className={styles.meta}>{item.meta}</p>
          <p className={styles.paragraph}>{item.description}</p>
        </div>
      ))}
      <h2 className={styles.subheading}>{education.heading}</h2>
      <EducationList />
    </div>
  );
}
