"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { BookOpen, User, GraduationCap, Shield } from "lucide-react"

export default function RegisterPage() {
  const [userType, setUserType] = useState("")
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    cedula: "",
    phone: "",
    grade: "",
    subject: "",
  })

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Aquí iría la lógica de registro
    console.log("Registro:", { userType, ...formData })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <BookOpen className="h-12 w-12 text-blue-600" />
          </div>
          <CardTitle className="text-2xl">Registro en EVA Ecuador</CardTitle>
          <CardDescription>Crea tu cuenta para acceder a la plataforma educativa</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Tipo de Usuario */}
            <div className="space-y-2">
              <Label htmlFor="userType">Tipo de Usuario</Label>
              <Select value={userType} onValueChange={setUserType} required>
                <SelectTrigger>
                  <SelectValue placeholder="Selecciona tu rol" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="student">
                    <div className="flex items-center space-x-2">
                      <User className="h-4 w-4" />
                      <span>Estudiante</span>
                    </div>
                  </SelectItem>
                  <SelectItem value="teacher">
                    <div className="flex items-center space-x-2">
                      <GraduationCap className="h-4 w-4" />
                      <span>Profesor</span>
                    </div>
                  </SelectItem>
                  <SelectItem value="admin">
                    <div className="flex items-center space-x-2">
                      <Shield className="h-4 w-4" />
                      <span>Administrador</span>
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Información Personal */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">Nombres</Label>
                <Input
                  id="firstName"
                  value={formData.firstName}
                  onChange={(e) => handleInputChange("firstName", e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Apellidos</Label>
                <Input
                  id="lastName"
                  value={formData.lastName}
                  onChange={(e) => handleInputChange("lastName", e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="cedula">Cédula de Identidad</Label>
                <Input
                  id="cedula"
                  value={formData.cedula}
                  onChange={(e) => handleInputChange("cedula", e.target.value)}
                  placeholder="1234567890"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Teléfono</Label>
                <Input
                  id="phone"
                  value={formData.phone}
                  onChange={(e) => handleInputChange("phone", e.target.value)}
                  placeholder="0987654321"
                  required
                />
              </div>
            </div>

            {/* Información de Cuenta */}
            <div className="space-y-2">
              <Label htmlFor="email">Correo Electrónico</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                placeholder="tu.email@ejemplo.com"
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="password">Contraseña</Label>
                <Input
                  id="password"
                  type="password"
                  value={formData.password}
                  onChange={(e) => handleInputChange("password", e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirmar Contraseña</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  value={formData.confirmPassword}
                  onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
                  required
                />
              </div>
            </div>

            {/* Campos específicos según tipo de usuario */}
            {userType === "student" && (
              <div className="space-y-2">
                <Label htmlFor="grade">Grado/Curso</Label>
                <Select value={formData.grade} onValueChange={(value) => handleInputChange("grade", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecciona tu grado" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="8vo-a">8vo Año "A"</SelectItem>
                    <SelectItem value="8vo-b">8vo Año "B"</SelectItem>
                    <SelectItem value="8vo-c">8vo Año "C"</SelectItem>
                    <SelectItem value="9no-a">9no Año "A"</SelectItem>
                    <SelectItem value="9no-b">9no Año "B"</SelectItem>
                    <SelectItem value="9no-c">9no Año "C"</SelectItem>
                    <SelectItem value="10mo-a">10mo Año "A"</SelectItem>
                    <SelectItem value="10mo-b">10mo Año "B"</SelectItem>
                    <SelectItem value="10mo-c">10mo Año "C"</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}

            {userType === "teacher" && (
              <div className="space-y-2">
                <Label htmlFor="subject">Materia Principal</Label>
                <Select value={formData.subject} onValueChange={(value) => handleInputChange("subject", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecciona tu materia" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="matematicas">Matemáticas</SelectItem>
                    <SelectItem value="lengua">Lengua y Literatura</SelectItem>
                    <SelectItem value="ciencias">Ciencias Naturales</SelectItem>
                    <SelectItem value="sociales">Estudios Sociales</SelectItem>
                    <SelectItem value="ingles">Inglés</SelectItem>
                    <SelectItem value="educacion-fisica">Educación Física</SelectItem>
                    <SelectItem value="arte">Educación Artística</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}

            <Button type="submit" className="w-full" disabled={!userType}>
              Crear Cuenta
            </Button>
          </form>

          <div className="mt-6 text-center">
            <div className="text-sm text-gray-600">
              ¿Ya tienes cuenta?{" "}
              <Link href="/login" className="text-blue-600 hover:underline">
                Inicia sesión aquí
              </Link>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
