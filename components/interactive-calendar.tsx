"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Calendar,
  ChevronLeft,
  ChevronRight,
  Plus,
  Clock,
  MapPin,
  Users,
  BookOpen,
  AlertCircle,
  CheckCircle,
  Star,
} from "lucide-react"

interface CalendarEvent {
  id: string
  title: string
  description: string
  date: Date
  time: string
  type: "exam" | "assignment" | "class" | "event" | "holiday"
  subject?: string
  location?: string
  priority: "low" | "medium" | "high"
  completed?: boolean
}

export function InteractiveCalendar() {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const [isAddEventOpen, setIsAddEventOpen] = useState(false)
  const [viewMode, setViewMode] = useState<"month" | "week" | "day">("month")

  const [events, setEvents] = useState<CalendarEvent[]>([
    {
      id: "1",
      title: "Examen de Matemáticas",
      description: "Examen sobre ecuaciones cuadráticas y funciones",
      date: new Date(2024, 0, 25),
      time: "08:00",
      type: "exam",
      subject: "Matemáticas",
      location: "Aula 201",
      priority: "high",
    },
    {
      id: "2",
      title: "Entrega de Ensayo",
      description: "Ensayo sobre la Independencia del Ecuador",
      date: new Date(2024, 0, 28),
      time: "23:59",
      type: "assignment",
      subject: "Historia",
      priority: "medium",
      completed: false,
    },
    {
      id: "3",
      title: "Feria de Ciencias",
      description: "Presentación de proyectos científicos",
      date: new Date(2024, 0, 30),
      time: "14:00",
      type: "event",
      location: "Auditorio Principal",
      priority: "medium",
    },
    {
      id: "4",
      title: "Día del Estudiante",
      description: "Celebración del Día del Estudiante",
      date: new Date(2024, 1, 14),
      time: "Todo el día",
      type: "holiday",
      priority: "low",
    },
  ])

  const monthNames = [
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Septiembre",
    "Octubre",
    "Noviembre",
    "Diciembre",
  ]

  const dayNames = ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"]

  const getEventTypeColor = (type: string) => {
    switch (type) {
      case "exam":
        return "bg-red-100 text-red-800 border-red-200"
      case "assignment":
        return "bg-blue-100 text-blue-800 border-blue-200"
      case "class":
        return "bg-green-100 text-green-800 border-green-200"
      case "event":
        return "bg-purple-100 text-purple-800 border-purple-200"
      case "holiday":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const getEventTypeIcon = (type: string) => {
    switch (type) {
      case "exam":
        return <AlertCircle className="h-3 w-3" />
      case "assignment":
        return <BookOpen className="h-3 w-3" />
      case "class":
        return <Users className="h-3 w-3" />
      case "event":
        return <Star className="h-3 w-3" />
      case "holiday":
        return <CheckCircle className="h-3 w-3" />
      default:
        return <Calendar className="h-3 w-3" />
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "border-l-4 border-l-red-500"
      case "medium":
        return "border-l-4 border-l-yellow-500"
      case "low":
        return "border-l-4 border-l-green-500"
      default:
        return "border-l-4 border-l-gray-500"
    }
  }

  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate()
  }

  const getFirstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay()
  }

  const getEventsForDate = (date: Date) => {
    return events.filter((event) => event.date.toDateString() === date.toDateString())
  }

  const navigateMonth = (direction: "prev" | "next") => {
    setCurrentDate((prev) => {
      const newDate = new Date(prev)
      if (direction === "prev") {
        newDate.setMonth(prev.getMonth() - 1)
      } else {
        newDate.setMonth(prev.getMonth() + 1)
      }
      return newDate
    })
  }

  const renderCalendarDays = () => {
    const daysInMonth = getDaysInMonth(currentDate)
    const firstDay = getFirstDayOfMonth(currentDate)
    const days = []

    // Empty cells for days before the first day of the month
    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="h-24 p-1"></div>)
    }

    // Days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day)
      const dayEvents = getEventsForDate(date)
      const isToday = date.toDateString() === new Date().toDateString()
      const isSelected = selectedDate?.toDateString() === date.toDateString()

      days.push(
        <div
          key={day}
          className={`h-24 p-1 border border-border cursor-pointer hover:bg-secondary/50 transition-colors ${
            isToday ? "bg-primary/10 border-primary/30" : ""
          } ${isSelected ? "bg-primary/20 border-primary" : ""}`}
          onClick={() => setSelectedDate(date)}
        >
          <div className={`text-sm font-medium mb-1 ${isToday ? "text-primary" : ""}`}>{day}</div>
          <div className="space-y-1">
            {dayEvents.slice(0, 2).map((event) => (
              <div key={event.id} className={`text-xs p-1 rounded border ${getEventTypeColor(event.type)} truncate`}>
                <div className="flex items-center space-x-1">
                  {getEventTypeIcon(event.type)}
                  <span>{event.title}</span>
                </div>
              </div>
            ))}
            {dayEvents.length > 2 && <div className="text-xs text-muted-foreground">+{dayEvents.length - 2} más</div>}
          </div>
        </div>,
      )
    }

    return days
  }

  const upcomingEvents = events
    .filter((event) => event.date >= new Date())
    .sort((a, b) => a.date.getTime() - b.date.getTime())
    .slice(0, 5)

  return (
    <div className="space-y-6">
      {/* Calendar Header */}
      <Card className="modern-shadow border-0 glass-effect">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center space-x-2">
              <Calendar className="h-5 w-5 text-primary" />
              <span>Calendario Académico</span>
            </CardTitle>
            <div className="flex items-center space-x-2">
              <Select value={viewMode} onValueChange={(value: any) => setViewMode(value)}>
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="month">Mes</SelectItem>
                  <SelectItem value="week">Semana</SelectItem>
                  <SelectItem value="day">Día</SelectItem>
                </SelectContent>
              </Select>
              <Dialog open={isAddEventOpen} onOpenChange={setIsAddEventOpen}>
                <DialogTrigger asChild>
                  <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    Nuevo Evento
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Crear Nuevo Evento</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label>Título</Label>
                      <Input placeholder="Título del evento" />
                    </div>
                    <div className="space-y-2">
                      <Label>Descripción</Label>
                      <Textarea placeholder="Descripción del evento" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Fecha</Label>
                        <Input type="date" />
                      </div>
                      <div className="space-y-2">
                        <Label>Hora</Label>
                        <Input type="time" />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Tipo</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Seleccionar tipo" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="exam">Examen</SelectItem>
                            <SelectItem value="assignment">Tarea</SelectItem>
                            <SelectItem value="class">Clase</SelectItem>
                            <SelectItem value="event">Evento</SelectItem>
                            <SelectItem value="holiday">Feriado</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label>Prioridad</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Seleccionar prioridad" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="high">Alta</SelectItem>
                            <SelectItem value="medium">Media</SelectItem>
                            <SelectItem value="low">Baja</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label>Ubicación</Label>
                      <Input placeholder="Ubicación del evento" />
                    </div>
                    <div className="flex justify-end space-x-2">
                      <Button variant="outline" onClick={() => setIsAddEventOpen(false)}>
                        Cancelar
                      </Button>
                      <Button onClick={() => setIsAddEventOpen(false)}>Crear Evento</Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </CardHeader>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Calendar Grid */}
        <div className="lg:col-span-3">
          <Card className="modern-shadow border-0 glass-effect">
            <CardHeader>
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold">
                  {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
                </h3>
                <div className="flex items-center space-x-2">
                  <Button variant="outline" size="icon" onClick={() => navigateMonth("prev")}>
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="icon" onClick={() => navigateMonth("next")}>
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-7 gap-0 mb-4">
                {dayNames.map((day) => (
                  <div key={day} className="p-2 text-center font-medium text-muted-foreground">
                    {day}
                  </div>
                ))}
              </div>
              <div className="grid grid-cols-7 gap-0 border border-border rounded-lg overflow-hidden">
                {renderCalendarDays()}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Upcoming Events */}
          <Card className="modern-shadow border-0 glass-effect">
            <CardHeader>
              <CardTitle className="text-lg">Próximos Eventos</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {upcomingEvents.map((event) => (
                <div key={event.id} className={`p-3 rounded-lg bg-secondary/30 ${getPriorityColor(event.priority)}`}>
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="font-medium text-sm">{event.title}</h4>
                    <Badge variant="outline" className={getEventTypeColor(event.type)}>
                      {event.type}
                    </Badge>
                  </div>
                  <div className="space-y-1 text-xs text-muted-foreground">
                    <div className="flex items-center space-x-1">
                      <Calendar className="h-3 w-3" />
                      <span>{event.date.toLocaleDateString("es-ES")}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Clock className="h-3 w-3" />
                      <span>{event.time}</span>
                    </div>
                    {event.location && (
                      <div className="flex items-center space-x-1">
                        <MapPin className="h-3 w-3" />
                        <span>{event.location}</span>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Quick Stats */}
          <Card className="modern-shadow border-0 glass-effect">
            <CardHeader>
              <CardTitle className="text-lg">Resumen del Mes</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm">Exámenes</span>
                <Badge variant="destructive">3</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Tareas</span>
                <Badge variant="secondary">7</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Eventos</span>
                <Badge variant="default">2</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Días de clase</span>
                <Badge variant="outline">22</Badge>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
