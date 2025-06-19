"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Sun, ArrowLeft, Play, Code, BookOpen, Trophy } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function SummerSeason() {
  const [currentSection, setCurrentSection] = useState(0) // 0: teoria, 1: exemplo, 2: exercício
  const [showTutor, setShowTutor] = useState(false)
  const [userCode, setUserCode] = useState("")
  const [exerciseComplete, setExerciseComplete] = useState(false)
  const [sunRotation, setSunRotation] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setSunRotation((prev) => prev + 1)
    }, 50)
    return () => clearInterval(interval)
  }, [])

  const sections = [
    { id: 0, name: "Teoria", icon: BookOpen },
    { id: 1, name: "Exemplo", icon: Code },
    { id: 2, name: "Exercício", icon: Play },
  ]

  const phases = [
    { id: 1, title: "HTML Básico", description: "Aprenda a estrutura fundamental do HTML." },
    { id: 2, title: "Tags e Elementos", description: "Explore as principais tags e seus usos." },
    { id: 3, title: "Formulários", description: "Crie formulários interativos para coletar dados." },
    { id: 4, title: "HTML Semântico", description: "Use tags semânticas para melhorar a acessibilidade." },
  ]

  const handleCodeSubmit = () => {
    const code = userCode.toLowerCase()
    if (code.includes("<h1>") && code.includes("<p>") && code.includes("<!doctype html>")) {
      setExerciseComplete(true)
      // Salvar progresso
      const progress = JSON.parse(localStorage.getItem("codeseasons_progress") || "{}")
      if (!progress.summer) progress.summer = []
      if (!progress.summer.includes(1)) {
        progress.summer.push(1)
        localStorage.setItem("codeseasons_progress", JSON.stringify(progress))
      }
    } else {
      alert("Verifique se seu código inclui: <!DOCTYPE html>, <h1> e <p>")
    }
  }

  const nextSection = () => {
    if (currentSection < 2) {
      setCurrentSection(currentSection + 1)
    }
  }

  const prevSection = () => {
    if (currentSection > 0) {
      setCurrentSection(currentSection - 1)
    }
  }

  const tutorMessages = [
    "Olá! Eu sou seu tutor IA! 🤖",
    "Estou aqui para te ajudar a dominar HTML!",
    "Lembre-se: HTML é sobre estrutura, não aparência!",
    "Dica: Use sempre tags semânticas para melhor acessibilidade!",
  ]

  const handleVerExemplo = () => {
    console.log("🔥 BOTÃO VER EXEMPLO CLICADO!")
    alert("Navegando para exemplo!") // Temporário para testar
    setCurrentSection(1)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-300 via-orange-400 to-red-500 relative overflow-hidden">
      {/* Animated Sun */}
      <motion.div
        className="absolute top-10 right-10 w-32 h-32 z-0"
        animate={{ rotate: sunRotation }}
        transition={{ duration: 0.1, ease: "linear" }}
      >
        <div className="relative w-full h-full">
          <Sun className="w-full h-full text-yellow-200 drop-shadow-lg" />
          {Array.from({ length: 8 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-8 bg-yellow-200 rounded-full"
              style={{
                top: "50%",
                left: "50%",
                transformOrigin: "50% 64px",
                transform: `translate(-50%, -50%) rotate(${i * 45}deg)`,
              }}
              animate={{
                scaleY: [1, 1.3, 1],
                opacity: [0.7, 1, 0.7],
              }}
              transition={{
                duration: 2,
                repeat: Number.POSITIVE_INFINITY,
                delay: i * 0.1,
              }}
            />
          ))}
        </div>
      </motion.div>

      {/* Floating Elements */}
      {Array.from({ length: 15 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-4 h-4 bg-white/20 rounded-full z-0"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -20, 0],
            x: [0, 10, 0],
            opacity: [0.3, 0.8, 0.3],
          }}
          transition={{
            duration: 3 + Math.random() * 2,
            repeat: Number.POSITIVE_INFINITY,
            delay: Math.random() * 2,
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
          <div className="flex items-center space-x-4">
            <Link href="/">
              <Button variant="ghost" size="sm" className="text-white hover:bg-white/20">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Voltar
              </Button>
            </Link>
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                <Sun className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white">Estação Verão</h1>
                <p className="text-white/80">Aprendendo HTML - Fase 1</p>
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2">
              <Trophy className="w-5 h-5 text-yellow-200" />
              <span className="text-white font-semibold">250 XP</span>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Progress Navigation */}
      <div className="relative z-10 max-w-4xl mx-auto px-6 mb-8">
        <div className="flex items-center justify-center space-x-4">
          {phases.map((phase) => (
            <Link key={phase.id} href={`/seasons/summer/phase/${phase.id}`}>
              <motion.div
                className={`p-4 rounded-lg cursor-pointer transition-all duration-300 ${
                  phase.id === 1
                    ? "bg-white/20 border-2 border-white/40 hover:bg-white/25"
                    : "bg-gray-500/20 opacity-50 cursor-not-allowed"
                }`}
                whileHover={phase.id === 1 ? { scale: 1.02 } : {}}
                whileTap={phase.id === 1 ? { scale: 0.98 } : {}}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-white font-semibold">Fase {phase.id}</span>
                  {phase.id === 1 ? (
                    <Play className="w-5 h-5 text-white" />
                  ) : (
                    <div className="w-5 h-5 bg-gray-400 rounded-full" />
                  )}
                </div>
                <h3 className="text-white text-sm font-medium mb-1">{phase.title}</h3>
                <p className="text-white/70 text-xs">{phase.description}</p>
              </motion.div>
            </Link>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <main className="relative z-10 max-w-6xl mx-auto px-6 py-8">
        <AnimatePresence mode="wait">
          <div className="text-center py-16">
            <h2 className="text-3xl font-bold text-white mb-6">🌞 Bem-vindo ao Verão HTML!</h2>
            <p className="text-white/90 text-xl mb-8">Escolha uma fase para começar sua jornada de aprendizado!</p>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 max-w-2xl mx-auto">
              <h3 className="text-white font-bold text-lg mb-4">🎯 O que você vai aprender:</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-white/80">
                <div>• Estrutura básica HTML</div>
                <div>• Tags e elementos</div>
                <div>• Formulários interativos</div>
                <div>• HTML semântico</div>
              </div>
            </div>
          </div>
        </AnimatePresence>
      </main>

      {/* AI Tutor Modal */}
      <AnimatePresence>
        {showTutor && (
          <motion.div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowTutor(false)}
          >
            <motion.div
              className="bg-white rounded-2xl p-6 max-w-md w-full shadow-2xl"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full flex items-center justify-center">
                  🤖
                </div>
                <div>
                  <h3 className="text-gray-800 font-bold text-lg">Tutor IA</h3>
                  <p className="text-gray-600 text-sm">Seu assistente pessoal</p>
                </div>
              </div>

              <div className="space-y-3 mb-6">
                {tutorMessages.map((message, index) => (
                  <motion.div
                    key={index}
                    className="bg-blue-50 rounded-lg p-3 border border-blue-200"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.2 }}
                  >
                    <p className="text-gray-700 text-sm">{message}</p>
                  </motion.div>
                ))}

                <div className="bg-yellow-50 border border-yellow-300 rounded-lg p-4">
                  <p className="text-gray-700 text-sm">
                    <strong className="text-yellow-800">💡 Dica para o exercício:</strong>
                    <br />
                    Lembre-se de incluir a estrutura básica: DOCTYPE, html, head e body! Cada tag que você abre deve ser
                    fechada.
                  </p>
                </div>
              </div>

              <Button
                onClick={() => setShowTutor(false)}
                className="w-full bg-gradient-to-r from-blue-400 to-purple-500 hover:from-blue-500 hover:to-purple-600 text-white font-semibold py-3"
              >
                Entendi, obrigado! 👍
              </Button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
