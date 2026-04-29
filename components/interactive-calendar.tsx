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
import { useLanguage } from "@/contexts/language-context"

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
  const { t } = useLanguage()

  // Demo: for the 2026 demo month, always start on March 2026.
  const demoMonth = new Date(2026, 2, 1) // Marzo 2026
  const [currentDate, setCurrentDate] = useState(demoMonth)
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const [isAddEventOpen, setIsAddEventOpen] = useState(false)
  const [viewMode, setViewMode] = useState<"month" | "week" | "day">("month")

  const currentYear = demoMonth.getFullYear()
  const currentMonth = demoMonth.getMonth()

  const [events, setEvents] = useState<CalendarEvent[]>([
    {
      id: "1",
      title: "Examen de Matemáticas",
      description: "Examen sobre ecuaciones cuadráticas y funciones",
      date: new Date(currentYear, currentMonth, 20),
      time: "08:00",
      type: "exam",
      subject: "Matemáticas",
      location: "Aula 201",
      priority: "high",
      completed: false,
    },
    {
      id: "2",
      title: "Entrega de Ensayo",
      description: "Ensayo sobre la Independencia del Ecuador",
      date: new Date(currentYear, currentMonth, 10),
      time: "23:59",
      type: "assignment",
      subject: "Historia",
      priority: "medium",
      completed: false,
    },
    {
      id: "3",
      title: "Proyecto de Ciencias",
      description: "Presentación del proyecto en la feria de ciencias",
      date: new Date(currentYear, currentMonth, 3),
      time: "14:00",
      type: "event",
      location: "Auditorio Principal",
      priority: "high",
      completed: false,
    },
    {
      id: "4",
      title: "Clase de Física",
      description: "Laboratorio práctico de fuerzas",
      date: new Date(currentYear, currentMonth, 15),
      time: "09:00",
      type: "class",
      subject: "Física",
      location: "Laboratorio 2",
      priority: "medium",
      completed: false,
    },
    {
      id: "5",
      title: "Día del Estudiante",
      description: "Actividad especial y descanso",
      date: new Date(currentYear, currentMonth, 28),
      time: t("cal.allday"),
      type: "holiday",
      priority: "low",
      completed: false,
    },
  ])

  // Month / day names come from the translation dictionary (comma-separated)
  const monthNames = t("cal.months").split(",")
  const dayNames = t("cal.days").split(",")

  const getEventTypeColor = (type: string) => {
    switch (type) {
      case "exam":       return "bg-red-100 text-red-800 border-red-200"
      case "assignment": return "bg-blue-100 text-blue-800 border-blue-200"
      case "class":      return "bg-green-100 text-green-800 border-green-200"
      case "event":      return "bg-purple-100 text-purple-800 border-purple-200"
      case "holiday":    return "bg-yellow-100 text-yellow-800 border-yellow-200"
      default:           return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const getEventTypeLabel = (type: string) => {
    switch (type) {
      case "exam":       return t("cal.type.exam")
      case "assignment": return t("cal.type.assignment")
      case "class":      return t("cal.type.class")
      case "event":      return t("cal.type.event")
      case "holiday":    return t("cal.type.holiday")
      default:           return type
    }
  }

  const getEventTypeIcon = (type: string) => {
    switch (type) {
      case "exam":       return <AlertCircle className="h-3 w-3" />
      case "assignment": return <BookOpen className="h-3 w-3" />
      case "class":      return <Users className="h-3 w-3" />
      case "event":      return <Star className="h-3 w-3" />
      case "holiday":    return <CheckCircle className="h-3 w-3" />
      default:           return <Calendar className="h-3 w-3" />
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":   return "border-l-4 border-l-red-500"
      case "medium": return "border-l-4 border-l-yellow-500"
      case "low":    return "border-l-4 border-l-green-500"
      default:       return "border-l-4 border-l-gray-500"
    }
  }

  const getDaysInMonth = (date: Date) =>
    new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate()

  const getFirstDayOfMonth = (date: Date) =>
    new Date(date.getFullYear(), date.getMonth(), 1).getDay()

  const getEventsForDate = (date: Date) =>
    events.filter((event) => event.date.toDateString() === date.toDateString())

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

    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="h-24 p-1"></div>)
    }

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
            {dayEvents.length > 2 && (
              <div className="text-xs text-muted-foreground">
                +{dayEvents.length - 2} {t("cal.more")}
              </div>
            )}
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
              <span>{t("cal.title")}</span>
            </CardTitle>
            <div className="flex items-center space-x-2">
              <Select value={viewMode} onValueChange={(value: any) => setViewMode(value)}>
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="month">{t("cal.view.month")}</SelectItem>
                  <SelectItem value="week">{t("cal.view.week")}</SelectItem>
                  <SelectItem value="day">{t("cal.view.day")}</SelectItem>
                </SelectContent>
              </Select>
              <Dialog open={isAddEventOpen} onOpenChange={setIsAddEventOpen}>
                <DialogTrigger asChild>
                  <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    {t("cal.new.event")}
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>{t("cal.dialog.title")}</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label>{t("cal.field.title")}</Label>
                      <Input placeholder={t("cal.field.title.placeholder")} />
                    </div>
                    <div className="space-y-2">
                      <Label>{t("cal.field.desc")}</Label>
                      <Textarea placeholder={t("cal.field.desc.placeholder")} />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>{t("cal.field.date")}</Label>
                        <Input type="date" />
                      </div>
                      <div className="space-y-2">
                        <Label>{t("cal.field.time")}</Label>
                        <Input type="time" />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>{t("cal.field.type")}</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder={t("cal.field.type.placeholder")} />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="exam">{t("cal.type.exam")}</SelectItem>
                            <SelectItem value="assignment">{t("cal.type.assignment")}</SelectItem>
                            <SelectItem value="class">{t("cal.type.class")}</SelectItem>
                            <SelectItem value="event">{t("cal.type.event")}</SelectItem>
                            <SelectItem value="holiday">{t("cal.type.holiday")}</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label>{t("cal.field.priority")}</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder={t("cal.field.priority.placeholder")} />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="high">{t("cal.priority.high")}</SelectItem>
                            <SelectItem value="medium">{t("cal.priority.medium")}</SelectItem>
                            <SelectItem value="low">{t("cal.priority.low")}</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label>{t("cal.field.location")}</Label>
                      <Input placeholder={t("cal.field.location.placeholder")} />
                    </div>
                    <div className="flex justify-end space-x-2">
                      <Button variant="outline" onClick={() => setIsAddEventOpen(false)}>
                        {t("cal.btn.cancel")}
                      </Button>
                      <Button onClick={() => setIsAddEventOpen(false)}>
                        {t("cal.btn.create")}
                      </Button>
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
              <CardTitle className="text-lg">{t("cal.sidebar.upcoming")}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {upcomingEvents.map((event) => (
                <div key={event.id} className={`p-3 rounded-lg bg-secondary/30 ${getPriorityColor(event.priority)}`}>
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="font-medium text-sm">{event.title}</h4>
                    <Badge variant="outline" className={getEventTypeColor(event.type)}>
                      {getEventTypeLabel(event.type)}
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
              <CardTitle className="text-lg">{t("cal.sidebar.summary")}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm">{t("cal.summary.exams")}</span>
                <Badge variant="destructive">3</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">{t("cal.summary.assignments")}</span>
                <Badge variant="secondary">7</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">{t("cal.summary.events")}</span>
                <Badge variant="default">2</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">{t("cal.summary.classdays")}</span>
                <Badge variant="outline">22</Badge>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
