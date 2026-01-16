"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  BookOpen,
  Search,
  Download,
  Eye,
  Heart,
  Share2,
  Star,
  FileText,
  Video,
  Headphones,
  ImageIcon,
  Archive,
  Clock,
  User,
} from "lucide-react"

interface Resource {
  id: string
  title: string
  description: string
  type: "book" | "video" | "audio" | "document" | "image" | "interactive"
  subject: string
  grade: string
  author: string
  uploadDate: Date
  downloads: number
  rating: number
  size: string
  duration?: string
  thumbnail: string
  tags: string[]
  isFavorite: boolean
  isPremium: boolean
}

export function DigitalLibrary() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedSubject, setSelectedSubject] = useState("all")
  const [selectedType, setSelectedType] = useState("all")
  const [sortBy, setSortBy] = useState("recent")

  const [resources, setResources] = useState<Resource[]>([
    {
      id: "1",
      title: "Álgebra Básica - Guía Completa",
      description: "Guía completa sobre álgebra básica con ejercicios resueltos y explicaciones detalladas",
      type: "document",
      subject: "Matemáticas",
      grade: "10mo",
      author: "Prof. García",
      uploadDate: new Date(2024, 0, 15),
      downloads: 245,
      rating: 4.8,
      size: "2.5 MB",
      thumbnail: "/placeholder.svg?height=200&width=300",
      tags: ["álgebra", "ecuaciones", "matemáticas básicas"],
      isFavorite: true,
      isPremium: false,
    },
    {
      id: "2",
      title: "Historia del Ecuador - Documentales",
      description: "Serie de documentales sobre la historia del Ecuador desde la época precolombina",
      type: "video",
      subject: "Historia",
      grade: "9no",
      author: "Ministerio de Educación",
      uploadDate: new Date(2024, 0, 10),
      downloads: 189,
      rating: 4.6,
      size: "1.2 GB",
      duration: "2h 30min",
      thumbnail: "/placeholder.svg?height=200&width=300",
      tags: ["historia", "ecuador", "documentales"],
      isFavorite: false,
      isPremium: true,
    },
    {
      id: "3",
      title: "Experimentos de Química",
      description: "Colección de experimentos de química seguros para realizar en casa",
      type: "interactive",
      subject: "Ciencias",
      grade: "10mo",
      author: "Dr. López",
      uploadDate: new Date(2024, 0, 8),
      downloads: 156,
      rating: 4.9,
      size: "45 MB",
      thumbnail: "/placeholder.svg?height=200&width=300",
      tags: ["química", "experimentos", "laboratorio"],
      isFavorite: true,
      isPremium: false,
    },
    {
      id: "4",
      title: "Literatura Ecuatoriana - Audiolibros",
      description: "Colección de audiolibros de autores ecuatorianos clásicos y contemporáneos",
      type: "audio",
      subject: "Literatura",
      grade: "10mo",
      author: "Casa de la Cultura",
      uploadDate: new Date(2024, 0, 5),
      downloads: 98,
      rating: 4.4,
      size: "850 MB",
      duration: "12h 45min",
      thumbnail: "/placeholder.svg?height=200&width=300",
      tags: ["literatura", "audiolibros", "ecuador"],
      isFavorite: false,
      isPremium: true,
    },
    {
      id: "5",
      title: "Geografía del Ecuador - Atlas Interactivo",
      description: "Atlas interactivo con mapas detallados de las regiones del Ecuador",
      type: "interactive",
      subject: "Geografía",
      grade: "8vo",
      author: "Instituto Geográfico Militar",
      uploadDate: new Date(2024, 0, 3),
      downloads: 312,
      rating: 4.7,
      size: "120 MB",
      thumbnail: "/placeholder.svg?height=200&width=300",
      tags: ["geografía", "mapas", "ecuador", "regiones"],
      isFavorite: false,
      isPremium: false,
    },
    {
      id: "6",
      title: "Inglés Básico - Curso Interactivo",
      description: "Curso interactivo de inglés básico con ejercicios de pronunciación",
      type: "interactive",
      subject: "Inglés",
      grade: "9no",
      author: "Cambridge Institute",
      uploadDate: new Date(2024, 0, 1),
      downloads: 423,
      rating: 4.5,
      size: "200 MB",
      duration: "8h 20min",
      thumbnail: "/placeholder.svg?height=200&width=300",
      tags: ["inglés", "pronunciación", "básico"],
      isFavorite: true,
      isPremium: true,
    },
  ])

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "book":
        return <BookOpen className="h-4 w-4" />
      case "video":
        return <Video className="h-4 w-4" />
      case "audio":
        return <Headphones className="h-4 w-4" />
      case "document":
        return <FileText className="h-4 w-4" />
      case "image":
        return <ImageIcon className="h-4 w-4" />
      case "interactive":
        return <Archive className="h-4 w-4" />
      default:
        return <FileText className="h-4 w-4" />
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case "book":
        return "bg-blue-100 text-blue-800"
      case "video":
        return "bg-red-100 text-red-800"
      case "audio":
        return "bg-green-100 text-green-800"
      case "document":
        return "bg-gray-100 text-gray-800"
      case "image":
        return "bg-purple-100 text-purple-800"
      case "interactive":
        return "bg-orange-100 text-orange-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const toggleFavorite = (id: string) => {
    setResources((prev) =>
      prev.map((resource) => (resource.id === id ? { ...resource, isFavorite: !resource.isFavorite } : resource)),
    )
  }

  const filteredResources = resources.filter((resource) => {
    const matchesSearch =
      resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      resource.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      resource.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()))
    const matchesSubject = selectedSubject === "all" || resource.subject === selectedSubject
    const matchesType = selectedType === "all" || resource.type === selectedType

    return matchesSearch && matchesSubject && matchesType
  })

  const sortedResources = [...filteredResources].sort((a, b) => {
    switch (sortBy) {
      case "recent":
        return b.uploadDate.getTime() - a.uploadDate.getTime()
      case "popular":
        return b.downloads - a.downloads
      case "rating":
        return b.rating - a.rating
      case "title":
        return a.title.localeCompare(b.title)
      default:
        return 0
    }
  })

  const subjects = ["Matemáticas", "Historia", "Ciencias", "Literatura", "Geografía", "Inglés"]
  const types = ["book", "video", "audio", "document", "image", "interactive"]

  const favoriteResources = resources.filter((r) => r.isFavorite)
  const recentResources = resources.slice(0, 3)

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="modern-shadow border-0 glass-effect">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <BookOpen className="h-6 w-6 text-primary" />
            <span>Biblioteca Digital EVA</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar recursos educativos..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-2">
              <Select value={selectedSubject} onValueChange={setSelectedSubject}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Materia" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todas las materias</SelectItem>
                  {subjects.map((subject) => (
                    <SelectItem key={subject} value={subject}>
                      {subject}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={selectedType} onValueChange={setSelectedType}>
                <SelectTrigger className="w-32">
                  <SelectValue placeholder="Tipo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos</SelectItem>
                  {types.map((type) => (
                    <SelectItem key={type} value={type}>
                      <div className="flex items-center space-x-2">
                        {getTypeIcon(type)}
                        <span className="capitalize">{type}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-32">
                  <SelectValue placeholder="Ordenar" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="recent">Recientes</SelectItem>
                  <SelectItem value="popular">Populares</SelectItem>
                  <SelectItem value="rating">Mejor valorados</SelectItem>
                  <SelectItem value="title">Alfabético</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="all" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4 glass-effect">
          <TabsTrigger value="all">Todos los Recursos</TabsTrigger>
          <TabsTrigger value="favorites">Favoritos</TabsTrigger>
          <TabsTrigger value="recent">Recientes</TabsTrigger>
          <TabsTrigger value="premium">Premium</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sortedResources.map((resource) => (
              <Card key={resource.id} className="hover-lift modern-shadow border-0 glass-effect">
                <div className="relative">
                  <img
                    src={resource.thumbnail || "/placeholder.svg"}
                    alt={resource.title}
                    className="w-full h-48 object-cover rounded-t-lg"
                  />
                  {resource.isPremium && <Badge className="absolute top-2 right-2 bg-yellow-500">Premium</Badge>}
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute top-2 left-2 bg-white/80 hover:bg-white"
                    onClick={() => toggleFavorite(resource.id)}
                  >
                    <Heart className={`h-4 w-4 ${resource.isFavorite ? "fill-red-500 text-red-500" : ""}`} />
                  </Button>
                </div>
                <CardContent className="p-4">
                  <div className="space-y-3">
                    <div className="flex items-start justify-between">
                      <h3 className="font-medium text-sm leading-tight">{resource.title}</h3>
                      <Badge variant="outline" className={getTypeColor(resource.type)}>
                        <div className="flex items-center space-x-1">
                          {getTypeIcon(resource.type)}
                          <span className="capitalize">{resource.type}</span>
                        </div>
                      </Badge>
                    </div>

                    <p className="text-xs text-muted-foreground line-clamp-2">{resource.description}</p>

                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <div className="flex items-center space-x-1">
                        <User className="h-3 w-3" />
                        <span>{resource.author}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                        <span>{resource.rating}</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <div className="flex items-center space-x-1">
                        <Download className="h-3 w-3" />
                        <span>{resource.downloads}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Clock className="h-3 w-3" />
                        <span>{resource.uploadDate.toLocaleDateString("es-ES")}</span>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-1">
                      {resource.tags.slice(0, 3).map((tag) => (
                        <Badge key={tag} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>

                    <div className="flex space-x-2 pt-2">
                      <Button size="sm" className="flex-1">
                        <Eye className="h-3 w-3 mr-1" />
                        Ver
                      </Button>
                      <Button size="sm" variant="outline" className="flex-1 bg-transparent">
                        <Download className="h-3 w-3 mr-1" />
                        Descargar
                      </Button>
                      <Button size="sm" variant="ghost">
                        <Share2 className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="favorites" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {favoriteResources.map((resource) => (
              <Card key={resource.id} className="hover-lift modern-shadow border-0 glass-effect">
                <div className="relative">
                  <img
                    src={resource.thumbnail || "/placeholder.svg"}
                    alt={resource.title}
                    className="w-full h-48 object-cover rounded-t-lg"
                  />
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute top-2 left-2 bg-white/80 hover:bg-white"
                    onClick={() => toggleFavorite(resource.id)}
                  >
                    <Heart className="h-4 w-4 fill-red-500 text-red-500" />
                  </Button>
                </div>
                <CardContent className="p-4">
                  <h3 className="font-medium mb-2">{resource.title}</h3>
                  <p className="text-sm text-muted-foreground mb-3">{resource.description}</p>
                  <div className="flex space-x-2">
                    <Button size="sm" className="flex-1">
                      <Eye className="h-3 w-3 mr-1" />
                      Ver
                    </Button>
                    <Button size="sm" variant="outline" className="flex-1 bg-transparent">
                      <Download className="h-3 w-3 mr-1" />
                      Descargar
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="recent" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recentResources.map((resource) => (
              <Card key={resource.id} className="hover-lift modern-shadow border-0 glass-effect">
                <div className="relative">
                  <img
                    src={resource.thumbnail || "/placeholder.svg"}
                    alt={resource.title}
                    className="w-full h-48 object-cover rounded-t-lg"
                  />
                  <Badge className="absolute top-2 right-2 bg-green-500">Nuevo</Badge>
                </div>
                <CardContent className="p-4">
                  <h3 className="font-medium mb-2">{resource.title}</h3>
                  <p className="text-sm text-muted-foreground mb-3">{resource.description}</p>
                  <div className="flex space-x-2">
                    <Button size="sm" className="flex-1">
                      <Eye className="h-3 w-3 mr-1" />
                      Ver
                    </Button>
                    <Button size="sm" variant="outline" className="flex-1 bg-transparent">
                      <Download className="h-3 w-3 mr-1" />
                      Descargar
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="premium" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {resources
              .filter((r) => r.isPremium)
              .map((resource) => (
                <Card key={resource.id} className="hover-lift modern-shadow border-0 glass-effect border-yellow-200">
                  <div className="relative">
                    <img
                      src={resource.thumbnail || "/placeholder.svg"}
                      alt={resource.title}
                      className="w-full h-48 object-cover rounded-t-lg"
                    />
                    <Badge className="absolute top-2 right-2 bg-yellow-500">Premium</Badge>
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-medium mb-2">{resource.title}</h3>
                    <p className="text-sm text-muted-foreground mb-3">{resource.description}</p>
                    <div className="flex space-x-2">
                      <Button size="sm" className="flex-1 bg-yellow-500 hover:bg-yellow-600">
                        <Eye className="h-3 w-3 mr-1" />
                        Ver Premium
                      </Button>
                      <Button size="sm" variant="outline" className="flex-1 bg-transparent">
                        <Download className="h-3 w-3 mr-1" />
                        Descargar
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
