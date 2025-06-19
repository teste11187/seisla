"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Sun, Leaf, MapPin, Snowflake, Play, Star, Trophy, BookOpen } from "lucide-react"
import Link from "next/link"

export default function HomePage() {
  const [selectedSeason, setSelectedSeason] = useState<string | null>(null)
  const [particles, setParticles] = useState<Array<{ id: number; x: number; y: number; delay: number }>>([])

  useEffect(() => {
    // Generate floating particles
    const newParticles = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      delay: Math.random() * 2,
    }))
    setParticles(newParticles)
  }, [])

  const seasons = [
    {
      id: "summer",
      name: "Verão",
      language: "HTML",
      icon: Sun,
      color: "from-orange-400 to-red-500",
      bgColor: "bg-gradient-to-br from-yellow-300 via-orange-400 to-red-500",
      description: "Estruture suas páginas com HTML",
      progress: 0,
      unlocked: true,
    },
    {
      id: "spring",
      name: "Primavera",
      language: "CSS",
      icon: Leaf,
      color: "from-green-400 to-emerald-500",
      bgColor: "bg-gradient-to-br from-green-300 via-emerald-400 to-teal-500",
      description: "Estilize com CSS",
      progress: 0,
      unlocked: false,
    },
    {
      id: "autumn",
      name: "Outono",
      language: "JavaScript",
      icon: MapPin,
      color: "from-amber-400 to-orange-600",
      bgColor: "bg-gradient-to-br from-amber-300 via-orange-400 to-red-600",
      description: "Adicione interatividade",
      progress: 0,
      unlocked: false,
    },
    {
      id: "winter",
      name: "Inverno",
      language: "Python",
      icon: Snowflake,
      color: "from-blue-400 to-purple-500",
      bgColor: "bg-gradient-to-br from-blue-300 via-indigo-400 to-purple-500",
      description: "Programação avançada",
      progress: 0,
      unlocked: false,
    },
  ]

  const navigateToSeason = (seasonName: string) => {
    // Mapear nomes das estações para as rotas corretas
    const seasonRoutes = {
      verao: "/seasons/summer",
      primavera: "/seasons/spring",
      outono: "/seasons/autumn",
      inverno: "/seasons/winter",
    }

    window.location.href = seasonRoutes[seasonName as keyof typeof seasonRoutes] || "/seasons/summer"
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 relative overflow-hidden">
      {/* Animated Background Particles */}
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute w-2 h-2 bg-white rounded-full opacity-20"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
          }}
          animate={{
            y: [0, -20, 0],
            opacity: [0.2, 0.8, 0.2],
          }}
          transition={{
            duration: 3,
            repeat: Number.POSITIVE_INFINITY,
            delay: particle.delay,
          }}
        />
      ))}

      {/* Header */}
      <motion.header
        className="relative z-10 p-6"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <motion.div
              className="w-12 h-12 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center"
              whileHover={{ scale: 1.1, rotate: 180 }}
              transition={{ duration: 0.3 }}
            >
              <BookOpen className="w-6 h-6 text-white" />
            </motion.div>
            <h1 className="text-3xl font-bold text-white">CodeSeasons</h1>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2">
              <Trophy className="w-5 h-5 text-yellow-400" />
              <span className="text-white font-semibold">Nível 1</span>
            </div>
            <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2">
              <Star className="w-5 h-5 text-yellow-400" />
              <span className="text-white font-semibold">0 XP</span>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Main Content */}
      <main className="relative z-10 max-w-7xl mx-auto px-6 py-12">
        {/* Hero Section */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <h2 className="text-6xl font-bold text-white mb-6 leading-tight">
            Aprenda Programação
            <br />
            <span className="bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 bg-clip-text text-transparent">
              Através das Estações
            </span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
            Uma jornada épica através das quatro estações, onde cada uma representa uma linguagem de programação. Comece
            no Verão com HTML e evolua até dominar Python no Inverno!
          </p>
          <motion.button
            className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-8 py-4 rounded-full font-bold text-lg shadow-lg hover:shadow-xl transition-all duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Play className="w-6 h-6 inline mr-2" />
            Começar Jornada
          </motion.button>
        </motion.div>

        {/* Seasons Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {seasons.map((season, index) => {
            const IconComponent = season.icon
            return (
              <motion.div
                key={season.id}
                className="relative"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                onHoverStart={() => setSelectedSeason(season.id)}
                onHoverEnd={() => setSelectedSeason(null)}
              >
                {season.id === "summer" && (
                  <Link href="/seasons/summer">
                    <motion.div
                      className={`relative overflow-hidden rounded-3xl ${season.bgColor} p-8 h-80 cursor-pointer ${
                        !season.unlocked ? "opacity-50 cursor-not-allowed" : ""
                      }`}
                      whileHover={season.unlocked ? { scale: 1.05, y: -10 } : {}}
                      whileTap={season.unlocked ? { scale: 0.95 } : {}}
                      transition={{ duration: 0.3 }}
                    >
                      {/* Background Pattern */}
                      <div className="absolute inset-0 opacity-10">
                        <div className="w-full h-full bg-gradient-to-br from-white/20 to-transparent" />
                      </div>

                      {/* Lock Overlay */}
                      {!season.unlocked && (
                        <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                          <div className="text-white text-center">
                            <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-2">
                              🔒
                            </div>
                            <p className="text-sm">Complete a estação anterior</p>
                          </div>
                        </div>
                      )}

                      {/* Content */}
                      <div className="relative z-10 h-full flex flex-col">
                        <div className="flex items-center justify-between mb-4">
                          <motion.div
                            className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center"
                            animate={selectedSeason === season.id ? { rotate: 360 } : {}}
                            transition={{ duration: 0.6 }}
                          >
                            <IconComponent className="w-8 h-8 text-white" />
                          </motion.div>
                          <div className="text-right">
                            <div className="text-white/80 text-sm font-medium">Estação</div>
                            <div className="text-white text-lg font-bold">{index + 1}/4</div>
                          </div>
                        </div>

                        <div className="flex-1">
                          <h3 className="text-2xl font-bold text-white mb-2">{season.name}</h3>
                          <div className="text-white/90 text-lg font-semibold mb-3">{season.language}</div>
                          <p className="text-white/80 text-sm mb-4">{season.description}</p>
                        </div>

                        {/* Progress Bar */}
                        <div className="mt-auto">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-white/80 text-sm">Progresso</span>
                            <span className="text-white text-sm font-bold">{season.progress}%</span>
                          </div>
                          <div className="w-full bg-white/20 rounded-full h-2">
                            <motion.div
                              className="bg-white rounded-full h-2"
                              initial={{ width: 0 }}
                              animate={{ width: `${season.progress}%` }}
                              transition={{ duration: 1, delay: index * 0.2 }}
                            />
                          </div>
                        </div>
                      </div>

                      {/* Hover Effect */}
                      <AnimatePresence>
                        {selectedSeason === season.id && season.unlocked && (
                          <motion.div
                            className="absolute inset-0 bg-white/10 backdrop-blur-sm"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.2 }}
                          />
                        )}
                      </AnimatePresence>
                    </motion.div>
                  </Link>
                )}
                {season.id === "spring" && (
                  <Link href="/seasons/spring">
                    <motion.div
                      className={`relative overflow-hidden rounded-3xl ${season.bgColor} p-8 h-80 cursor-pointer ${
                        !season.unlocked ? "opacity-50 cursor-not-allowed" : ""
                      }`}
                      whileHover={season.unlocked ? { scale: 1.05, y: -10 } : {}}
                      whileTap={season.unlocked ? { scale: 0.95 } : {}}
                      transition={{ duration: 0.3 }}
                    >
                      {/* Background Pattern */}
                      <div className="absolute inset-0 opacity-10">
                        <div className="w-full h-full bg-gradient-to-br from-white/20 to-transparent" />
                      </div>

                      {/* Lock Overlay */}
                      {!season.unlocked && (
                        <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                          <div className="text-white text-center">
                            <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-2">
                              🔒
                            </div>
                            <p className="text-sm">Complete a estação anterior</p>
                          </div>
                        </div>
                      )}

                      {/* Content */}
                      <div className="relative z-10 h-full flex flex-col">
                        <div className="flex items-center justify-between mb-4">
                          <motion.div
                            className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center"
                            animate={selectedSeason === season.id ? { rotate: 360 } : {}}
                            transition={{ duration: 0.6 }}
                          >
                            <IconComponent className="w-8 h-8 text-white" />
                          </motion.div>
                          <div className="text-right">
                            <div className="text-white/80 text-sm font-medium">Estação</div>
                            <div className="text-white text-lg font-bold">{index + 1}/4</div>
                          </div>
                        </div>

                        <div className="flex-1">
                          <h3 className="text-2xl font-bold text-white mb-2">{season.name}</h3>
                          <div className="text-white/90 text-lg font-semibold mb-3">{season.language}</div>
                          <p className="text-white/80 text-sm mb-4">{season.description}</p>
                        </div>

                        {/* Progress Bar */}
                        <div className="mt-auto">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-white/80 text-sm">Progresso</span>
                            <span className="text-white text-sm font-bold">{season.progress}%</span>
                          </div>
                          <div className="w-full bg-white/20 rounded-full h-2">
                            <motion.div
                              className="bg-white rounded-full h-2"
                              initial={{ width: 0 }}
                              animate={{ width: `${season.progress}%` }}
                              transition={{ duration: 1, delay: index * 0.2 }}
                            />
                          </div>
                        </div>
                      </div>

                      {/* Hover Effect */}
                      <AnimatePresence>
                        {selectedSeason === season.id && season.unlocked && (
                          <motion.div
                            className="absolute inset-0 bg-white/10 backdrop-blur-sm"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.2 }}
                          />
                        )}
                      </AnimatePresence>
                    </motion.div>
                  </Link>
                )}
                {season.id === "autumn" && (
                  <Link href="/seasons/autumn">
                    <motion.div
                      className={`relative overflow-hidden rounded-3xl ${season.bgColor} p-8 h-80 cursor-pointer ${
                        !season.unlocked ? "opacity-50 cursor-not-allowed" : ""
                      }`}
                      whileHover={season.unlocked ? { scale: 1.05, y: -10 } : {}}
                      whileTap={season.unlocked ? { scale: 0.95 } : {}}
                      transition={{ duration: 0.3 }}
                    >
                      {/* Background Pattern */}
                      <div className="absolute inset-0 opacity-10">
                        <div className="w-full h-full bg-gradient-to-br from-white/20 to-transparent" />
                      </div>

                      {/* Lock Overlay */}
                      {!season.unlocked && (
                        <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                          <div className="text-white text-center">
                            <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-2">
                              🔒
                            </div>
                            <p className="text-sm">Complete a estação anterior</p>
                          </div>
                        </div>
                      )}

                      {/* Content */}
                      <div className="relative z-10 h-full flex flex-col">
                        <div className="flex items-center justify-between mb-4">
                          <motion.div
                            className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center"
                            animate={selectedSeason === season.id ? { rotate: 360 } : {}}
                            transition={{ duration: 0.6 }}
                          >
                            <IconComponent className="w-8 h-8 text-white" />
                          </motion.div>
                          <div className="text-right">
                            <div className="text-white/80 text-sm font-medium">Estação</div>
                            <div className="text-white text-lg font-bold">{index + 1}/4</div>
                          </div>
                        </div>

                        <div className="flex-1">
                          <h3 className="text-2xl font-bold text-white mb-2">{season.name}</h3>
                          <div className="text-white/90 text-lg font-semibold mb-3">{season.language}</div>
                          <p className="text-white/80 text-sm mb-4">{season.description}</p>
                        </div>

                        {/* Progress Bar */}
                        <div className="mt-auto">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-white/80 text-sm">Progresso</span>
                            <span className="text-white text-sm font-bold">{season.progress}%</span>
                          </div>
                          <div className="w-full bg-white/20 rounded-full h-2">
                            <motion.div
                              className="bg-white rounded-full h-2"
                              initial={{ width: 0 }}
                              animate={{ width: `${season.progress}%` }}
                              transition={{ duration: 1, delay: index * 0.2 }}
                            />
                          </div>
                        </div>
                      </div>

                      {/* Hover Effect */}
                      <AnimatePresence>
                        {selectedSeason === season.id && season.unlocked && (
                          <motion.div
                            className="absolute inset-0 bg-white/10 backdrop-blur-sm"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.2 }}
                          />
                        )}
                      </AnimatePresence>
                    </motion.div>
                  </Link>
                )}
                {season.id === "winter" && (
                  <Link href="/seasons/winter">
                    <motion.div
                      className={`relative overflow-hidden rounded-3xl ${season.bgColor} p-8 h-80 cursor-pointer ${
                        !season.unlocked ? "opacity-50 cursor-not-allowed" : ""
                      }`}
                      whileHover={season.unlocked ? { scale: 1.05, y: -10 } : {}}
                      whileTap={season.unlocked ? { scale: 0.95 } : {}}
                      transition={{ duration: 0.3 }}
                    >
                      {/* Background Pattern */}
                      <div className="absolute inset-0 opacity-10">
                        <div className="w-full h-full bg-gradient-to-br from-white/20 to-transparent" />
                      </div>

                      {/* Lock Overlay */}
                      {!season.unlocked && (
                        <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                          <div className="text-white text-center">
                            <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-2">
                              🔒
                            </div>
                            <p className="text-sm">Complete a estação anterior</p>
                          </div>
                        </div>
                      )}

                      {/* Content */}
                      <div className="relative z-10 h-full flex flex-col">
                        <div className="flex items-center justify-between mb-4">
                          <motion.div
                            className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center"
                            animate={selectedSeason === season.id ? { rotate: 360 } : {}}
                            transition={{ duration: 0.6 }}
                          >
                            <IconComponent className="w-8 h-8 text-white" />
                          </motion.div>
                          <div className="text-right">
                            <div className="text-white/80 text-sm font-medium">Estação</div>
                            <div className="text-white text-lg font-bold">{index + 1}/4</div>
                          </div>
                        </div>

                        <div className="flex-1">
                          <h3 className="text-2xl font-bold text-white mb-2">{season.name}</h3>
                          <div className="text-white/90 text-lg font-semibold mb-3">{season.language}</div>
                          <p className="text-white/80 text-sm mb-4">{season.description}</p>
                        </div>

                        {/* Progress Bar */}
                        <div className="mt-auto">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-white/80 text-sm">Progresso</span>
                            <span className="text-white text-sm font-bold">{season.progress}%</span>
                          </div>
                          <div className="w-full bg-white/20 rounded-full h-2">
                            <motion.div
                              className="bg-white rounded-full h-2"
                              initial={{ width: 0 }}
                              animate={{ width: `${season.progress}%` }}
                              transition={{ duration: 1, delay: index * 0.2 }}
                            />
                          </div>
                        </div>
                      </div>

                      {/* Hover Effect */}
                      <AnimatePresence>
                        {selectedSeason === season.id && season.unlocked && (
                          <motion.div
                            className="absolute inset-0 bg-white/10 backdrop-blur-sm"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.2 }}
                          />
                        )}
                      </AnimatePresence>
                    </motion.div>
                  </Link>
                )}
              </motion.div>
            )
          })}
        </div>

        {/* Stats Section */}
        <motion.div
          className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          {[
            { label: "Exercícios Práticos", value: "200+", icon: "💻" },
            { label: "Projetos Reais", value: "50+", icon: "🚀" },
            { label: "Horas de Conteúdo", value: "100+", icon: "⏰" },
          ].map((stat, index) => (
            <motion.div
              key={index}
              className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              <div className="text-4xl mb-2">{stat.icon}</div>
              <div className="text-3xl font-bold text-white mb-1">{stat.value}</div>
              <div className="text-gray-300">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </main>
    </div>
  )
}
