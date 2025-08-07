// Sistema de eventos para comunicação entre componentes
type EventCallback = (...args: any[]) => void;

class EventBus {
  private events: { [key: string]: EventCallback[] } = {};

  on(event: string, callback: EventCallback) {
    if (!this.events[event]) {
      this.events[event] = [];
    }
    this.events[event].push(callback);
  }

  off(event: string, callback: EventCallback) {
    if (!this.events[event]) return;
    this.events[event] = this.events[event].filter(cb => cb !== callback);
  }

  emit(event: string, ...args: any[]) {
    if (!this.events[event]) return;
    this.events[event].forEach(callback => callback(...args));
  }
}

// Instância global do EventBus
export const eventBus = new EventBus();

// Eventos específicos
export const EVENTS = {
  PRESENTE_SELECIONADO: 'presente_selecionado',
  PRESENTES_ATUALIZADOS: 'presentes_atualizados',
} as const; 