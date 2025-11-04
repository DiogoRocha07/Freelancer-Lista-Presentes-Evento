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
  
  // Estado do modal
  const [modalAberto, setModalAberto] = useState(false);
  const [presenteSelecionando, setPresenteSelecionando] = useState<Presente | null>(null);
  const [formData, setFormData] = useState({ nome: "", telefone: "" });
  const [loadingSelecao, setLoadingSelecao] = useState(false);
  const [mensagemSelecao, setMensagemSelecao] = useState("");

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
    setPresentesExibidos(9);
  }, [filtro, busca, listaOriginal]);

  const carregarMaisPresentes = () => {
    setPresentesExibidos(prev => prev + 9);
  };

  const presentesParaExibir = lista.slice(0, presentesExibidos);
  const temMaisPresentes = presentesExibidos < lista.length;

  const abrirModalSelecao = (presente: Presente) => {
    setPresenteSelecionando(presente);
    setModalAberto(true);
    setFormData({ nome: "", telefone: "" });
    setMensagemSelecao("");
  };

  const fecharModal = () => {
    setModalAberto(false);
    setPresenteSelecionando(null);
    setFormData({ nome: "", telefone: "" });
    setMensagemSelecao("");
  };

  const handleSubmitSelecao = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!presenteSelecionando) return;
    
    setLoadingSelecao(true);
    setMensagemSelecao("");

    try {
      const response = await fetch("/api/selecionar-presente", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.nome,
          phone: formData.telefone,
          gift_id: presenteSelecionando.id,
        }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setMensagemSelecao("Presente selecionado com sucesso!");
        // Atualizar a lista de presentes selecionados
        setTimeout(() => {
          window.location.reload();
        }, 1500);
      } else {
        setMensagemSelecao(data.error || "Erro ao selecionar presente. Tente novamente.");
      }
    } catch (error) {
      setMensagemSelecao("Erro ao conectar com o servidor. Tente novamente.");
    } finally {
      setLoadingSelecao(false);
    }
  };

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
        {/* <p className={styles.subtitle}>
          Ao clicar em "Presentear", você será redirecionado para o site onde o
          item é vendido. Após realizar a compra, leve o presente com você no
          dia da festa. Assim teremos um momento ainda mais especial juntos!
        </p> */}

        <p className={styles.subtitle}>
          Se desejar nos presentear, ficaremos muito felizes em receber o
          presente no dia do chá, e não se esqueça de selecionar o presente
          escolhido para que outra pessoa não compre o mesmo. Mas, se for mais
          prático para você, também disponibilizaremos a opção de contribuição
          via Pix — o importante é compartilhar esse dia ao seu lado.
        </p>

        <p className={styles.subtitle}><strong>Atenção:</strong> Os preços e a disponibilidade dos produtos podem variar nos sites externos. As informações exibidas aqui são apenas uma referência.</p>
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
                    <div className={styles.botoesContainer}>
                      <span className={styles.esgotadoLabel}>Esgotado</span>
                      <a
                        className={`${styles.btn} ${styles.btnPresentear}`}
                        href={gift.url}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-external-link">
                          <path d="M15 3h6v6"/>
                          <path d="M10 14 21 3"/>
                          <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
                        </svg>
                      </a>
                    </div>
                  ) : (
                    <div className={styles.botoesContainer}>
                      <button
                        onClick={() => abrirModalSelecao(gift)}
                        className={`${styles.btn} ${styles.btnSelecionar}`}
                      >
                        <span className={styles.checkIcon}>✓</span>
                        Selecionar
                      </button>
                      <a
                        className={`${styles.btn} ${styles.btnPresentear}`}
                        href={gift.url}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-external-link">
                          <path d="M15 3h6v6"/>
                          <path d="M10 14 21 3"/>
                          <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
                        </svg>
                      </a>
                    </div>
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

      {/* Modal de Seleção de Presente */}
      {modalAberto && presenteSelecionando && (
        <div className={styles.modalOverlay} onClick={fecharModal}>
          <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
            <div className={styles.modalHeader}>
              <h3>Confirmar Seleção de Presente</h3>
              <button className={styles.closeButton} onClick={fecharModal}>
                ✕
              </button>
            </div>
            
            <div className={styles.modalBody}>
              <div className={styles.presenteInfo}>
                <p><strong>Presente selecionado:</strong></p>
                <p>{presenteSelecionando.title}</p>
                <p className={styles.presenteValue}>
                  R$ {presenteSelecionando.value ? presenteSelecionando.value.toFixed(2) : '0.00'}
                </p>
              </div>

              <form onSubmit={handleSubmitSelecao}>
                <div className={styles.formGroup}>
                  <label htmlFor="nome">
                    Nome completo
                  </label>
                  <input
                    type="text"
                    id="nome"
                    value={formData.nome}
                    onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
                    required
                    placeholder="Seu nome completo"
                  />
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="telefone">
                    Telefone
                  </label>
                  <input
                    type="tel"
                    id="telefone"
                    value={formData.telefone}
                    onChange={(e) => setFormData({ ...formData, telefone: e.target.value })}
                    required
                    placeholder="(XX) XXXXX-XXXX"
                  />
                </div>

                {mensagemSelecao && (
                  <div className={mensagemSelecao.includes("sucesso") ? styles.success : styles.error}>
                    {mensagemSelecao}
                  </div>
                )}

                <div className={styles.modalFooter}>
                  <button
                    type="button"
                    onClick={fecharModal}
                    className={styles.btnCancelar}
                    disabled={loadingSelecao}
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className={styles.btnSalvar}
                    disabled={loadingSelecao}
                  >
                    {loadingSelecao ? "Salvando..." : "Salvar"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
