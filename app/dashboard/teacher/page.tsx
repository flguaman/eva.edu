"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  BookOpen,
  Users,
  FileText,
  Calendar,
  Plus,
  Edit,
  Eye,
  Download,
  Upload,
  Bell,
  User,
  LogOut,
} from "lucide-react"
import { StudentReportsGenerator } from "@/components/student-reports-generator"
import { ThemeSelector } from "@/components/theme-selector"
import { useRouter } from "next/navigation"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export default function TeacherDashboard() {
  const router = useRouter()

  const [classes] = useState([
    { id: 1, name: "10mo A - Matemáticas", students: 28, subject: "Matemáticas" },
    { id: 2, name: "9no B - Matemáticas", students: 25, subject: "Matemáticas" },
    { id: 3, name: "8vo C - Matemáticas", students: 30, subject: "Matemáticas" },
  ])

  const [assignments] = useState([
    { id: 1, title: "Ejercicios de Álgebra", class: "10mo A", submitted: 22, total: 28, dueDate: "2024-01-25" },
    { id: 2, title: "Problemas de Geometría", class: "9no B", submitted: 20, total: 25, dueDate: "2024-01-28" },
    { id: 3, title: "Ecuaciones Lineales", class: "8vo C", submitted: 25, total: 30, dueDate: "2024-01-30" },
  ])

  const [recentGrades] = useState([
    { student: "María González", assignment: "Examen Parcial", grade: 8.5, class: "10mo A" },
    { student: "Carlos Pérez", assignment: "Tarea 5", grade: 9.2, class: "9no B" },
    { student: "Ana Rodríguez", assignment: "Proyecto", grade: 7.8, class: "8vo C" },
    { student: "Luis Martínez", assignment: "Examen Parcial", grade: 8.9, class: "10mo A" },
  ])

  const handleLogout = () => {
    // Aquí podrías agregar lógica de logout como limpiar tokens, etc.
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
              <BookOpen className="h-8 w-8 text-blue-600" />
              <div>
                <h1 className="text-xl font-bold text-gray-900">Panel del Profesor</h1>
                <p className="text-sm text-gray-600">Prof. Roberto García - Matemáticas</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="icon">
                <Bell className="h-5 w-5" />
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
                    <FileText className="mr-2 h-4 w-4" />
                    <span>Mis Reportes</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Calendar className="mr-2 h-4 w-4" />
                    <span>Mi Horario</span>
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
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-7">
            <TabsTrigger value="overview">Resumen</TabsTrigger>
            <TabsTrigger value="classes">Clases</TabsTrigger>
            <TabsTrigger value="assignments">Tareas</TabsTrigger>
            <TabsTrigger value="grades">Calificaciones</TabsTrigger>
            <TabsTrigger value="resources">Recursos</TabsTrigger>
            <TabsTrigger value="schedule">Horario</TabsTrigger>
            <TabsTrigger value="reports">Reportes</TabsTrigger>
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
                  <div className="text-2xl font-bold text-blue-600">83</div>
                  <p className="text-xs text-muted-foreground">En 3 cursos</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Tareas Pendientes</CardTitle>
                  <FileText className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-orange-600">12</div>
                  <p className="text-xs text-muted-foreground">Por revisar</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Promedio General</CardTitle>
                  <BookOpen className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-green-600">8.4</div>
                  <p className="text-xs text-muted-foreground">Todos los cursos</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Próxima Clase</CardTitle>
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-purple-600">10mo A</div>
                  <p className="text-xs text-muted-foreground">En 2 horas</p>
                </CardContent>
              </Card>
            </div>

            {/* Recent Activity */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Tareas Recientes</CardTitle>
                  <CardDescription>Estado de entrega de tareas asignadas</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {assignments.map((assignment) => (
                    <div key={assignment.id} className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <h4 className="font-medium">{assignment.title}</h4>
                        <p className="text-sm text-gray-600">{assignment.class}</p>
                      </div>
                      <div className="text-right">
                        <Badge variant="secondary">
                          {assignment.submitted}/{assignment.total}
                        </Badge>
                        <p className="text-xs text-gray-500 mt-1">Vence: {assignment.dueDate}</p>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Calificaciones Recientes</CardTitle>
                  <CardDescription>Últimas calificaciones ingresadas</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {recentGrades.map((grade, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <h4 className="font-medium">{grade.student}</h4>
                        <p className="text-sm text-gray-600">
                          {grade.assignment} - {grade.class}
                        </p>
                      </div>
                      <Badge variant={grade.grade >= 9 ? "default" : grade.grade >= 7 ? "secondary" : "destructive"}>
                        {grade.grade}/10
                      </Badge>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="classes" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Mis Clases</h2>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Nueva Clase
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {classes.map((classItem) => (
                <Card key={classItem.id}>
                  <CardHeader>
                    <CardTitle>{classItem.name}</CardTitle>
                    <CardDescription>{classItem.students} estudiantes</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between text-sm">
                        <span>Materia:</span>
                        <span className="font-medium">{classItem.subject}</span>
                      </div>
                      <div className="flex space-x-2">
                        <Button size="sm" variant="outline" className="flex-1 bg-transparent">
                          <Eye className="h-4 w-4 mr-1" />
                          Ver
                        </Button>
                        <Button size="sm" variant="outline" className="flex-1 bg-transparent">
                          <Edit className="h-4 w-4 mr-1" />
                          Editar
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="assignments" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Gestión de Tareas</h2>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Nueva Tarea
              </Button>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Crear Nueva Tarea</CardTitle>
                <CardDescription>Asigna una nueva tarea a tus estudiantes</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="title">Título de la Tarea</Label>
                    <Input id="title" placeholder="Ej: Ejercicios de Álgebra" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="class">Clase</Label>
                    <select className="w-full p-2 border rounded-md">
                      <option>Seleccionar clase</option>
                      <option>10mo A - Matemáticas</option>
                      <option>9no B - Matemáticas</option>
                      <option>8vo C - Matemáticas</option>
                    </select>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">Descripción</Label>
                  <Textarea id="description" placeholder="Describe la tarea y los objetivos..." />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="dueDate">Fecha de Entrega</Label>
                    <Input id="dueDate" type="date" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="points">Puntos</Label>
                    <Input id="points" type="number" placeholder="10" />
                  </div>
                </div>
                <div className="flex space-x-2">
                  <Button>Crear Tarea</Button>
                  <Button variant="outline">
                    <Upload className="h-4 w-4 mr-2" />
                    Adjuntar Archivo
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Tareas Activas</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {assignments.map((assignment) => (
                    <div key={assignment.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <h4 className="font-medium">{assignment.title}</h4>
                        <p className="text-sm text-gray-600">{assignment.class}</p>
                        <p className="text-xs text-gray-500">Vence: {assignment.dueDate}</p>
                      </div>
                      <div className="flex items-center space-x-4">
                        <div className="text-right">
                          <Badge variant="secondary">
                            {assignment.submitted}/{assignment.total} entregadas
                          </Badge>
                        </div>
                        <div className="flex space-x-2">
                          <Button size="sm" variant="outline">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button size="sm" variant="outline">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button size="sm" variant="outline">
                            <Download className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="grades" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Centro de Calificaciones</CardTitle>
                <CardDescription>Gestiona las calificaciones de todos tus estudiantes</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-medium">10mo A - Matemáticas</h3>
                    <Button variant="outline">
                      <Download className="h-4 w-4 mr-2" />
                      Exportar
                    </Button>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse border border-gray-300">
                      <thead>
                        <tr className="bg-gray-50">
                          <th className="border border-gray-300 p-2 text-left">Estudiante</th>
                          <th className="border border-gray-300 p-2 text-center">Parcial 1</th>
                          <th className="border border-gray-300 p-2 text-center">Parcial 2</th>
                          <th className="border border-gray-300 p-2 text-center">Tareas</th>
                          <th className="border border-gray-300 p-2 text-center">Promedio</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td className="border border-gray-300 p-2">María González</td>
                          <td className="border border-gray-300 p-2 text-center">8.5</td>
                          <td className="border border-gray-300 p-2 text-center">9.0</td>
                          <td className="border border-gray-300 p-2 text-center">8.8</td>
                          <td className="border border-gray-300 p-2 text-center font-medium">8.8</td>
                        </tr>
                        <tr>
                          <td className="border border-gray-300 p-2">Carlos Pérez</td>
                          <td className="border border-gray-300 p-2 text-center">7.5</td>
                          <td className="border border-gray-300 p-2 text-center">8.2</td>
                          <td className="border border-gray-300 p-2 text-center">9.0</td>
                          <td className="border border-gray-300 p-2 text-center font-medium">8.2</td>
                        </tr>
                        <tr>
                          <td className="border border-gray-300 p-2">Ana Rodríguez</td>
                          <td className="border border-gray-300 p-2 text-center">9.2</td>
                          <td className="border border-gray-300 p-2 text-center">8.8</td>
                          <td className="border border-gray-300 p-2 text-center">9.5</td>
                          <td className="border border-gray-300 p-2 text-center font-medium">9.2</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="resources" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Recursos Educativos</h2>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Subir Recurso
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Presentaciones</CardTitle>
                  <CardDescription>Diapositivas y materiales de clase</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center p-2 border rounded">
                      <span className="text-sm">Álgebra Básica.pptx</span>
                      <Button size="sm" variant="ghost">
                        <Download className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="flex justify-between items-center p-2 border rounded">
                      <span className="text-sm">Geometría.pdf</span>
                      <Button size="sm" variant="ghost">
                        <Download className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Ejercicios</CardTitle>
                  <CardDescription>Problemas y ejercicios prácticos</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center p-2 border rounded">
                      <span className="text-sm">Ejercicios Cap 1.pdf</span>
                      <Button size="sm" variant="ghost">
                        <Download className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="flex justify-between items-center p-2 border rounded">
                      <span className="text-sm">Problemas Resueltos.pdf</span>
                      <Button size="sm" variant="ghost">
                        <Download className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Videos</CardTitle>
                  <CardDescription>Material audiovisual</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center p-2 border rounded">
                      <span className="text-sm">Introducción Álgebra.mp4</span>
                      <Button size="sm" variant="ghost">
                        <Eye className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="flex justify-between items-center p-2 border rounded">
                      <span className="text-sm">Resolución Problemas.mp4</span>
                      <Button size="sm" variant="ghost">
                        <Eye className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="schedule" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Mi Horario de Clases</CardTitle>
                <CardDescription>Horario semanal de todas tus clases</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-6 gap-4 text-sm">
                  <div className="font-medium">Hora</div>
                  <div className="font-medium text-center">Lunes</div>
                  <div className="font-medium text-center">Martes</div>
                  <div className="font-medium text-center">Miércoles</div>
                  <div className="font-medium text-center">Jueves</div>
                  <div className="font-medium text-center">Viernes</div>

                  <div className="font-medium">07:00-07:45</div>
                  <div className="text-center p-2 bg-blue-50 rounded">10mo A</div>
                  <div className="text-center p-2 bg-green-50 rounded">9no B</div>
                  <div className="text-center p-2 bg-blue-50 rounded">10mo A</div>
                  <div className="text-center p-2 bg-purple-50 rounded">8vo C</div>
                  <div className="text-center p-2 bg-gray-100 rounded">Libre</div>

                  <div className="font-medium">07:45-08:30</div>
                  <div className="text-center p-2 bg-green-50 rounded">9no B</div>
                  <div className="text-center p-2 bg-blue-50 rounded">10mo A</div>
                  <div className="text-center p-2 bg-purple-50 rounded">8vo C</div>
                  <div className="text-center p-2 bg-green-50 rounded">9no B</div>
                  <div className="text-center p-2 bg-purple-50 rounded">8vo C</div>

                  <div className="font-medium">08:30-09:15</div>
                  <div className="text-center p-2 bg-purple-50 rounded">8vo C</div>
                  <div className="text-center p-2 bg-purple-50 rounded">8vo C</div>
                  <div className="text-center p-2 bg-green-50 rounded">9no B</div>
                  <div className="text-center p-2 bg-blue-50 rounded">10mo A</div>
                  <div className="text-center p-2 bg-gray-100 rounded">Reunión</div>

                  <div className="font-medium">09:15-09:30</div>
                  <div className="text-center p-2 bg-gray-100 rounded col-span-5">RECREO</div>

                  <div className="font-medium">09:30-10:15</div>
                  <div className="text-center p-2 bg-gray-100 rounded">Preparación</div>
                  <div className="text-center p-2 bg-gray-100 rounded">Preparación</div>
                  <div className="text-center p-2 bg-gray-100 rounded">Preparación</div>
                  <div className="text-center p-2 bg-gray-100 rounded">Preparación</div>
                  <div className="text-center p-2 bg-gray-100 rounded">Preparación</div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="reports" className="space-y-6">
            <StudentReportsGenerator />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
