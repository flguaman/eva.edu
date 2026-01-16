"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Send, Users, Phone, Video, Paperclip, Smile, Search, MoreVertical } from "lucide-react"

interface Message {
  id: string
  sender: string
  content: string
  timestamp: Date
  type: "text" | "file" | "image"
  avatar: string
  isCurrentUser: boolean
}

interface ChatRoom {
  id: string
  name: string
  type: "class" | "subject" | "study_group" | "direct"
  participants: number
  lastMessage: string
  lastActivity: Date
  unreadCount: number
  isOnline?: boolean
}

export function RealTimeChat() {
  const [activeRoom, setActiveRoom] = useState<string>("math-10a")
  const [message, setMessage] = useState("")
  const [searchTerm, setSearchTerm] = useState("")
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const [chatRooms] = useState<ChatRoom[]>([
    {
      id: "math-10a",
      name: "Matemáticas 10mo A",
      type: "class",
      participants: 28,
      lastMessage: "¿Alguien entendió el ejercicio 5?",
      lastActivity: new Date(Date.now() - 5 * 60000),
      unreadCount: 3,
    },
    {
      id: "study-group",
      name: "Grupo de Estudio - Química",
      type: "study_group",
      participants: 6,
      lastMessage: "Nos vemos mañana a las 3pm",
      lastActivity: new Date(Date.now() - 15 * 60000),
      unreadCount: 1,
    },
    {
      id: "prof-garcia",
      name: "Prof. García",
      type: "direct",
      participants: 2,
      lastMessage: "Tu tarea está muy bien hecha",
      lastActivity: new Date(Date.now() - 60 * 60000),
      unreadCount: 0,
      isOnline: true,
    },
    {
      id: "literature-class",
      name: "Literatura 10mo A",
      type: "subject",
      participants: 28,
      lastMessage: "El ensayo debe tener mínimo 500 palabras",
      lastActivity: new Date(Date.now() - 2 * 60 * 60000),
      unreadCount: 0,
    },
  ])

  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      sender: "Carlos Pérez",
      content: "¿Alguien puede explicarme cómo resolver ecuaciones cuadráticas?",
      timestamp: new Date(Date.now() - 30 * 60000),
      type: "text",
      avatar: "CP",
      isCurrentUser: false,
    },
    {
      id: "2",
      sender: "Ana Rodríguez",
      content: "Claro! Primero tienes que identificar los coeficientes a, b y c",
      timestamp: new Date(Date.now() - 25 * 60000),
      type: "text",
      avatar: "AR",
      isCurrentUser: false,
    },
    {
      id: "3",
      sender: "Tú",
      content: "Yo también tengo dudas con ese tema",
      timestamp: new Date(Date.now() - 20 * 60000),
      type: "text",
      avatar: "MG",
      isCurrentUser: true,
    },
    {
      id: "4",
      sender: "Prof. García",
      content: "Excelente pregunta. Mañana haremos una clase especial sobre ecuaciones cuadráticas",
      timestamp: new Date(Date.now() - 10 * 60000),
      type: "text",
      avatar: "PG",
      isCurrentUser: false,
    },
  ])

  const [onlineUsers] = useState([
    { name: "Ana Rodríguez", avatar: "AR", status: "online" },
    { name: "Carlos Pérez", avatar: "CP", status: "online" },
    { name: "Prof. García", avatar: "PG", status: "online" },
    { name: "Luis Martínez", avatar: "LM", status: "away" },
    { name: "Sofia López", avatar: "SL", status: "offline" },
  ])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSendMessage = () => {
    if (message.trim()) {
      const newMessage: Message = {
        id: Date.now().toString(),
        sender: "Tú",
        content: message,
        timestamp: new Date(),
        type: "text",
        avatar: "MG",
        isCurrentUser: true,
      }
      setMessages([...messages, newMessage])
      setMessage("")
    }
  }

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString("es-ES", { hour: "2-digit", minute: "2-digit" })
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "online":
        return "bg-green-500"
      case "away":
        return "bg-yellow-500"
      default:
        return "bg-gray-400"
    }
  }

  return (
    <div className="h-[600px] flex">
      {/* Sidebar */}
      <div className="w-80 border-r border-border bg-card/50">
        <div className="p-4 border-b border-border">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar conversaciones..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        <Tabs defaultValue="chats" className="h-full">
          <TabsList className="grid w-full grid-cols-2 m-2">
            <TabsTrigger value="chats">Chats</TabsTrigger>
            <TabsTrigger value="online">En línea</TabsTrigger>
          </TabsList>

          <TabsContent value="chats" className="mt-0">
            <ScrollArea className="h-[480px]">
              <div className="space-y-1 p-2">
                {chatRooms.map((room) => (
                  <div
                    key={room.id}
                    className={`p-3 rounded-lg cursor-pointer transition-colors hover:bg-secondary/50 ${
                      activeRoom === room.id ? "bg-primary/10 border border-primary/20" : ""
                    }`}
                    onClick={() => setActiveRoom(room.id)}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex items-center space-x-2">
                        <h4 className="font-medium text-sm">{room.name}</h4>
                        {room.isOnline && <div className="w-2 h-2 bg-green-500 rounded-full"></div>}
                      </div>
                      {room.unreadCount > 0 && (
                        <Badge variant="destructive" className="text-xs">
                          {room.unreadCount}
                        </Badge>
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground truncate">{room.lastMessage}</p>
                    <div className="flex items-center justify-between mt-1">
                      <span className="text-xs text-muted-foreground">{formatTime(room.lastActivity)}</span>
                      <div className="flex items-center space-x-1 text-xs text-muted-foreground">
                        <Users className="h-3 w-3" />
                        <span>{room.participants}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </TabsContent>

          <TabsContent value="online" className="mt-0">
            <ScrollArea className="h-[480px]">
              <div className="space-y-2 p-2">
                {onlineUsers.map((user, index) => (
                  <div key={index} className="flex items-center space-x-3 p-2 rounded-lg hover:bg-secondary/50">
                    <div className="relative">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-blue-500 flex items-center justify-center text-white font-medium">
                        {user.avatar}
                      </div>
                      <div
                        className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-white ${getStatusColor(
                          user.status,
                        )}`}
                      ></div>
                    </div>
                    <div className="flex-1">
                      <div className="font-medium text-sm">{user.name}</div>
                      <div className="text-xs text-muted-foreground capitalize">{user.status}</div>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </TabsContent>
        </Tabs>
      </div>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col">
        {/* Chat Header */}
        <div className="p-4 border-b border-border bg-card/50 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-primary/70 flex items-center justify-center text-white font-medium">
              MA
            </div>
            <div>
              <h3 className="font-medium">Matemáticas 10mo A</h3>
              <p className="text-sm text-muted-foreground">28 participantes • 12 en línea</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="icon">
              <Phone className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon">
              <Video className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon">
              <MoreVertical className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Messages */}
        <ScrollArea className="flex-1 p-4">
          <div className="space-y-4">
            {messages.map((msg) => (
              <div key={msg.id} className={`flex ${msg.isCurrentUser ? "justify-end" : "justify-start"}`}>
                <div
                  className={`flex space-x-2 max-w-[70%] ${msg.isCurrentUser ? "flex-row-reverse space-x-reverse" : ""}`}
                >
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-blue-500 flex items-center justify-center text-white text-sm font-medium flex-shrink-0">
                    {msg.avatar}
                  </div>
                  <div>
                    <div
                      className={`p-3 rounded-lg ${
                        msg.isCurrentUser ? "bg-primary text-primary-foreground" : "bg-secondary"
                      }`}
                    >
                      {!msg.isCurrentUser && <div className="text-xs font-medium mb-1">{msg.sender}</div>}
                      <div className="text-sm">{msg.content}</div>
                    </div>
                    <div
                      className={`text-xs text-muted-foreground mt-1 ${msg.isCurrentUser ? "text-right" : "text-left"}`}
                    >
                      {formatTime(msg.timestamp)}
                    </div>
                  </div>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
        </ScrollArea>

        {/* Message Input */}
        <div className="p-4 border-t border-border bg-card/50">
          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="icon">
              <Paperclip className="h-4 w-4" />
            </Button>
            <div className="flex-1 relative">
              <Input
                placeholder="Escribe un mensaje..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                className="pr-10"
              />
              <Button variant="ghost" size="icon" className="absolute right-0 top-0">
                <Smile className="h-4 w-4" />
              </Button>
            </div>
            <Button onClick={handleSendMessage} disabled={!message.trim()}>
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
