"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Users,
  GraduationCap,
  BookOpen,
  Plus,
  Edit,
  Trash2,
  Eye,
  Download,
  Bell,
  User,
  School,
  TrendingUp,
} from "lucide-react"
import { ThemeSelector } from "@/components/theme-selector"

export default function AdminDashboard() {
  const [stats] = useState({
    totalStudents: 1247,
    totalTeachers: 68,
    totalClasses: 42,
    averageGrade: 8.3,
  })

  const [recentActivity] = useState([
    { id: 1, action: "Nuevo estudiante registrado", user: "María González", time: "Hace 2 horas" },
    { id: 2, action: "Calificaciones actualizadas", user: "Prof. García", time: "Hace 4 horas" },
    { id: 3, action: "Nueva clase creada", user: "Prof. López", time: "Hace 1 día" },
    { id: 4, action: "Reporte mensual generado", user: "Sistema", time: "Hace 2 días" },
  ])

  const [teachers] = useState([
    { id: 1, name: "Roberto García", subject: "Matemáticas", classes: 3, students: 83, status: "active" },
    { id: 2, name: "Ana López", subject: "Ciencias Naturales", classes: 4, students: 112, status: "active" },
    { id: 3, name: "Carlos Rodríguez", subject: "Lengua y Literatura", classes: 3, students: 89, status: "active" },
    { id: 4, name: "María Martínez", subject: "Estudios Sociales", classes: 2, students: 56, status: "inactive" },
  ])

  const [students] = useState([
    { id: 1, name: "María González", grade: "10mo A", average: 8.7, attendance: 95, status: "active" },
    { id: 2, name: "Carlos Pérez", grade: "9no B", average: 7.8, attendance: 88, status: "active" },
    { id: 3, name: "Ana Rodríguez", grade: "8vo C", average: 9.2, attendance: 97, status: "active" },
    { id: 4, name: "Luis Martínez", grade: "10mo A", average: 6.5, attendance: 82, status: "warning" },
  ])

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-4">
              <School className="h-8 w-8 text-blue-600" />
              <div>
                <h1 className="text-xl font-bold text-gray-900">Panel de Administración</h1>
                <p className="text-sm text-gray-600">Colegio Nacional "Simón Bolívar"</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="icon">
                <Bell className="h-5 w-5" />
              </Button>

              {/* Theme Selector */}
              <ThemeSelector />

              <Button variant="ghost" size="icon">
                <User className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-7">
            <TabsTrigger value="overview">Resumen</TabsTrigger>
            <TabsTrigger value="students">Estudiantes</TabsTrigger>
            <TabsTrigger value="teachers">Profesores</TabsTrigger>
            <TabsTrigger value="classes">Clases</TabsTrigger>
            <TabsTrigger value="reports">Reportes</TabsTrigger>
            <TabsTrigger value="academic">Académico</TabsTrigger>
            <TabsTrigger value="settings">Configuración</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Estudiantes</CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-blue-600">{stats.totalStudents}</div>
                  <p className="text-xs text-muted-foreground">+12 este mes</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Profesores</CardTitle>
                  <GraduationCap className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-green-600">{stats.totalTeachers}</div>
                  <p className="text-xs text-muted-foreground">+2 este mes</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Clases</CardTitle>
                  <BookOpen className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-purple-600">{stats.totalClasses}</div>
                  <p className="text-xs text-muted-foreground">En 3 niveles</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Promedio General</CardTitle>
                  <TrendingUp className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-orange-600">{stats.averageGrade}</div>
                  <p className="text-xs text-muted-foreground">+0.2 desde el mes pasado</p>
                </CardContent>
              </Card>
            </div>

            {/* Charts and Activity */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Actividad Reciente</CardTitle>
                  <CardDescription>Últimas acciones en el sistema</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {recentActivity.map((activity) => (
                    <div key={activity.id} className="flex items-start space-x-3">
                      <div className="flex-shrink-0">
                        <div className="w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium">{activity.action}</p>
                        <p className="text-xs text-gray-500">
                          {activity.user} • {activity.time}
                        </p>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Estadísticas del Mes</CardTitle>
                  <CardDescription>Resumen de rendimiento académico</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Asistencia Promedio</span>
                    <Badge variant="default">92%</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Tareas Entregadas</span>
                    <Badge variant="secondary">87%</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Estudiantes Destacados</span>
                    <Badge variant="default">156</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Alertas Académicas</span>
                    <Badge variant="destructive">23</Badge>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="students" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Gestión de Estudiantes</h2>
              <div className="flex space-x-2">
                <Button variant="outline">
                  <Download className="h-4 w-4 mr-2" />
                  Exportar
                </Button>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Nuevo Estudiante
                </Button>
              </div>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Lista de Estudiantes</CardTitle>
                <CardDescription>Gestiona todos los estudiantes del colegio</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex space-x-4">
                    <Input placeholder="Buscar estudiante..." className="max-w-sm" />
                    <select className="p-2 border rounded-md">
                      <option>Todos los grados</option>
                      <option>8vo Año</option>
                      <option>9no Año</option>
                      <option>10mo Año</option>
                    </select>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse border border-gray-300">
                      <thead>
                        <tr className="bg-gray-50">
                          <th className="border border-gray-300 p-3 text-left">Nombre</th>
                          <th className="border border-gray-300 p-3 text-center">Grado</th>
                          <th className="border border-gray-300 p-3 text-center">Promedio</th>
                          <th className="border border-gray-300 p-3 text-center">Asistencia</th>
                          <th className="border border-gray-300 p-3 text-center">Estado</th>
                          <th className="border border-gray-300 p-3 text-center">Acciones</th>
                        </tr>
                      </thead>
                      <tbody>
                        {students.map((student) => (
                          <tr key={student.id}>
                            <td className="border border-gray-300 p-3">{student.name}</td>
                            <td className="border border-gray-300 p-3 text-center">{student.grade}</td>
                            <td className="border border-gray-300 p-3 text-center">{student.average}</td>
                            <td className="border border-gray-300 p-3 text-center">{student.attendance}%</td>
                            <td className="border border-gray-300 p-3 text-center">
                              <Badge variant={student.status === "active" ? "default" : "destructive"}>
                                {student.status === "active" ? "Activo" : "Alerta"}
                              </Badge>
                            </td>
                            <td className="border border-gray-300 p-3 text-center">
                              <div className="flex justify-center space-x-2">
                                <Button size="sm" variant="outline">
                                  <Eye className="h-4 w-4" />
                                </Button>
                                <Button size="sm" variant="outline">
                                  <Edit className="h-4 w-4" />
                                </Button>
                                <Button size="sm" variant="outline">
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="teachers" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Gestión de Profesores</h2>
              <div className="flex space-x-2">
                <Button variant="outline">
                  <Download className="h-4 w-4 mr-2" />
                  Exportar
                </Button>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Nuevo Profesor
                </Button>
              </div>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Lista de Profesores</CardTitle>
                <CardDescription>Gestiona todo el personal docente</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex space-x-4">
                    <Input placeholder="Buscar profesor..." className="max-w-sm" />
                    <select className="p-2 border rounded-md">
                      <option>Todas las materias</option>
                      <option>Matemáticas</option>
                      <option>Ciencias Naturales</option>
                      <option>Lengua y Literatura</option>
                      <option>Estudios Sociales</option>
                    </select>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse border border-gray-300">
                      <thead>
                        <tr className="bg-gray-50">
                          <th className="border border-gray-300 p-3 text-left">Nombre</th>
                          <th className="border border-gray-300 p-3 text-center">Materia</th>
                          <th className="border border-gray-300 p-3 text-center">Clases</th>
                          <th className="border border-gray-300 p-3 text-center">Estudiantes</th>
                          <th className="border border-gray-300 p-3 text-center">Estado</th>
                          <th className="border border-gray-300 p-3 text-center">Acciones</th>
                        </tr>
                      </thead>
                      <tbody>
                        {teachers.map((teacher) => (
                          <tr key={teacher.id}>
                            <td className="border border-gray-300 p-3">{teacher.name}</td>
                            <td className="border border-gray-300 p-3 text-center">{teacher.subject}</td>
                            <td className="border border-gray-300 p-3 text-center">{teacher.classes}</td>
                            <td className="border border-gray-300 p-3 text-center">{teacher.students}</td>
                            <td className="border border-gray-300 p-3 text-center">
                              <Badge variant={teacher.status === "active" ? "default" : "secondary"}>
                                {teacher.status === "active" ? "Activo" : "Inactivo"}
                              </Badge>
                            </td>
                            <td className="border border-gray-300 p-3 text-center">
                              <div className="flex justify-center space-x-2">
                                <Button size="sm" variant="outline">
                                  <Eye className="h-4 w-4" />
                                </Button>
                                <Button size="sm" variant="outline">
                                  <Edit className="h-4 w-4" />
                                </Button>
                                <Button size="sm" variant="outline">
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="classes" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Gestión de Clases</h2>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Nueva Clase
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>8vo Año</CardTitle>
                  <CardDescription>Educación General Básica</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm">8vo A</span>
                      <span className="text-sm text-gray-500">32 estudiantes</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">8vo B</span>
                      <span className="text-sm text-gray-500">30 estudiantes</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">8vo C</span>
                      <span className="text-sm text-gray-500">28 estudiantes</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>9no Año</CardTitle>
                  <CardDescription>Educación General Básica</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm">9no A</span>
                      <span className="text-sm text-gray-500">29 estudiantes</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">9no B</span>
                      <span className="text-sm text-gray-500">31 estudiantes</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">9no C</span>
                      <span className="text-sm text-gray-500">27 estudiantes</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>10mo Año</CardTitle>
                  <CardDescription>Educación General Básica</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm">10mo A</span>
                      <span className="text-sm text-gray-500">28 estudiantes</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">10mo B</span>
                      <span className="text-sm text-gray-500">26 estudiantes</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">10mo C</span>
                      <span className="text-sm text-gray-500">30 estudiantes</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="reports" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Reportes y Estadísticas</h2>
              <Button>
                <Download className="h-4 w-4 mr-2" />
                Generar Reporte
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Rendimiento Académico</CardTitle>
                  <CardDescription>Estadísticas generales del colegio</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span>Promedio General</span>
                    <Badge variant="default">8.3/10</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Estudiantes Destacados</span>
                    <Badge variant="default">156 (12.5%)</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Estudiantes en Riesgo</span>
                    <Badge variant="destructive">23 (1.8%)</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Tasa de Aprobación</span>
                    <Badge variant="default">96.2%</Badge>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Asistencia</CardTitle>
                  <CardDescription>Estadísticas de asistencia</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span>Asistencia Promedio</span>
                    <Badge variant="default">92%</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Estudiantes con Asistencia Perfecta</span>
                    <Badge variant="default">234</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Alertas por Inasistencia</span>
                    <Badge variant="destructive">12</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Días Lectivos</span>
                    <Badge variant="secondary">180</Badge>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="academic" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Gestión Académica</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Calendario Académico</CardTitle>
                  <CardDescription>Gestiona el año lectivo</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label>Año Lectivo Actual</Label>
                    <Input value="2024-2025" readOnly />
                  </div>
                  <div className="space-y-2">
                    <Label>Período Actual</Label>
                    <select className="w-full p-2 border rounded-md">
                      <option>Primer Quimestre</option>
                      <option>Segundo Quimestre</option>
                    </select>
                  </div>
                  <Button className="w-full">Configurar Períodos</Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Currículo</CardTitle>
                  <CardDescription>Gestiona las materias y contenidos</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between items-center p-2 border rounded">
                      <span className="text-sm">Matemáticas</span>
                      <Button size="sm" variant="outline">
                        Editar
                      </Button>
                    </div>
                    <div className="flex justify-between items-center p-2 border rounded">
                      <span className="text-sm">Lengua y Literatura</span>
                      <Button size="sm" variant="outline">
                        Editar
                      </Button>
                    </div>
                    <div className="flex justify-between items-center p-2 border rounded">
                      <span className="text-sm">Ciencias Naturales</span>
                      <Button size="sm" variant="outline">
                        Editar
                      </Button>
                    </div>
                  </div>
                  <Button className="w-full">
                    <Plus className="h-4 w-4 mr-2" />
                    Nueva Materia
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="settings" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Configuración del Sistema</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Información del Colegio</CardTitle>
                  <CardDescription>Datos básicos de la institución</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label>Nombre del Colegio</Label>
                    <Input value="Colegio Nacional Simón Bolívar" />
                  </div>
                  <div className="space-y-2">
                    <Label>Código AMIE</Label>
                    <Input value="09H00123" />
                  </div>
                  <div className="space-y-2">
                    <Label>Dirección</Label>
                    <Input value="Av. Principal 123, Guayaquil" />
                  </div>
                  <div className="space-y-2">
                    <Label>Teléfono</Label>
                    <Input value="04-2345678" />
                  </div>
                  <Button>Guardar Cambios</Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Configuración Académica</CardTitle>
                  <CardDescription>Parámetros del sistema educativo</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label>Escala de Calificación</Label>
                    <select className="w-full p-2 border rounded-md">
                      <option>0-10 (Ecuador)</option>
                      <option>0-20 (Personalizado)</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <Label>Nota Mínima de Aprobación</Label>
                    <Input type="number" value="7" />
                  </div>
                  <div className="space-y-2">
                    <Label>Períodos Académicos</Label>
                    <select className="w-full p-2 border rounded-md">
                      <option>2 Quimestres</option>
                      <option>3 Trimestres</option>
                    </select>
                  </div>
                  <Button>Aplicar Configuración</Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
