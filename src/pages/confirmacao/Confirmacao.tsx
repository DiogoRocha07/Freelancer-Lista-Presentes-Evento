import { useState, useEffect } from "react";
import styles from "./Confirmacao.module.css";
import { ConfirmacaoForm, ConfirmacaoData, ConfirmacaoResponse } from "../../types/confirmacao";
import { Presente } from "../../types/presentes";
import { supabase } from "../../lib/supabase";
import { eventBus, EVENTS } from "../../lib/eventBus";
import { usePresentesSelecionados } from "../../hooks/usePresentesSelecionados";

export default function Confirmacao() {
  const [form, setForm] = useState<ConfirmacaoForm>({
    nome: "",
    presenca: "sim",
    adultos: "1",
    criancas: "0",
    email: "",
    telefone: "",
    presente_id: "",
    presentes_ids: [],
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [presentes, setPresentes] = useState<Presente[]>([]);
  const [loadingPresentes, setLoadingPresentes] = useState(true);
  const [buscaPresente, setBuscaPresente] = useState("");
  const [dropdownAberto, setDropdownAberto] = useState(false);
  const { presentesSelecionados } = usePresentesSelecionados();

  // Carregar lista de presentes
  useEffect(() => {
    const fetchPresentes = async () => {
      try {
        setLoadingPresentes(true);
        const { data, error } = await supabase
          .from('presentes')
          .select('*')
          .order('title');

        if (error) {
          console.error('Erro ao carregar presentes:', error);
        } else {
          setPresentes(data || []);
        }
      } catch (err) {
        console.error('Erro ao buscar presentes:', err);
      } finally {
        setLoadingPresentes(false);
      }
    };

    fetchPresentes();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
    
    // Limpar a busca quando um presente é selecionado
    if (name === 'presente_id' && value) {
      setBuscaPresente("");
    }
  };

  const handlePresenteToggle = (presenteId: number) => {
    setForm((prev) => {
      const isSelected = prev.presentes_ids.includes(presenteId);
      if (isSelected) {
        return {
          ...prev,
          presentes_ids: prev.presentes_ids.filter(id => id !== presenteId)
        };
      } else {
        return {
          ...prev,
          presentes_ids: [...prev.presentes_ids, presenteId]
        };
      }
    });
  };

  const toggleDropdown = () => {
    setDropdownAberto(!dropdownAberto);
  };

  const getTextoDropdown = () => {
    if (form.presentes_ids.length === 0) {
      return "Selecione os presentes que você comprou";
    } else if (form.presentes_ids.length === 1) {
      const presente = presentes.find(p => p.id === form.presentes_ids[0]);
      return presente ? presente.title : "1 presente selecionado";
    } else {
      return `${form.presentes_ids.length} presentes selecionados`;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const response = await fetch("/api/confirmar-presenca", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: form.nome,
          email: form.email,
          phone: form.presenca === "sim" ? form.telefone : "",
          confirm: form.presenca === "sim",
          count_adult: form.presenca === "sim" ? parseInt(form.adultos) : 0,
          count_kid: form.presenca === "sim" ? parseInt(form.criancas) : 0,
          gift_id: form.presenca === "sim" && form.presente_id ? parseInt(form.presente_id) : null,
          gifts_ids: form.presenca === "sim" ? form.presentes_ids : [],
        }),
      });

      const data: ConfirmacaoResponse = await response.json();

      if (response.ok) {
        setMessage("Obrigado! Sua presença foi registrada com sucesso.");
        setForm({
          nome: "",
          presenca: "sim",
          adultos: "1",
          criancas: "0",
          email: "",
          telefone: "",
          presente_id: "",
          presentes_ids: [],
        });
        
        // Emitir evento para atualizar a lista de presentes se presentes foram escolhidos
        if (form.presentes_ids.length > 0 && form.presenca === "sim") {
          form.presentes_ids.forEach(presenteId => {
            eventBus.emit(EVENTS.PRESENTE_SELECIONADO, presenteId);
          });
        }
        if (form.presente_id && form.presenca === "sim") {
          eventBus.emit(EVENTS.PRESENTE_SELECIONADO, parseInt(form.presente_id));
        }
      } else {
        setMessage(data.error || "Erro ao registrar presença. Tente novamente.");
      }
    } catch (error) {
      setMessage("Erro ao conectar com o servidor. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className={styles.container} id="confirmacao">
      <h2 className={styles.title}>Confirme sua presença</h2>
      <p className={styles.subtitle}>
        Confirme sua presença, para termos um controle maior dos convidados.
        Obrigado!
      </p>
      <form onSubmit={handleSubmit} className={styles.form}>
        <label>
          Nome completo
          <input
            type="text"
            name="nome"
            value={form.nome}
            onChange={handleChange}
            required
          />
        </label>

        <div className={styles.radioGroup}>
          <span>Você irá ao evento?</span>
          <div>
            <label>
              <input
                type="radio"
                name="presenca"
                value="sim"
                checked={form.presenca === "sim"}
                onChange={handleChange}
              />
              Sim
            </label>
            <label>
              <input
                type="radio"
                name="presenca"
                value="nao"
                checked={form.presenca === "nao"}
                onChange={handleChange}
              />
              Não
            </label>
          </div>
        </div>

        {form.presenca === "sim" && (
          <>
            <label>
              Quantidade de adultos incluindo você
              <select name="adultos" value={form.adultos} onChange={handleChange}>
                {[...Array(10).keys()].map((i) => (
                  <option key={i + 1} value={i + 1}>
                    {i + 1}
                  </option>
                ))}
              </select>
            </label>

            <label>
              Quantidade de crianças
              <select name="criancas" value={form.criancas} onChange={handleChange}>
                {[...Array(11).keys()].map((i) => (
                  <option key={i} value={i}>
                    {i}
                  </option>
                ))}
              </select>
            </label>
          </>
        )}

        <label>
          E-mail
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            required
          />
        </label>

        {form.presenca === "sim" && (
          <label>
            Telefone para contato
            <input
              type="text"
              name="telefone"
              value={form.telefone}
              onChange={handleChange}
              required
            />
          </label>
        )}

        {form.presenca === "sim" && (
          <label>
            Presente
            <div className={styles.presenteContainer}>
              <div className={styles.buscaWrapper}>
                <input
                  type="text"
                  placeholder="Buscar presente..."
                  value={buscaPresente}
                  onChange={(e) => setBuscaPresente(e.target.value)}
                  className={styles.buscaPresenteInput}
                  disabled={loadingPresentes}
                />
                {buscaPresente && (
                  <button
                    type="button"
                    onClick={() => setBuscaPresente("")}
                    className={styles.limparBusca}
                    disabled={loadingPresentes}
                  >
                    ✕
                  </button>
                )}
              </div>
              
              {buscaPresente && (
                <div className={styles.contadorBusca}>
                  {(() => {
                    const presentesFiltrados = presentes
                      .filter(presente => !presentesSelecionados.includes(presente.id))
                      .filter(presente => 
                        presente.title.toLowerCase().includes(buscaPresente.toLowerCase())
                      );
                    
                    if (presentesFiltrados.length === 0) {
                      return "Nenhum presente encontrado com essa busca";
                    }
                    
                    return `${presentesFiltrados.length} presente(s) encontrado(s)`;
                  })()}
                </div>
              )}
              
              <div className={styles.dropdownWrapper}>
                <div 
                  className={styles.dropdownTrigger}
                  onClick={toggleDropdown}
                  onBlur={(e) => {
                    // Delay para permitir cliques nos checkboxes
                    setTimeout(() => setDropdownAberto(false), 150);
                  }}
                >
                  <span className={styles.dropdownText}>
                    {getTextoDropdown()}
                  </span>
                  <span className={`${styles.dropdownArrow} ${dropdownAberto ? styles.dropdownArrowOpen : ''}`}>
                    ▼
                  </span>
                </div>
                
                {dropdownAberto && (
                  <div className={styles.dropdownContent}>
                    <div className={styles.presentesList}>
                      {loadingPresentes ? (
                        <div className={styles.loadingMessage}>Carregando presentes...</div>
                      ) : (
                        presentes
                          .filter(presente => !presentesSelecionados.includes(presente.id))
                          .filter(presente => 
                            !buscaPresente.trim() || 
                            presente.title.toLowerCase().includes(buscaPresente.toLowerCase())
                          )
                          .map((presente) => (
                            <div 
                              key={presente.id} 
                              className={`${styles.presenteItem} ${form.presentes_ids.includes(presente.id) ? styles.presenteItemSelecionado : ''}`}
                              onClick={() => handlePresenteToggle(presente.id)}
                            >
                              <span className={styles.presenteInfo}>
                                {presente.title}
                              </span>
                            </div>
                          ))
                      )}
                    </div>
                    
                    {presentesSelecionados.length > 0 && (
                      <div className={styles.infoMessage}>
                        {presentesSelecionados.length} presente(s) já selecionado(s) por outros convidados não aparecem na lista
                      </div>
                    )}
                    {buscaPresente && (
                      <div className={styles.infoMessage}>
                        {(() => {
                          const presentesFiltrados = presentes
                            .filter(presente => !presentesSelecionados.includes(presente.id))
                            .filter(presente => 
                              presente.title.toLowerCase().includes(buscaPresente.toLowerCase())
                            );
                          
                          if (presentesFiltrados.length === 0) {
                            return "Nenhum presente encontrado com essa busca";
                          }
                          
                          return `${presentesFiltrados.length} presente(s) encontrado(s)`;
                        })()}
                      </div>
                    )}
                  </div>
                )}
              </div>
              
              {form.presentes_ids.length > 0 && (
                <div className={styles.presentesSelecionados}>
                  <strong>Presentes selecionados:</strong>
                  <ul>
                    {form.presentes_ids.map(id => {
                      const presente = presentes.find(p => p.id === id);
                      return presente ? (
                        <li key={id}>
                          {presente.title}
                        </li>
                      ) : null;
                    })}
                  </ul>
                </div>
              )}
            </div>
          </label>
        )}

        <button type="submit" disabled={loading}>
          {loading ? "Enviando..." : "Confirmar presença"}
        </button>
      </form>
      
      {message && (
        <div className={message.includes("sucesso") ? styles.success : styles.error}>
          {message}
        </div>
      )}
    </section>
  );
}
