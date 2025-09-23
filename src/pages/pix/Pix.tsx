import { useState } from "react";
import Image from "next/image";
import styles from "./Pix.module.css";

export default function Pix() {
  const [showPixInfo, setShowPixInfo] = useState(false);

  const copyPixKey = async () => {
    try {
      await navigator.clipboard.writeText("pix@casal.com");
      console.log("Chave PIX copiada!");
    } catch (err) {
      console.error("Erro ao copiar chave PIX:", err);
    }
  };

  return (
    <section className={styles.container} id="pix">
      <h2 className={styles.title}>PIX do Casal</h2>

      <div className={styles.subtitleContainer}>
        <p className={styles.subtitle}>
          Se preferir, você também pode demonstrar seu carinho enviando um
          presente pelo Pix.
        </p>
      </div>

      <div className={styles.buttonContainer}>
        <button
          className={styles.showPixButton}
          onClick={() => setShowPixInfo(!showPixInfo)}
        >
          {showPixInfo ? "Ocultar PIX" : "Mostrar PIX"}
        </button>
      </div>

      {showPixInfo && (
        <div className={styles.pixContainer}>
          <div className={styles.qrCodeContainer}>
            <Image
              src="/images/pixqrcode.jpeg"
              alt="QR Code PIX do casal"
              width={220}
              height={220}
              className={styles.qrCode}
            />
          </div>

          <div className={styles.pixInfo}>
            <h3 className={styles.pixTitle}>Chave PIX</h3>
            <div className={styles.pixKeyContainer}>
              <p className={styles.pixKey}>00020126580014BR.GOV.BCB.PIX0136d9378cec-b63d-4225-af19-66d736e63a0f5204000053039865802BR5924JENNY NATALY RIBEIRO DOS6009SAO PAULO62070503***6304FEAF</p>
              <button className={styles.copyButton} onClick={copyPixKey}>
                Copiar
              </button>
            </div>

            <div className={styles.instructions}>
              <h4>Como usar:</h4>
              <ol className={styles.instructionsList}>
                <li>Abra o aplicativo do seu banco</li>
                <li>Escaneie o QR Code ou copie a chave PIX</li>
                <li>Digite o valor que deseja contribuir</li>
                <li>Confirme o pagamento</li>
              </ol>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
