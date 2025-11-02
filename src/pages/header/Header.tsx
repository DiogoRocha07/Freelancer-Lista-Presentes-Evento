import styles from "./Header.module.css"
import Link from "next/link";
import { useState } from "react";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        <ul className={styles.menu}>
          <li><Link href="/">Home</Link></li>
          <li><Link href="#local">Local</Link></li>
          <li><Link href="#presentes">Lista de Presentes</Link></li>
          {/* <li><Link href="#confirmacao">Confirme sua Presença</Link></li> */}
          {/* <li><Link href="#recados">Recados</Link></li> */}
        </ul>
        
        <button 
          className={styles.mobileMenuButton}
          onClick={toggleMobileMenu}
          aria-label="Toggle mobile menu"
        >
          ☰
        </button>
      </nav>
      
      <div className={`${styles.mobileMenu} ${mobileMenuOpen ? styles.mobileMenuOpen : ''}`}>
        <ul>
          <li><Link href="/" onClick={closeMobileMenu}>Home</Link></li>
          <li><Link href="#local" onClick={closeMobileMenu}>Local</Link></li>
          <li><Link href="#presentes" onClick={closeMobileMenu}>Lista de Presentes</Link></li>
          {/* <li><Link href="#confirmacao" onClick={closeMobileMenu}>Confirme sua Presença</Link></li> */}
          {/* <li><Link href="#recados" onClick={closeMobileMenu}>Recados</Link></li> */}
        </ul>
      </div>
    </header>
  );
}
