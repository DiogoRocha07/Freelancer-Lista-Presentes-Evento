import { useState, useEffect } from "react";
import Image from "next/image";
import styles from "./Presentes.module.css";
import { supabase } from "../../lib/supabase";
import { Presente } from "../../types/presentes";
import { usePresentesSelecionados } from "../../hooks/usePresentesSelecionados";

export default function Presentes() {
  const [lista, setLista] = useState<Presente[]>([]);
  const [listaOriginal, setListaOriginal] = useState<Presente[]>([]);
  const { presentesSelecionados, loading: loadingSelecionados } = usePresentesSelecionados();
  const [filtro, setFiltro] = useState("A-Z");
  const [busca, setBusca] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [presentesExibidos, setPresentesExibidos] = useState(15);

  useEffect(() => {
    fetchPresentes();
  }, []);

  const fetchPresentes = async () => {
    try {
      setLoading(true);
      console.log('Buscando presentes...');
      
      const { data, error } = await supabase
        .from('presentes')
        .select('*');

      console.log('Resposta do Supabase:', { data, error });

      if (error) {
        console.error('Erro do Supabase:', error);
        throw error;
      }

      console.log('Dados recebidos:', data);
      setListaOriginal(data || []);
      setLista(data || []);
    } catch (err) {
      console.error('Erro ao buscar presentes:', err);
      setError(err instanceof Error ? err.message : 'Erro ao carregar presentes');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let newLista = [...listaOriginal];
    
    // Aplicar filtro de busca
    if (busca.trim()) {
      const termoBusca = busca.toLowerCase();
      newLista = newLista.filter(presente => 
        presente.title.toLowerCase().includes(termoBusca) ||
        presente.value?.toString().includes(termoBusca)
      );
    }
    
    // Aplicar ordenação
    if (filtro === "A-Z") {
      newLista.sort((a, b) => a.title.localeCompare(b.title));
    } else if (filtro === "maior-preco") {
      newLista.sort((a, b) => (b.value || 0) - (a.value || 0));
    } else if (filtro === "menor-preco") {
      newLista.sort((a, b) => (a.value || 0) - (b.value || 0));
    }

    setLista(newLista);
    // Reset paginação quando mudar filtro ou busca
    setPresentesExibidos(15);
  }, [filtro, busca, listaOriginal]);

  const carregarMaisPresentes = () => {
    setPresentesExibidos(prev => prev + 15);
  };

  const presentesParaExibir = lista.slice(0, presentesExibidos);
  const temMaisPresentes = presentesExibidos < lista.length;

  if (loading) {
    return (
      <section className={styles.container} id="presentes">
        <h2 className={styles.title}>Lista de Presentes</h2>
        <div className={styles.subtitleContainer}>
          <p className={styles.subtitle}>Carregando presentes...</p>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className={styles.container} id="presentes">
        <h2 className={styles.title}>Lista de Presentes</h2>
        <div className={styles.subtitleContainer}>
          <p className={styles.subtitle}>Erro ao carregar presentes: {error}</p>
        </div>
      </section>
    );
  }

  return (
    <section className={styles.container} id="presentes">
      <h2 className={styles.title}>Lista de Presentes</h2>

      <div className={styles.subtitleContainer}>
        <p className={styles.subtitle}>
          Ao clicar em "Presentear", você será redirecionado para o site onde o
          item é vendido. Após realizar a compra, leve o presente com você no
          dia da festa. Assim teremos um momento ainda mais especial juntos!
        </p>

        <p className={styles.subtitle}>Você terá que confirmar que sua presença e colocar o presente que comprou. O casal não irá saber o presente que você comprou.</p>
      </div>

      <div className={styles.filtroContainer}>
        <div className={styles.buscaContainer}>
          <label htmlFor="busca" className={styles.label}>
            Buscar presente:
          </label>
          <input
            type="text"
            id="busca"
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
            placeholder="Digite o nome ou preço do presente..."
            className={styles.buscaInput}
          />
        </div>
        
        <div className={styles.ordenacaoContainer}>
          <label htmlFor="filtro" className={styles.label}>
            Ordenar por:{" "}
          </label>
          <select
            id="filtro"
            value={filtro}
            onChange={(e) => setFiltro(e.target.value)}
            className={styles.select}
          >
            <option value="A-Z">A-Z</option>
            <option value="menor-preco">Menor Preço</option>
            <option value="maior-preco">Maior Preço</option>
          </select>
        </div>
        
        {busca && (
          <div className={styles.resultadosInfo}>
            <small>
              {lista.length} de {listaOriginal.length} presente(s) encontrado(s)
            </small>
          </div>
        )}
      </div>

      <div className={styles.grid}>
        {presentesParaExibir.length > 0 ? (
          presentesParaExibir.map((gift) => {
            const isEsgotado = presentesSelecionados.includes(gift.id);
            return (
              <div key={gift.id} className={`${styles.card} ${isEsgotado ? styles.esgotado : ''}`}>
                <div className={styles.imageContainer}>
                  <Image 
                    src={gift.image_url} 
                    alt={gift.title}
                    width={280}
                    height={280}
                    className={styles.cardImage}
                  />
                </div>
                <div className={styles.cardContent}>
                  <h3>{gift.title}</h3>
                  <p>R$ {gift.value ? gift.value.toFixed(2) : '0.00'}</p>
                </div>
                <div className={styles.cardFooter}>
                  {isEsgotado ? (
                    <span className={styles.esgotadoLabel}>Esgotado</span>
                  ) : (
                    <a
                      className={styles.btn}
                      href={gift.url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Presentear
                    </a>
                  )}
                </div>
              </div>
            );
          })
        ) : (
          <div className={styles.noResults}>
            <p>Nenhum presente encontrado com "{busca}"</p>
            <button 
              onClick={() => setBusca("")}
              className={styles.clearSearch}
            >
              Limpar busca
            </button>
          </div>
        )}
      </div>

      {temMaisPresentes && (
        <div className={styles.loadMoreContainer}>
          <button 
            onClick={carregarMaisPresentes}
            className={styles.loadMoreButton}
          >
            Ver mais presentes
          </button>
        </div>
      )}
    </section>
  );
}
