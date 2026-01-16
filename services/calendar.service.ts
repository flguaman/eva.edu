import { CalendarEvent, EventType, Priority } from '@/types';
import { EVENT_TYPES } from '@/constants';

/**
 * Servicio para manejar eventos del calendario
 */
export class CalendarService {
  private static events: CalendarEvent[] = [
    {
      id: "1",
      title: "Pago de mensualidad",
      description: "Pago correspondiente a enero 2024",
      date: new Date(2024, 0, 15),
      time: "08:00",
      type: "payment",
      category: "Pagos escolares",
      priority: "high",
      amount: 150,
    },
    {
      id: "2",
      title: "Reunión de representantes de curso",
      description: "Discusión sobre actividades del trimestre",
      date: new Date(2024, 0, 20),
      time: "15:00",
      type: "meeting",
      category: "Reuniones",
      location: "Sala de profesores",
      priority: "medium",
    },
    {
      id: "3",
      title: "Examen de Matemáticas",
      description: "Examen sobre ecuaciones cuadráticas",
      date: new Date(2024, 0, 25),
      time: "08:00",
      type: "academic",
      category: "Exámenes",
      location: "Aula 201",
      priority: "high",
    },
    {
      id: "4",
      title: "Compra de materiales escolares",
      description: "Compra de útiles para el trimestre",
      date: new Date(2024, 0, 10),
      time: "10:00",
      type: "payment",
      category: "Materiales",
      priority: "medium",
      amount: 75,
    },
  ];

  /**
   * Obtiene todos los eventos
   */
  static getEvents(): CalendarEvent[] {
    return [...this.events];
  }

  /**
   * Obtiene eventos por fecha
   */
  static getEventsForDate(date: Date): CalendarEvent[] {
    return this.events.filter(event =>
      event.date.toDateString() === date.toDateString()
    );
  }

  /**
   * Obtiene eventos por tipo
   */
  static getEventsByType(type: EventType): CalendarEvent[] {
    return this.events.filter(event => event.type === type);
  }

  /**
   * Obtiene eventos por prioridad
   */
  static getEventsByPriority(priority: Priority): CalendarEvent[] {
    return this.events.filter(event => event.priority === priority);
  }

  /**
   * Obtiene eventos futuros
   */
  static getUpcomingEvents(limit: number = 10): CalendarEvent[] {
    const now = new Date();
    return this.events
      .filter(event => event.date >= now)
      .sort((a, b) => a.date.getTime() - b.date.getTime())
      .slice(0, limit);
  }

  /**
   * Obtiene eventos del mes actual
   */
  static getCurrentMonthEvents(): CalendarEvent[] {
    const now = new Date();
    const currentMonth = now.getMonth();
    const currentYear = now.getFullYear();

    return this.events.filter(event =>
      event.date.getMonth() === currentMonth &&
      event.date.getFullYear() === currentYear
    );
  }

  /**
   * Agrega un nuevo evento
   */
  static addEvent(event: Omit<CalendarEvent, 'id'>): CalendarEvent {
    const newEvent: CalendarEvent = {
      ...event,
      id: `event_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
    };

    this.events.push(newEvent);
    return newEvent;
  }

  /**
   * Actualiza un evento existente
   */
  static updateEvent(eventId: string, updates: Partial<CalendarEvent>): CalendarEvent | null {
    const eventIndex = this.events.findIndex(event => event.id === eventId);

    if (eventIndex === -1) return null;

    this.events[eventIndex] = { ...this.events[eventIndex], ...updates };
    return this.events[eventIndex];
  }

  /**
   * Elimina un evento
   */
  static deleteEvent(eventId: string): boolean {
    const eventIndex = this.events.findIndex(event => event.id === eventId);

    if (eventIndex === -1) return false;

    this.events.splice(eventIndex, 1);
    return true;
  }

  /**
   * Marca un evento como completado
   */
  static markEventAsCompleted(eventId: string): boolean {
    const event = this.events.find(e => e.id === eventId);
    if (event) {
      event.completed = true;
      return true;
    }
    return false;
  }

  /**
   * Obtiene estadísticas de eventos
   */
  static getEventStats(): {
    total: number;
    byType: Record<EventType, number>;
    byPriority: Record<Priority, number>;
    completed: number;
    upcoming: number;
  } {
    const total = this.events.length;
    const completed = this.events.filter(e => e.completed).length;
    const upcoming = this.getUpcomingEvents().length;

    const byType: Record<string, number> = {};
    const byPriority: Record<string, number> = {};

    this.events.forEach(event => {
      byType[event.type] = (byType[event.type] || 0) + 1;
      byPriority[event.priority] = (byPriority[event.priority] || 0) + 1;
    });

    return {
      total,
      byType: byType as Record<EventType, number>,
      byPriority: byPriority as Record<Priority, number>,
      completed,
      upcoming
    };
  }

  /**
   * Obtiene eventos entre fechas
   */
  static getEventsInDateRange(startDate: Date, endDate: Date): CalendarEvent[] {
    return this.events.filter(event =>
      event.date >= startDate && event.date <= endDate
    ).sort((a, b) => a.date.getTime() - b.date.getTime());
  }

  /**
   * Formatea una fecha para display
   */
  static formatEventDate(date: Date): string {
    return date.toLocaleDateString('es-ES', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }

  /**
   * Formatea la hora de un evento
   */
  static formatEventTime(time: string): string {
    if (time === 'Todo el día') return time;

    try {
      const [hours, minutes] = time.split(':');
      const date = new Date();
      date.setHours(parseInt(hours), parseInt(minutes));

      return date.toLocaleTimeString('es-ES', {
        hour: '2-digit',
        minute: '2-digit'
      });
    } catch {
      return time;
    }
  }

  /**
   * Valida los datos de un evento
   */
  static validateEvent(event: Partial<CalendarEvent>): { isValid: boolean; errors: string[] } {
    const errors: string[] = [];

    if (!event.title || event.title.trim().length === 0) {
      errors.push('El título es requerido');
    }

    if (!event.date) {
      errors.push('La fecha es requerida');
    }

    if (!event.time || event.time.trim().length === 0) {
      errors.push('La hora es requerida');
    }

    if (!event.type) {
      errors.push('El tipo de evento es requerido');
    }

    if (!event.priority) {
      errors.push('La prioridad es requerida');
    }

    // Validar fecha futura para eventos académicos
    if (event.date && event.type === 'exam' && event.date < new Date()) {
      errors.push('La fecha del examen debe ser futura');
    }

    return {
      isValid: errors.length === 0,
      errors
    };
  }

  /**
   * Obtiene colores para tipos de eventos
   */
  static getEventTypeColor(type: EventType): string {
    const eventType = EVENT_TYPES.find(et => et.value === type);
    return eventType?.color || 'bg-gray-100 text-gray-800';
  }

  /**
   * Obtiene ícono para tipos de eventos
   */
  static getEventTypeIcon(type: EventType): string {
    const eventType = EVENT_TYPES.find(et => et.value === type);
    return eventType?.icon || 'Calendar';
  }
}
