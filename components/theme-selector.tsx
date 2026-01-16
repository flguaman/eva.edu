"use client"

import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Palette, Check } from "lucide-react"
import { useTheme } from "@/contexts/theme-context"

const themes = [
  { id: "blue", name: "Azul Brillante", color: "bg-blue-500" },
  { id: "green", name: "Verde Vibrante", color: "bg-green-500" },
  { id: "purple", name: "Púrpura Intenso", color: "bg-purple-500" },
  { id: "orange", name: "Naranja Explosivo", color: "bg-orange-500" },
  { id: "dark", name: "Modo Oscuro", color: "bg-gray-800" },
]

export function ThemeSelector() {
  const { theme, setTheme } = useTheme()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          <Palette className="h-5 w-5" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        {themes.map((themeOption) => (
          <DropdownMenuItem
            key={themeOption.id}
            onClick={() => setTheme(themeOption.id as any)}
            className="flex items-center justify-between"
          >
            <div className="flex items-center space-x-2">
              <div className={`w-4 h-4 rounded-full ${themeOption.color}`} />
              <span>{themeOption.name}</span>
            </div>
            {theme === themeOption.id && <Check className="h-4 w-4" />}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
