import Head from "next/head";
import styles from "../styles/Home.module.css";
import Image from "next/image";
import {
  AiOutlinePhone,
  AiOutlineMail,
  AiOutlinePushpin,
} from "react-icons/ai";

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Studio Fisioggiono - Oggiono LC</title>
        <meta
          name="description"
          content="Lo studio Fisioggiono si occupa di ortopedia e riabilitazione."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <Image
          src="/logo.png"
          width="305"
          height="128"
          alt="Studio Fisioggiono"
        />
        <h1 className={styles.title}>
          Benvenuti allo studio <span className={styles.code}>Fisioggiono</span>
        </h1>
        <div className={styles.imageGrid}>
          <Image src="/ankle.jpg" width="251" height="320" alt="" />
          <Image src="/back.jpg" width="251" height="320" alt="" />
          <Image src="/hip.jpg" width="251" height="320" alt="" />
          <Image src="/shoulder.jpg" width="251" height="320" alt="" />
        </div>

        <p className={styles.description}>
          Lo studio <span className={styles.code}>Fisioggiono</span> si occupa
          di <strong>ortopedia</strong> e <strong>riabilitazione</strong>.{" "}
        </p>

        <div className={styles.grid}>
          <div className={styles.card}>
            <Image
              src="/lo-studio.jpeg"
              width="600"
              height="400"
              alt="Lo Studio"
            />
            <h3>Lo Studio</h3>
            <p>
              Facciamo semplicemente il nostro lavoro con entusiasmo e passione.
            </p>
            <p>
              La nostra ventennale esperienza sul campo ci permette di
              affrontare ogni patologia con professionalità e sicurezza.
            </p>
          </div>

          <div className={styles.card}>
            <Image
              src="/ortopedico.jpg"
              width="600"
              height="400"
              alt="L'Ortopedia"
            />
            <h3>L'Ortopedia</h3>
            <p>
              <ul>
                <li>Visite Ortopediche</li>
                <li>Infiltrazioni</li>
                <li>Acido Ialuronico</li>
                <li>Cellule Staminali</li>
                <li>Valutazione Posturale</li>
              </ul>
            </p>
          </div>

          <div className={styles.card}>
            <Image
              src="/tecar.jpg"
              width="600"
              height="400"
              alt="L'Ortopedia"
            />
            <h3>Le Terapie</h3>
            <p>
              <ul>
                <li>SCENAR TERAPIA</li>
                <li>TECAR TERAPIA</li>
                <li>ROLFING e RPG riprogrammazione posturale globale</li>
                <li>MFX miofibrolisi diacutanea</li>
                <li>MASSOTERAPIA</li>
                <li>OSTEOPATIA</li>
                <li>LINFODRENAGGIO</li>
              </ul>
            </p>
          </div>

          <div className={styles.card}>
            <Image
              src="/contatti.jpeg"
              width="600"
              height="400"
              alt="L'Ortopedia"
            />
            <h3>Contatti</h3>
            <p className={styles.iconLink}>
              <AiOutlinePushpin />
              <div className={styles.gap} />
              <a href="https://www.google.com/maps?q=VIA+XXV+Aprile,+26+Oggiono+(Lc)&um=1&ie=UTF-8&sa=X&ved=2ahUKEwjzs4L8gozuAhWCyYUKHUwQATgQ_AUoAnoECAcQBA">
                Via XXV Aprile, 26 Oggiono (Lc)
              </a>
            </p>
            <p className={styles.iconLink}>
              <AiOutlinePhone />
              <div className={styles.gap} />
              <a href="tel:03411556835">0341 1556835</a>
            </p>
            <p className={styles.iconLink}>
              <AiOutlineMail />
              <div className={styles.gap} />
              <a href="mailto:fisioggiono@gmail.com">fisioggiono@gmail.com</a>
            </p>
          </div>
        </div>
      </main>

      <footer className={styles.footer}>
        <div className={styles.grid}>
          <div className={styles.footerCard}>
            <h3>Fisioggiono s.r.l.</h3>
            <p>
              <strong>P.I.:</strong> 11227600969
              <br />
              SUBM70N
            </p>
            <p>
              <strong>Pec:</strong>{" "}
              <a href="mailto:fisioggiono@pec.it">fisioggiono@pec.it</a>
            </p>
            <p>
              <strong>IBAN:</strong> IT26X0890150920000000550692
            </p>
          </div>
          <div className={styles.footerCard}>
            <h3>Orari</h3>
            <p>
              <strong>Da Lunedì a Venerdì:</strong> 7:30 - 19:30
            </p>
            <p>
              <strong>Sabato:</strong> 8:00 - 13:00
            </p>
          </div>
        </div>
      </footer>
      <p className={styles.footerCopy}>
        © {new Date().getFullYear()} Matteo Bertella
      </p>
    </div>
  );
}
