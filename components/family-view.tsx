"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  BookOpen,
  Calendar,
  Clock,
  Download,
  Heart,
  MessageCircle,
  Phone,
  Star,
  TrendingUp,
  Users,
  AlertCircle,
  CheckCircle,
  FileText,
  Mail,
  Shield,
} from "lucide-react"

export function FamilyView() {
  const [selectedPeriod, setSelectedPeriod] = useState("current")

  // Datos simulados del estudiante
  const studentData = {
    name: "María González",
    grade: "10mo A",
    studentId: "2024-001",
    photo: "/placeholder.svg?height=100&width=100&text=MG",
    academic: {
      overallAverage: 8.5,
      ranking: 3,
      totalStudents: 28,
      subjects: [
        { name: "Matemáticas", grade: 9.2, trend: "up" },
        { name: "Ciencias", grade: 8.8, trend: "stable" },
        { name: "Lenguaje", grade: 8.1, trend: "up" },
        { name: "Historia", grade: 8.9, trend: "down" },
        { name: "Inglés", grade: 7.8, trend: "up" },
        { name: "Educación Física", grade: 9.5, trend: "stable" },
      ],
    },
    attendance: {
      percentage: 94,
      totalDays: 120,
      presentDays: 113,
      absentDays: 7,
      justifiedAbsences: 5,
      unjustifiedAbsences: 2,
      tardiness: 3,
    },
    behavior: {
      overallRating: 4.5,
      socialSkills: 5,
      responsibility: 4,
      respect: 5,
      participation: 4,
      reports: [
        { date: "2024-01-15", type: "positive", description: "Excelente participación en proyecto grupal" },
        { date: "2024-01-10", type: "neutral", description: "Llegada tardía justificada" },
      ],
    },
    assignments: {
      completionRate: 92,
      totalAssignments: 25,
      completedAssignments: 23,
      pendingAssignments: 2,
      upcomingDeadlines: [
        { subject: "Matemáticas", assignment: "Ejercicios Cap. 5", dueDate: "2024-01-30" },
        { subject: "Ciencias", assignment: "Proyecto de Biología", dueDate: "2024-02-05" },
      ],
    },
    financial: {
      balance: -150.0,
      pendingPayments: [
        { concept: "Mensualidad Febrero", amount: 120.0, dueDate: "2024-02-05" },
        { concept: "Material Didáctico", amount: 30.0, dueDate: "2024-02-10" },
      ],
      paymentHistory: [
        { date: "2024-01-05", concept: "Mensualidad Enero", amount: 120.0, status: "paid" },
        { date: "2023-12-05", concept: "Mensualidad Diciembre", amount: 120.0, status: "paid" },
      ],
    },
    communication: {
      unreadMessages: 2,
      recentMessages: [
        { from: "Prof. Roberto García", subject: "Reunión de padres", date: "2024-01-25", read: false },
        { from: "Coordinación Académica", subject: "Cronograma de exámenes", date: "2024-01-23", read: false },
        { from: "Prof. Ana Martínez", subject: "Proyecto de Ciencias", date: "2024-01-20", read: true },
      ],
      upcomingMeetings: [
        { title: "Reunión de padres - Matemáticas", date: "2024-02-01", time: "15:00" },
        { title: "Entrega de calificaciones", date: "2024-02-15", time: "14:00" },
      ],
      emergencyContacts: [
        { name: "Coordinación Académica", phone: "+593-2-234-5678", email: "academico@eva.edu.ec" },
        { name: "Enfermería", phone: "+593-2-234-5679", email: "enfermeria@eva.edu.ec" },
      ],
    },
    health: {
      generalStatus: "Excelente",
      allergies: ["Polen", "Mariscos"],
      medications: [],
      medicalInsurance: "Seguros Equinoccial",
      emergencyContact: "Dr. Patricia González - +593-99-123-4567",
      lastCheckup: "2024-01-10",
      vaccinations: "Al día",
    },
    calendar: {
      upcomingEvents: [
        { title: "Examen de Matemáticas", date: "2024-02-01", type: "exam" },
        { title: "Entrega Proyecto Ciencias", date: "2024-02-05", type: "assignment" },
        { title: "Reunión de Padres", date: "2024-02-08", type: "meeting" },
        { title: "Festival Cultural", date: "2024-02-15", type: "event" },
      ],
    },
  }

  const downloadFamilyReport = () => {
    const reportContent = `VISTA FAMILIAR - REPORTE INTEGRAL
Colegio EVA Ecuador
Fecha: ${new Date().toLocaleDateString("es-ES")}

INFORMACIÓN DEL ESTUDIANTE
===========================================
Nombre: ${studentData.name}
Curso: ${studentData.grade}
Código: ${studentData.studentId}

RENDIMIENTO ACADÉMICO
===========================================
Promedio General: ${studentData.academic.overallAverage}/10
Posición en el curso: ${studentData.academic.ranking} de ${studentData.academic.totalStudents}

Calificaciones por Materia:
${studentData.academic.subjects
  .map(
    (subject) =>
      `- ${subject.name}: ${subject.grade}/10 (${subject.trend === "up" ? "↗️" : subject.trend === "down" ? "↘️" : "→"})`,
  )
  .join("\n")}

ASISTENCIA
===========================================
Porcentaje de Asistencia: ${studentData.attendance.percentage}%
Días Presentes: ${studentData.attendance.presentDays}/${studentData.attendance.totalDays}
Faltas Justificadas: ${studentData.attendance.justifiedAbsences}
Faltas Injustificadas: ${studentData.attendance.unjustifiedAbsences}
Tardanzas: ${studentData.attendance.tardiness}

CONDUCTA
===========================================
Calificación General: ${studentData.behavior.overallRating}/5 estrellas
- Habilidades Sociales: ${studentData.behavior.socialSkills}/5
- Responsabilidad: ${studentData.behavior.responsibility}/5
- Respeto: ${studentData.behavior.respect}/5
- Participación: ${studentData.behavior.participation}/5

TAREAS Y PROYECTOS
===========================================
Porcentaje de Cumplimiento: ${studentData.assignments.completionRate}%
Tareas Completadas: ${studentData.assignments.completedAssignments}/${studentData.assignments.totalAssignments}
Tareas Pendientes: ${studentData.assignments.pendingAssignments}

Próximas Entregas:
${studentData.assignments.upcomingDeadlines
  .map((deadline) => `- ${deadline.subject}: ${deadline.assignment} (${deadline.dueDate})`)
  .join("\n")}

ESTADO FINANCIERO
===========================================
Saldo Actual: $${studentData.financial.balance.toFixed(2)}

Pagos Pendientes:
${studentData.financial.pendingPayments
  .map((payment) => `- ${payment.concept}: $${payment.amount.toFixed(2)} (Vence: ${payment.dueDate})`)
  .join("\n")}

INFORMACIÓN DE SALUD
===========================================
Estado General: ${studentData.health.generalStatus}
Alergias: ${studentData.health.allergies.join(", ")}
Seguro Médico: ${studentData.health.medicalInsurance}
Último Chequeo: ${studentData.health.lastCheckup}
Vacunas: ${studentData.health.vaccinations}

PRÓXIMOS EVENTOS
===========================================
${studentData.calendar.upcomingEvents.map((event) => `- ${event.title} (${event.date})`).join("\n")}

===========================================
Reporte generado por EVA Ecuador
Sistema de Gestión Educativa Integral
`

    const blob = new Blob([reportContent], { type: "text/plain" })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `Vista_Familiar_${studentData.name.replace(" ", "_")}_${new Date().toISOString().split("T")[0]}.txt`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    window.URL.revokeObjectURL(url)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <img
            src={studentData.photo || "/placeholder.svg"}
            alt={studentData.name}
            className="w-16 h-16 rounded-full border-4 border-blue-200"
          />
          <div>
            <h2 className="text-2xl font-bold">{studentData.name}</h2>
            <p className="text-gray-600">
              {studentData.grade} • Código: {studentData.studentId}
            </p>
          </div>
        </div>
        <Button onClick={downloadFamilyReport}>
          <Download className="h-4 w-4 mr-2" />
          Descargar Reporte
        </Button>
      </div>

      <Tabs defaultValue="academic" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4 lg:grid-cols-8">
          <TabsTrigger value="academic">Académico</TabsTrigger>
          <TabsTrigger value="attendance">Asistencia</TabsTrigger>
          <TabsTrigger value="behavior">Conducta</TabsTrigger>
          <TabsTrigger value="assignments">Tareas</TabsTrigger>
          <TabsTrigger value="financial">Financiero</TabsTrigger>
          <TabsTrigger value="communication">Comunicación</TabsTrigger>
          <TabsTrigger value="health">Salud</TabsTrigger>
          <TabsTrigger value="calendar">Calendario</TabsTrigger>
        </TabsList>

        {/* Rendimiento Académico */}
        <TabsContent value="academic" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader className="text-center">
                <CardTitle className="text-3xl font-bold text-blue-600">
                  {studentData.academic.overallAverage}/10
                </CardTitle>
                <CardDescription>Promedio General</CardDescription>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader className="text-center">
                <CardTitle className="text-3xl font-bold text-green-600">#{studentData.academic.ranking}</CardTitle>
                <CardDescription>Posición en el Curso</CardDescription>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader className="text-center">
                <CardTitle className="text-3xl font-bold text-purple-600">
                  {studentData.academic.totalStudents}
                </CardTitle>
                <CardDescription>Total de Estudiantes</CardDescription>
              </CardHeader>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Calificaciones por Materia</CardTitle>
              <CardDescription>Rendimiento detallado en cada asignatura</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {studentData.academic.subjects.map((subject, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center space-x-3">
                      <BookOpen className="h-5 w-5 text-blue-600" />
                      <span className="font-medium">{subject.name}</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <TrendingUp
                        className={`h-4 w-4 ${
                          subject.trend === "up"
                            ? "text-green-600"
                            : subject.trend === "down"
                              ? "text-red-600"
                              : "text-gray-600"
                        }`}
                      />
                      <Badge
                        variant={subject.grade >= 9 ? "default" : subject.grade >= 7 ? "secondary" : "destructive"}
                      >
                        {subject.grade}/10
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Asistencia */}
        <TabsContent value="attendance" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card>
              <CardHeader className="text-center">
                <CardTitle className="text-2xl font-bold text-green-600">
                  {studentData.attendance.percentage}%
                </CardTitle>
                <CardDescription>Asistencia</CardDescription>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader className="text-center">
                <CardTitle className="text-2xl font-bold text-blue-600">{studentData.attendance.presentDays}</CardTitle>
                <CardDescription>Días Presentes</CardDescription>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader className="text-center">
                <CardTitle className="text-2xl font-bold text-orange-600">
                  {studentData.attendance.justifiedAbsences}
                </CardTitle>
                <CardDescription>Faltas Justificadas</CardDescription>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader className="text-center">
                <CardTitle className="text-2xl font-bold text-red-600">
                  {studentData.attendance.unjustifiedAbsences}
                </CardTitle>
                <CardDescription>Faltas Injustificadas</CardDescription>
              </CardHeader>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Resumen de Asistencia</CardTitle>
              <CardDescription>Detalle del registro de asistencia</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span>Total de días de clase:</span>
                  <span className="font-medium">{studentData.attendance.totalDays}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Días presentes:</span>
                  <span className="font-medium text-green-600">{studentData.attendance.presentDays}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Total de faltas:</span>
                  <span className="font-medium text-red-600">{studentData.attendance.absentDays}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Tardanzas:</span>
                  <span className="font-medium text-orange-600">{studentData.attendance.tardiness}</span>
                </div>
                <Progress value={studentData.attendance.percentage} className="w-full" />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Conducta */}
        <TabsContent value="behavior" className="space-y-6">
          <Card>
            <CardHeader className="text-center">
              <CardTitle className="flex items-center justify-center space-x-2">
                <div className="flex">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className={`h-6 w-6 ${
                        star <= studentData.behavior.overallRating ? "text-yellow-400 fill-current" : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
                <span className="text-2xl font-bold">{studentData.behavior.overallRating}/5</span>
              </CardTitle>
              <CardDescription>Calificación General de Conducta</CardDescription>
            </CardHeader>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Habilidades Evaluadas</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span>Habilidades Sociales:</span>
                  <div className="flex">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className={`h-4 w-4 ${
                          star <= studentData.behavior.socialSkills ? "text-yellow-400 fill-current" : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span>Responsabilidad:</span>
                  <div className="flex">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className={`h-4 w-4 ${
                          star <= studentData.behavior.responsibility ? "text-yellow-400 fill-current" : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span>Respeto:</span>
                  <div className="flex">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className={`h-4 w-4 ${
                          star <= studentData.behavior.respect ? "text-yellow-400 fill-current" : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span>Participación:</span>
                  <div className="flex">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className={`h-4 w-4 ${
                          star <= studentData.behavior.participation ? "text-yellow-400 fill-current" : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Reportes Recientes</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {studentData.behavior.reports.map((report, index) => (
                  <div key={index} className="flex items-start space-x-3 p-3 border rounded-lg">
                    {report.type === "positive" ? (
                      <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                    ) : (
                      <AlertCircle className="h-5 w-5 text-orange-600 mt-0.5" />
                    )}
                    <div className="flex-1">
                      <p className="text-sm">{report.description}</p>
                      <p className="text-xs text-gray-500 mt-1">{report.date}</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Tareas */}
        <TabsContent value="assignments" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader className="text-center">
                <CardTitle className="text-2xl font-bold text-green-600">
                  {studentData.assignments.completionRate}%
                </CardTitle>
                <CardDescription>Cumplimiento</CardDescription>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader className="text-center">
                <CardTitle className="text-2xl font-bold text-blue-600">
                  {studentData.assignments.completedAssignments}
                </CardTitle>
                <CardDescription>Completadas</CardDescription>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader className="text-center">
                <CardTitle className="text-2xl font-bold text-orange-600">
                  {studentData.assignments.pendingAssignments}
                </CardTitle>
                <CardDescription>Pendientes</CardDescription>
              </CardHeader>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Próximas Entregas</CardTitle>
              <CardDescription>Tareas y proyectos con fechas de vencimiento</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {studentData.assignments.upcomingDeadlines.map((deadline, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center space-x-3">
                      <FileText className="h-5 w-5 text-blue-600" />
                      <div>
                        <p className="font-medium">{deadline.assignment}</p>
                        <p className="text-sm text-gray-600">{deadline.subject}</p>
                      </div>
                    </div>
                    <Badge variant="outline">{deadline.dueDate}</Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Financiero */}
        <TabsContent value="financial" className="space-y-6">
          <Card>
            <CardHeader className="text-center">
              <CardTitle
                className={`text-3xl font-bold ${
                  studentData.financial.balance >= 0 ? "text-green-600" : "text-red-600"
                }`}
              >
                ${Math.abs(studentData.financial.balance).toFixed(2)}
              </CardTitle>
              <CardDescription>
                {studentData.financial.balance >= 0 ? "Saldo a Favor" : "Saldo Pendiente"}
              </CardDescription>
            </CardHeader>
          </Card>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <AlertCircle className="h-5 w-5 mr-2 text-red-600" />
                  Pagos Pendientes
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {studentData.financial.pendingPayments.map((payment, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border rounded-lg border-red-200">
                    <div>
                      <p className="font-medium">{payment.concept}</p>
                      <p className="text-sm text-gray-600">Vence: {payment.dueDate}</p>
                    </div>
                    <Badge variant="destructive">${payment.amount.toFixed(2)}</Badge>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <CheckCircle className="h-5 w-5 mr-2 text-green-600" />
                  Historial de Pagos
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {studentData.financial.paymentHistory.map((payment, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border rounded-lg border-green-200">
                    <div>
                      <p className="font-medium">{payment.concept}</p>
                      <p className="text-sm text-gray-600">{payment.date}</p>
                    </div>
                    <Badge variant="default">${payment.amount.toFixed(2)}</Badge>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Comunicación */}
        <TabsContent value="communication" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <MessageCircle className="h-5 w-5 mr-2" />
                  Mensajes Recientes
                  {studentData.communication.unreadMessages > 0 && (
                    <Badge variant="destructive" className="ml-2">
                      {studentData.communication.unreadMessages}
                    </Badge>
                  )}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {studentData.communication.recentMessages.map((message, index) => (
                  <div
                    key={index}
                    className={`p-3 border rounded-lg ${!message.read ? "border-blue-200 bg-blue-50" : ""}`}
                  >
                    <div className="flex items-center justify-between">
                      <p className="font-medium">{message.from}</p>
                      <span className="text-xs text-gray-500">{message.date}</span>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">{message.subject}</p>
                    {!message.read && (
                      <Badge variant="secondary" className="mt-2">
                        No leído
                      </Badge>
                    )}
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Calendar className="h-5 w-5 mr-2" />
                  Próximas Reuniones
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {studentData.communication.upcomingMeetings.map((meeting, index) => (
                  <div key={index} className="p-3 border rounded-lg">
                    <p className="font-medium">{meeting.title}</p>
                    <div className="flex items-center space-x-4 mt-2 text-sm text-gray-600">
                      <span className="flex items-center">
                        <Calendar className="h-4 w-4 mr-1" />
                        {meeting.date}
                      </span>
                      <span className="flex items-center">
                        <Clock className="h-4 w-4 mr-1" />
                        {meeting.time}
                      </span>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Phone className="h-5 w-5 mr-2" />
                Contactos de Emergencia
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {studentData.communication.emergencyContacts.map((contact, index) => (
                  <div key={index} className="p-3 border rounded-lg">
                    <p className="font-medium">{contact.name}</p>
                    <div className="space-y-1 mt-2">
                      <p className="text-sm text-gray-600 flex items-center">
                        <Phone className="h-4 w-4 mr-2" />
                        {contact.phone}
                      </p>
                      <p className="text-sm text-gray-600 flex items-center">
                        <Mail className="h-4 w-4 mr-2" />
                        {contact.email}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Salud */}
        <TabsContent value="health" className="space-y-6">
          <Card>
            <CardHeader className="text-center">
              <CardTitle className="text-2xl font-bold text-green-600 flex items-center justify-center">
                <Heart className="h-8 w-8 mr-2" />
                {studentData.health.generalStatus}
              </CardTitle>
              <CardDescription>Estado General de Salud</CardDescription>
            </CardHeader>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <AlertCircle className="h-5 w-5 mr-2 text-orange-600" />
                  Información Médica
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span>Alergias:</span>
                  <span className="font-medium text-red-600">{studentData.health.allergies.join(", ")}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Medicamentos:</span>
                  <span className="font-medium">
                    {studentData.health.medications.length > 0 ? studentData.health.medications.join(", ") : "Ninguno"}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Último Chequeo:</span>
                  <span className="font-medium">{studentData.health.lastCheckup}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Vacunas:</span>
                  <Badge variant="default">{studentData.health.vaccinations}</Badge>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Shield className="h-5 w-5 mr-2 text-blue-600" />
                  Seguro y Contactos
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-sm text-gray-600">Seguro Médico</p>
                  <p className="font-medium">{studentData.health.medicalInsurance}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Contacto de Emergencia</p>
                  <p className="font-medium">{studentData.health.emergencyContact}</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Calendario */}
        <TabsContent value="calendar" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Calendar className="h-5 w-5 mr-2" />
                Próximos Eventos Importantes
              </CardTitle>
              <CardDescription>Calendario académico personalizado</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {studentData.calendar.upcomingEvents.map((event, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center space-x-3">
                      {event.type === "exam" && <BookOpen className="h-5 w-5 text-red-600" />}
                      {event.type === "assignment" && <FileText className="h-5 w-5 text-orange-600" />}
                      {event.type === "meeting" && <Users className="h-5 w-5 text-blue-600" />}
                      {event.type === "event" && <Star className="h-5 w-5 text-purple-600" />}
                      <div>
                        <p className="font-medium">{event.title}</p>
                        <p className="text-sm text-gray-600">{event.date}</p>
                      </div>
                    </div>
                    <Badge
                      variant={
                        event.type === "exam" ? "destructive" : event.type === "assignment" ? "secondary" : "default"
                      }
                    >
                      {event.type === "exam"
                        ? "Examen"
                        : event.type === "assignment"
                          ? "Entrega"
                          : event.type === "meeting"
                            ? "Reunión"
                            : "Evento"}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
