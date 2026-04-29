"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { BookOpen, Users, Calendar, Award, MessageSquare, BarChart3, Sparkles, Zap, Shield } from "lucide-react"
import { ThemeProvider } from "@/contexts/theme-context"
import { LanguageProvider, useLanguage } from "@/contexts/language-context"
import { ThemeSelector } from "@/components/theme-selector"
import { LanguageToggle } from "@/components/language-toggle"

function HomeContent() {
  const { t } = useLanguage()

  return (
    <div className="min-h-screen gradient-bg">
      {/* Header */}
      <header className="glass-effect border-b backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-3">
              <div>
                <h1 className="text-2xl font-bold text-black">
                  {t("home.ministry")}
                </h1>
                <p className="text-xs text-muted-foreground">{t("home.platform")}</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <LanguageToggle />
              <ThemeSelector />
              <Link href="/login">
                <Button variant="ghost" className="hover-lift">
                  {t("home.login")}
                </Button>
              </Link>
              <Link href="/register">
                <Button className="hover-lift modern-shadow">{t("home.register")}</Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-primary/10 text-black text-sm font-medium mb-8">
            <Zap className="h-4 w-4 mr-2 text-black" />
            {t("home.badge")}
          </div>
          <div className="flex items-baseline justify-center gap-4 mb-6">
            <div className="relative">
              <BookOpen className="h-[100px] w-[100px] text-black" />
            </div>
            <h2 className="text-10 xl md:text-9xl font-bold text-foreground leading-tight">
              EDU
            </h2>
          </div>
          <p className="text-xl text-muted-foreground mb-12 max-w-3xl mx-auto leading-relaxed">
            {t("home.description")}
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link href="/demo">
              <Button size="lg" className="hover-lift modern-shadow text-lg px-8 py-6">
                <Sparkles className="h-5 w-5 mr-2" />
                {t("home.demo")}
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h3 className="text-4xl font-bold text-foreground mb-4">{t("home.features.title")}</h3>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              {t("home.features.subtitle")}
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="hover-lift modern-shadow border-0 bg-card/50 backdrop-blur-sm">
              <CardHeader className="text-center pb-8">
                <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center">
                  <Users className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-xl">{t("home.feat1.title")}</CardTitle>
                <CardDescription className="text-base leading-relaxed">
                  {t("home.feat1.desc")}
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="hover-lift modern-shadow border-0 bg-card/50 backdrop-blur-sm">
              <CardHeader className="text-center pb-8">
                <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center">
                  <BookOpen className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-xl">{t("home.feat2.title")}</CardTitle>
                <CardDescription className="text-base leading-relaxed">
                  {t("home.feat2.desc")}
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="hover-lift modern-shadow border-0 bg-card/50 backdrop-blur-sm">
              <CardHeader className="text-center pb-8">
                <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center">
                  <Award className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-xl">{t("home.feat3.title")}</CardTitle>
                <CardDescription className="text-base leading-relaxed">
                  {t("home.feat3.desc")}
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="hover-lift modern-shadow border-0 bg-card/50 backdrop-blur-sm">
              <CardHeader className="text-center pb-8">
                <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center">
                  <Calendar className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-xl">{t("home.feat4.title")}</CardTitle>
                <CardDescription className="text-base leading-relaxed">
                  {t("home.feat4.desc")}
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="hover-lift modern-shadow border-0 bg-card/50 backdrop-blur-sm">
              <CardHeader className="text-center pb-8">
                <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-red-500 to-red-600 flex items-center justify-center">
                  <MessageSquare className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-xl">{t("home.feat5.title")}</CardTitle>
                <CardDescription className="text-base leading-relaxed">
                  {t("home.feat5.desc")}
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="hover-lift modern-shadow border-0 bg-card/50 backdrop-blur-sm">
              <CardHeader className="text-center pb-8">
                <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-indigo-500 to-indigo-600 flex items-center justify-center">
                  <BarChart3 className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-xl">{t("home.feat6.title")}</CardTitle>
                <CardDescription className="text-base leading-relaxed">
                  {t("home.feat6.desc")}
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
              <div className="text-muted-foreground">{t("home.stats.schools")}</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-primary mb-2">50K+</div>
              <div className="text-muted-foreground">{t("home.stats.students")}</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-primary mb-2">2.5K+</div>
              <div className="text-muted-foreground">{t("home.stats.teachers")}</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-primary mb-2">98%</div>
              <div className="text-muted-foreground">{t("home.stats.satisfaction")}</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="glass-effect rounded-3xl p-12 modern-shadow">
            <Shield className="h-16 w-16 text-primary mx-auto mb-6" />
            <h3 className="text-3xl font-bold text-foreground mb-4">{t("home.cta.title")}</h3>
            <p className="text-xl text-muted-foreground mb-8">
              {t("home.cta.desc")}
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button size="lg" className="hover-lift modern-shadow">
                {t("home.cta.start")}
              </Button>
              <Button size="lg" variant="outline" className="hover-lift bg-transparent">
                {t("home.cta.demo")}
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
                <span className="text-xl font-bold text-foreground">EDU Ecuador</span>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                {t("home.footer.desc")}
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-4">{t("home.footer.platform")}</h4>
              <ul className="space-y-3 text-muted-foreground">
                <li>
                  <Link href="/features" className="hover:text-primary transition-colors">
                    {t("home.footer.features")}
                  </Link>
                </li>
                <li>
                  <Link href="/pricing" className="hover:text-primary transition-colors">
                    {t("home.footer.pricing")}
                  </Link>
                </li>
                <li>
                  <Link href="/demo" className="hover:text-primary transition-colors">
                    {t("home.footer.demo")}
                  </Link>
                </li>
                <li>
                  <Link href="/integrations" className="hover:text-primary transition-colors">
                    {t("home.footer.integrations")}
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-4">{t("home.footer.support")}</h4>
              <ul className="space-y-3 text-muted-foreground">
                <li>
                  <Link href="/help" className="hover:text-primary transition-colors">
                    {t("home.footer.help")}
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="hover:text-primary transition-colors">
                    {t("home.footer.contact")}
                  </Link>
                </li>
                <li>
                  <Link href="/training" className="hover:text-primary transition-colors">
                    {t("home.footer.training")}
                  </Link>
                </li>
                <li>
                  <Link href="/community" className="hover:text-primary transition-colors">
                    {t("home.footer.community")}
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-4">{t("home.footer.legal")}</h4>
              <ul className="space-y-3 text-muted-foreground">
                <li>
                  <Link href="/privacy" className="hover:text-primary transition-colors">
                    {t("home.footer.privacy")}
                  </Link>
                </li>
                <li>
                  <Link href="/terms" className="hover:text-primary transition-colors">
                    {t("home.footer.terms")}
                  </Link>
                </li>
                <li>
                  <Link href="/security" className="hover:text-primary transition-colors">
                    {t("home.footer.security")}
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-border mt-12 pt-8 text-center text-muted-foreground">
            <p>{t("home.footer.copy")}</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default function HomePage() {
  return (
    <LanguageProvider>
      <ThemeProvider>
        <HomeContent />
      </ThemeProvider>
    </LanguageProvider>
  )
}
