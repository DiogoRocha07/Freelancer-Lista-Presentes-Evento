import Header from "./header/Header";
import Hero from "./hero/Hero";
import Local from "./local/Local";
import Pix from "./pix/Pix";
import Presentes from "./presentes/Presentes";
import Confirmacao from "./confirmacao/Confirmacao";

export default function Home() {
  return (
    <>
      <Header />
      <Hero />
      <Local />
      <Pix />
      <Presentes />
      <Confirmacao />
    </>
  );
}
