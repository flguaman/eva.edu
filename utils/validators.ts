import { VALIDATION_RULES } from '@/constants';

/**
 * Utilidades para validación de datos
 */
export class Validators {
  /**
   * Valida un email
   */
  static email(email: string): { isValid: boolean; message?: string } {
    if (!email || email.trim().length === 0) {
      return { isValid: false, message: 'El email es requerido' };
    }

    if (!VALIDATION_RULES.email.pattern.test(email)) {
      return { isValid: false, message: 'El formato del email no es válido' };
    }

    return { isValid: true };
  }

  /**
   * Valida una contraseña
   */
  static password(password: string): { isValid: boolean; messages: string[] } {
    const messages: string[] = [];

    if (!password || password.length === 0) {
      messages.push('La contraseña es requerida');
      return { isValid: false, messages };
    }

    if (password.length < VALIDATION_RULES.password.minLength) {
      messages.push(`La contraseña debe tener al menos ${VALIDATION_RULES.password.minLength} caracteres`);
    }

    if (VALIDATION_RULES.password.requireUppercase && !/[A-Z]/.test(password)) {
      messages.push('La contraseña debe contener al menos una letra mayúscula');
    }

    if (VALIDATION_RULES.password.requireLowercase && !/[a-z]/.test(password)) {
      messages.push('La contraseña debe contener al menos una letra minúscula');
    }

    if (VALIDATION_RULES.password.requireNumbers && !/\d/.test(password)) {
      messages.push('La contraseña debe contener al menos un número');
    }

    if (VALIDATION_RULES.password.requireSpecialChars && !/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) {
      messages.push('La contraseña debe contener al menos un carácter especial');
    }

    return {
      isValid: messages.length === 0,
      messages
    };
  }

  /**
   * Valida un teléfono
   */
  static phone(phone: string): { isValid: boolean; message?: string } {
    if (!phone || phone.trim().length === 0) {
      return { isValid: false, message: 'El teléfono es requerido' };
    }

    const digitsOnly = phone.replace(/\D/g, '');

    if (digitsOnly.length < VALIDATION_RULES.phone.minLength) {
      return { isValid: false, message: `El teléfono debe tener al menos ${VALIDATION_RULES.phone.minLength} dígitos` };
    }

    if (digitsOnly.length > VALIDATION_RULES.phone.maxLength) {
      return { isValid: false, message: `El teléfono no puede tener más de ${VALIDATION_RULES.phone.maxLength} dígitos` };
    }

    if (!VALIDATION_RULES.phone.pattern.test(phone)) {
      return { isValid: false, message: 'El formato del teléfono no es válido' };
    }

    return { isValid: true };
  }

  /**
   * Valida un nombre
   */
  static name(name: string): { isValid: boolean; message?: string } {
    if (!name || name.trim().length === 0) {
      return { isValid: false, message: 'El nombre es requerido' };
    }

    if (name.length < VALIDATION_RULES.name.minLength) {
      return { isValid: false, message: `El nombre debe tener al menos ${VALIDATION_RULES.name.minLength} caracteres` };
    }

    if (name.length > VALIDATION_RULES.name.maxLength) {
      return { isValid: false, message: `El nombre no puede tener más de ${VALIDATION_RULES.name.maxLength} caracteres` };
    }

    if (!VALIDATION_RULES.name.pattern.test(name)) {
      return { isValid: false, message: 'El nombre solo puede contener letras y espacios' };
    }

    return { isValid: true };
  }

  /**
   * Valida una fecha
   */
  static date(date: string | Date): { isValid: boolean; message?: string } {
    if (!date) {
      return { isValid: false, message: 'La fecha es requerida' };
    }

    const dateObj = typeof date === 'string' ? new Date(date) : date;

    if (isNaN(dateObj.getTime())) {
      return { isValid: false, message: 'La fecha no es válida' };
    }

    return { isValid: true };
  }

