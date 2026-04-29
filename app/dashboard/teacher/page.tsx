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
import { InteractiveCalendar } from "@/components/interactive-calendar"
import { ThemeSelector } from "@/components/theme-selector"
import { LanguageToggle } from "@/components/language-toggle"
import { LanguageProvider, useLanguage } from "@/contexts/language-context"
import { useRouter } from "next/navigation"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

function TeacherDashboardContent() {
  const { t } = useLanguage()
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
    if (confirm(t("teacher.logout.confirm"))) {
      router.push("/login")
    }
  }

  return (
    <div className="min-h-screen bg-background bg-gradient-to-br from-primary/25 via-transparent to-secondary/25">
      {/* Header */}
      <header className="bg-card bg-gradient-to-r from-primary/25 via-transparent to-secondary/25 shadow-sm border-b border-primary/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-4">
              <img
                src="https://img.freepik.com/foto-gratis/seguro-maestro-mediana-edad-sienta-mesa-utiles-escolares-sosteniendo-libro-aula_141793-119837.jpg?semt=ais_hybrid&w=740&q=80"
                alt="Prof. Roberto García"
                className="w-10 h-10 rounded-full border-2 border-primary/30 object-cover"
              />
              <div>
                <h1 className="text-xl font-bold text-foreground">{t("teacher.panel")}</h1>
                <p className="text-sm text-muted-foreground">{t("teacher.subtitle")}</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="icon">
                <Bell className="h-5 w-5" />
              </Button>

              {/* Language Toggle */}
              <LanguageToggle />

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
                    <span>{t("teacher.profile")}</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <FileText className="mr-2 h-4 w-4" />
                    <span>{t("teacher.reports")}</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Calendar className="mr-2 h-4 w-4" />
                    <span>{t("teacher.schedule")}</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout} className="text-red-600">
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>{t("teacher.logout")}</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-7 bg-primary/10 border border-primary/25 shadow-sm">
            <TabsTrigger
              value="overview"
              className="data-[state=active]:bg-primary/25 data-[state=active]:text-primary data-[state=active]:shadow"
            >
              {t("teacher.tab.overview")}
            </TabsTrigger>
            <TabsTrigger
              value="classes"
              className="data-[state=active]:bg-primary/25 data-[state=active]:text-primary data-[state=active]:shadow"
            >
              {t("teacher.tab.classes")}
            </TabsTrigger>
            <TabsTrigger
              value="assignments"
              className="data-[state=active]:bg-primary/25 data-[state=active]:text-primary data-[state=active]:shadow"
            >
              {t("teacher.tab.assignments")}
            </TabsTrigger>
            <TabsTrigger
              value="grades"
              className="data-[state=active]:bg-primary/25 data-[state=active]:text-primary data-[state=active]:shadow"
            >
              {t("teacher.tab.grades")}
            </TabsTrigger>
            <TabsTrigger
              value="resources"
              className="data-[state=active]:bg-primary/25 data-[state=active]:text-primary data-[state=active]:shadow"
            >
              {t("teacher.tab.resources")}
            </TabsTrigger>
            <TabsTrigger
              value="schedule"
              className="data-[state=active]:bg-primary/25 data-[state=active]:text-primary data-[state=active]:shadow"
            >
              {t("teacher.tab.schedule")}
            </TabsTrigger>
            <TabsTrigger
              value="reports"
              className="data-[state=active]:bg-primary/25 data-[state=active]:text-primary data-[state=active]:shadow"
            >
              {t("teacher.tab.reports")}
            </TabsTrigger>
          </TabsList>

          {/* ── Overview ── */}
          <TabsContent value="overview" className="space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">{t("teacher.stat.students")}</CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-primary">83</div>
                  <p className="text-xs text-muted-foreground">{t("teacher.stat.students.sub")}</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">{t("teacher.stat.pending")}</CardTitle>
                  <FileText className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-secondary">12</div>
                  <p className="text-xs text-muted-foreground">{t("teacher.stat.pending.sub")}</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">{t("teacher.stat.average")}</CardTitle>
                  <BookOpen className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-accent">8.4</div>
                  <p className="text-xs text-muted-foreground">{t("teacher.stat.average.sub")}</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">{t("teacher.stat.next")}</CardTitle>
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-primary">10mo A</div>
                  <p className="text-xs text-muted-foreground">{t("teacher.stat.next.sub")}</p>
                </CardContent>
              </Card>
            </div>

            {/* Recent Activity */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>{t("teacher.recent.assignments")}</CardTitle>
                  <CardDescription>{t("teacher.recent.assignments.desc")}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {assignments.map((assignment) => (
                    <div key={assignment.id} className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <h4 className="font-medium">{assignment.title}</h4>
                        <p className="text-sm text-muted-foreground">{assignment.class}</p>
                      </div>
                      <div className="text-right">
                        <Badge variant="secondary">
                          {assignment.submitted}/{assignment.total}
                        </Badge>
                        <p className="text-xs text-muted-foreground mt-1">{t("teacher.due")} {assignment.dueDate}</p>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>{t("teacher.recent.grades")}</CardTitle>
                  <CardDescription>{t("teacher.recent.grades.desc")}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {recentGrades.map((grade, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <h4 className="font-medium">{grade.student}</h4>
                        <p className="text-sm text-muted-foreground">
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

          {/* ── Classes ── */}
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

          {/* ── Assignments ── */}
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
                    <div key={assignment.id} className="flex items-center justify-between p-4 border border-border rounded-lg bg-card">
                      <div>
                        <h4 className="font-medium">{assignment.title}</h4>
                        <p className="text-sm text-muted-foreground">{assignment.class}</p>
                        <p className="text-xs text-muted-foreground">Vence: {assignment.dueDate}</p>
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

          {/* ── Grades ── */}
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
                    <table className="w-full border-collapse border border-border">
                      <thead>
                        <tr className="bg-muted">
                          <th className="border border-border p-2 text-left text-muted-foreground">Estudiante</th>
                          <th className="border border-border p-2 text-center text-muted-foreground">Parcial 1</th>
                          <th className="border border-border p-2 text-center text-muted-foreground">Parcial 2</th>
                          <th className="border border-border p-2 text-center text-muted-foreground">Tareas</th>
                          <th className="border border-border p-2 text-center text-muted-foreground">Promedio</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td className="border border-border p-2">María González</td>
                          <td className="border border-border p-2 text-center">8.5</td>
                          <td className="border border-border p-2 text-center">9.0</td>
                          <td className="border border-border p-2 text-center">8.8</td>
                          <td className="border border-border p-2 text-center font-medium">8.8</td>
                        </tr>
                        <tr>
                          <td className="border border-border p-2">Carlos Pérez</td>
                          <td className="border border-border p-2 text-center">7.5</td>
                          <td className="border border-border p-2 text-center">8.2</td>
                          <td className="border border-border p-2 text-center">9.0</td>
                          <td className="border border-border p-2 text-center font-medium">8.2</td>
                        </tr>
                        <tr>
                          <td className="border border-border p-2">Ana Rodríguez</td>
                          <td className="border border-border p-2 text-center">9.2</td>
                          <td className="border border-border p-2 text-center">8.8</td>
                          <td className="border border-border p-2 text-center">9.5</td>
                          <td className="border border-border p-2 text-center font-medium">9.2</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* ── Resources ── */}
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

          {/* ── Schedule ── */}
          <TabsContent value="schedule" className="space-y-6">
            <InteractiveCalendar />
          </TabsContent>

          {/* ── Reports ── */}
          <TabsContent value="reports" className="space-y-6">
            <StudentReportsGenerator />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

export default function TeacherDashboard() {
  return (
    <LanguageProvider>
      <TeacherDashboardContent />
    </LanguageProvider>
  )
}
