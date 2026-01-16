import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { BookOpen, Users, Calendar, Award, MessageSquare, BarChart3, Sparkles, Zap, Shield } from "lucide-react"
import { ThemeProvider } from "@/contexts/theme-context"
import { ThemeSelector } from "@/components/theme-selector"

export default function HomePage() {
  return (
    <ThemeProvider>
      <div className="min-h-screen gradient-bg">
        {/* Header */}
        <header className="glass-effect border-b backdrop-blur-md">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center py-4">
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <BookOpen className="h-10 w-10 text-primary" />
                  <Sparkles className="h-4 w-4 text-primary absolute -top-1 -right-1" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                    EVA Ecuador
                  </h1>
                  <p className="text-xs text-muted-foreground">Plataforma Educativa Virtual</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <ThemeSelector />
                <Link href="/login">
                  <Button variant="ghost" className="hover-lift">
                    Iniciar Sesión
                  </Button>
                </Link>
                <Link href="/register">
                  <Button className="hover-lift modern-shadow">Registrarse</Button>
                </Link>
              </div>
            </div>
          </div>
        </header>

        {/* Hero Section */}
        <section className="py-24 relative overflow-hidden">
          <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-8">
              <Zap className="h-4 w-4 mr-2" />
              Nueva Generación de Educación Digital
            </div>
            <h2 className="text-5xl md:text-6xl font-bold text-foreground mb-6 leading-tight">
              Transformando la
              <span className="bg-gradient-to-r from-primary via-primary/80 to-primary/60 bg-clip-text text-transparent block">
                Educación en Ecuador
              </span>
            </h2>
            <p className="text-xl text-muted-foreground mb-12 max-w-3xl mx-auto leading-relaxed">
              EVA conecta estudiantes, profesores y administradores en un entorno digital innovador, diseñado
              específicamente para potenciar el aprendizaje en el sistema educativo ecuatoriano.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link href="/demo">
                <Button size="lg" className="hover-lift modern-shadow text-lg px-8 py-6">
                  <Sparkles className="h-5 w-5 mr-2" />
                  Explorar Demo
                </Button>
              </Link>
              <Link href="/contact">
                <Button size="lg" variant="outline" className="hover-lift text-lg px-8 py-6 bg-transparent">
                  Contactar Ventas
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="py-20 relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h3 className="text-4xl font-bold text-foreground mb-4">Funcionalidades de Vanguardia</h3>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Herramientas modernas que revolucionan la experiencia educativa
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <Card className="hover-lift modern-shadow border-0 bg-card/50 backdrop-blur-sm">
                <CardHeader className="text-center pb-8">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center">
                    <Users className="h-8 w-8 text-white" />
                  </div>
                  <CardTitle className="text-xl">Gestión Inteligente</CardTitle>
                  <CardDescription className="text-base leading-relaxed">
                    Perfiles diferenciados con IA para estudiantes, profesores y administradores
                  </CardDescription>
                </CardHeader>
              </Card>

              <Card className="hover-lift modern-shadow border-0 bg-card/50 backdrop-blur-sm">
                <CardHeader className="text-center pb-8">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center">
                    <BookOpen className="h-8 w-8 text-white" />
                  </div>
                  <CardTitle className="text-xl">Currículo Adaptativo</CardTitle>
                  <CardDescription className="text-base leading-relaxed">
                    Organización completa del currículo ecuatoriano con contenido interactivo
                  </CardDescription>
                </CardHeader>
              </Card>

              <Card className="hover-lift modern-shadow border-0 bg-card/50 backdrop-blur-sm">
                <CardHeader className="text-center pb-8">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center">
                    <Award className="h-8 w-8 text-white" />
                  </div>
                  <CardTitle className="text-xl">Evaluación Avanzada</CardTitle>
                  <CardDescription className="text-base leading-relaxed">
                    Sistema de calificación inteligente adaptado al sistema educativo nacional
                  </CardDescription>
                </CardHeader>
              </Card>

              <Card className="hover-lift modern-shadow border-0 bg-card/50 backdrop-blur-sm">
                <CardHeader className="text-center pb-8">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center">
                    <Calendar className="h-8 w-8 text-white" />
                  </div>
                  <CardTitle className="text-xl">Planificación Smart</CardTitle>
                  <CardDescription className="text-base leading-relaxed">
                    Calendario académico inteligente con recordatorios automáticos
                  </CardDescription>
                </CardHeader>
              </Card>

              <Card className="hover-lift modern-shadow border-0 bg-card/50 backdrop-blur-sm">
                <CardHeader className="text-center pb-8">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-red-500 to-red-600 flex items-center justify-center">
                    <MessageSquare className="h-8 w-8 text-white" />
                  </div>
                  <CardTitle className="text-xl">Comunicación 360°</CardTitle>
                  <CardDescription className="text-base leading-relaxed">
                    Mensajería en tiempo real y colaboración entre toda la comunidad educativa
                  </CardDescription>
                </CardHeader>
              </Card>

              <Card className="hover-lift modern-shadow border-0 bg-card/50 backdrop-blur-sm">
                <CardHeader className="text-center pb-8">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-indigo-500 to-indigo-600 flex items-center justify-center">
                    <BarChart3 className="h-8 w-8 text-white" />
                  </div>
                  <CardTitle className="text-xl">Analytics Educativo</CardTitle>
                  <CardDescription className="text-base leading-relaxed">
                    Estadísticas avanzadas y análisis predictivo del rendimiento académico
                  </CardDescription>
                </CardHeader>
              </Card>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-20 glass-effect">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <div>
                <div className="text-4xl font-bold text-primary mb-2">500+</div>
                <div className="text-muted-foreground">Colegios Conectados</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-primary mb-2">50K+</div>
                <div className="text-muted-foreground">Estudiantes Activos</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-primary mb-2">2.5K+</div>
                <div className="text-muted-foreground">Profesores Certificados</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-primary mb-2">98%</div>
                <div className="text-muted-foreground">Satisfacción</div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="glass-effect rounded-3xl p-12 modern-shadow">
              <Shield className="h-16 w-16 text-primary mx-auto mb-6" />
              <h3 className="text-3xl font-bold text-foreground mb-4">¿Listo para Revolucionar tu Institución?</h3>
              <p className="text-xl text-muted-foreground mb-8">
                Únete a cientos de colegios que ya están transformando la educación con EVA Ecuador
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Button size="lg" className="hover-lift modern-shadow">
                  Comenzar Prueba Gratuita
                </Button>
                <Button size="lg" variant="outline" className="hover-lift bg-transparent">
                  Agendar Demostración
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-card/30 backdrop-blur-sm border-t py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-4 gap-8">
              <div>
                <div className="flex items-center space-x-2 mb-6">
                  <BookOpen className="h-8 w-8 text-primary" />
                  <span className="text-xl font-bold text-foreground">EVA Ecuador</span>
                </div>
                <p className="text-muted-foreground leading-relaxed">
                  Transformando la educación en Ecuador a través de la innovación tecnológica y la excelencia académica.
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-foreground mb-4">Plataforma</h4>
                <ul className="space-y-3 text-muted-foreground">
                  <li>
                    <Link href="/features" className="hover:text-primary transition-colors">
                      Funcionalidades
                    </Link>
                  </li>
                  <li>
                    <Link href="/pricing" className="hover:text-primary transition-colors">
                      Precios
                    </Link>
                  </li>
                  <li>
                    <Link href="/demo" className="hover:text-primary transition-colors">
                      Demo
                    </Link>
                  </li>
                  <li>
                    <Link href="/integrations" className="hover:text-primary transition-colors">
                      Integraciones
                    </Link>
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-foreground mb-4">Soporte</h4>
                <ul className="space-y-3 text-muted-foreground">
                  <li>
                    <Link href="/help" className="hover:text-primary transition-colors">
                      Centro de Ayuda
                    </Link>
                  </li>
                  <li>
                    <Link href="/contact" className="hover:text-primary transition-colors">
                      Contacto
                    </Link>
                  </li>
                  <li>
                    <Link href="/training" className="hover:text-primary transition-colors">
                      Capacitación
                    </Link>
                  </li>
                  <li>
                    <Link href="/community" className="hover:text-primary transition-colors">
                      Comunidad
                    </Link>
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-foreground mb-4">Legal</h4>
                <ul className="space-y-3 text-muted-foreground">
                  <li>
                    <Link href="/privacy" className="hover:text-primary transition-colors">
                      Privacidad
                    </Link>
                  </li>
                  <li>
                    <Link href="/terms" className="hover:text-primary transition-colors">
                      Términos
                    </Link>
                  </li>
                  <li>
                    <Link href="/security" className="hover:text-primary transition-colors">
                      Seguridad
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
            <div className="border-t border-border mt-12 pt-8 text-center text-muted-foreground">
              <p>&copy; 2024 EVA Ecuador. Todos los derechos reservados. Hecho con ❤️ para la educación ecuatoriana.</p>
            </div>
          </div>
        </footer>
      </div>
    </ThemeProvider>
  )
}
