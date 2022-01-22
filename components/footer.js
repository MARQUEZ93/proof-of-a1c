import Link from "next/link";
import styles from "./footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <hr />
      <ul className={styles.navItems}>
        <li className={styles.navItem}>
          <a href="https://github.com/marquez93/proof-of-a1c">GitHub</a>
        </li>
        <li className={styles.navItem}>
          <a href="https://dromarquez.com">AEM</a>
        </li>
        <li className={styles.navItem}>
          <Link href="/about">
            <a>About</a>
          </Link>
        </li>
      </ul>
    </footer>
  )
};
