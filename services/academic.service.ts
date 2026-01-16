import { StudentData, Grade, Attendance, Subject, AcademicPerformance, Assignment, Class } from '@/types';
import { representativeData } from '@/lib/representative-data';

/**
 * Servicio para manejar datos académicos
 */
export class AcademicService {
  /**
   * Obtiene los datos académicos de un estudiante
   */
  static getStudentData(): StudentData {
    // En una implementación real, esto vendría de una API
    return {
      name: representativeData.student.name,
      grade: representativeData.student.grade,
      studentId: "2024-001",
      photo: "/placeholder.svg",
      stats: {
        overallAverage: 8.5,
        attendance: 95,
        completedAssignments: 23,
        totalAssignments: 25,
        ranking: 3,
        totalStudents: 28
      },
      recentGrades: [
        { subject: "Matemáticas", grade: 9.2, date: "2024-01-25", teacher: "Prof. García" },
        { subject: "Ciencias", grade: 8.8, date: "2024-01-23", teacher: "Prof. López" },
        { subject: "Lengua", grade: 8.1, date: "2024-01-20", teacher: "Prof. Martínez" },
        { subject: "Historia", grade: 8.9, date: "2024-01-18", teacher: "Prof. Rodríguez" }
      ],
      upcomingAssignments: [
        {
          title: "Ejercicios de Álgebra",
          subject: "Matemáticas",
          dueDate: "2024-01-30",
          priority: "high",
          status: "pending"
        },
        {
          title: "Proyecto de Biología",
          subject: "Ciencias",
          dueDate: "2024-02-05",
          priority: "medium",
          status: "pending"
        },
        {
          title: "Ensayo sobre la Independencia",
          subject: "Historia",
          dueDate: "2024-02-08",
          priority: "low",
          status: "pending"
        }
      ],
      schedule: [
        { time: "07:00-07:45", subject: "Matemáticas", teacher: "Prof. Roberto García", room: "Aula 201" },
        { time: "07:45-08:30", subject: "Ciencias", teacher: "Prof. Ana Martínez", room: "Lab. Ciencias" },
        { time: "08:30-09:15", subject: "Lengua", teacher: "Prof. Carmen López", room: "Aula 105" },
        { time: "09:30-10:15", subject: "Historia", teacher: "Prof. Diego Herrera", room: "Aula 203" }
      ],
      notifications: [
        { type: "assignment", message: "Nueva tarea de Matemáticas disponible", time: "hace 2 horas" },
        { type: "grade", message: "Calificación de Ciencias publicada", time: "hace 4 horas" },
        { type: "event", message: "Reunión de representantes programada para el 1 de febrero", time: "hace 1 día" }
      ]
    };
  }

  /**
   * Obtiene las calificaciones de un estudiante
   */
  static getGrades(): Grade[] {
    return this.getStudentData().recentGrades;
  }

  /**
   * Obtiene la asistencia de un estudiante
   */
  static getAttendance(): Attendance {
    return representativeData.attendance;
  }

  /**
   * Obtiene las materias disponibles
   */
  static getSubjects(): Subject[] {
    return representativeData.subjects;
  }

  /**
   * Obtiene el rendimiento académico
   */
  static getAcademicPerformance(): AcademicPerformance[] {
    return representativeData.academicPerformance;
  }

  /**
   * Calcula el promedio general
   */
  static calculateAverage(grades: Grade[]): number {
    if (grades.length === 0) return 0;
    const sum = grades.reduce((acc, grade) => acc + grade.grade, 0);
    return Math.round((sum / grades.length) * 10) / 10;
  }

  /**
   * Obtiene tareas por estado
   */
  static getAssignmentsByStatus(assignments: Assignment[], status: 'pending' | 'completed'): Assignment[] {
    return assignments.filter(assignment => assignment.status === status);
  }

  /**
   * Obtiene tareas por prioridad
   */
  static getAssignmentsByPriority(assignments: Assignment[], priority: 'low' | 'medium' | 'high'): Assignment[] {
    return assignments.filter(assignment => assignment.priority === priority);
  }

  /**
   * Calcula el porcentaje de tareas completadas
   */
  static getAssignmentCompletionRate(completed: number, total: number): number {
    if (total === 0) return 0;
    return Math.round((completed / total) * 100);
  }
}
