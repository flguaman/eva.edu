"use client"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  Video,
  VideoOff,
  Mic,
  MicOff,
  PhoneOff,
  Users,
  MessageSquare,
  Share,
  Settings,
  Monitor,
  Hand,
  MoreVertical,
  Volume2,
  Grid3X3,
  User,
  Clock,
} from "lucide-react"

interface Participant {
  id: string
  name: string
  avatar: string
  isHost: boolean
  isMuted: boolean
  isVideoOn: boolean
  isHandRaised: boolean
  isPresenting: boolean
}

interface ChatMessage {
  id: string
  sender: string
  message: string
  timestamp: Date
  isPrivate?: boolean
}

export function VideoConference() {
  const [isVideoOn, setIsVideoOn] = useState(true)
  const [isMuted, setIsMuted] = useState(false)
  const [isScreenSharing, setIsScreenSharing] = useState(false)
  const [isHandRaised, setIsHandRaised] = useState(false)
  const [isChatOpen, setIsChatOpen] = useState(false)
  const [chatMessage, setChatMessage] = useState("")
  const [viewMode, setViewMode] = useState<"gallery" | "speaker" | "presentation">("gallery")
  const videoRef = useRef<HTMLVideoElement>(null)

  const [participants, setParticipants] = useState<Participant[]>([
    {
      id: "1",
      name: "Prof. García (Anfitrión)",
      avatar: "PG",
      isHost: true,
      isMuted: false,
      isVideoOn: true,
      isHandRaised: false,
      isPresenting: true,
    },
    {
      id: "2",
      name: "María González",
      avatar: "MG",
      isHost: false,
      isMuted: true,
      isVideoOn: true,
      isHandRaised: false,
      isPresenting: false,
    },
    {
      id: "3",
      name: "Carlos Pérez",
      avatar: "CP",
      isHost: false,
      isMuted: true,
      isVideoOn: false,
      isHandRaised: true,
      isPresenting: false,
    },
    {
      id: "4",
      name: "Ana Rodríguez",
      avatar: "AR",
      isHost: false,
      isMuted: true,
      isVideoOn: true,
      isHandRaised: false,
      isPresenting: false,
    },
    {
      id: "5",
      name: "Luis Martínez",
      avatar: "LM",
      isHost: false,
      isMuted: true,
      isVideoOn: true,
      isHandRaised: false,
      isPresenting: false,
    },
  ])

  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    {
      id: "1",
      sender: "Prof. García",
      message: "¡Bienvenidos a la clase de Matemáticas!",
      timestamp: new Date(Date.now() - 5 * 60000),
    },
    {
      id: "2",
      sender: "María González",
      message: "Buenos días, profesor",
      timestamp: new Date(Date.now() - 4 * 60000),
    },
    {
      id: "3",
      sender: "Carlos Pérez",
      message: "¿Podría repetir la última explicación?",
      timestamp: new Date(Date.now() - 2 * 60000),
    },
  ])

  const toggleVideo = () => setIsVideoOn(!isVideoOn)
  const toggleMute = () => setIsMuted(!isMuted)
  const toggleScreenShare = () => setIsScreenSharing(!isScreenSharing)
  const toggleHandRaise = () => setIsHandRaised(!isHandRaised)

  const sendMessage = () => {
    if (chatMessage.trim()) {
      const newMessage: ChatMessage = {
        id: Date.now().toString(),
        sender: "Tú",
        message: chatMessage,
        timestamp: new Date(),
      }
      setChatMessages([...chatMessages, newMessage])
      setChatMessage("")
    }
  }

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString("es-ES", { hour: "2-digit", minute: "2-digit" })
  }

  return (
    <div className="h-screen flex flex-col bg-gray-900">
      {/* Header */}
      <div className="bg-gray-800 p-4 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <h1 className="text-white font-medium">Clase de Matemáticas - 10mo A</h1>
          <Badge variant="secondary" className="bg-green-600 text-white">
            En vivo
          </Badge>
          <div className="flex items-center space-x-2 text-gray-300">
            <Users className="h-4 w-4" />
            <span>{participants.length} participantes</span>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="ghost" size="icon" className="text-white hover:bg-gray-700">
            <Settings className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" className="text-white hover:bg-gray-700">
            <MoreVertical className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex">
        {/* Video Area */}
        <div className="flex-1 relative">
          {viewMode === "presentation" ? (
            // Presentation Mode
            <div className="h-full bg-black flex items-center justify-center">
              <div className="w-full h-full bg-white rounded-lg m-4 flex items-center justify-center">
                <div className="text-center">
                  <Monitor className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-xl font-medium text-gray-600">Presentación de Álgebra</h3>
                  <p className="text-gray-500">Prof. García está compartiendo su pantalla</p>
                </div>
              </div>
            </div>
          ) : (
            // Gallery/Speaker Mode
            <div
              className={`h-full p-4 grid gap-4 ${
                viewMode === "gallery" ? "grid-cols-2 md:grid-cols-3 lg:grid-cols-4" : "grid-cols-1"
              }`}
            >
              {participants.map((participant) => (
                <div
                  key={participant.id}
                  className={`relative bg-gray-800 rounded-lg overflow-hidden ${
                    viewMode === "speaker" && participant.isPresenting ? "col-span-full" : ""
                  }`}
                >
                  {participant.isVideoOn ? (
                    <div className="w-full h-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                      <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center text-white text-xl font-bold">
                        {participant.avatar}
                      </div>
                    </div>
                  ) : (
                    <div className="w-full h-full bg-gray-700 flex items-center justify-center">
                      <div className="text-center">
                        <User className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                        <p className="text-gray-300 text-sm">Cámara desactivada</p>
                      </div>
                    </div>
                  )}

                  {/* Participant Info */}
                  <div className="absolute bottom-2 left-2 right-2">
                    <div className="bg-black/50 rounded px-2 py-1 flex items-center justify-between">
                      <span className="text-white text-sm font-medium truncate">{participant.name}</span>
                      <div className="flex items-center space-x-1">
                        {participant.isHandRaised && <Hand className="h-3 w-3 text-yellow-400" />}
                        {participant.isMuted ? (
                          <MicOff className="h-3 w-3 text-red-400" />
                        ) : (
                          <Mic className="h-3 w-3 text-green-400" />
                        )}
                        {participant.isHost && (
                          <Badge variant="secondary" className="text-xs bg-blue-600">
                            Host
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Presenting Indicator */}
                  {participant.isPresenting && (
                    <div className="absolute top-2 left-2">
                      <Badge className="bg-green-600 text-white">
                        <Share className="h-3 w-3 mr-1" />
                        Presentando
                      </Badge>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* View Mode Controls */}
          <div className="absolute top-4 right-4 flex space-x-2">
            <Button
              variant={viewMode === "gallery" ? "default" : "secondary"}
              size="sm"
              onClick={() => setViewMode("gallery")}
              className="bg-black/50 hover:bg-black/70"
            >
              <Grid3X3 className="h-4 w-4" />
            </Button>
            <Button
              variant={viewMode === "speaker" ? "default" : "secondary"}
              size="sm"
              onClick={() => setViewMode("speaker")}
              className="bg-black/50 hover:bg-black/70"
            >
              <User className="h-4 w-4" />
            </Button>
            <Button
              variant={viewMode === "presentation" ? "default" : "secondary"}
              size="sm"
              onClick={() => setViewMode("presentation")}
              className="bg-black/50 hover:bg-black/70"
            >
              <Monitor className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Chat Sidebar */}
        {isChatOpen && (
          <div className="w-80 bg-white border-l border-gray-200 flex flex-col">
            <div className="p-4 border-b border-gray-200">
              <h3 className="font-medium">Chat de la clase</h3>
            </div>
            <ScrollArea className="flex-1 p-4">
              <div className="space-y-3">
                {chatMessages.map((msg) => (
                  <div key={msg.id} className="space-y-1">
                    <div className="flex items-center space-x-2">
                      <span className="text-sm font-medium">{msg.sender}</span>
                      <span className="text-xs text-gray-500">{formatTime(msg.timestamp)}</span>
                    </div>
                    <p className="text-sm text-gray-700">{msg.message}</p>
                  </div>
                ))}
              </div>
            </ScrollArea>
            <div className="p-4 border-t border-gray-200">
              <div className="flex space-x-2">
                <Input
                  placeholder="Escribe un mensaje..."
                  value={chatMessage}
                  onChange={(e) => setChatMessage(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && sendMessage()}
                  className="flex-1"
                />
                <Button onClick={sendMessage} disabled={!chatMessage.trim()}>
                  Enviar
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Controls */}
      <div className="bg-gray-800 p-4">
        <div className="flex items-center justify-center space-x-4">
          {/* Audio Controls */}
          <Button
            variant={isMuted ? "destructive" : "secondary"}
            size="lg"
            onClick={toggleMute}
            className="rounded-full w-12 h-12"
          >
            {isMuted ? <MicOff className="h-5 w-5" /> : <Mic className="h-5 w-5" />}
          </Button>

          {/* Video Controls */}
          <Button
            variant={isVideoOn ? "secondary" : "destructive"}
            size="lg"
            onClick={toggleVideo}
            className="rounded-full w-12 h-12"
          >
            {isVideoOn ? <Video className="h-5 w-5" /> : <VideoOff className="h-5 w-5" />}
          </Button>

          {/* Screen Share */}
          <Button
            variant={isScreenSharing ? "default" : "secondary"}
            size="lg"
            onClick={toggleScreenShare}
            className="rounded-full w-12 h-12"
          >
            <Share className="h-5 w-5" />
          </Button>

          {/* Raise Hand */}
          <Button
            variant={isHandRaised ? "default" : "secondary"}
            size="lg"
            onClick={toggleHandRaise}
            className="rounded-full w-12 h-12"
          >
            <Hand className="h-5 w-5" />
          </Button>

          {/* Chat Toggle */}
          <Button
            variant={isChatOpen ? "default" : "secondary"}
            size="lg"
            onClick={() => setIsChatOpen(!isChatOpen)}
            className="rounded-full w-12 h-12"
          >
            <MessageSquare className="h-5 w-5" />
          </Button>

          {/* Participants */}
          <Button variant="secondary" size="lg" className="rounded-full w-12 h-12">
            <Users className="h-5 w-5" />
          </Button>

          {/* Leave Call */}
          <Button variant="destructive" size="lg" className="rounded-full w-12 h-12 bg-red-600 hover:bg-red-700">
            <PhoneOff className="h-5 w-5" />
          </Button>
        </div>

        {/* Meeting Info */}
        <div className="flex items-center justify-center mt-4 space-x-6 text-gray-300 text-sm">
          <div className="flex items-center space-x-1">
            <Clock className="h-4 w-4" />
            <span>45:23</span>
          </div>
          <div className="flex items-center space-x-1">
            <Users className="h-4 w-4" />
            <span>{participants.length} participantes</span>
          </div>
          <div className="flex items-center space-x-1">
            <Volume2 className="h-4 w-4" />
            <span>Audio: Buena calidad</span>
          </div>
        </div>
      </div>
    </div>
  )
}
