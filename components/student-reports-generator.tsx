"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  FileText,
  Download,
  Eye,
  Settings,
  Users,
  Calendar,
  BookOpen,
  TrendingUp,
  Award,
  Clock,
  CheckCircle,
} from "lucide-react"

interface ReportSection {
  id: string
  name: string
  description: string
  enabled: boolean
}

interface Student {
  id: string
  name: string
  grade: string
  average: number
}

export function StudentReportsGenerator() {
  const [selectedStudents, setSelectedStudents] = useState<string[]>([])
  const [reportType, setReportType] = useState("")
  const [template, setTemplate] = useState("")
  const [isGenerating, setIsGenerating] = useState(false)
  const [generationProgress, setGenerationProgress] = useState(0)
  const [generationStep, setGenerationStep] = useState("")

  const [reportSections, setReportSections] = useState<ReportSection[]>([
    {
      id: "academic",
      name: "Rendimiento Académico",
      description: "Calificaciones y promedios por materia",
      enabled: true,
    },
    { id: "attendance", name: "Asistencia", description: "Registro de asistencia y puntualidad", enabled: true },
    { id: "behavior", name: "Conducta", description: "Evaluación de comportamiento y disciplina", enabled: false },
    {
      id: "assignments",
      name: "Tareas y Proyectos",
      description: "Estado de entregas y calidad del trabajo",
      enabled: true,
    },
    { id: "participation", name: "Participación", description: "Nivel de participación en clase", enabled: false },
    { id: "recommendations", name: "Recomendaciones", description: "Sugerencias para mejora", enabled: true },
  ])

  const students: Student[] = [
    { id: "1", name: "María González", grade: "10mo A", average: 8.5 },
    { id: "2", name: "Carlos Pérez", grade: "10mo A", average: 9.2 },
    { id: "3", name: "Ana Rodríguez", grade: "9no B", average: 7.8 },
    { id: "4", name: "Luis Martínez", grade: "10mo A", average: 8.9 },
    { id: "5", name: "Sofia López", grade: "9no B", average: 9.5 },
    { id: "6", name: "Diego Herrera", grade: "8vo C", average: 7.2 },
  ]

  const templates = [
    { id: "standard", name: "Reporte Estándar", description: "Formato tradicional con todas las secciones" },
    { id: "summary", name: "Resumen Ejecutivo", description: "Versión condensada con puntos clave" },
    { id: "detailed", name: "Reporte Detallado", description: "Análisis completo con gráficos y estadísticas" },
    { id: "parent", name: "Reporte para Padres", description: "Formato amigable para familias" },
    { id: "administrative", name: "Reporte Administrativo", description: "Para uso interno de la institución" },
  ]

  const handleSectionToggle = (sectionId: string) => {
    setReportSections((prev) =>
      prev.map((section) => (section.id === sectionId ? { ...section, enabled: !section.enabled } : section)),
    )
  }

  const handleStudentToggle = (studentId: string) => {
    setSelectedStudents((prev) =>
      prev.includes(studentId) ? prev.filter((id) => id !== studentId) : [...prev, studentId],
    )
  }

  const generatePDFContent = (students: Student[], sections: ReportSection[]) => {
    const enabledSections = sections.filter((s) => s.enabled)
    const selectedStudentData = students.filter((s) => selectedStudents.includes(s.id))

    let content = `REPORTE ACADÉMICO INTEGRAL
Colegio EVA Ecuador
Fecha de generación: ${new Date().toLocaleDateString("es-ES")}
Profesor: Roberto García - Matemáticas

===========================================

RESUMEN EJECUTIVO
===========================================
Total de estudiantes evaluados: ${selectedStudentData.length}
Promedio general del grupo: ${(selectedStudentData.reduce((sum, s) => sum + s.average, 0) / selectedStudentData.length).toFixed(2)}
Secciones incluidas: ${enabledSections.map((s) => s.name).join(", ")}

===========================================

ESTUDIANTES EVALUADOS
===========================================
`

    selectedStudentData.forEach((student, index) => {
      content += `
${index + 1}. ${student.name}
   Curso: ${student.grade}
   Promedio General: ${student.average}/10
   
`

      if (enabledSections.find((s) => s.id === "academic")) {
        content += `   RENDIMIENTO ACADÉMICO:
   - Matemáticas: ${(student.average + Math.random() * 0.5 - 0.25).toFixed(1)}/10
   - Ciencias: ${(student.average + Math.random() * 0.5 - 0.25).toFixed(1)}/10
   - Lenguaje: ${(student.average + Math.random() * 0.5 - 0.25).toFixed(1)}/10
   - Historia: ${(student.average + Math.random() * 0.5 - 0.25).toFixed(1)}/10
   
`
      }

      if (enabledSections.find((s) => s.id === "attendance")) {
        const attendance = Math.floor(Math.random() * 10 + 90)
        content += `   ASISTENCIA:
   - Porcentaje de asistencia: ${attendance}%
   - Días ausente: ${Math.floor((100 - attendance) * 0.2)}
   - Tardanzas: ${Math.floor(Math.random() * 3)}
   
`
      }

      if (enabledSections.find((s) => s.id === "behavior")) {
        content += `   CONDUCTA:
   - Comportamiento en clase: Excelente
   - Respeto hacia compañeros: Muy bueno
   - Cumplimiento de normas: Bueno
   
`
      }

      if (enabledSections.find((s) => s.id === "assignments")) {
        const completion = Math.floor(Math.random() * 20 + 80)
        content += `   TAREAS Y PROYECTOS:
   - Porcentaje de entrega: ${completion}%
   - Calidad del trabajo: ${completion > 90 ? "Excelente" : completion > 80 ? "Muy bueno" : "Bueno"}
   - Puntualidad en entregas: ${completion > 85 ? "Siempre puntual" : "Ocasionalmente tarde"}
   
`
      }

      if (enabledSections.find((s) => s.id === "participation")) {
        content += `   PARTICIPACIÓN:
   - Participación en clase: Activa
   - Trabajo en equipo: Colaborativo
   - Iniciativa propia: Demuestra interés
   
`
      }

      if (enabledSections.find((s) => s.id === "recommendations")) {
        content += `   RECOMENDACIONES:
   - Continuar con el excelente trabajo académico
   - Fomentar la participación en actividades extracurriculares
   - Mantener la comunicación constante con los padres
   
`
      }

      content += `===========================================
`
    })

    content += `
OBSERVACIONES GENERALES DEL PROFESOR
===========================================
El grupo evaluado muestra un rendimiento académico satisfactorio con oportunidades 
de mejora en áreas específicas. Se recomienda mantener el seguimiento continuo 
y la comunicación activa con las familias para optimizar el proceso de aprendizaje.

PRÓXIMOS PASOS
===========================================
1. Reunión con padres de familia programada para la próxima semana
2. Implementación de estrategias de refuerzo académico
3. Seguimiento individualizado de estudiantes con necesidades específicas

===========================================
Reporte generado automáticamente por EVA Ecuador
Sistema de Gestión Educativa Integral
© 2024 - Todos los derechos reservados
`

    return content
  }

  const simulateReportGeneration = async () => {
    if (selectedStudents.length === 0) {
      alert("Por favor selecciona al menos un estudiante")
      return
    }

    if (!reportType) {
      alert("Por favor selecciona un tipo de reporte")
      return
    }

    setIsGenerating(true)
    setGenerationProgress(0)

    const steps = [
      { progress: 20, message: "Recopilando información de estudiantes..." },
      { progress: 40, message: "Procesando datos académicos..." },
      { progress: 60, message: "Generando gráficos y estadísticas..." },
      { progress: 80, message: "Aplicando formato y diseño..." },
      { progress: 100, message: "Finalizando documento PDF..." },
    ]

    for (const step of steps) {
      setGenerationStep(step.message)
      setGenerationProgress(step.progress)
      await new Promise((resolve) => setTimeout(resolve, 1500))
    }

    // Generar contenido del PDF
    const selectedStudentData = students.filter((s) => selectedStudents.includes(s.id))
    const pdfContent = generatePDFContent(selectedStudentData, reportSections)

    // Simular descarga del PDF
    const blob = new Blob([pdfContent], { type: "text/plain" })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `Reporte_Academico_${new Date().toISOString().split("T")[0]}.txt`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    window.URL.revokeObjectURL(url)

    setIsGenerating(false)
    setGenerationProgress(0)
    setGenerationStep("")
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Generador de Reportes Estudiantiles</h2>
          <p className="text-gray-600">Crea reportes detallados y personalizados para estudiantes</p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline">
            <Eye className="h-4 w-4 mr-2" />
            Vista Previa
          </Button>
          <Button onClick={simulateReportGeneration} disabled={isGenerating}>
            <Download className="h-4 w-4 mr-2" />
            {isGenerating ? "Generando..." : "Generar PDF"}
          </Button>
        </div>
      </div>

      {isGenerating && (
        <Card>
          <CardContent className="p-6">
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <FileText className="h-5 w-5 text-blue-600 animate-pulse" />
                <span className="font-medium">Generando reporte PDF...</span>
              </div>
              <Progress value={generationProgress} className="w-full" />
              <p className="text-sm text-gray-600">{generationStep}</p>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Configuración del Reporte */}
        <div className="lg:col-span-2 space-y-6">
          {/* Tipo de Reporte */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Settings className="h-5 w-5 mr-2" />
                Configuración del Reporte
              </CardTitle>
              <CardDescription>Selecciona el tipo de reporte y personaliza las opciones</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="reportType">Tipo de Reporte</Label>
                  <Select value={reportType} onValueChange={setReportType}>
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccionar tipo" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="individual">Reporte Individual</SelectItem>
                      <SelectItem value="group">Reporte Grupal</SelectItem>
                      <SelectItem value="comparative">Reporte Comparativo</SelectItem>
                      <SelectItem value="progress">Reporte de Progreso</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="template">Plantilla</Label>
                  <Select value={template} onValueChange={setTemplate}>
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccionar plantilla" />
                    </SelectTrigger>
                    <SelectContent>
                      {templates.map((tmpl) => (
                        <SelectItem key={tmpl.id} value={tmpl.id}>
                          {tmpl.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="period">Período Académico</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccionar período" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="q1">Primer Quimestre 2024</SelectItem>
                    <SelectItem value="q2">Segundo Quimestre 2024</SelectItem>
                    <SelectItem value="full">Año Completo 2024</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="comments">Comentarios Adicionales</Label>
                <Textarea
                  id="comments"
                  placeholder="Agrega comentarios o observaciones especiales para incluir en el reporte..."
                  rows={3}
                />
              </div>
            </CardContent>
          </Card>

          {/* Secciones del Reporte */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <FileText className="h-5 w-5 mr-2" />
                Secciones del Reporte
              </CardTitle>
              <CardDescription>Selecciona qué información incluir en el reporte</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {reportSections.map((section) => (
                  <div key={section.id} className="flex items-start space-x-3 p-3 border rounded-lg">
                    <Checkbox
                      id={section.id}
                      checked={section.enabled}
                      onCheckedChange={() => handleSectionToggle(section.id)}
                    />
                    <div className="flex-1">
                      <Label htmlFor={section.id} className="font-medium cursor-pointer">
                        {section.name}
                      </Label>
                      <p className="text-sm text-gray-600 mt-1">{section.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Selección de Estudiantes */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Users className="h-5 w-5 mr-2" />
                Selección de Estudiantes
              </CardTitle>
              <CardDescription>Elige los estudiantes para incluir en el reporte</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">
                    {selectedStudents.length} de {students.length} estudiantes seleccionados
                  </span>
                  <div className="space-x-2">
                    <Button size="sm" variant="outline" onClick={() => setSelectedStudents(students.map((s) => s.id))}>
                      Seleccionar Todos
                    </Button>
                    <Button size="sm" variant="outline" onClick={() => setSelectedStudents([])}>
                      Limpiar
                    </Button>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {students.map((student) => (
                    <div
                      key={student.id}
                      className={`flex items-center justify-between p-3 border rounded-lg cursor-pointer transition-colors ${
                        selectedStudents.includes(student.id) ? "border-blue-500 bg-blue-50" : "hover:bg-gray-50"
                      }`}
                      onClick={() => handleStudentToggle(student.id)}
                    >
                      <div className="flex items-center space-x-3">
                        <Checkbox
                          checked={selectedStudents.includes(student.id)}
                          onChange={() => handleStudentToggle(student.id)}
                        />
                        <div>
                          <p className="font-medium">{student.name}</p>
                          <p className="text-sm text-gray-600">{student.grade}</p>
                        </div>
                      </div>
                      <Badge
                        variant={student.average >= 9 ? "default" : student.average >= 7 ? "secondary" : "destructive"}
                      >
                        {student.average}/10
                      </Badge>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Panel de Opciones Avanzadas */}
        <div className="space-y-6">
          {/* Opciones de Formato */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <BookOpen className="h-5 w-5 mr-2" />
                Opciones de Formato
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label htmlFor="includeGraphs">Incluir Gráficos</Label>
                  <Checkbox id="includeGraphs" defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="includePhotos">Incluir Fotos</Label>
                  <Checkbox id="includePhotos" />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="colorPrint">Impresión a Color</Label>
                  <Checkbox id="colorPrint" defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="watermark">Marca de Agua</Label>
                  <Checkbox id="watermark" defaultChecked />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Filtros Avanzados */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <TrendingUp className="h-5 w-5 mr-2" />
                Filtros Avanzados
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Rango de Calificaciones</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Todos los rangos" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todos los rangos</SelectItem>
                    <SelectItem value="excellent">Excelente (9-10)</SelectItem>
                    <SelectItem value="good">Bueno (7-8.9)</SelectItem>
                    <SelectItem value="regular">Regular (5-6.9)</SelectItem>
                    <SelectItem value="poor">Necesita Mejora (&lt;5)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Materias Específicas</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Todas las materias" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todas las materias</SelectItem>
                    <SelectItem value="math">Matemáticas</SelectItem>
                    <SelectItem value="science">Ciencias</SelectItem>
                    <SelectItem value="language">Lenguaje</SelectItem>
                    <SelectItem value="history">Historia</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Orden de Estudiantes</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Alfabético" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="alphabetical">Alfabético</SelectItem>
                    <SelectItem value="grade-desc">Mayor a menor nota</SelectItem>
                    <SelectItem value="grade-asc">Menor a mayor nota</SelectItem>
                    <SelectItem value="attendance">Por asistencia</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Estadísticas Rápidas */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Award className="h-5 w-5 mr-2" />
                Estadísticas Rápidas
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm">Promedio del Grupo:</span>
                <Badge variant="default">8.4/10</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Mejor Estudiante:</span>
                <span className="text-sm font-medium">Sofia López</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Asistencia Promedio:</span>
                <Badge variant="secondary">94%</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Tareas Completadas:</span>
                <Badge variant="default">87%</Badge>
              </div>
            </CardContent>
          </Card>

          {/* Acciones Rápidas */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Clock className="h-5 w-5 mr-2" />
                Acciones Rápidas
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button variant="outline" className="w-full justify-start bg-transparent">
                <Calendar className="h-4 w-4 mr-2" />
                Programar Envío
              </Button>
              <Button variant="outline" className="w-full justify-start bg-transparent">
                <Users className="h-4 w-4 mr-2" />
                Enviar a Padres
              </Button>
              <Button variant="outline" className="w-full justify-start bg-transparent">
                <FileText className="h-4 w-4 mr-2" />
                Guardar Plantilla
              </Button>
              <Button variant="outline" className="w-full justify-start bg-transparent">
                <CheckCircle className="h-4 w-4 mr-2" />
                Historial de Reportes
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
