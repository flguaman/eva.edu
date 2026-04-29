"use client"

import { Globe } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useLanguage, type Language } from "@/contexts/language-context"

const CYCLE: Language[] = ["es", "en", "qu"]

const LABELS: Record<Language, string> = {
  es: "ES",
  en: "EN",
  qu: "QU",
}

const TITLES: Record<Language, string> = {
  es: "Cambiar a English",
  en: "Change to Kichwa",
  qu: "Tikray Español-man",
}

export function LanguageToggle() {
  const { language, setLanguage } = useLanguage()

  const next = () => {
    const currentIndex = CYCLE.indexOf(language)
    const nextLanguage = CYCLE[(currentIndex + 1) % CYCLE.length]
    setLanguage(nextLanguage)
  }

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={next}
      className="flex items-center gap-1.5 font-semibold text-sm hover:bg-primary/10 transition-colors"
      title={TITLES[language]}
    >
      <Globe className="h-4 w-4" />
      <span>{LABELS[language]}</span>
    </Button>
  )
}
