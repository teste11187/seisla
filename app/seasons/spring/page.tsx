"use client"

import { motion } from "framer-motion"
import { Leaf, ArrowLeft, Lock } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function SpringSeason() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-300 via-emerald-400 to-teal-500 relative overflow-hidden">
      {/* Animated Elements */}
      <motion.div
        className="absolute top-10 right-10 w-32 h-32"
        animate={{ rotate: [0, 10, -10, 0] }}
        transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY }}
      >
        <Leaf className="w-full h-full text-green-200 drop-shadow-lg" />
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
                <Leaf className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white">Estação Primavera</h1>
                <p className="text-white/80">Aprendendo CSS</p>
              </div>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Main Content */}
      <main className="relative z-10 max-w-4xl mx-auto px-6 py-8">
        <Card className="bg-white/95 backdrop-blur-sm border-white/20 shadow-2xl">
          <CardHeader className="bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-t-lg">
            <CardTitle className="flex items-center text-2xl">
              <Lock className="w-6 h-6 mr-3" />🌸 Estação Primavera - CSS
            </CardTitle>
          </CardHeader>
          <CardContent className="p-8 text-center">
            <div className="mb-8">
              <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
                <Lock className="w-12 h-12 text-gray-400" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Conteúdo Bloqueado</h3>
              <p className="text-gray-600 text-lg mb-6">
                Complete todas as fases da <strong>Estação Verão (HTML)</strong> para desbloquear a Primavera!
              </p>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6">
              <h4 className="text-lg font-semibold text-blue-800 mb-3">🎯 O que você vai aprender na Primavera:</h4>
              <ul className="text-blue-700 space-y-2">
                <li>• Como dar estilo e cor às suas páginas HTML</li>
                <li>• Seletores CSS e propriedades básicas</li>
                <li>• Layout e posicionamento de elementos</li>
                <li>• Responsividade para dispositivos móveis</li>
              </ul>
            </div>

            <Link href="/seasons/summer">
              <Button className="bg-gradient-to-r from-orange-400 to-red-500 hover:from-orange-500 hover:to-red-600 text-white font-bold px-8 py-3 text-lg">
                🌞 Voltar ao Verão (HTML)
              </Button>
            </Link>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
