import styles from "./Header.module.css"
import Link from "next/link";


export default function Header() {
  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        <ul className={styles.menu}>
          <li><Link href="/">Home</Link></li>
          <li><Link href="#local">Local</Link></li>
          <li><Link href="#presentes">Lista de Presentes</Link></li>
          <li><Link href="#confirmacao">Confirme sua Presença</Link></li>
          <li><Link href="#recados">Recados</Link></li>
        </ul>
      </nav>
    </header>
  );
}
