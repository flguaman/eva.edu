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
  Award
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
              <CommunicationFeed communications={communications} />
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
          </TabsContent>

          {/* Sección de Representación */}
          <TabsContent value="representation" className="space-y-6">
            <RepresentativesMembers members={representatives} />

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
                  {communications.slice(0, 3).map((comm: any, index: number) => (
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
