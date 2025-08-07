import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { eventBus, EVENTS } from '../lib/eventBus';

export const usePresentesSelecionados = () => {
  const [presentesSelecionados, setPresentesSelecionados] = useState<number[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchPresentesSelecionados = async () => {
    try {
      const { data, error } = await supabase
        .from('users')
        .select('gift_id')
        .not('gift_id', 'is', null);

      if (error) {
        console.error('Erro ao buscar presentes selecionados:', error);
      } else {
        const ids = data?.map(item => item.gift_id).filter(id => id !== null) || [];
        setPresentesSelecionados(ids);
      }
    } catch (err) {
      console.error('Erro ao buscar presentes selecionados:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPresentesSelecionados();

    // Escutar eventos de presente selecionado
    const handlePresenteSelecionado = (giftId: number) => {
      console.log('Presente selecionado via evento:', giftId);
      setPresentesSelecionados(prev => {
        if (!prev.includes(giftId)) {
          return [...prev, giftId];
        }
        return prev;
      });
    };

    eventBus.on(EVENTS.PRESENTE_SELECIONADO, handlePresenteSelecionado);

    // Atualizar periodicamente
    const interval = setInterval(() => {
      fetchPresentesSelecionados();
    }, 30000);

    // Atualizar quando a página ganha foco
    const handleFocus = () => {
      fetchPresentesSelecionados();
    };

    window.addEventListener('focus', handleFocus);

    return () => {
      eventBus.off(EVENTS.PRESENTE_SELECIONADO, handlePresenteSelecionado);
      clearInterval(interval);
      window.removeEventListener('focus', handleFocus);
    };
  }, []);

  return {
    presentesSelecionados,
    loading,
    refetch: fetchPresentesSelecionados
  };
}; 