"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import { Plus, MessageSquare, Video, Calendar, BookOpen, Trophy, BarChart3, X, Zap } from "lucide-react"
import { RealTimeChat } from "./real-time-chat"
import { VideoConference } from "./video-conference"
import { InteractiveCalendar } from "./interactive-calendar"

export function FloatingNavigation() {
  const [isOpen, setIsOpen] = useState(false)
  const [activeDialog, setActiveDialog] = useState<string | null>(null)

  const quickActions = [
    {
      id: "chat",
      icon: MessageSquare,
      label: "Chat",
      color: "from-blue-500 to-blue-600",
      badge: 3,
      component: RealTimeChat,
    },
    {
      id: "video",
      icon: Video,
      label: "Videollamada",
      color: "from-green-500 to-green-600",
      component: VideoConference,
    },
    {
      id: "calendar",
      icon: Calendar,
      label: "Calendario",
      color: "from-purple-500 to-purple-600",
      component: InteractiveCalendar,
    },
    {
      id: "library",
      icon: BookOpen,
      label: "Biblioteca",
      color: "from-orange-500 to-orange-600",
    },
    {
      id: "achievements",
      icon: Trophy,
      label: "Logros",
      color: "from-yellow-500 to-yellow-600",
      badge: "¡Nuevo!",
    },
    {
      id: "analytics",
      icon: BarChart3,
      label: "Analytics",
      color: "from-indigo-500 to-indigo-600",
    },
  ]

  return (
    <>
      {/* Floating Action Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <Button
          onClick={() => setIsOpen(!isOpen)}
          className="w-14 h-14 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-r from-primary to-primary/80"
          size="icon"
        >
          {isOpen ? <X className="h-6 w-6" /> : <Plus className="h-6 w-6" />}
        </Button>

        {/* Quick Actions Menu */}
        {isOpen && (
          <div className="absolute bottom-16 right-0 space-y-3 animate-in slide-in-from-bottom-2 duration-300">
            {quickActions.map((action, index) => (
              <div
                key={action.id}
                className="flex items-center space-x-3 animate-in slide-in-from-right-2"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <div className="bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 text-sm font-medium shadow-lg">
                  {action.label}
                </div>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button
                      className={`w-12 h-12 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-r ${action.color} relative`}
                      size="icon"
                      onClick={() => setActiveDialog(action.id)}
                    >
                      <action.icon className="h-5 w-5 text-white" />
                      {action.badge && (
                        <Badge className="absolute -top-2 -right-2 text-xs bg-red-500 text-white min-w-5 h-5 flex items-center justify-center p-0">
                          {action.badge}
                        </Badge>
                      )}
                    </Button>
                  </DialogTrigger>
                  {action.component && (
                    <DialogContent className="max-w-6xl max-h-[90vh] overflow-auto">
                      <action.component />
                    </DialogContent>
                  )}
                </Dialog>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Quick Stats Floating Card */}
      <Card className="fixed bottom-6 left-6 z-40 glass-effect border-0 modern-shadow p-4 w-64">
        <div className="space-y-3">
          <div className="flex items-center space-x-2">
            <Zap className="h-4 w-4 text-primary" />
            <span className="font-medium text-sm">Estado Actual</span>
          </div>
          <div className="space-y-2 text-xs">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Racha de estudio</span>
              <Badge variant="secondary">12 días</Badge>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Tareas pendientes</span>
              <Badge variant="destructive">3</Badge>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Próximo examen</span>
              <Badge variant="outline">2 días</Badge>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Mensajes nuevos</span>
              <Badge variant="default">5</Badge>
            </div>
          </div>
        </div>
      </Card>
    </>
  )
}
