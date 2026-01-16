"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  BarChart3,
  TrendingUp,
  TrendingDown,
  Users,
  Award,
  Clock,
  Target,
  Brain,
  Zap,
  AlertTriangle,
  CheckCircle,
  Download,
} from "lucide-react"

interface AnalyticsData {
  period: string
  academicPerformance: {
    averageGrade: number
    improvement: number
    topSubjects: string[]
    strugglingSubjects: string[]
  }
  studyHabits: {
    dailyStudyTime: number
    weeklyGoalCompletion: number
    mostActiveHours: string[]
    streakDays: number
  }
  engagement: {
    classAttendance: number
    assignmentCompletion: number
    forumParticipation: number
    resourceUsage: number
  }
  predictions: {
    nextExamPrediction: number
    riskLevel: "low" | "medium" | "high"
    recommendations: string[]
  }
}

export function AdvancedAnalytics() {
  const [selectedPeriod, setSelectedPeriod] = useState("month")
  const [selectedSubject, setSelectedSubject] = useState("all")

  const [analyticsData] = useState<AnalyticsData>({
    period: "Último mes",
    academicPerformance: {
      averageGrade: 8.7,
      improvement: 0.3,
      topSubjects: ["Matemáticas", "Ciencias", "Inglés"],
      strugglingSubjects: ["Historia", "Literatura"],
    },
    studyHabits: {
      dailyStudyTime: 2.5,
      weeklyGoalCompletion: 85,
      mostActiveHours: ["19:00-21:00", "15:00-17:00"],
      streakDays: 12,
    },
    engagement: {
      classAttendance: 95,
      assignmentCompletion: 88,
      forumParticipation: 65,
      resourceUsage: 78,
    },
    predictions: {
      nextExamPrediction: 8.9,
      riskLevel: "low",
      recommendations: [
        "Dedica más tiempo a Historia para mejorar tu promedio",
        "Mantén tu excelente racha de estudio",
        "Participa más en los foros de discusión",
      ],
    },
  })

  const [subjectPerformance] = useState([
    { subject: "Matemáticas", current: 9.2, previous: 8.8, trend: "up", color: "from-blue-500 to-blue-600" },
    { subject: "Ciencias", current: 8.9, previous: 8.5, trend: "up", color: "from-green-500 to-green-600" },
    { subject: "Inglés", current: 8.5, previous: 8.3, trend: "up", color: "from-purple-500 to-purple-600" },
    { subject: "Literatura", current: 7.8, previous: 8.1, trend: "down", color: "from-orange-500 to-orange-600" },
    { subject: "Historia", current: 7.5, previous: 7.2, trend: "up", color: "from-red-500 to-red-600" },
    { subject: "Geografía", current: 8.2, previous: 8.0, trend: "up", color: "from-indigo-500 to-indigo-600" },
  ])

  const [weeklyActivity] = useState([
    { day: "Lun", hours: 3.2, assignments: 2, participation: 85 },
    { day: "Mar", hours: 2.8, assignments: 1, participation: 70 },
    { day: "Mié", hours: 3.5, assignments: 3, participation: 90 },
    { day: "Jue", hours: 2.1, assignments: 1, participation: 60 },
    { day: "Vie", hours: 2.9, assignments: 2, participation: 80 },
    { day: "Sáb", hours: 1.5, assignments: 0, participation: 40 },
    { day: "Dom", hours: 2.0, assignments: 1, participation: 50 },
  ])

  const getRiskColor = (level: string) => {
    switch (level) {
      case "low":
        return "text-green-600 bg-green-100"
      case "medium":
        return "text-yellow-600 bg-yellow-100"
      case "high":
        return "text-red-600 bg-red-100"
      default:
        return "text-gray-600 bg-gray-100"
    }
  }

  const getRiskIcon = (level: string) => {
    switch (level) {
      case "low":
        return <CheckCircle className="h-4 w-4" />
      case "medium":
        return <AlertTriangle className="h-4 w-4" />
      case "high":
        return <AlertTriangle className="h-4 w-4" />
      default:
        return <CheckCircle className="h-4 w-4" />
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="modern-shadow border-0 glass-effect">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center space-x-2">
              <Brain className="h-6 w-6 text-primary" />
              <span>Analytics Académico Inteligente</span>
            </CardTitle>
            <div className="flex items-center space-x-2">
              <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="week">Última semana</SelectItem>
                  <SelectItem value="month">Último mes</SelectItem>
                  <SelectItem value="quarter">Último trimestre</SelectItem>
                  <SelectItem value="year">Último año</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline">
                <Download className="h-4 w-4 mr-2" />
                Exportar
              </Button>
            </div>
          </div>
        </CardHeader>
      </Card>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-5 glass-effect">
          <TabsTrigger value="overview">Resumen</TabsTrigger>
          <TabsTrigger value="performance">Rendimiento</TabsTrigger>
          <TabsTrigger value="habits">Hábitos</TabsTrigger>
          <TabsTrigger value="predictions">Predicciones</TabsTrigger>
          <TabsTrigger value="insights">Insights</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card className="hover-lift modern-shadow border-0 glass-effect">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Promedio General</CardTitle>
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center">
                  <Award className="h-4 w-4 text-white" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-green-600">
                  {analyticsData.academicPerformance.averageGrade}
                </div>
                <div className="flex items-center text-xs text-muted-foreground mt-1">
                  <TrendingUp className="h-3 w-3 mr-1 text-green-500" />+{analyticsData.academicPerformance.improvement}{" "}
                  desde el mes pasado
                </div>
              </CardContent>
            </Card>

            <Card className="hover-lift modern-shadow border-0 glass-effect">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Tiempo de Estudio</CardTitle>
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center">
                  <Clock className="h-4 w-4 text-white" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-blue-600">{analyticsData.studyHabits.dailyStudyTime}h</div>
                <p className="text-xs text-muted-foreground mt-1">Promedio diario</p>
              </CardContent>
            </Card>

            <Card className="hover-lift modern-shadow border-0 glass-effect">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Asistencia</CardTitle>
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center">
                  <Users className="h-4 w-4 text-white" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-purple-600">{analyticsData.engagement.classAttendance}%</div>
                <p className="text-xs text-muted-foreground mt-1">Excelente asistencia</p>
              </CardContent>
            </Card>

            <Card className="hover-lift modern-shadow border-0 glass-effect">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Racha de Estudio</CardTitle>
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center">
                  <Zap className="h-4 w-4 text-white" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-orange-600">{analyticsData.studyHabits.streakDays}</div>
                <p className="text-xs text-muted-foreground mt-1">días consecutivos</p>
              </CardContent>
            </Card>
          </div>

          {/* Performance Overview */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="hover-lift modern-shadow border-0 glass-effect">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <BarChart3 className="h-5 w-5 text-primary" />
                  <span>Rendimiento por Materia</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {subjectPerformance.map((subject) => (
                  <div key={subject.subject} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-medium text-sm">{subject.subject}</span>
                      <div className="flex items-center space-x-2">
                        <Badge variant="outline">{subject.current}/10</Badge>
                        {subject.trend === "up" ? (
                          <TrendingUp className="h-4 w-4 text-green-500" />
                        ) : (
                          <TrendingDown className="h-4 w-4 text-red-500" />
                        )}
                      </div>
                    </div>
                    <Progress value={subject.current * 10} className="h-2" />
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card className="hover-lift modern-shadow border-0 glass-effect">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Target className="h-5 w-5 text-primary" />
                  <span>Actividad Semanal</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {weeklyActivity.map((day) => (
                    <div key={day.day} className="flex items-center justify-between p-3 rounded-lg bg-secondary/30">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-medium text-sm">
                          {day.day}
                        </div>
                        <div>
                          <div className="text-sm font-medium">{day.hours}h estudio</div>
                          <div className="text-xs text-muted-foreground">
                            {day.assignments} tareas • {day.participation}% participación
                          </div>
                        </div>
                      </div>
                      <div className="w-16">
                        <Progress value={day.participation} className="h-2" />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="performance" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="lg:col-span-2 hover-lift modern-shadow border-0 glass-effect">
              <CardHeader>
                <CardTitle>Evolución del Rendimiento</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64 flex items-center justify-center bg-gradient-to-br from-primary/5 to-primary/10 rounded-lg">
                  <div className="text-center">
                    <BarChart3 className="h-16 w-16 text-primary/50 mx-auto mb-4" />
                    <p className="text-muted-foreground">Gráfico de evolución del rendimiento</p>
                    <p className="text-sm text-muted-foreground">Mostrando tendencias de los últimos 6 meses</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="space-y-6">
              <Card className="hover-lift modern-shadow border-0 glass-effect">
                <CardHeader>
                  <CardTitle className="text-lg">Materias Destacadas</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {analyticsData.academicPerformance.topSubjects.map((subject, index) => (
                    <div key={subject} className="flex items-center space-x-3">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center text-white font-bold text-sm">
                        {index + 1}
                      </div>
                      <span className="font-medium">{subject}</span>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card className="hover-lift modern-shadow border-0 glass-effect">
                <CardHeader>
                  <CardTitle className="text-lg">Áreas de Mejora</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {analyticsData.academicPerformance.strugglingSubjects.map((subject) => (
                    <div key={subject} className="flex items-center justify-between p-2 rounded-lg bg-orange-50">
                      <span className="font-medium">{subject}</span>
                      <Badge variant="outline" className="text-orange-600">
                        Necesita atención
                      </Badge>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="habits" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="hover-lift modern-shadow border-0 glass-effect">
              <CardHeader>
                <CardTitle>Hábitos de Estudio</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm font-medium">Cumplimiento de Metas Semanales</span>
                    <span className="text-sm text-muted-foreground">
                      {analyticsData.studyHabits.weeklyGoalCompletion}%
                    </span>
                  </div>
                  <Progress value={analyticsData.studyHabits.weeklyGoalCompletion} className="h-3" />
                </div>

                <div className="space-y-3">
                  <h4 className="font-medium">Horarios Más Activos</h4>
                  {analyticsData.studyHabits.mostActiveHours.map((hour) => (
                    <div key={hour} className="flex items-center space-x-3 p-2 rounded-lg bg-secondary/30">
                      <Clock className="h-4 w-4 text-primary" />
                      <span className="text-sm">{hour}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="hover-lift modern-shadow border-0 glass-effect">
              <CardHeader>
                <CardTitle>Nivel de Compromiso</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Finalización de Tareas</span>
                    <Badge variant="secondary">{analyticsData.engagement.assignmentCompletion}%</Badge>
                  </div>
                  <Progress value={analyticsData.engagement.assignmentCompletion} />
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Participación en Foros</span>
                    <Badge variant="secondary">{analyticsData.engagement.forumParticipation}%</Badge>
                  </div>
                  <Progress value={analyticsData.engagement.forumParticipation} />
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Uso de Recursos</span>
                    <Badge variant="secondary">{analyticsData.engagement.resourceUsage}%</Badge>
                  </div>
                  <Progress value={analyticsData.engagement.resourceUsage} />
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="predictions" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="hover-lift modern-shadow border-0 glass-effect">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Brain className="h-5 w-5 text-primary" />
                  <span>Predicciones IA</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="text-center p-6 rounded-lg bg-gradient-to-br from-primary/5 to-primary/10">
                  <div className="text-4xl font-bold text-primary mb-2">
                    {analyticsData.predictions.nextExamPrediction}
                  </div>
                  <p className="text-muted-foreground">Predicción próximo examen</p>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-medium">Nivel de Riesgo</span>
                    <Badge className={getRiskColor(analyticsData.predictions.riskLevel)}>
                      <div className="flex items-center space-x-1">
                        {getRiskIcon(analyticsData.predictions.riskLevel)}
                        <span className="capitalize">{analyticsData.predictions.riskLevel}</span>
                      </div>
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="hover-lift modern-shadow border-0 glass-effect">
              <CardHeader>
                <CardTitle>Recomendaciones Personalizadas</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {analyticsData.predictions.recommendations.map((recommendation, index) => (
                    <div key={index} className="flex items-start space-x-3 p-3 rounded-lg bg-secondary/30">
                      <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-primary text-xs font-bold">{index + 1}</span>
                      </div>
                      <p className="text-sm">{recommendation}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="insights" className="space-y-6">
          <Card className="hover-lift modern-shadow border-0 glass-effect">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Zap className="h-5 w-5 text-primary" />
                <span>Insights Inteligentes</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="p-4 rounded-lg bg-blue-50 border border-blue-200">
                  <div className="flex items-center space-x-2 mb-3">
                    <TrendingUp className="h-5 w-5 text-blue-600" />
                    <h4 className="font-medium text-blue-900">Tendencia Positiva</h4>
                  </div>
                  <p className="text-sm text-blue-700">
                    Tu rendimiento en Matemáticas ha mejorado un 15% en las últimas 4 semanas.
                  </p>
                </div>

                <div className="p-4 rounded-lg bg-green-50 border border-green-200">
                  <div className="flex items-center space-x-2 mb-3">
                    <Target className="h-5 w-5 text-green-600" />
                    <h4 className="font-medium text-green-900">Meta Alcanzada</h4>
                  </div>
                  <p className="text-sm text-green-700">
                    ¡Felicidades! Has superado tu meta de estudio semanal por 3 semanas consecutivas.
                  </p>
                </div>

                <div className="p-4 rounded-lg bg-orange-50 border border-orange-200">
                  <div className="flex items-center space-x-2 mb-3">
                    <AlertTriangle className="h-5 w-5 text-orange-600" />
                    <h4 className="font-medium text-orange-900">Área de Atención</h4>
                  </div>
                  <p className="text-sm text-orange-700">
                    Tu participación en foros ha disminuido. Considera participar más activamente.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
