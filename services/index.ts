// Exportar todos los servicios
export { AcademicService } from './academic.service';
export { FinancialService } from './financial.service';
export { CommunicationService } from './communication.service';
export { CalendarService } from './calendar.service';

// Tipos relacionados con servicios
export type { StudentData, Grade, Attendance, Subject, AcademicPerformance, Assignment, Class } from '../types';
export type { Transaction, FinancialSummary } from '../types';
export type { Communication, RepresentativeMember } from '../types';
export type { CalendarEvent } from '../types';
