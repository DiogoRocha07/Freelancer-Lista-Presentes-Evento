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
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [presentes, setPresentes] = useState<Presente[]>([]);
  const [loadingPresentes, setLoadingPresentes] = useState(true);
  const [buscaPresente, setBuscaPresente] = useState("");
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
        });
        
        // Emitir evento para atualizar a lista de presentes se um presente foi escolhido
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
              <select 
                name="presente_id" 
                value={form.presente_id} 
                onChange={handleChange}
                disabled={loadingPresentes}
                className={styles.presenteSelect}
              >
                <option value="">Selecione o presente que você comprou</option>
                {presentes
                  .filter(presente => !presentesSelecionados.includes(presente.id))
                  .filter(presente => 
                    !buscaPresente.trim() || 
                    presente.title.toLowerCase().includes(buscaPresente.toLowerCase()) ||
                    presente.value?.toString().includes(buscaPresente)
                  )
                  .map((presente) => (
                    <option key={presente.id} value={presente.id}>
                      {presente.title} - R$ {presente.value?.toFixed(2) || '0.00'}
                    </option>
                  ))}
              </select>
              {loadingPresentes && <small>Carregando presentes...</small>}
              {presentesSelecionados.length > 0 && (
                <small style={{ color: '#666', fontStyle: 'italic' }}>
                  {presentesSelecionados.length} presente(s) já selecionado(s) não aparecem na lista
                </small>
              )}
              {buscaPresente && (
                <small style={{ color: '#666', fontStyle: 'italic' }}>
                  {(() => {
                    const presentesFiltrados = presentes
                      .filter(presente => !presentesSelecionados.includes(presente.id))
                      .filter(presente => 
                        presente.title.toLowerCase().includes(buscaPresente.toLowerCase()) ||
                        presente.value?.toString().includes(buscaPresente)
                      );
                    
                    if (presentesFiltrados.length === 0) {
                      return "Nenhum presente encontrado com essa busca";
                    }
                    
                    return `${presentesFiltrados.length} presente(s) encontrado(s)`;
                  })()}
                </small>
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
