"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Trophy, Star, Target, Award, Crown, Flame, BookOpen } from "lucide-react"

interface Achievement {
  id: string
  title: string
  description: string
  icon: any
  points: number
  unlocked: boolean
  progress: number
  maxProgress: number
  rarity: "common" | "rare" | "epic" | "legendary"
}

interface UserStats {
  level: number
  totalPoints: number
  pointsToNextLevel: number
  streak: number
  rank: number
  totalStudents: number
}

export function GamificationSystem() {
  const [userStats, setUserStats] = useState<UserStats>({
    level: 12,
    totalPoints: 2450,
    pointsToNextLevel: 550,
    streak: 7,
    rank: 23,
    totalStudents: 1247,
  })

  const [achievements, setAchievements] = useState<Achievement[]>([
    {
      id: "first_assignment",
      title: "Primera Tarea",
      description: "Completa tu primera tarea",
      icon: BookOpen,
      points: 50,
      unlocked: true,
      progress: 1,
      maxProgress: 1,
      rarity: "common",
    },
    {
      id: "perfect_week",
      title: "Semana Perfecta",
      description: "Obtén 10/10 en todas las materias durante una semana",
      icon: Star,
      points: 200,
      unlocked: true,
      progress: 1,
      maxProgress: 1,
      rarity: "rare",
    },
    {
      id: "streak_master",
      title: "Maestro de Rachas",
      description: "Mantén una racha de 30 días consecutivos",
      icon: Flame,
      points: 500,
      unlocked: false,
      progress: 7,
      maxProgress: 30,
      rarity: "epic",
    },
    {
      id: "top_student",
      title: "Estudiante Destacado",
      description: "Alcanza el top 10 de tu clase",
      icon: Crown,
      points: 1000,
      unlocked: false,
      progress: 23,
      maxProgress: 10,
      rarity: "legendary",
    },
  ])

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case "common":
        return "from-gray-400 to-gray-500"
      case "rare":
        return "from-blue-400 to-blue-500"
      case "epic":
        return "from-purple-400 to-purple-500"
      case "legendary":
        return "from-yellow-400 to-yellow-500"
      default:
        return "from-gray-400 to-gray-500"
    }
  }

  const levelProgress = ((3000 - userStats.pointsToNextLevel) / 3000) * 100

  return (
    <div className="space-y-6">
      {/* User Level Card */}
      <Card className="modern-shadow border-0 glass-effect hover-lift">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-primary/70 flex items-center justify-center">
              <Trophy className="h-5 w-5 text-white" />
            </div>
            <span>Tu Progreso Académico</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-3xl font-bold text-primary">Nivel {userStats.level}</div>
              <div className="text-sm text-muted-foreground">Estudiante Avanzado</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-orange-500">{userStats.totalPoints}</div>
              <div className="text-sm text-muted-foreground">Puntos Totales</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-red-500">{userStats.streak}</div>
              <div className="text-sm text-muted-foreground">Días de Racha</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-500">#{userStats.rank}</div>
              <div className="text-sm text-muted-foreground">Ranking Global</div>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Progreso al Nivel {userStats.level + 1}</span>
              <span>{userStats.pointsToNextLevel} puntos restantes</span>
            </div>
            <Progress value={levelProgress} className="h-3" />
          </div>
        </CardContent>
      </Card>

      {/* Achievements */}
      <Card className="modern-shadow border-0 glass-effect">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Award className="h-5 w-5 text-primary" />
            <span>Logros Académicos</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {achievements.map((achievement) => (
              <div
                key={achievement.id}
                className={`p-4 rounded-lg border-2 transition-all hover-lift ${
                  achievement.unlocked ? "border-primary/20 bg-primary/5" : "border-gray-200 bg-gray-50 opacity-75"
                }`}
              >
                <div className="flex items-start space-x-3">
                  <div
                    className={`w-12 h-12 rounded-xl bg-gradient-to-br ${getRarityColor(
                      achievement.rarity,
                    )} flex items-center justify-center`}
                  >
                    <achievement.icon className="h-6 w-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <h4 className="font-medium">{achievement.title}</h4>
                      <Badge variant={achievement.unlocked ? "default" : "secondary"}>{achievement.points} pts</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">{achievement.description}</p>
                    {!achievement.unlocked && (
                      <div className="space-y-1">
                        <div className="flex justify-between text-xs">
                          <span>Progreso</span>
                          <span>
                            {achievement.progress}/{achievement.maxProgress}
                          </span>
                        </div>
                        <Progress value={(achievement.progress / achievement.maxProgress) * 100} className="h-2" />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Leaderboard */}
      <Card className="modern-shadow border-0 glass-effect">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Target className="h-5 w-5 text-primary" />
            <span>Tabla de Clasificación - 10mo A</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[
              { name: "Ana Rodríguez", points: 2890, rank: 1, avatar: "AR" },
              { name: "Carlos Pérez", points: 2650, rank: 2, avatar: "CP" },
              { name: "María González", points: 2450, rank: 3, avatar: "MG", isCurrentUser: true },
              { name: "Luis Martínez", points: 2340, rank: 4, avatar: "LM" },
              { name: "Sofia López", points: 2180, rank: 5, avatar: "SL" },
            ].map((student) => (
              <div
                key={student.rank}
                className={`flex items-center justify-between p-3 rounded-lg ${
                  student.isCurrentUser ? "bg-primary/10 border border-primary/20" : "bg-secondary/30"
                }`}
              >
                <div className="flex items-center space-x-3">
                  <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-br from-primary to-primary/70 text-white text-sm font-bold">
                    {student.rank}
                  </div>
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-blue-500 flex items-center justify-center text-white font-medium">
                    {student.avatar}
                  </div>
                  <div>
                    <div className="font-medium">{student.name}</div>
                    {student.isCurrentUser && <div className="text-xs text-primary font-medium">Tú</div>}
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-bold text-primary">{student.points}</div>
                  <div className="text-xs text-muted-foreground">puntos</div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
