"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { TrendingUp, User, AlertCircle, CheckCircle, FileText, Trophy, Bell, Settings, LogOut } from "lucide-react"
import { GamificationSystem } from "@/components/gamification-system"
import { RealTimeChat } from "@/components/real-time-chat"
import { InteractiveCalendar } from "@/components/interactive-calendar"
import { DigitalLibrary } from "@/components/digital-library"
import { AdvancedAnalytics } from "@/components/advanced-analytics"
import { FloatingNavigation } from "@/components/floating-navigation"
import { RepresentativeView } from "@/components/representative-view"
import { ThemeSelector } from "@/components/theme-selector"
import { useRouter } from "next/navigation"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export default function StudentDashboard() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("overview")

  // Datos simulados del estudiante
  const studentData = {
    name: "María González",
    grade: "10mo A",
    studentId: "2024-001",
    photo: "/placeholder.svg?height=100&width=100&text=MG",
    stats: {
      overallAverage: 8.5,
      attendance: 94,
      completedAssignments: 23,
      totalAssignments: 25,
      ranking: 3,
      totalStudents: 28,
    },
    recentGrades: [
      { subject: "Matemáticas", grade: 9.2, date: "2024-01-25" },
      { subject: "Ciencias", grade: 8.8, date: "2024-01-23" },
      { subject: "Lenguaje", grade: 8.1, date: "2024-01-20" },
      { subject: "Historia", grade: 8.9, date: "2024-01-18" },
    ],
    upcomingAssignments: [
      { subject: "Matemáticas", title: "Ejercicios Cap. 5", dueDate: "2024-01-30", priority: "high" },
      { subject: "Ciencias", title: "Proyecto de Biología", dueDate: "2024-02-05", priority: "medium" },
      { subject: "Historia", title: "Ensayo sobre la Independencia", dueDate: "2024-02-08", priority: "low" },
    ],
    schedule: [
      { time: "07:00-07:45", subject: "Matemáticas", teacher: "Prof. Roberto García", room: "Aula 201" },
      { time: "07:45-08:30", subject: "Ciencias", teacher: "Prof. Ana Martínez", room: "Lab. Ciencias" },
      { time: "08:30-09:15", subject: "Lenguaje", teacher: "Prof. Carmen López", room: "Aula 105" },
      { time: "09:30-10:15", subject: "Historia", teacher: "Prof. Diego Herrera", room: "Aula 203" },
    ],
    notifications: [
      { type: "assignment", message: "Nueva tarea de Matemáticas disponible", time: "hace 2 horas" },
      { type: "grade", message: "Calificación de Ciencias publicada", time: "hace 4 horas" },
      { type: "event", message: "Reunión de representantes programada para el 1 de febrero", time: "hace 1 día" },
    ],
  }

  const handleLogout = () => {
    if (confirm("¿Estás seguro de que deseas cerrar sesión?")) {
      router.push("/login")
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-4">
              <img
                src={studentData.photo || "/placeholder.svg"}
                alt={studentData.name}
                className="w-10 h-10 rounded-full border-2 border-blue-200"
              />
              <div>
                <h1 className="text-xl font-bold text-gray-900">¡Hola, {studentData.name}!</h1>
                <p className="text-sm text-gray-600">
                  {studentData.grade} • Código: {studentData.studentId}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="h-5 w-5" />
                {studentData.notifications.length > 0 && (
                  <span className="absolute -top-1 -right-1 h-4 w-4 bg-red-500 rounded-full text-xs text-white flex items-center justify-center">
                    {studentData.notifications.length}
                  </span>
                )}
              </Button>

              {/* Theme Selector */}
              <ThemeSelector />

              {/* User Menu */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <User className="h-5 w-5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuItem>
                    <User className="mr-2 h-4 w-4" />
                    <span>Mi Perfil</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Configuración</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <FileText className="mr-2 h-4 w-4" />
                    <span>Mis Calificaciones</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout} className="text-red-600">
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Cerrar Sesión</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-9">
            <TabsTrigger value="overview">Resumen</TabsTrigger>
            <TabsTrigger value="grades">Calificaciones</TabsTrigger>
            <TabsTrigger value="assignments">Tareas</TabsTrigger>
            <TabsTrigger value="schedule">Horario</TabsTrigger>
            <TabsTrigger value="library">Biblioteca</TabsTrigger>
            <TabsTrigger value="analytics">Análisis</TabsTrigger>
            <TabsTrigger value="gamification">Logros</TabsTrigger>
            <TabsTrigger value="chat">Chat</TabsTrigger>
            <TabsTrigger value="representative">Vista Representante</TabsTrigger>
          </TabsList>

          {/* Resumen */}
          <TabsContent value="overview" className="space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Promedio General</CardTitle>
                  <TrendingUp className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-blue-600">{studentData.stats.overallAverage}/10</div>
                  <p className="text-xs text-muted-foreground">Excelente rendimiento</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Asistencia</CardTitle>
                  <CheckCircle className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-green-600">{studentData.stats.attendance}%</div>
                  <p className="text-xs text-muted-foreground">Muy buena asistencia</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Tareas Completadas</CardTitle>
                  <FileText className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-purple-600">
                    {studentData.stats.completedAssignments}/{studentData.stats.totalAssignments}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {Math.round((studentData.stats.completedAssignments / studentData.stats.totalAssignments) * 100)}%
                    completado
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Ranking</CardTitle>
                  <Trophy className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-orange-600">#{studentData.stats.ranking}</div>
                  <p className="text-xs text-muted-foreground">de {studentData.stats.totalStudents} estudiantes</p>
                </CardContent>
              </Card>
            </div>

            {/* Recent Activity */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Calificaciones Recientes</CardTitle>
                  <CardDescription>Tus últimas evaluaciones</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {studentData.recentGrades.map((grade, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <h4 className="font-medium">{grade.subject}</h4>
                        <p className="text-sm text-gray-600">{grade.date}</p>
                      </div>
                      <Badge variant={grade.grade >= 9 ? "default" : grade.grade >= 7 ? "secondary" : "destructive"}>
                        {grade.grade}/10
                      </Badge>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Próximas Entregas</CardTitle>
                  <CardDescription>Tareas y proyectos pendientes</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {studentData.upcomingAssignments.map((assignment, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <h4 className="font-medium">{assignment.title}</h4>
                        <p className="text-sm text-gray-600">{assignment.subject}</p>
                      </div>
                      <div className="text-right">
                        <Badge
                          variant={
                            assignment.priority === "high"
                              ? "destructive"
                              : assignment.priority === "medium"
                                ? "secondary"
                                : "outline"
                          }
                        >
                          {assignment.priority === "high"
                            ? "Urgente"
                            : assignment.priority === "medium"
                              ? "Medio"
                              : "Bajo"}
                        </Badge>
                        <p className="text-xs text-gray-500 mt-1">{assignment.dueDate}</p>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>

            {/* Today's Schedule */}
            <Card>
              <CardHeader>
                <CardTitle>Horario de Hoy</CardTitle>
                <CardDescription>Tus clases programadas para hoy</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {studentData.schedule.map((class_, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center space-x-4">
                        <div className="text-center">
                          <p className="text-sm font-medium">{class_.time}</p>
                        </div>
                        <div>
                          <h4 className="font-medium">{class_.subject}</h4>
                          <p className="text-sm text-gray-600">{class_.teacher}</p>
                        </div>
                      </div>
                      <Badge variant="outline">{class_.room}</Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Calificaciones */}
          <TabsContent value="grades" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Mis Calificaciones</CardTitle>
                <CardDescription>Historial completo de evaluaciones</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse border border-gray-300">
                    <thead>
                      <tr className="bg-gray-50">
                        <th className="border border-gray-300 p-2 text-left">Materia</th>
                        <th className="border border-gray-300 p-2 text-center">Parcial 1</th>
                        <th className="border border-gray-300 p-2 text-center">Parcial 2</th>
                        <th className="border border-gray-300 p-2 text-center">Tareas</th>
                        <th className="border border-gray-300 p-2 text-center">Promedio</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="border border-gray-300 p-2">Matemáticas</td>
                        <td className="border border-gray-300 p-2 text-center">9.2</td>
                        <td className="border border-gray-300 p-2 text-center">8.8</td>
                        <td className="border border-gray-300 p-2 text-center">9.5</td>
                        <td className="border border-gray-300 p-2 text-center font-medium">9.2</td>
                      </tr>
                      <tr>
                        <td className="border border-gray-300 p-2">Ciencias</td>
                        <td className="border border-gray-300 p-2 text-center">8.5</td>
                        <td className="border border-gray-300 p-2 text-center">9.0</td>
                        <td className="border border-gray-300 p-2 text-center">8.8</td>
                        <td className="border border-gray-300 p-2 text-center font-medium">8.8</td>
                      </tr>
                      <tr>
                        <td className="border border-gray-300 p-2">Lenguaje</td>
                        <td className="border border-gray-300 p-2 text-center">8.0</td>
                        <td className="border border-gray-300 p-2 text-center">8.2</td>
                        <td className="border border-gray-300 p-2 text-center">8.1</td>
                        <td className="border border-gray-300 p-2 text-center font-medium">8.1</td>
                      </tr>
                      <tr>
                        <td className="border border-gray-300 p-2">Historia</td>
                        <td className="border border-gray-300 p-2 text-center">9.0</td>
                        <td className="border border-gray-300 p-2 text-center">8.8</td>
                        <td className="border border-gray-300 p-2 text-center">8.9</td>
                        <td className="border border-gray-300 p-2 text-center font-medium">8.9</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Tareas */}
          <TabsContent value="assignments" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <AlertCircle className="h-5 w-5 mr-2 text-red-600" />
                    Tareas Pendientes
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {studentData.upcomingAssignments.map((assignment, index) => (
                    <div key={index} className="p-3 border rounded-lg border-red-200">
                      <div className="flex items-center justify-between">
                        <h4 className="font-medium">{assignment.title}</h4>
                        <Badge
                          variant={
                            assignment.priority === "high"
                              ? "destructive"
                              : assignment.priority === "medium"
                                ? "secondary"
                                : "outline"
                          }
                        >
                          {assignment.priority === "high"
                            ? "Urgente"
                            : assignment.priority === "medium"
                              ? "Medio"
                              : "Bajo"}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-600 mt-1">{assignment.subject}</p>
                      <p className="text-xs text-gray-500 mt-2">Vence: {assignment.dueDate}</p>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <CheckCircle className="h-5 w-5 mr-2 text-green-600" />
                    Tareas Completadas
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="p-3 border rounded-lg border-green-200">
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium">Ejercicios de Álgebra</h4>
                      <Badge variant="default">9.5/10</Badge>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">Matemáticas</p>
                    <p className="text-xs text-gray-500 mt-2">Entregado: 2024-01-20</p>
                  </div>
                  <div className="p-3 border rounded-lg border-green-200">
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium">Ensayo sobre Células</h4>
                      <Badge variant="default">8.8/10</Badge>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">Ciencias</p>
                    <p className="text-xs text-gray-500 mt-2">Entregado: 2024-01-18</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Horario */}
          <TabsContent value="schedule" className="space-y-6">
            <InteractiveCalendar />
          </TabsContent>

          {/* Biblioteca */}
          <TabsContent value="library" className="space-y-6">
            <DigitalLibrary />
          </TabsContent>

          {/* Análisis */}
          <TabsContent value="analytics" className="space-y-6">
            <AdvancedAnalytics />
          </TabsContent>

          {/* Gamificación */}
          <TabsContent value="gamification" className="space-y-6">
            <GamificationSystem />
          </TabsContent>

          {/* Chat */}
          <TabsContent value="chat" className="space-y-6">
            <RealTimeChat />
          </TabsContent>

          {/* Vista de Representante */}
          <TabsContent value="representative" className="space-y-6">
            <RepresentativeView />
          </TabsContent>
        </Tabs>
      </div>

      {/* Floating Navigation */}
      <FloatingNavigation />
    </div>
  )
}
