import styles from "./Local.module.css";

export default function Local() {
  return (
    <section className={styles.container} id="local">
      <h2 className={styles.title}>Local do Evento</h2>

      <div className={styles.addressContainer}>
        <p className={styles.subtitle}>
          Será uma tarde gostosa e cheia de amor com almoço oferecido pelo casal
          e contamos com a sua ajuda para trazer sua bebida alcoólica de
          preferência! Dia 13 de Dezembro de 2025, às 14 horas
        </p>

        <p className={styles.address}>
          Rua Lucas de Leyde, 16 - Rio Pequeno, São Paulo
        </p>
      </div>

      <div className={styles.mapContainer}>
        <iframe
          title="Local do evento"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3656.698752929787!2d-46.763423599999996!3d-23.5792605!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94ce55c6b8e76b49%3A0x14c3c091beeba46c!2sRua%20Lucas%20de%20Leyde%2C%2016%20-%20Rio%20Pequeno%2C%20S%C3%A3o%20Paulo%20-%20SP%2C%2005376-010!5e0!3m2!1spt-BR!2sbr!4v1754914829447!5m2!1spt-BR!2sbr"
          width="100%"
          height="300"
          loading="lazy"
          style={{ border: 0 }}
          allowFullScreen
        />
      </div>
    </section>
  );
}
