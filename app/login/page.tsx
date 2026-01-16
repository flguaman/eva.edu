"use client"

import type React from "react"
import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { BookOpen, User, GraduationCap, Shield, Sparkles, Eye, EyeOff } from "lucide-react"
import { ThemeProvider } from "@/contexts/theme-context"
import { ThemeSelector } from "@/components/theme-selector"

export default function LoginPage() {
  const [userType, setUserType] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulación de login con delay
    await new Promise((resolve) => setTimeout(resolve, 1500))

    if (userType === "student") {
      router.push("/dashboard/student")
    } else if (userType === "teacher") {
      router.push("/dashboard/teacher")
    } else if (userType === "admin") {
      router.push("/dashboard/admin")
    } else if (userType === "representative") {
      router.push("/dashboard/representative")
    }

    setIsLoading(false)
  }

  return (
    <ThemeProvider>
      <div className="min-h-screen gradient-bg flex items-center justify-center p-4 relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="absolute top-10 right-10">
          <ThemeSelector />
        </div>

        {/* Floating Elements */}
        <div className="absolute top-20 left-20 w-32 h-32 bg-primary/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-40 h-40 bg-primary/5 rounded-full blur-3xl"></div>

        <Card className="w-full max-w-md modern-shadow border-0 glass-effect hover-lift">
          <CardHeader className="text-center pb-8">
            <div className="flex justify-center mb-6">
              <div className="relative">
                <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-primary to-primary/70 flex items-center justify-center">
                  <BookOpen className="h-10 w-10 text-white" />
                </div>
                <Sparkles className="h-6 w-6 text-primary absolute -top-2 -right-2" />
              </div>
            </div>
            <CardTitle className="text-3xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
              Bienvenido a EVA
            </CardTitle>
            <CardDescription className="text-base mt-2">
              Accede a tu cuenta para continuar con tus actividades académicas
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="userType" className="text-sm font-medium">
                  Tipo de Usuario
                </Label>
                <Select value={userType} onValueChange={setUserType} required>
                  <SelectTrigger className="h-12 border-0 bg-secondary/50">
                    <SelectValue placeholder="Selecciona tu rol" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="student">
                      <div className="flex items-center space-x-3 py-2">
                        <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center">
                          <User className="h-4 w-4 text-blue-600" />
                        </div>
                        <div>
                          <div className="font-medium">Estudiante</div>
                          <div className="text-xs text-muted-foreground">Acceso a cursos y tareas</div>
                        </div>
                      </div>
                    </SelectItem>
                    <SelectItem value="teacher">
                      <div className="flex items-center space-x-3 py-2">
                        <div className="w-8 h-8 rounded-lg bg-green-100 flex items-center justify-center">
                          <GraduationCap className="h-4 w-4 text-green-600" />
                        </div>
                        <div>
                          <div className="font-medium">Profesor</div>
                          <div className="text-xs text-muted-foreground">Gestión de clases</div>
                        </div>
                      </div>
                    </SelectItem>
                    <SelectItem value="admin">
                      <div className="flex items-center space-x-3 py-2">
                        <div className="w-8 h-8 rounded-lg bg-purple-100 flex items-center justify-center">
                          <Shield className="h-4 w-4 text-purple-600" />
                        </div>
                        <div>
                          <div className="font-medium">Administrador</div>
                          <div className="text-xs text-muted-foreground">Control total</div>
                        </div>
                      </div>
                    </SelectItem>
                    <SelectItem value="representative">
                      <div className="flex items-center space-x-3 py-2">
                        <div className="w-8 h-8 rounded-lg bg-yellow-100 flex items-center justify-center">
                          <User className="h-4 w-4 text-yellow-600" />
                        </div>
                        <div>
                          <div className="font-medium">Representante</div>
                          <div className="text-xs text-muted-foreground">Seguimiento de alumnos</div>
                        </div>
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-medium">
                  Correo Electrónico
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="tu.email@colegio.edu.ec"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="h-12 border-0 bg-secondary/50"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-sm font-medium">
                  Contraseña
                </Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="h-12 border-0 bg-secondary/50 pr-12"
                    required
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute right-0 top-0 h-12 w-12"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                </div>
              </div>

              <Button
                type="submit"
                className="w-full h-12 text-base font-medium modern-shadow hover-lift"
                disabled={!userType || isLoading}
              >
                {isLoading ? (
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    <span>Iniciando sesión...</span>
                  </div>
                ) : (
                  "Iniciar Sesión"
                )}
              </Button>
            </form>

            <div className="mt-8 space-y-4">
              <div className="text-center">
                <Link href="/forgot-password" className="text-sm text-primary hover:underline font-medium">
                  ¿Olvidaste tu contraseña?
                </Link>
              </div>
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-border"></div>
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-card px-2 text-muted-foreground">o</span>
                </div>
              </div>
              <div className="text-center text-sm text-muted-foreground">
                ¿No tienes cuenta?{" "}
                <Link href="/register" className="text-primary hover:underline font-medium">
                  Regístrate aquí
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </ThemeProvider>
  )
}
