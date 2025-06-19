"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Sun, ArrowLeft, CheckCircle, HelpCircle, BookOpen, Play } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function SummerPhase1() {
  const [userCode, setUserCode] = useState("")
  const [exerciseComplete, setExerciseComplete] = useState(false)
  const [showTutor, setShowTutor] = useState(false)

  const handleCodeSubmit = () => {
    const code = userCode.toLowerCase()
    if (code.includes("<h1>") && code.includes("<p>") && code.includes("<!doctype html>")) {
      setExerciseComplete(true)
      alert("🎉 Parabéns! Exercício completo!")
    } else {
      alert("❌ Verifique se seu código inclui: <!DOCTYPE html>, <h1> e <p>")
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-300 via-orange-400 to-red-500 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <Link href="/seasons/summer">
            <Button variant="ghost" className="text-white hover:bg-white/20">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Voltar ao Verão
            </Button>
          </Link>
          <div className="flex items-center space-x-3">
            <Sun className="w-8 h-8 text-white" />
            <div>
              <h1 className="text-2xl font-bold text-white">Fase 1: Estrutura Básica HTML</h1>
              <p className="text-white/80">Aprenda os fundamentos do HTML</p>
            </div>
          </div>
        </div>

        {/* Teoria */}
        <Card className="mb-8 bg-white/95">
          <CardHeader className="bg-blue-500 text-white">
            <CardTitle className="flex items-center">
              <BookOpen className="w-5 h-5 mr-2" />📚 Teoria
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <h3 className="text-xl font-bold mb-4">🌟 O que é HTML?</h3>
            <p className="mb-4">
              HTML (HyperText Markup Language) é a linguagem que estrutura páginas web. É como o esqueleto de uma casa!
            </p>

            <div className="bg-gray-100 p-4 rounded-lg mb-4">
              <h4 className="font-bold mb-2">🏗️ Estrutura Básica:</h4>
              <pre className="bg-gray-800 text-green-400 p-4 rounded text-sm overflow-x-auto">
                {`<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <title>Minha Página</title>
</head>
<body>
    <h1>Título Principal</h1>
    <p>Meu primeiro parágrafo!</p>
</body>
</html>`}
              </pre>
            </div>

            <div className="bg-blue-50 p-4 rounded-lg">
              <h4 className="font-bold text-blue-800 mb-2">🔧 Elementos Principais:</h4>
              <ul className="text-blue-700 space-y-1">
                <li>
                  • <code>&lt;!DOCTYPE html&gt;</code> - Declara HTML5
                </li>
                <li>
                  • <code>&lt;html&gt;</code> - Elemento raiz
                </li>
                <li>
                  • <code>&lt;head&gt;</code> - Metadados (não visível)
                </li>
                <li>
                  • <code>&lt;body&gt;</code> - Conteúdo visível
                </li>
                <li>
                  • <code>&lt;h1&gt;</code> - Título principal
                </li>
                <li>
                  • <code>&lt;p&gt;</code> - Parágrafo
                </li>
              </ul>
            </div>
          </CardContent>
        </Card>

        {/* Exercício */}
        <Card className="bg-white/95">
          <CardHeader className="bg-purple-500 text-white">
            <CardTitle className="flex items-center justify-between">
              <div className="flex items-center">
                <Play className="w-5 h-5 mr-2" />🎯 Exercício Prático
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
          <CardContent className="p-6">
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
              <h4 className="font-bold text-yellow-800 mb-2">📝 Sua Missão:</h4>
              <p className="text-yellow-700">
                Crie uma página HTML com título "Bem-vindo ao Verão" e um parágrafo sobre o que você vai aprender.
              </p>
            </div>

            <div className="mb-6">
              <label className="block font-bold mb-2">💻 Digite seu código HTML:</label>
              <textarea
                value={userCode}
                onChange={(e) => setUserCode(e.target.value)}
                className="w-full h-64 bg-gray-900 text-green-400 font-mono p-4 rounded border-2 border-gray-300 focus:border-blue-500"
                placeholder="Digite seu código HTML aqui..."
              />
            </div>

            <div className="flex justify-center">
              <Button
                onClick={handleCodeSubmit}
                className="bg-green-500 hover:bg-green-600 text-white font-bold px-8 py-3"
              >
                ✅ Verificar Código
              </Button>
            </div>

            {exerciseComplete && (
              <motion.div
                className="mt-6 bg-green-50 border border-green-200 rounded-lg p-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <div className="flex items-center mb-4">
                  <CheckCircle className="w-8 h-8 text-green-500 mr-3" />
                  <span className="text-xl font-bold text-green-700">🎉 Parabéns!</span>
                </div>
                <p className="text-green-700 mb-4">Você completou a Fase 1! Agora pode avançar para a próxima fase.</p>
                <Link href="/seasons/summer/phase/2">
                  <Button className="bg-orange-500 hover:bg-orange-600 text-white">🚀 Próxima Fase</Button>
                </Link>
              </motion.div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Tutor Modal */}
      {showTutor && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center mr-3">🤖</div>
              <div>
                <h3 className="font-bold">Tutor IA</h3>
                <p className="text-gray-600 text-sm">Seu assistente pessoal</p>
              </div>
            </div>

            <div className="space-y-3 mb-6">
              <div className="bg-blue-50 p-3 rounded">
                <p className="text-sm">Olá! Precisa de ajuda com HTML? 🤖</p>
              </div>
              <div className="bg-yellow-50 p-3 rounded">
                <p className="text-sm">
                  <strong>💡 Dica:</strong> Lembre-se de incluir DOCTYPE, html, head e body!
                </p>
              </div>
            </div>

            <Button onClick={() => setShowTutor(false)} className="w-full bg-blue-500 hover:bg-blue-600 text-white">
              Entendi, obrigado! 👍
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
