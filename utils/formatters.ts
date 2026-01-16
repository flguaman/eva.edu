import { MONTHS, DAYS_OF_WEEK, TIME_FORMATS } from '@/constants';

/**
 * Utilidades para formateo de datos
 */
export class Formatters {
  /**
   * Formatea un número como moneda
   */
  static currency(amount: number, currency: string = 'USD', locale: string = 'es-EC'): string {
    return new Intl.NumberFormat(locale, {
      style: 'currency',
      currency: currency,
    }).format(amount);
  }

  /**
   * Formatea un número como porcentaje
   */
  static percentage(value: number, decimals: number = 1): string {
    return `${(value).toFixed(decimals)}%`;
  }

  /**
   * Formatea una fecha en formato local
   */
  static date(date: Date | string, options?: Intl.DateTimeFormatOptions): string {
    const dateObj = typeof date === 'string' ? new Date(date) : date;

    const defaultOptions: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    };

    return dateObj.toLocaleDateString('es-ES', options || defaultOptions);
  }

  /**
   * Formatea una fecha con hora
   */
  static datetime(date: Date | string): string {
    const dateObj = typeof date === 'string' ? new Date(date) : date;

    return dateObj.toLocaleString('es-ES', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  }

  /**
   * Formatea solo la hora
   */
  static time(date: Date | string): string {
    const dateObj = typeof date === 'string' ? new Date(date) : date;

    return dateObj.toLocaleTimeString('es-ES', {
      hour: '2-digit',
      minute: '2-digit'
    });
  }

  /**
   * Formatea un número con separadores de miles
   */
  static number(num: number, decimals: number = 0): string {
    return new Intl.NumberFormat('es-ES', {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals
    }).format(num);
  }

  /**
   * Formatea bytes a unidades legibles
   */
  static bytes(bytes: number): string {
    if (bytes === 0) return '0 Bytes';

    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  }

  /**
   * Capitaliza la primera letra de cada palabra
   */
  static capitalize(text: string): string {
    return text.replace(/\w\S*/g, (txt) =>
      txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
    );
  }

  /**
   * Convierte texto a kebab-case
   */
  static kebabCase(text: string): string {
    return text
      .replace(/([a-z])([A-Z])/g, '$1-$2')
      .replace(/[\s_]+/g, '-')
      .toLowerCase();
  }

  /**
   * Convierte texto a camelCase
   */
  static camelCase(text: string): string {
    return text
      .replace(/(?:^\w|[A-Z]|\b\w)/g, (word, index) =>
        index === 0 ? word.toLowerCase() : word.toUpperCase()
      )
      .replace(/\s+/g, '');
  }

  /**
   * Trunca texto con ellipsis
   */
  static truncate(text: string, maxLength: number, suffix: string = '...'): string {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength - suffix.length) + suffix;
  }

  /**
   * Formatea tiempo relativo (ej: "hace 2 horas")
   */
  static timeAgo(date: Date | string): string {
    const now = new Date();
    const past = typeof date === 'string' ? new Date(date) : date;
    const diffInSeconds = Math.floor((now.getTime() - past.getTime()) / 1000);

    const intervals = [
      { label: 'año', seconds: 31536000 },
      { label: 'mes', seconds: 2592000 },
      { label: 'día', seconds: 86400 },
      { label: 'hora', seconds: 3600 },
      { label: 'minuto', seconds: 60 },
      { label: 'segundo', seconds: 1 }
    ];

    for (const interval of intervals) {
      const count = Math.floor(diffInSeconds / interval.seconds);
      if (count >= 1) {
        return `hace ${count} ${interval.label}${count !== 1 ? 's' : ''}`;
      }
    }

    return 'ahora mismo';
  }

  /**
   * Formatea duración en segundos a formato legible
   */
  static duration(seconds: number): string {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;

    const parts = [];
    if (hours > 0) parts.push(`${hours}h`);
    if (minutes > 0) parts.push(`${minutes}m`);
    if (remainingSeconds > 0 || parts.length === 0) parts.push(`${remainingSeconds}s`);

    return parts.join(' ');
  }

  /**
   * Formatea nombre completo
   */
  static fullName(firstName: string, lastName: string): string {
    return `${this.capitalize(firstName)} ${this.capitalize(lastName)}`;
  }

  /**
   * Formatea calificaciones académicas
   */
  static grade(grade: number, maxGrade: number = 10): string {
    return `${grade}/${maxGrade}`;
  }

  /**
   * Formatea porcentaje de asistencia
   */
  static attendance(percentage: number): string {
    const status = percentage >= 90 ? 'Excelente' :
                   percentage >= 80 ? 'Buena' :
                   percentage >= 70 ? 'Regular' : 'Deficiente';

    return `${percentage}% (${status})`;
  }
}
