import { developer } from "@/data/portfolio";
import styles from "../apps.module.css";

/** contact links as buttons. no form so no backend or spam handling */
export function Contact() {
  const { contact } = developer;
  return (
    <div className={styles.page}>
      <h1 className={styles.heading}>{contact.heading}</h1>
      <p className={styles.paragraph}>{contact.blurb}</p>
      <div className={styles.buttons}>
        {contact.links.map((link) => {
          // mailto links stay in the tab, web links open a new one
          const external = !link.href.startsWith("mailto:");
          return (
            <a
              key={link.label}
              className="os-raised os-button"
              href={link.href}
              target={external ? "_blank" : undefined}
              rel={external ? "noopener noreferrer" : undefined}
            >
              {link.label}
            </a>
          );
        })}
      </div>
    </div>
  );
}
