import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { StudentInfoCard } from "./student-info-card";
import { GradesCard } from "./grades-card";
import { AttendanceCard } from "./attendance-card";
import { EventsCard } from "./events-card";
import { AcademicPerformanceChart } from "./academic-performance-chart";
import { SubjectsChart } from "./subjects-chart";
import { ExtracurricularActivitiesChart } from "./extracurricular-activities-chart";
import { CommunicationFeed } from "./communication-feed";
import { RepresentativesMembers } from "./representatives-members";
import { ExpensesManagement } from "./expenses-management";
import { useAcademic } from "@/hooks";
import { CommunicationService, CalendarService, FinancialService } from "@/services";
import { EnhancedCalendar } from "./enhanced-calendar";
import {
  BookOpen,
  Users,
  Settings,
  Calendar,
  TrendingUp,
  MessageCircle,
  DollarSign,
  Award,
  AlertCircle,
  CalendarCheck,
  ClipboardList
} from "lucide-react";

export function OrganizedDashboard() {
  const { studentData, loading: academicLoading } = useAcademic();
  const communications = CommunicationService.getCommunications();
  const representatives = CommunicationService.getRepresentativeMembers();
  const upcomingEvents = CalendarService.getUpcomingEvents();
  const financialSummary = FinancialService.getFinancialSummary();
  const recentTransactions = FinancialService.getTransactions().slice(0, 3);
  const courseRepsCount = representatives.filter(r => r.type === 'course').length;
  const collegeRepsCount = representatives.filter(r => r.type === 'college').length;

  // Alertas académicas automáticas para el representante
  const alertCommunications = React.useMemo(() => {
    const alerts: any[] = [];

    if (!studentData) {
      return alerts;
    }

    // Alerta si no hay calificaciones recientes
    if (!studentData.recentGrades || studentData.recentGrades.length === 0) {
      alerts.push({
        id: 1001,
        sender: "Sistema EDU",
        title: "Faltan calificaciones recientes",
        message:
          "No se registran calificaciones recientes para tu representado. Te recomendamos consultar con el profesor para confirmar que todas las notas hayan sido ingresadas.",
        type: "Advertencia",
        date: new Date().toISOString(),
      });
    }

    // Alerta si la asistencia es baja o nula
    if (!studentData.stats.attendance || studentData.stats.attendance <= 0) {
      alerts.push({
        id: 1002,
        sender: "Sistema EDU",
        title: "Sin registro de asistencia",
        message:
          "No se ha registrado asistencia para tu representado. Esto puede deberse a un error de registro o a inasistencias repetidas.",
        type: "Alerta",
        date: new Date().toISOString(),
      });
    } else if (studentData.stats.attendance < 80) {
      alerts.push({
        id: 1003,
        sender: "Sistema EDU",
        title: "Asistencia baja",
        message:
          `La asistencia actual de tu representado es de ${studentData.stats.attendance}%. Te sugerimos revisar las faltas y conversar con la institución si es necesario.`,
        type: "Advertencia",
        date: new Date().toISOString(),
      });
    }

    // Alerta si tiene muchas tareas pendientes
    const pendingAssignments = studentData.upcomingAssignments?.filter(
      (a) => a.status === "pending"
    ).length;

    if (pendingAssignments && pendingAssignments >= 3) {
      alerts.push({
        id: 1004,
        sender: "Sistema EDU",
        title: "Varias tareas pendientes",
        message:
          `Tu representado tiene ${pendingAssignments} tareas pendientes por entregar. Asegúrate de que las complete a tiempo para evitar afectar sus calificaciones.`,
        type: "Recordatorio",
        date: new Date().toISOString(),
      });
    }

    return alerts;
  }, [studentData]);

  const allCommunications = React.useMemo(
    () => [...alertCommunications, ...communications],
    [alertCommunications, communications]
  );

  return (
    <div className="flex flex-col w-full min-h-screen">
      <main className="flex min-h-[calc(100vh_-_theme(spacing.16))] flex-1 flex-col gap-6 p-4 md:gap-8 md:p-10">
        {/* Header con navegación por secciones */}
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold">Dashboard del Representante</h1>
              <p className="text-muted-foreground">
                Gestiona la información académica, financiera y de representación de tu hijo/a
              </p>
            </div>
            <div className="flex items-center gap-4">
              <Card>
                <CardContent className="p-3">
                  <div className="text-sm text-muted-foreground">Próximos eventos</div>
                  <div className="text-xl font-bold">{upcomingEvents.length}</div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-3">
                  <div className="text-sm text-muted-foreground">Representantes</div>
                  <div className="text-base">Curso: <strong>{courseRepsCount}</strong></div>
                  <div className="text-base">Colegio: <strong>{collegeRepsCount}</strong></div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-3">
                  <div className="text-sm text-muted-foreground">Saldo (completado)</div>
                  <div className="text-xl font-bold">{financialSummary.balance >= 0 ? '+' : '-'}{Math.abs(financialSummary.balance).toLocaleString()}</div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Mini resumen de transacciones recientes */}
          <div className="grid grid-cols-3 gap-4">
            {recentTransactions.map(tx => (
              <Card key={tx.id}>
                <CardContent className="p-3">
                  <div className="text-sm text-muted-foreground">{tx.type === 'expense' ? 'Gasto' : 'Ingreso'}</div>
                  <div className="text-base font-medium">{tx.description}</div>
                  <div className="text-sm text-muted-foreground">${tx.amount.toLocaleString()}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Navegación por secciones principales */}
        <Tabs defaultValue="calendar" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="calendar" className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              Calendario
            </TabsTrigger>
            <TabsTrigger value="representation" className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              Representación
            </TabsTrigger>
            <TabsTrigger value="administrative" className="flex items-center gap-2">
              <Settings className="h-4 w-4" />
              Administrativo
            </TabsTrigger>
            <TabsTrigger value="academic" className="flex items-center gap-2">
              <BookOpen className="h-4 w-4" />
              Académico
            </TabsTrigger>
          </TabsList>

          {/* Sección Académica */}
          <TabsContent value="academic" className="space-y-6">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <StudentInfoCard />
              <GradesCard />
              <AttendanceCard />
              <EventsCard />
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-2">
              <AcademicPerformanceChart />
              <SubjectsChart />
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-2">
              <ExtracurricularActivitiesChart />
              <CommunicationFeed communications={allCommunications} />
            </div>

            {/* Resumen académico */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5" />
                  Resumen Académico del Trimestre
                </CardTitle>
              </CardHeader>
              <CardContent>
                {academicLoading ? (
                  <div className="text-center py-4">Cargando...</div>
                ) : (
                  <div className="grid gap-4 md:grid-cols-3">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-blue-600">
                        {studentData?.stats.overallAverage || "8.5"}
                      </div>
                      <p className="text-sm text-muted-foreground">Promedio General</p>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-green-600">
                        {studentData?.stats.attendance || 95}%
                      </div>
                      <p className="text-sm text-muted-foreground">Asistencia</p>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-purple-600">
                        {studentData?.stats.completedAssignments || 3}
                      </div>
                      <p className="text-sm text-muted-foreground">Tareas Completadas</p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Detalle de asistencia por día y materia */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CalendarCheck className="h-5 w-5" />
                  Asistencia por día y materia
                </CardTitle>
              </CardHeader>
              <CardContent>
                {studentData && studentData.schedule && studentData.schedule.length > 0 ? (
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm border rounded-lg overflow-hidden">
                      <thead className="bg-muted">
                        <tr>
                          <th className="px-3 py-2 text-left">Día</th>
                          <th className="px-3 py-2 text-left">Materia</th>
                          <th className="px-3 py-2 text-left">Estado</th>
                        </tr>
                      </thead>
                      <tbody>
                        {/* Datos simulados para ilustrar el concepto usando el horario actual */}
                        {["Lunes", "Martes", "Miércoles", "Jueves", "Viernes"].map((day, idx) => {
                          const classInfo =
                            studentData.schedule[idx % studentData.schedule.length];

                          // Ejemplo creativo: marcamos un día como falta y el resto como asistido
                          const isAbsent = idx === 3; // Jueves como ejemplo

                          return (
                            <tr key={day} className="border-t">
                              <td className="px-3 py-2 font-medium">{day}</td>
                              <td className="px-3 py-2">
                                {classInfo?.subject || "Clase registrada"}
                              </td>
                              <td className="px-3 py-2">
                                <Badge
                                  variant={isAbsent ? "destructive" : "default"}
                                  className={
                                    isAbsent
                                      ? "bg-red-100 text-red-700"
                                      : "bg-green-100 text-green-700"
                                  }
                                >
                                  {isAbsent ? "Falta" : "Asistió"}
                                </Badge>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                    <p className="text-xs text-muted-foreground mt-2">
                      Vista resumida de la asistencia semanal. En una integración real, estos
                      datos vendrían del sistema oficial de control de asistencia del colegio.
                    </p>
                  </div>
                ) : (
                  <p className="text-sm text-muted-foreground">
                    Aún no hay información de horario para mostrar la asistencia por día.
                  </p>
                )}
              </CardContent>
            </Card>

            {/* Tareas (pruebas, deberes, proyectos) por materia */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <ClipboardList className="h-5 w-5" />
                  Tareas y evaluaciones por materia
                </CardTitle>
              </CardHeader>
              <CardContent>
                {studentData?.upcomingAssignments && studentData.upcomingAssignments.length > 0 ? (
                  <div className="space-y-4">
                    {Object.values(
                      studentData.upcomingAssignments.reduce((acc: any, assignment) => {
                        const subject = assignment.subject || "General";
                        if (!acc[subject]) {
                          acc[subject] = {
                            subject,
                            tests: 0,
                            homework: 0,
                            projects: 0,
                            items: [] as typeof studentData.upcomingAssignments,
                          };
                        }

                        const title = assignment.title.toLowerCase();
                        let kind: "tests" | "homework" | "projects" = "homework";
                        if (title.includes("examen") || title.includes("prueba")) {
                          kind = "tests";
                        } else if (title.includes("proyecto")) {
                          kind = "projects";
                        }

                        acc[subject][kind] += 1;
                        acc[subject].items.push(assignment);
                        return acc;
                      }, {} as Record<string, any>)
                    ).map((group: any) => (
                      <div
                        key={group.subject}
                        className="p-3 border rounded-lg flex flex-col gap-2 bg-secondary/40"
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium">{group.subject}</p>
                            <p className="text-xs text-muted-foreground">
                              {group.tests} pruebas • {group.homework} deberes • {group.projects} proyectos
                            </p>
                          </div>
                          <Badge variant="outline">
                            {group.items.length} pendiente
                            {group.items.length !== 1 ? "s" : ""}
                          </Badge>
                        </div>
                        <div className="space-y-1 text-xs">
                          {group.items.slice(0, 3).map((assignment: any) => (
                            <div key={assignment.title} className="flex justify-between">
                              <span className="truncate max-w-[60%]">
                                {assignment.title}
                              </span>
                              <span className="text-muted-foreground">
                                {new Date(assignment.dueDate).toLocaleDateString("es-ES")}
                              </span>
                            </div>
                          ))}
                          {group.items.length > 3 && (
                            <p className="text-xs text-muted-foreground">
                              +{group.items.length - 3} tareas más en esta materia
                            </p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-muted-foreground">
                    No hay tareas registradas próximamente. Cuando se asignen pruebas, deberes o
                    proyectos, los verás organizados por materia en este espacio.
                  </p>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Sección de Representación */}
          <TabsContent value="representation" className="space-y-6">
            <RepresentativesMembers members={representatives} />

            {/* Alertas académicas para el representante */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertCircle className="h-5 w-5 text-red-500" />
                  Alertas académicas de tu representado
                </CardTitle>
              </CardHeader>
              <CardContent>
                {alertCommunications.length === 0 ? (
                  <p className="text-sm text-muted-foreground">
                    No hay alertas académicas activas. Las notas y asistencias de tu representado están al día.
                  </p>
                ) : (
                  <div className="space-y-3">
                    {alertCommunications.map((alert) => (
                      <div
                        key={alert.id}
                        className="flex items-start gap-3 p-3 border rounded-lg bg-red-50"
                      >
                        <div className="p-2 bg-red-100 rounded-full">
                          <AlertCircle className="h-4 w-4 text-red-600" />
                        </div>
                        <div className="flex-1">
                          <p className="font-medium">{alert.title}</p>
                          <p className="text-sm text-muted-foreground">
                            {alert.message}
                          </p>
                        </div>
                        <Badge variant="destructive">
                          {alert.type || "Alerta"}
                        </Badge>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Comunicación con representantes */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageCircle className="h-5 w-5" />
                  Comunicación con Representantes
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {allCommunications.slice(0, 3).map((comm: any, index: number) => (
                    <div key={index} className="flex items-start gap-3 p-3 border rounded-lg">
                      <div className="p-2 bg-blue-100 rounded-full">
                        <MessageCircle className="h-4 w-4 text-blue-600" />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium">{comm.title || "Comunicado importante"}</p>
                        <p className="text-sm text-muted-foreground">{comm.message || comm.content}</p>
                        <p className="text-xs text-muted-foreground mt-1">
                          {comm.date || "Hace 2 días"}
                        </p>
                      </div>
                      <Badge variant="outline">{comm.type || "General"}</Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Información de contacto rápida */}
            <Card>
              <CardHeader>
                <CardTitle>Contactos de Emergencia</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="p-4 border rounded-lg">
                    <h4 className="font-medium">Colegio</h4>
                    <p className="text-sm text-muted-foreground">📞 (02) 123-4567</p>
                    <p className="text-sm text-muted-foreground">📧 info@colegioejemplo.edu.ec</p>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <h4 className="font-medium">Director</h4>
                    <p className="text-sm text-muted-foreground">📞 (02) 123-4568</p>
                    <p className="text-sm text-muted-foreground">📧 director@colegioejemplo.edu.ec</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Sección Administrativa */}
          <TabsContent value="administrative" className="space-y-6">
            <ExpensesManagement />

            {/* Documentos importantes */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Award className="h-5 w-5" />
                  Documentos y Certificaciones
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  <div className="p-4 border rounded-lg hover:bg-secondary/50 cursor-pointer transition-colors">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-green-100 rounded">
                        <BookOpen className="h-4 w-4 text-green-600" />
                      </div>
                      <div>
                        <p className="font-medium">Certificado de Matrícula</p>
                        <p className="text-sm text-muted-foreground">Actualizado</p>
                      </div>
                    </div>
                  </div>
                  <div className="p-4 border rounded-lg hover:bg-secondary/50 cursor-pointer transition-colors">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-blue-100 rounded">
                        <TrendingUp className="h-4 w-4 text-blue-600" />
                      </div>
                      <div>
                        <p className="font-medium">Historial Académico</p>
                        <p className="text-sm text-muted-foreground">Último trimestre</p>
                      </div>
                    </div>
                  </div>
                  <div className="p-4 border rounded-lg hover:bg-secondary/50 cursor-pointer transition-colors">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-purple-100 rounded">
                        <DollarSign className="h-4 w-4 text-purple-600" />
                      </div>
                      <div>
                        <p className="font-medium">Recibos de Pago</p>
                        <p className="text-sm text-muted-foreground">Enero - Diciembre</p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Sección de Calendario */}
          <TabsContent value="calendar" className="space-y-6">
            <EnhancedCalendar />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
