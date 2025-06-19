"use client"
import { Sun, ArrowLeft, Lock } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function SummerPhase2() {
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
              <h1 className="text-2xl font-bold text-white">Fase 2: Tags e Atributos</h1>
              <p className="text-white/80">Domine as principais tags HTML</p>
            </div>
          </div>
        </div>

        {/* Conteúdo Bloqueado */}
        <Card className="bg-white/95">
          <CardHeader className="bg-gray-500 text-white">
            <CardTitle className="flex items-center">
              <Lock className="w-5 h-5 mr-2" />🔒 Fase Bloqueada
            </CardTitle>
          </CardHeader>
          <CardContent className="p-8 text-center">
            <div className="mb-6">
              <Lock className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-800 mb-2">Conteúdo Bloqueado</h3>
              <p className="text-gray-600">
                Complete a <strong>Fase 1</strong> para desbloquear esta fase!
              </p>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
              <h4 className="font-bold text-blue-800 mb-2">🎯 O que você vai aprender:</h4>
              <ul className="text-blue-700 text-left space-y-1">
                <li>• Tags de formatação (strong, em, mark)</li>
                <li>• Links e navegação (a href)</li>
                <li>• Imagens e mídia (img, audio, video)</li>
                <li>• Listas ordenadas e não ordenadas</li>
              </ul>
            </div>

            <Link href="/seasons/summer/phase/1">
              <Button className="bg-orange-500 hover:bg-orange-600 text-white">🔙 Voltar à Fase 1</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
