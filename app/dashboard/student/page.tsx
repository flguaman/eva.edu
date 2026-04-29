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

function StudentDashboardContent() {
  const { t } = useLanguage()
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("overview")

  // Datos simulados del estudiante
  const studentData = {
    name: "Freddy Guaman",
    grade: "10mo A",
    studentId: "2024-001",
    photo: "https://www.shutterstock.com/image-photo/multiethnic-student-smiling-confidently-standing-600nw-2687716121.jpg",
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
    if (confirm(t("student.logout.confirm"))) {
      router.push("/login")
    }
  }

  const priorityLabel = (priority: string) => {
    if (priority === "high") return t("student.priority.high")
    if (priority === "medium") return t("student.priority.medium")
    return t("student.priority.low")
  }

  return (
    <div className="min-h-screen bg-background bg-gradient-to-br from-primary/25 via-transparent to-secondary/25">
      {/* Header */}
      <header className="bg-card bg-gradient-to-r from-primary/25 via-transparent to-secondary/25 shadow-sm border-b border-primary/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-4">
              <img
                src={studentData.photo || "/placeholder.svg"}
                alt={studentData.name}
                className="w-10 h-10 rounded-full border-2 border-primary/30"
              />
              <div>
                <h1 className="text-xl font-bold text-primary">{t("student.greeting")} {studentData.name}!</h1>
                <p className="text-sm text-muted-foreground">
                  {studentData.grade} • Código: {studentData.studentId}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="h-5 w-5" />
                {studentData.notifications.length > 0 && (
                  <span className="absolute -top-1 -right-1 h-4 w-4 bg-destructive rounded-full text-xs text-destructive-foreground flex items-center justify-center">
                    {studentData.notifications.length}
                  </span>
                )}
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
                    <span>{t("student.profile")}</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Settings className="mr-2 h-4 w-4" />
                    <span>{t("student.settings")}</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <FileText className="mr-2 h-4 w-4" />
                    <span>{t("student.grades")}</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout} className="text-red-600">
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>{t("student.logout")}</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-9 bg-primary/10 border border-primary/25 shadow-sm">
            <TabsTrigger
              value="overview"
              className="data-[state=active]:bg-primary/25 data-[state=active]:text-primary data-[state=active]:shadow"
            >
              {t("student.tab.overview")}
            </TabsTrigger>
            <TabsTrigger
              value="grades"
              className="data-[state=active]:bg-primary/25 data-[state=active]:text-primary data-[state=active]:shadow"
            >
              {t("student.tab.grades")}
            </TabsTrigger>
            <TabsTrigger
              value="assignments"
              className="data-[state=active]:bg-primary/25 data-[state=active]:text-primary data-[state=active]:shadow"
            >
              {t("student.tab.assignments")}
            </TabsTrigger>
            <TabsTrigger
              value="schedule"
              className="data-[state=active]:bg-primary/25 data-[state=active]:text-primary data-[state=active]:shadow"
            >
              {t("student.tab.schedule")}
            </TabsTrigger>
            <TabsTrigger
              value="library"
              className="data-[state=active]:bg-primary/25 data-[state=active]:text-primary data-[state=active]:shadow"
            >
              {t("student.tab.library")}
            </TabsTrigger>
            <TabsTrigger
              value="analytics"
              className="data-[state=active]:bg-primary/25 data-[state=active]:text-primary data-[state=active]:shadow"
            >
              {t("student.tab.analytics")}
            </TabsTrigger>
            <TabsTrigger
              value="gamification"
              className="data-[state=active]:bg-primary/25 data-[state=active]:text-primary data-[state=active]:shadow"
            >
              {t("student.tab.gamification")}
            </TabsTrigger>
            <TabsTrigger
              value="chat"
              className="data-[state=active]:bg-primary/25 data-[state=active]:text-primary data-[state=active]:shadow"
            >
              {t("student.tab.chat")}
            </TabsTrigger>
            <TabsTrigger
              value="representative"
              className="data-[state=active]:bg-primary/25 data-[state=active]:text-primary data-[state=active]:shadow"
            >
              {t("student.tab.representative")}
            </TabsTrigger>
          </TabsList>

          {/* ── Overview / Resumen ── */}
          <TabsContent value="overview" className="space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <Card className="border-primary/20 hover:shadow-md bg-gradient-to-br from-primary/5 via-transparent to-secondary/5">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-semibold text-primary">{t("student.stat.average")}</CardTitle>
                  <TrendingUp className="h-4 w-4 text-primary" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-chart-1">{studentData.stats.overallAverage}/10</div>
                  <p className="text-xs text-primary/80">{t("student.stat.average.sub")}</p>
                </CardContent>
              </Card>
              <Card className="border-primary/20 hover:shadow-md bg-gradient-to-br from-primary/5 via-transparent to-secondary/5">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-semibold text-primary">{t("student.stat.attendance")}</CardTitle>
                  <CheckCircle className="h-4 w-4 text-primary" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-chart-2">{studentData.stats.attendance}%</div>
                  <p className="text-xs text-primary/80">{t("student.stat.attendance.sub")}</p>
                </CardContent>
              </Card>
              <Card className="border-primary/20 hover:shadow-md bg-gradient-to-br from-primary/5 via-transparent to-secondary/5">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-semibold text-primary">{t("student.stat.completed")}</CardTitle>
                  <FileText className="h-4 w-4 text-primary" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-chart-3">
                    {studentData.stats.completedAssignments}/{studentData.stats.totalAssignments}
                  </div>
                  <p className="text-xs text-primary/80">
                    {Math.round((studentData.stats.completedAssignments / studentData.stats.totalAssignments) * 100)}%{" "}
                    {t("student.stat.completed.sub")}
                  </p>
                </CardContent>
              </Card>
              <Card className="border-primary/20 hover:shadow-md bg-gradient-to-br from-primary/5 via-transparent to-secondary/5">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-semibold text-primary">{t("student.stat.ranking")}</CardTitle>
                  <Trophy className="h-4 w-4 text-primary" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-chart-4">#{studentData.stats.ranking}</div>
                  <p className="text-xs text-primary/80">
                    {t("student.stat.ranking.sub")} {studentData.stats.totalStudents}{" "}
                    {t("student.stat.ranking.sub2")}
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Recent Activity */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="border-primary/20 bg-gradient-to-br from-primary/10 via-transparent to-secondary/10">
                <CardHeader>
                  <CardTitle className="text-primary">{t("student.recent.grades")}</CardTitle>
                  <CardDescription className="text-muted-foreground">{t("student.recent.grades.desc")}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {studentData.recentGrades.map((grade, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border border-border rounded-lg hover:bg-primary/10 transition-colors">
                      <div>
                        <h4 className="font-medium">{grade.subject}</h4>
                        <p className="text-sm text-muted-foreground">{grade.date}</p>
                      </div>
                      <Badge variant={grade.grade >= 9 ? "default" : grade.grade >= 7 ? "secondary" : "destructive"}>
                        {grade.grade}/10
                      </Badge>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card className="border-primary/20 bg-gradient-to-br from-primary/10 via-transparent to-secondary/10">
                <CardHeader>
                  <CardTitle className="text-primary">{t("student.upcoming")}</CardTitle>
                  <CardDescription className="text-muted-foreground">{t("student.upcoming.desc")}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {studentData.upcomingAssignments.map((assignment, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border border-border rounded-lg hover:bg-primary/10 transition-colors">
                      <div>
                        <h4 className="font-medium">{assignment.title}</h4>
                        <p className="text-sm text-muted-foreground">{assignment.subject}</p>
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
                          {priorityLabel(assignment.priority)}
                        </Badge>
                        <p className="text-xs text-muted-foreground mt-1">{assignment.dueDate}</p>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>

            {/* Today's Schedule */}
            <Card className="border-primary/20 bg-gradient-to-br from-primary/10 via-transparent to-secondary/10">
              <CardHeader>
                <CardTitle className="text-primary">{t("student.today")}</CardTitle>
                <CardDescription className="text-muted-foreground">{t("student.today.desc")}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {studentData.schedule.map((class_, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border border-border rounded-lg hover:bg-primary/10 transition-colors">
                      <div className="flex items-center space-x-4">
                        <div className="text-center">
                          <p className="text-sm font-medium">{class_.time}</p>
                        </div>
                        <div>
                          <h4 className="font-medium">{class_.subject}</h4>
                          <p className="text-sm text-muted-foreground">{class_.teacher}</p>
                        </div>
                      </div>
                      <Badge variant="outline">{class_.room}</Badge>
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
                <CardTitle className="text-primary">{t("grades.title")}</CardTitle>
                <CardDescription>{t("grades.desc")}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse border border-border">
                    <thead>
                      <tr className="bg-primary/10">
                        <th className="border border-border p-2 text-left text-sm font-semibold text-primary">{t("grades.col.subject")}</th>
                        <th className="border border-border p-2 text-center text-sm font-semibold text-primary">{t("grades.col.partial1")}</th>
                        <th className="border border-border p-2 text-center text-sm font-semibold text-primary">{t("grades.col.partial2")}</th>
                        <th className="border border-border p-2 text-center text-sm font-semibold text-primary">{t("grades.col.assignments")}</th>
                        <th className="border border-border p-2 text-center text-sm font-semibold text-primary">{t("grades.col.average")}</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="hover:bg-primary/10 transition-colors">
                        <td className="border border-border p-2">{t("grades.subject.math")}</td>
                        <td className="border border-border p-2 text-center">9.2</td>
                        <td className="border border-border p-2 text-center">8.8</td>
                        <td className="border border-border p-2 text-center">9.5</td>
                        <td className="border border-border p-2 text-center font-medium">9.2</td>
                      </tr>
                      <tr className="hover:bg-primary/10 transition-colors">
                        <td className="border border-border p-2">{t("grades.subject.science")}</td>
                        <td className="border border-border p-2 text-center">8.5</td>
                        <td className="border border-border p-2 text-center">9.0</td>
                        <td className="border border-border p-2 text-center">8.8</td>
                        <td className="border border-border p-2 text-center font-medium">8.8</td>
                      </tr>
                      <tr className="hover:bg-primary/10 transition-colors">
                        <td className="border border-border p-2">{t("grades.subject.language")}</td>
                        <td className="border border-border p-2 text-center">8.0</td>
                        <td className="border border-border p-2 text-center">8.2</td>
                        <td className="border border-border p-2 text-center">8.1</td>
                        <td className="border border-border p-2 text-center font-medium">8.1</td>
                      </tr>
                      <tr className="hover:bg-primary/10 transition-colors">
                        <td className="border border-border p-2">{t("grades.subject.history")}</td>
                        <td className="border border-border p-2 text-center">9.0</td>
                        <td className="border border-border p-2 text-center">8.8</td>
                        <td className="border border-border p-2 text-center">8.9</td>
                        <td className="border border-border p-2 text-center font-medium">8.9</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>


          {/* ── Assignments ── */}
          <TabsContent value="assignments" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <AlertCircle className="h-5 w-5 mr-2 text-destructive" />
                    Tareas Pendientes
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {studentData.upcomingAssignments.map((assignment, index) => (
                    <div key={index} className="p-3 border rounded-lg border-destructive/30">
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
                          {priorityLabel(assignment.priority)}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">{assignment.subject}</p>
                      <p className="text-xs text-muted-foreground mt-2">Vence: {assignment.dueDate}</p>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <CheckCircle className="h-5 w-5 mr-2 text-chart-2" />
                    Tareas Completadas
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="p-3 border rounded-lg border-primary/20">
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium">Ejercicios de Álgebra</h4>
                      <Badge variant="default">9.5/10</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">Matemáticas</p>
                    <p className="text-xs text-muted-foreground mt-2">Entregado: 2024-01-20</p>
                  </div>
                  <div className="p-3 border rounded-lg border-primary/20">
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium">Ensayo sobre Células</h4>
                      <Badge variant="default">8.8/10</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">Ciencias</p>
                    <p className="text-xs text-muted-foreground mt-2">Entregado: 2024-01-18</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* ── Schedule ── */}
          <TabsContent value="schedule" className="space-y-6">
            <InteractiveCalendar />
          </TabsContent>

          {/* ── Library ── */}
          <TabsContent value="library" className="space-y-6">
            <DigitalLibrary />
          </TabsContent>

          {/* ── Analytics ── */}
          <TabsContent value="analytics" className="space-y-6">
            <AdvancedAnalytics />
          </TabsContent>

          {/* ── Gamification ── */}
          <TabsContent value="gamification" className="space-y-6">
            <GamificationSystem />
          </TabsContent>

          {/* ── Chat ── */}
          <TabsContent value="chat" className="space-y-6">
            <RealTimeChat />
          </TabsContent>

          {/* ── Representative ── */}
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

export default function StudentDashboard() {
  return (
    <LanguageProvider>
      <StudentDashboardContent />
    </LanguageProvider>
  )
}
