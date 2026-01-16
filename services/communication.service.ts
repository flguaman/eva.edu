import { Communication, RepresentativeMember } from '@/types';
import { representativeData } from '@/lib/representative-data';

/**
 * Servicio para manejar comunicaciones y representantes
 */
export class CommunicationService {
  /**
   * Obtiene todas las comunicaciones
   */
  static getCommunications(): Communication[] {
    return representativeData.communications as Communication[];
  }

  /**
   * Obtiene comunicaciones no leídas
   */
  static getUnreadCommunications(): Communication[] {
    return this.getCommunications().filter(comm => !comm.read);
  }

  /**
   * Obtiene comunicaciones por tipo
   */
  static getCommunicationsByType(type: string): Communication[] {
    return this.getCommunications().filter(comm => comm.type === type);
  }

  /**
   * Marca una comunicación como leída
   */
  static markAsRead(communicationId: number): void {
    // En una implementación real, esto actualizaría la base de datos
    console.log(`Comunicación ${communicationId} marcada como leída`);
  }

  /**
   * Obtiene todas las comunicaciones recientes (últimos 7 días)
   */
  static getRecentCommunications(days: number = 7): Communication[] {
    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - days);

    return this.getCommunications().filter(comm => {
      const commDate = new Date(comm.date);
      return commDate >= cutoffDate;
    });
  }

  /**
   * Obtiene miembros de representantes
   */
  static getRepresentativeMembers(): RepresentativeMember[] {
    return representativeData.representatives as RepresentativeMember[];
  }

  /**
   * Obtiene representantes del curso
   */
  static getCourseRepresentatives(): RepresentativeMember[] {
    return this.getRepresentativeMembers().filter(rep => rep.type === 'course');
  }

  /**
   * Obtiene representantes del colegio
   */
  static getCollegeRepresentatives(): RepresentativeMember[] {
    return this.getRepresentativeMembers().filter(rep => rep.type === 'college');
  }

  /**
   * Busca representantes por nombre o rol
   */
  static searchRepresentatives(query: string): RepresentativeMember[] {
    const lowercaseQuery = query.toLowerCase();
    return this.getRepresentativeMembers().filter(rep =>
      rep.name.toLowerCase().includes(lowercaseQuery) ||
      rep.role.toLowerCase().includes(lowercaseQuery) ||
      rep.email.toLowerCase().includes(lowercaseQuery)
    );
  }

  /**
   * Obtiene información de contacto de representantes
   */
  static getContactInfo(): Array<{ name: string; role: string; email: string; phone: string }> {
    return this.getRepresentativeMembers().map(rep => ({
      name: rep.name,
      role: rep.role,
      email: rep.email,
      phone: rep.phone
    }));
  }

  /**
   * Envía un mensaje a un representante
   */
  static async sendMessage(
    recipientId: string,
    subject: string,
    message: string
  ): Promise<{ success: boolean; messageId?: string; error?: string }> {
    try {
      // En una implementación real, esto enviaría el mensaje a través de una API
      console.log(`Enviando mensaje a ${recipientId}: ${subject}`);

      // Simular envío exitoso
      return {
        success: true,
        messageId: `msg_${Date.now()}`
      };
    } catch (error) {
      return {
        success: false,
        error: 'Error al enviar el mensaje'
      };
    }
  }

  /**
   * Obtiene estadísticas de comunicaciones
   */
  static getCommunicationStats(): {
    total: number;
    unread: number;
    byType: Record<string, number>;
    recent: number;
  } {
    const communications = this.getCommunications();
    const unread = this.getUnreadCommunications().length;
    const recent = this.getRecentCommunications(7).length;

    const byType: Record<string, number> = {};
    communications.forEach(comm => {
      byType[comm.type] = (byType[comm.type] || 0) + 1;
    });

    return {
      total: communications.length,
      unread,
      byType,
      recent
    };
  }

  /**
   * Valida los datos de contacto
   */
  static validateContactInfo(email: string, phone: string): { isValid: boolean; errors: string[] } {
    const errors: string[] = [];

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      errors.push('El email no tiene un formato válido');
    }

    const phoneRegex = /^\+?[\d\s\-\(\)]+$/;
    if (!phoneRegex.test(phone)) {
      errors.push('El teléfono contiene caracteres no válidos');
    }

    if (phone.replace(/\D/g, '').length < 7) {
      errors.push('El teléfono debe tener al menos 7 dígitos');
    }

    return {
      isValid: errors.length === 0,
      errors
    };
  }
}