  /**
   * Valida que una fecha sea futura
   */
  static futureDate(date: string | Date): { isValid: boolean; message?: string } {
    const dateValidation = this.date(date);
    if (!dateValidation.isValid) {
      return dateValidation;
    }

    const dateObj = typeof date === 'string' ? new Date(date) : date;
    const now = new Date();

    // Reset time to compare only dates
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const inputDate = new Date(dateObj.getFullYear(), dateObj.getMonth(), dateObj.getDate());

    if (inputDate < today) {
      return { isValid: false, message: 'La fecha debe ser futura' };
    }

    return { isValid: true };
  }

  /**
   * Valida un número positivo
   */
  static positiveNumber(num: number): { isValid: boolean; message?: string } {
    if (typeof num !== 'number' || isNaN(num)) {
      return { isValid: false, message: 'Debe ser un número válido' };
    }

    if (num <= 0) {
      return { isValid: false, message: 'El número debe ser positivo' };
    }

    return { isValid: true };
  }

  /**
   * Valida un porcentaje (0-100)
   */
  static percentage(percentage: number): { isValid: boolean; message?: string } {
    const numValidation = this.positiveNumber(percentage);
    if (!numValidation.isValid) {
      return numValidation;
    }

    if (percentage > 100) {
      return { isValid: false, message: 'El porcentaje no puede ser mayor a 100%' };
    }

    return { isValid: true };
  }

  /**
   * Valida una calificación académica
   */
  static grade(grade: number, maxGrade: number = 10): { isValid: boolean; message?: string } {
    if (typeof grade !== 'number' || isNaN(grade)) {
      return { isValid: false, message: 'La calificación debe ser un número' };
    }

    if (grade < 0) {
      return { isValid: false, message: 'La calificación no puede ser negativa' };
    }

    if (grade > maxGrade) {
      return { isValid: false, message: `La calificación no puede ser mayor a ${maxGrade}` };
    }

    return { isValid: true };
  }

  /**
   * Valida una URL
   */
  static url(url: string): { isValid: boolean; message?: string } {
    if (!url || url.trim().length === 0) {
      return { isValid: false, message: 'La URL es requerida' };
    }

    try {
      new URL(url);
      return { isValid: true };
    } catch {
      return { isValid: false, message: 'La URL no tiene un formato válido' };
    }
  }

  /**
   * Valida que una cadena no esté vacía
   */
  static required(value: any): { isValid: boolean; message?: string } {
    if (value === null || value === undefined) {
      return { isValid: false, message: 'Este campo es requerido' };
    }

    if (typeof value === 'string' && value.trim().length === 0) {
      return { isValid: false, message: 'Este campo es requerido' };
    }

    if (Array.isArray(value) && value.length === 0) {
      return { isValid: false, message: 'Debe seleccionar al menos una opción' };
    }

    return { isValid: true };
  }

  /**
   * Valida longitud mínima de cadena
   */
  static minLength(value: string, minLength: number): { isValid: boolean; message?: string } {
    if (!value || value.length < minLength) {
      return { isValid: false, message: `Debe tener al menos ${minLength} caracteres` };
    }

    return { isValid: true };
  }

  /**
   * Valida longitud máxima de cadena
   */
  static maxLength(value: string, maxLength: number): { isValid: boolean; message?: string } {
    if (value && value.length > maxLength) {
      return { isValid: false, message: `No puede tener más de ${maxLength} caracteres` };
    }

    return { isValid: true };
  }

  /**
   * Valida un rango numérico
   */
  static range(num: number, min: number, max: number): { isValid: boolean; message?: string } {
    if (typeof num !== 'number' || isNaN(num)) {
      return { isValid: false, message: 'Debe ser un número válido' };
    }

    if (num < min || num > max) {
      return { isValid: false, message: `Debe estar entre ${min} y ${max}` };
    }

    return { isValid: true };
  }
}
