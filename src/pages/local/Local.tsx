import styles from "./Local.module.css";

export default function Local() {
  return (
    <section className={styles.container} id="local">
      <h2 className={styles.title}>Local do Evento</h2>

      <div className={styles.addressContainer}>
        <p className={styles.subtitle}>
          Será uma tarde gostosa e cheia de amor com almoço oferecido pelo casal
          e contamos com a sua ajuda para trazer sua bebida alcoólica de
          preferência! Dia 07 de Dezembro de 2025, às 14 horas
        </p>

        <p className={styles.address}>
          Av. Abílio Pereira de Almeida, 268 - Vila Sao Domingos, São Paulo
        </p>
      </div>

      <div className={styles.mapContainer}>
        <iframe
          title="Local do evento"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3656.726844525921!2d-46.752660299999995!3d-23.578252000000003!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94ce55d98aa8e8d9%3A0xc20cc95aae8f5986!2sAv.%20Ab%C3%ADlio%20Pereira%20de%20Almeida%2C%20268%20-%20Vila%20Sao%20Domingos%2C%20S%C3%A3o%20Paulo%20-%20SP%2C%2005368-030!5e0!3m2!1spt-BR!2sbr!4v1751312124817!5m2!1spt-BR!2sbr"
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
