import styles from "./Local.module.css";

export default function Local() {
  return (
    <section className={styles.container} id="local">
      <h2 className={styles.title}>Local do Evento</h2>

      <div className={styles.addressContainer}>
        <p className={styles.subtitle}>
          Cada nova fase merece ser celebrada com quem faz parte da nossa
          história. Por isso, será uma alegria ter você conosco nesse momento
          tão especial.
        </p>
        <p className={styles.subtitle}>
          Preparamos esse dia com muito carinho: terá feijoada, chopp gelado,
          drinks e muito samba para fazer a gente celebrar do jeito que
          gostamos!
        </p>
       {/* <p className={styles.subtitle}>
          Se desejar nos presentear, ficaremos muito felizes em receber o
          presente no dia do chá, e não se esqueça de selecionar o presente
          escolhido para que outra pessoa não compre o mesmo. Mas, se for mais
          prático para você, também disponibilizaremos a opção de contribuição
          via Pix — o importante é compartilhar esse dia ao seu lado.
        </p> */}
        <p className={styles.subtitle}>
          E pedimos, com carinho, que confirme sua presença para que possamos
          organizar tudo da melhor forma.
        </p>
        <p className={styles.subtitle}>
          Estamos esperando por você ✨🤎 Será lindo viver esse momento juntos.
        </p>
        <p className={styles.subtitle}>Com amor, Jenny e Giovanni.</p>

        <p className={styles.subtitle}>
          Dia 13 de Dezembro de 2025, às 13 horas
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
