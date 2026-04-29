import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Calendar as CalendarIcon,
  ChevronLeft,
  ChevronRight,
  Plus,
  Clock,
  MapPin,
  Users,
  DollarSign,
  MessageCircle,
  AlertCircle,
  CheckCircle,
  Star,
  BookOpen,
} from "lucide-react";

interface CalendarEvent {
  id: string;
  title: string;
  description: string;
  date: Date;
  time: string;
  type: "academic" | "payment" | "meeting" | "activity" | "holiday" | "reminder";
  category: string;
  location?: string;
  priority: "low" | "medium" | "high";
  completed?: boolean;
  amount?: number;
}

export function EnhancedCalendar() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [isAddEventOpen, setIsAddEventOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("calendar");

  const [events, setEvents] = useState<CalendarEvent[]>([
    {
      id: "1",
      title: "Pago de mensualidad",
      description: "Pago correspondiente a enero 2024",
      date: new Date(2024, 0, 15),
      time: "08:00",
      type: "payment",
      category: "Pagos escolares",
      priority: "high",
      amount: 150,
    },
    {
      id: "2",
      title: "Reunión de representantes de curso",
      description: "Discusión sobre actividades del trimestre",
      date: new Date(2024, 0, 20),
      time: "15:00",
      type: "meeting",
      category: "Reuniones",
      location: "Sala de profesores",
      priority: "medium",
    },
    {
      id: "3",
      title: "Examen de Matemáticas",
      description: "Examen sobre ecuaciones cuadráticas",
      date: new Date(2024, 0, 25),
      time: "08:00",
      type: "academic",
      category: "Exámenes",
      location: "Aula 201",
      priority: "high",
    },
    {
      id: "4",
      title: "Compra de materiales escolares",
      description: "Compra de útiles para el trimestre",
      date: new Date(2024, 0, 10),
      time: "10:00",
      type: "payment",
      category: "Materiales",
      priority: "medium",
      amount: 75,
    },
  ]);

  const monthNames = [
    "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
    "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
  ];

  const dayNames = ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"];

  const getEventTypeColor = (type: string) => {
    switch (type) {
      case "academic":
        return "bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-900 dark:text-blue-200";
      case "payment":
        return "bg-green-100 text-green-800 border-green-200 dark:bg-green-900 dark:text-green-200";
      case "meeting":
        return "bg-purple-100 text-purple-800 border-purple-200 dark:bg-purple-900 dark:text-purple-200";
      case "activity":
        return "bg-orange-100 text-orange-800 border-orange-200 dark:bg-orange-900 dark:text-orange-200";
      case "holiday":
        return "bg-yellow-100 text-yellow-800 border-yellow-200 dark:bg-yellow-900 dark:text-yellow-200";
      case "reminder":
        return "bg-gray-100 text-gray-800 border-gray-200 dark:bg-gray-800 dark:text-gray-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getEventTypeIcon = (type: string) => {
    switch (type) {
      case "academic":
        return <BookOpen className="h-3 w-3" />;
      case "payment":
        return <DollarSign className="h-3 w-3" />;
      case "meeting":
        return <Users className="h-3 w-3" />;
      case "activity":
        return <Star className="h-3 w-3" />;
      case "holiday":
        return <CheckCircle className="h-3 w-3" />;
      case "reminder":
        return <AlertCircle className="h-3 w-3" />;
      default:
        return <CalendarIcon className="h-3 w-3" />;
    }
  };

  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const getEventsForDate = (date: Date) => {
    return events.filter((event) => event.date.toDateString() === date.toDateString());
  };

  const navigateMonth = (direction: "prev" | "next") => {
    setCurrentDate((prev) => {
      const newDate = new Date(prev);
      if (direction === "prev") {
        newDate.setMonth(prev.getMonth() - 1);
      } else {
        newDate.setMonth(prev.getMonth() + 1);
      }
      return newDate;
    });
  };

  const renderCalendarDays = () => {
    const daysInMonth = getDaysInMonth(currentDate);
    const firstDay = getFirstDayOfMonth(currentDate);
    const days = [];

    // Empty cells for days before the first day of the month
    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="h-24 p-1"></div>);
    }

    // Days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
      const dayEvents = getEventsForDate(date);
      const isToday = date.toDateString() === new Date().toDateString();
      const isSelected = selectedDate?.toDateString() === date.toDateString();

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
      );
    }

    return days;
  };

  const upcomingEvents = events
    .filter((event) => event.date >= new Date())
    .sort((a, b) => a.date.getTime() - b.date.getTime())
    .slice(0, 5);

  const paymentsThisMonth = events.filter(event =>
    event.type === 'payment' &&
    event.date.getMonth() === currentDate.getMonth() &&
    event.date.getFullYear() === currentDate.getFullYear()
  );

  const totalPayments = paymentsThisMonth.reduce((sum, payment) => sum + (payment.amount || 0), 0);

  return (
    <div className="space-y-6">
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="calendar">Calendario</TabsTrigger>
          <TabsTrigger value="payments">Pagos del Mes</TabsTrigger>
          <TabsTrigger value="schedule">Agenda</TabsTrigger>
        </TabsList>

        <TabsContent value="calendar" className="space-y-6">
          {/* Calendar Header */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center space-x-2">
                  <CalendarIcon className="h-5 w-5 text-primary" />
                  <span>Calendario del Representante</span>
                </CardTitle>
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
                              <SelectItem value="academic">Académico</SelectItem>
                              <SelectItem value="payment">Pago</SelectItem>
                              <SelectItem value="meeting">Reunión</SelectItem>
                              <SelectItem value="activity">Actividad</SelectItem>
                              <SelectItem value="reminder">Recordatorio</SelectItem>
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
                        <Label>Monto (opcional)</Label>
                        <Input type="number" placeholder="0.00" />
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
            </CardHeader>
          </Card>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Calendar Grid */}
            <div className="lg:col-span-3">
              <Card>
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
              {/* Próximos Eventos */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Próximos Eventos</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {upcomingEvents.map((event) => (
                    <div key={event.id} className={`p-3 rounded-lg bg-secondary/30 border-l-4 ${
                      event.priority === 'high' ? 'border-l-red-500' :
                      event.priority === 'medium' ? 'border-l-yellow-500' : 'border-l-green-500'
                    }`}>
                      <div className="flex items-start justify-between mb-2">
                        <h4 className="font-medium text-sm">{event.title}</h4>
                        <Badge variant="outline" className={getEventTypeColor(event.type)}>
                          {event.type}
                        </Badge>
                      </div>
                      <div className="space-y-1 text-xs text-muted-foreground">
                        <div className="flex items-center space-x-1">
                          <CalendarIcon className="h-3 w-3" />
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
                        {event.amount && (
                          <div className="flex items-center space-x-1">
                            <DollarSign className="h-3 w-3" />
                            <span>${event.amount}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="payments" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <DollarSign className="h-5 w-5" />
                Pagos de {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-6">
                <Card>
                  <CardContent className="pt-6">
                    <div className="text-2xl font-bold text-green-600">${totalPayments.toLocaleString()}</div>
                    <p className="text-xs text-muted-foreground">Total pagado</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="pt-6">
                    <div className="text-2xl font-bold">{paymentsThisMonth.length}</div>
                    <p className="text-xs text-muted-foreground">Transacciones</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="pt-6">
                    <div className="text-2xl font-bold">
                      {paymentsThisMonth.filter(p => p.completed).length}
                    </div>
                    <p className="text-xs text-muted-foreground">Completadas</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="pt-6">
                    <div className="text-2xl font-bold text-orange-600">
                      {paymentsThisMonth.filter(p => !p.completed).length}
                    </div>
                    <p className="text-xs text-muted-foreground">Pendientes</p>
                  </CardContent>
                </Card>
              </div>

              <div className="space-y-4">
                {paymentsThisMonth.map((payment) => (
                  <div key={payment.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-green-100 rounded-full">
                        <DollarSign className="h-4 w-4 text-green-600" />
                      </div>
                      <div>
                        <p className="font-medium">{payment.title}</p>
                        <p className="text-sm text-muted-foreground">{payment.description}</p>
                        <p className="text-xs text-muted-foreground">
                          {payment.date.toLocaleDateString("es-ES")} - {payment.time}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-green-600">${payment.amount}</p>
                      <Badge variant={payment.completed ? "default" : "secondary"}>
                        {payment.completed ? "Pagado" : "Pendiente"}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="schedule" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageCircle className="h-5 w-5" />
                Agenda de Reuniones y Actividades
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {events
                  .filter(event => event.type === 'meeting' || event.type === 'activity')
                  .sort((a, b) => a.date.getTime() - b.date.getTime())
                  .map((event) => (
                    <div key={event.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-full ${
                          event.type === 'meeting' ? 'bg-purple-100' : 'bg-orange-100'
                        }`}>
                          {event.type === 'meeting' ? (
                            <Users className="h-4 w-4 text-purple-600" />
                          ) : (
                            <Star className="h-4 w-4 text-orange-600" />
                          )}
                        </div>
                        <div>
                          <p className="font-medium">{event.title}</p>
                          <p className="text-sm text-muted-foreground">{event.description}</p>
                          <p className="text-xs text-muted-foreground">
                            {event.date.toLocaleDateString("es-ES")} - {event.time}
                            {event.location && ` • ${event.location}`}
                          </p>
                        </div>
                      </div>
                      <Badge variant="outline" className={getEventTypeColor(event.type)}>
                        {event.type === 'meeting' ? 'Reunión' : 'Actividad'}
                      </Badge>
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
