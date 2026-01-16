import { useState, useEffect, useMemo } from 'react';
import { StudentData, Grade, Assignment, Class } from '@/types';
import { AcademicService } from '@/services/academic.service';

/**
 * Hook personalizado para manejar datos académicos
 */
export function useAcademic() {
  const [studentData, setStudentData] = useState<StudentData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Cargar datos del estudiante
  useEffect(() => {
    const loadStudentData = async () => {
      try {
        setLoading(true);
        const data = AcademicService.getStudentData();
        setStudentData(data);
        setError(null);
      } catch (err) {
        setError('Error al cargar los datos académicos');
        console.error('Error loading academic data:', err);
      } finally {
        setLoading(false);
      }
    };

    loadStudentData();
  }, []);

  // Calcular estadísticas derivadas
  const stats = useMemo(() => {
    if (!studentData) return null;

    const completedAssignments = studentData.stats.completedAssignments;
    const totalAssignments = studentData.stats.totalAssignments;
    const assignmentCompletionRate = AcademicService.getAssignmentCompletionRate(
      completedAssignments,
      totalAssignments
    );

    const averageGrade = AcademicService.calculateAverage(
      studentData.recentGrades
    );

    return {
      ...studentData.stats,
      assignmentCompletionRate,
      currentAverage: averageGrade
    };
  }, [studentData]);

  // Filtrar tareas por estado
  const getAssignmentsByStatus = (status: 'pending' | 'completed') => {
    return studentData?.upcomingAssignments.filter(
      assignment => assignment.status === status
    ) || [];
  };

  // Filtrar tareas por prioridad
  const getAssignmentsByPriority = (priority: 'low' | 'medium' | 'high') => {
    return studentData?.upcomingAssignments.filter(
      assignment => assignment.priority === priority
    ) || [];
  };

  // Obtener tareas próximas (próximos 7 días)
  const getUpcomingAssignments = (days: number = 7) => {
    if (!studentData) return [];

    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() + days);

    return studentData.upcomingAssignments.filter(assignment => {
      const dueDate = new Date(assignment.dueDate);
      return dueDate <= cutoffDate;
    });
  };

  // Obtener clases de hoy
  const getTodayClasses = () => {
    if (!studentData) return [];

    const today = new Date().toLocaleLowerCase('es-ES', { weekday: 'long' });
    return studentData.schedule.filter(class_ =>
      // En una implementación real, comparar con el día actual
      true // Por ahora devolver todas
    );
  };

  // Actualizar estado de una tarea
  const updateAssignmentStatus = (assignmentId: string, status: 'pending' | 'completed') => {
    setStudentData(prev => {
      if (!prev) return prev;

      const updatedAssignments = prev.upcomingAssignments.map(assignment =>
        assignment.id === assignmentId
          ? { ...assignment, status }
          : assignment
      );

      // Actualizar estadísticas
      const completedCount = updatedAssignments.filter(a => a.status === 'completed').length;

      return {
        ...prev,
        upcomingAssignments: updatedAssignments,
        stats: {
          ...prev.stats,
          completedAssignments: completedCount
        }
      };
    });
  };

  return {
    // Datos
    studentData,
    stats,

    // Estado
    loading,
    error,

    // Métodos
    getAssignmentsByStatus,
    getAssignmentsByPriority,
    getUpcomingAssignments,
    getTodayClasses,
    updateAssignmentStatus,

    // Utilidades
    refreshData: () => {
      setStudentData(AcademicService.getStudentData());
    }
  };
}
