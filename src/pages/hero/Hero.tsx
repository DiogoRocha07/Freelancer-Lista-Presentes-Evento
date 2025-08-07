import Image from "next/image";
import styles from "./Hero.module.css";

export default function Hero() {
  return (
    <section className={styles.hero} id="/">
      <h1 className={styles.title}>Chá de Casa Nova</h1>
      <p className={styles.date}>07.12.2025 - São Paulo</p>

      <div className={styles.gallery}>
        <Image
          src="/images/fotoJenny.jpg"
          alt="foto1"
          width={350}
          height={430}
        />
        <Image
          src="/images/fotoJenny.jpg"
          alt="foto2"
          width={350}
          height={430}
        />
        <Image
          src="/images/fotoJenny.jpg"
          alt="foto3"
          width={350}
          height={430}
        />
      </div>
    </section>
  );
}
