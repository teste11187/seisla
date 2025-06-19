"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  Sun,
  ArrowLeft,
  Play,
  CheckCircle,
  HelpCircle,
  Code,
  BookOpen,
  Trophy,
  ChevronRight,
  ChevronLeft,
} from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function SummerSeasonMelhorada() {
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

  const handleCodeSubmit = () => {
    if (userCode.includes("<h1>") && userCode.includes("<p>") && userCode.includes("<!DOCTYPE html>")) {
      setExerciseComplete(true)
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-300 via-orange-400 to-red-500 relative overflow-hidden">
      {/* Animated Sun */}
      <motion.div
        className="absolute top-10 right-10 w-32 h-32"
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
                <p className="text-white/80">Aprendendo HTML</p>
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

      {/* Navigation */}
      <div className="relative z-10 max-w-4xl mx-auto px-6 mb-8">
        <div className="flex items-center justify-center space-x-4">
          {sections.map((section, index) => {
            const IconComponent = section.icon
            return (
              <motion.button
                key={section.id}
                onClick={() => setCurrentSection(section.id)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-full transition-all duration-300 ${
                  currentSection === section.id
                    ? "bg-white text-orange-500 shadow-lg"
                    : "bg-white/20 text-white hover:bg-white/30"
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <IconComponent className="w-4 h-4" />
                <span className="font-semibold">{section.name}</span>
                {index < sections.length - 1 && currentSection > index && (
                  <CheckCircle className="w-4 h-4 text-green-500" />
                )}
              </motion.button>
            )
          })}
        </div>
      </div>

      {/* Main Content */}
      <main className="relative z-10 max-w-6xl mx-auto px-6 py-8">
        <AnimatePresence mode="wait">
          {/* Seção Teoria */}
          {currentSection === 0 && (
            <motion.div
              key="teoria"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 50 }}
              transition={{ duration: 0.5 }}
            >
              <Card className="bg-white/10 backdrop-blur-sm border-white/20">
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    <BookOpen className="w-5 h-5 mr-2" />
                    Estrutura Básica HTML
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="prose prose-invert max-w-none">
                    <div className="text-white/90 leading-relaxed">
                      <h3 className="text-xl font-bold text-white mb-4">A Base de Tudo: HTML</h3>
                      <p className="mb-4">
                        HTML (HyperText Markup Language) é a linguagem de marcação que estrutura o conteúdo da web. É
                        como o esqueleto de uma casa - define onde cada elemento vai ficar!
                      </p>

                      <h4 className="text-lg font-semibold text-white mb-3">Estrutura Básica</h4>
                      <p className="mb-4">Todo documento HTML precisa ter uma estrutura básica:</p>

                      <div className="bg-black/30 rounded-lg p-4 mb-6 font-mono text-sm overflow-x-auto">
                        <pre className="text-green-300">
                          {`<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Minha Primeira Página</title>
</head>
<body>
    <h1>Olá, Mundo!</h1>
    <p>Esta é minha primeira página HTML!</p>
</body>
</html>`}
                        </pre>
                      </div>

                      <h4 className="text-lg font-semibold text-white mb-3">Elementos Principais</h4>
                      <ul className="list-disc list-inside space-y-2 text-white/80">
                        <li>
                          <strong className="text-white">DOCTYPE</strong>: Declara o tipo de documento
                        </li>
                        <li>
                          <strong className="text-white">html</strong>: Elemento raiz que contém todo o conteúdo
                        </li>
                        <li>
                          <strong className="text-white">head</strong>: Metadados da página (não visível)
                        </li>
                        <li>
                          <strong className="text-white">body</strong>: Conteúdo visível da página
                        </li>
                      </ul>
                    </div>
                  </div>

                  <div className="flex justify-end mt-6">
                    <Button
                      onClick={nextSection}
                      className="bg-gradient-to-r from-green-400 to-emerald-500 hover:from-green-500 hover:to-emerald-600 text-white font-semibold px-6 py-2"
                    >
                      Ver Exemplo
                      <ChevronRight className="w-4 h-4 ml-2" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {/* Seção Exemplo */}
          {currentSection === 1 && (
            <motion.div
              key="exemplo"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 50 }}
              transition={{ duration: 0.5 }}
            >
              <Card className="bg-white/10 backdrop-blur-sm border-white/20">
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    <Code className="w-5 h-5 mr-2" />
                    Exemplo Prático
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="bg-black/30 rounded-lg p-4 mb-4 font-mono text-sm overflow-x-auto">
                    <pre className="text-green-300">
                      {`<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Bem-vindo ao Verão</title>
</head>
<body>
    <h1>Bem-vindo ao Verão!</h1>
    <p>Esta é minha primeira página HTML!</p>
    <p>Estou aprendendo no CodeSeasons!</p>
</body>
</html>`}
                    </pre>
                  </div>

                  <div className="bg-blue-500/20 border border-blue-400/30 rounded-lg p-4 mb-6">
                    <h4 className="text-white font-semibold mb-2">📋 Como este código funciona:</h4>
                    <ul className="text-white/90 space-y-1 text-sm">
                      <li>
                        • <code>{"<!DOCTYPE html>"}</code> - Declara que é HTML5
                      </li>
                      <li>
                        • <code>{'<html lang="pt-br">'}</code> - Define o idioma
                      </li>
                      <li>
                        • <code>{"<head>"}</code> - Informações sobre a página
                      </li>
                      <li>
                        • <code>{"<title>"}</code> - Título que aparece na aba
                      </li>
                      <li>
                        • <code>{"<body>"}</code> - Conteúdo visível da página
                      </li>
                      <li>
                        • <code>{"<h1>"}</code> - Título principal
                      </li>
                      <li>
                        • <code>{"<p>"}</code> - Parágrafos de texto
                      </li>
                    </ul>
                  </div>

                  <div className="flex justify-between">
                    <Button onClick={prevSection} variant="ghost" className="text-white hover:bg-white/20">
                      <ChevronLeft className="w-4 h-4 mr-2" />
                      Voltar
                    </Button>
                    <Button
                      onClick={nextSection}
                      className="bg-gradient-to-r from-blue-400 to-purple-500 hover:from-blue-500 hover:to-purple-600 text-white font-semibold px-6 py-2"
                    >
                      Praticar Agora
                      <ChevronRight className="w-4 h-4 ml-2" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {/* Seção Exercício */}
          {currentSection === 2 && (
            <motion.div
              key="exercicio"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 50 }}
              transition={{ duration: 0.5 }}
            >
              <Card className="bg-white/10 backdrop-blur-sm border-white/20">
                <CardHeader>
                  <CardTitle className="text-white flex items-center justify-between">
                    <div className="flex items-center">
                      <Play className="w-5 h-5 mr-2" />
                      Exercício Prático
                    </div>
                    <Button
                      onClick={() => setShowTutor(true)}
                      variant="ghost"
                      size="sm"
                      className="text-white hover:bg-white/20"
                    >
                      <HelpCircle className="w-4 h-4 mr-2" />
                      Ajuda
                    </Button>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="bg-blue-500/20 border border-blue-400/30 rounded-lg p-4">
                    <h4 className="text-white font-semibold mb-2">📝 Sua Missão:</h4>
                    <p className="text-white/90">
                      Crie uma página HTML básica com um título "Bem-vindo ao Verão" e um parágrafo explicando o que
                      você vai aprender.
                    </p>
                  </div>

                  <div className="space-y-4">
                    <label className="text-white font-medium block">Seu Código HTML:</label>
                    <textarea
                      value={userCode}
                      onChange={(e) => setUserCode(e.target.value)}
                      className="w-full h-64 bg-black/30 border border-white/20 rounded-lg p-4 text-green-300 font-mono text-sm resize-none focus:outline-none focus:border-white/40"
                      placeholder="Digite seu código HTML aqui..."
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <Button onClick={prevSection} variant="ghost" className="text-white hover:bg-white/20">
                      <ChevronLeft className="w-4 h-4 mr-2" />
                      Voltar
                    </Button>

                    <Button
                      onClick={handleCodeSubmit}
                      className="bg-gradient-to-r from-green-400 to-emerald-500 hover:from-green-500 hover:to-emerald-600 text-white font-semibold px-6 py-2"
                    >
                      Verificar Código
                    </Button>
                  </div>

                  {exerciseComplete && (
                    <motion.div
                      className="bg-green-500/20 border border-green-400/30 rounded-lg p-4"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5 }}
                    >
                      <div className="flex items-center space-x-2 text-green-400 mb-3">
                        <CheckCircle className="w-6 h-6" />
                        <span className="font-semibold">Exercício Completo! +50 XP</span>
                      </div>
                      <p className="text-white/90 mb-3">
                        Parabéns! Você completou seu primeiro exercício HTML! Agora você pode avançar para a próxima
                        fase.
                      </p>
                      <Button className="bg-gradient-to-r from-orange-400 to-red-500 hover:from-orange-500 hover:to-red-600 text-white">
                        Próxima Fase
                      </Button>
                    </motion.div>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          )}
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
              className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 max-w-md w-full"
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
                  <h3 className="text-white font-bold">Tutor IA</h3>
                  <p className="text-white/70 text-sm">Seu assistente pessoal</p>
                </div>
              </div>

              <div className="space-y-3 mb-6">
                {tutorMessages.map((message, index) => (
                  <motion.div
                    key={index}
                    className="bg-white/10 rounded-lg p-3"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.2 }}
                  >
                    <p className="text-white/90 text-sm">{message}</p>
                  </motion.div>
                ))}

                <div className="bg-yellow-500/20 border border-yellow-400/30 rounded-lg p-3">
                  <p className="text-white/90 text-sm">
                    <strong>💡 Dica para o exercício:</strong>
                    <br />
                    Lembre-se de incluir a estrutura básica: DOCTYPE, html, head e body!
                  </p>
                </div>
              </div>

              <Button
                onClick={() => setShowTutor(false)}
                className="w-full bg-gradient-to-r from-blue-400 to-purple-500 hover:from-blue-500 hover:to-purple-600 text-white"
              >
                Entendi, obrigado!
              </Button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
