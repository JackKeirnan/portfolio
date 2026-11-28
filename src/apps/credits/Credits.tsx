import { developer } from "@/data/portfolio";
import { PixelIcon } from "@/os/PixelIcon";
import styles from "../apps.module.css";

/** About JackOS - who built it + credits for everything it uses, read from portfolio.ts */
export function Credits() {
  return (
    <div className={styles.page}>
      <div className={styles.row}>
        <PixelIcon name="welcome" size={48} />
        <div>
          <h1 className={styles.heading}>JackOS</h1>
          <p className={styles.meta}>Version 1.0</p>
        </div>
      </div>

      <h2 className={styles.subheading}>Credits</h2>
      <ul className={styles.list}>
        {developer.credits.map((credit) => (
          <li key={credit.label}>
            <strong>{credit.label}:</strong>{" "}
            {credit.href ? (
              <a href={credit.href} target="_blank" rel="noopener noreferrer">{credit.detail}</a>
            ) : (
              credit.detail
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
