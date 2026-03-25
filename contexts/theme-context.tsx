"use client"

import type React from "react"
import { createContext, useContext, useEffect, useState } from "react"

type Theme = "blue" | "green" | "purple" | "orange" | "dark"

interface ThemeContextType {
  theme: Theme
  setTheme: (theme: Theme) => void
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>("blue")

  const STORAGE_KEY = "edu-theme"
  const LEGACY_STORAGE_KEY = "eva-theme"

  useEffect(() => {
    const savedTheme =
      (localStorage.getItem(STORAGE_KEY) as Theme) ??
      (localStorage.getItem(LEGACY_STORAGE_KEY) as Theme)

    if (savedTheme) {
      setTheme(savedTheme)

      // Migrate legacy key for users upgrading from EVA to EDU
      if (localStorage.getItem(LEGACY_STORAGE_KEY) && !localStorage.getItem(STORAGE_KEY)) {
        localStorage.setItem(STORAGE_KEY, savedTheme)
      }
    }
  }, [])

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, theme)
    document.documentElement.setAttribute("data-theme", theme)
    document.documentElement.classList.toggle("dark", theme === "dark")
  }, [theme])

  return <ThemeContext.Provider value={{ theme, setTheme }}>{children}</ThemeContext.Provider>
}

export function useTheme() {
  const context = useContext(ThemeContext)
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider")
  }
  return context
}
