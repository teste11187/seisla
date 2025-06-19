// JavaScript para páginas de fase - Versão Educacional Melhorada

let currentSection = "content"
let exerciseCompleted = false
const sectionProgress = {
  content: false,
  example: false,
  explanation: false,
  exercise: false,
}

// Inicialização
document.addEventListener("DOMContentLoaded", () => {
  initializePhase()
  setupProgressTracking()
  setupCodeEditor()
  setupTutorSuggestions()
})

// Inicializar fase
function initializePhase() {
  // Mostrar primeira seção
  showSection("content")
  updateProgressCircle()

  // Configurar syntax highlighting
  if (typeof Prism !== "undefined") {
    Prism.highlightAll()
  }
}

// Configurar rastreamento de progresso
function setupProgressTracking() {
  // Marcar seção de conteúdo como vista após leitura
  setTimeout(() => {
    markSectionComplete("content")
  }, 15000) // 15 segundos para ler o conteúdo
}

// Mostrar seção específica
function showSection(sectionName) {
  // Esconder todas as seções
  document
    .querySelectorAll(".content-section, .example-section, .explanation-section, .exercise-section")
    .forEach((section) => {
      section.classList.remove("active")
    })

  // Mostrar seção solicitada
  const targetSection = document.getElementById(`${sectionName}-section`)
  if (targetSection) {
    targetSection.classList.add("active")
    currentSection = sectionName

    // Scroll para o topo
    window.scrollTo({ top: 0, behavior: "smooth" })

    // Ações específicas por seção
    if (sectionName === "example") {
      runCodeExample()
      markSectionComplete("example")
    } else if (sectionName === "explanation") {
      markSectionComplete("explanation")
    } else if (sectionName === "exercise") {
      focusExerciseEditor()
    }
  }
}

// Navegar para próxima seção
function nextSection(targetSection) {
  markSectionComplete(currentSection)
  showSection(targetSection)
}

// Navegar para seção anterior
function previousSection(targetSection) {
  showSection(targetSection)
}

// Marcar seção como completa
function markSectionComplete(sectionName) {
  sectionProgress[sectionName] = true
  updateProgressCircle()
}

// Atualizar círculo de progresso
function updateProgressCircle() {
  const completedSections = Object.values(sectionProgress).filter(Boolean).length
  const totalSections = Object.keys(sectionProgress).length
  const percentage = Math.round((completedSections / totalSections) * 100)

  // Atualizar círculo SVG
  const circle = document.querySelector(".progress-ring-circle")
  if (circle) {
    const radius = circle.r.baseVal.value
    const circumference = radius * 2 * Math.PI
    const offset = circumference - (percentage / 100) * circumference

    circle.style.strokeDasharray = `${circumference} ${circumference}`
    circle.style.strokeDashoffset = offset
  }

  // Atualizar texto
  const percentageText = document.querySelector(".progress-percentage")
  if (percentageText) {
    percentageText.textContent = `${percentage}%`
  }
}

// Executar exemplo de código
function runCodeExample() {
  const codeExample = window.phaseData.codeExample
  const preview = document.getElementById("code-preview")

  if (preview && codeExample) {
    const blob = new Blob([codeExample], { type: "text/html" })
    const url = URL.createObjectURL(blob)
    preview.src = url

    // Limpar URL após carregar
    preview.onload = () => {
      URL.revokeObjectURL(url)
    }
  }
}

// Executar código do usuário
function runUserCode() {
  const userCode = document.getElementById("user-code").value
  const preview = document.getElementById("user-code-preview")

  if (preview && userCode) {
    const blob = new Blob([userCode], { type: "text/html" })
    const url = URL.createObjectURL(blob)
    preview.src = url

    preview.onload = () => {
      URL.revokeObjectURL(url)
    }

    showNotification("Código executado! Veja o resultado abaixo.", "success")
  } else {
    showNotification("Digite algum código primeiro!", "warning")
  }
}

// Copiar código
function copyCode() {
  const codeElement = document.getElementById("code-example")
  if (codeElement) {
    const text = codeElement.textContent
    navigator.clipboard
      .writeText(text)
      .then(() => {
        showNotification("Código copiado para a área de transferência! 📋", "success")
      })
      .catch(() => {
        showNotification("Erro ao copiar código", "error")
      })
  }
}

// Configurar editor de código
function setupCodeEditor() {
  const textarea = document.getElementById("user-code")
  if (textarea) {
    // Auto-resize
    textarea.addEventListener("input", function () {
      this.style.height = "auto"
      this.style.height = Math.max(this.scrollHeight, 250) + "px"
    })

    // Tab support
    textarea.addEventListener("keydown", function (e) {
      if (e.key === "Tab") {
        e.preventDefault()
        const start = this.selectionStart
        const end = this.selectionEnd

        this.value = this.value.substring(0, start) + "    " + this.value.substring(end)
        this.selectionStart = this.selectionEnd = start + 4
      }
    })

    // Auto-executar código quando o usuário para de digitar
    let typingTimer
    textarea.addEventListener("input", function () {
      clearTimeout(typingTimer)
      typingTimer = setTimeout(() => {
        if (this.value.trim()) {
          runUserCode()
        }
      }, 2000) // 2 segundos após parar de digitar
    })
  }
}

// Focar no editor de exercício
function focusExerciseEditor() {
  setTimeout(() => {
    const textarea = document.getElementById("user-code")
    if (textarea) {
      textarea.focus()
    }
  }, 500)
}

// Verificar exercício com feedback detalhado
async function checkExercise() {
  const userCode = document.getElementById("user-code").value.trim()

  if (!userCode) {
    showNotification("Por favor, digite seu código primeiro! ✏️", "warning")
    return
  }

  // Mostrar loading
  const checkButton = document.querySelector('[onclick="checkExercise()"]')
  const originalText = checkButton.innerHTML
  checkButton.innerHTML = '<span class="button-icon">⏳</span> Verificando...'
  checkButton.disabled = true

  try {
    const response = await fetch("/api/check-exercise", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        code: userCode,
        season: window.phaseData.season,
        phase: window.phaseData.phase,
      }),
    })

    const result = await response.json()
    showExerciseFeedback(result)

    if (result.passed) {
      exerciseCompleted = true
      markSectionComplete("exercise")
      enableCompleteButton()
      showNotification("🎉 Parabéns! Exercício completado com sucesso!", "success")
    } else {
      showNotification("Continue tentando! Você está no caminho certo. 💪", "info")
    }
  } catch (error) {
    showNotification("Erro ao verificar exercício. Tente novamente! 🔄", "error")
  } finally {
    checkButton.innerHTML = originalText
    checkButton.disabled = false
  }
}

// Mostrar feedback detalhado do exercício
function showExerciseFeedback(result) {
  const feedbackContainer = document.getElementById("exercise-feedback")

  let feedbackHTML = ""
  const isSuccess = result.passed

  feedbackHTML += `<div class="feedback-score">
        📊 Pontuação: ${result.score}/100 pontos
    </div>`

  if (result.feedback && result.feedback.length > 0) {
    result.feedback.forEach((feedback) => {
      feedbackHTML += `
                <div class="feedback-item">
                    <span class="feedback-icon">${feedback.includes("✅") ? "✅" : feedback.includes("❌") ? "❌" : feedback.includes("⚠️") ? "⚠️" : "💡"}</span>
                    <span>${feedback}</span>
                </div>
            `
    })
  }

  if (isSuccess) {
    feedbackHTML += `
            <div class="feedback-item">
                <span class="feedback-icon">🎉</span>
                <span><strong>Excelente trabalho!</strong> Você pode avançar para a próxima fase!</span>
            </div>
        `
  }

  feedbackContainer.innerHTML = feedbackHTML
  feedbackContainer.className = `exercise-feedback ${isSuccess ? "success" : "error"}`

  // Scroll para o feedback
  feedbackContainer.scrollIntoView({ behavior: "smooth", block: "nearest" })
}

// Mostrar dica contextual
function showHint() {
  const hints = [
    "💡 Lembre-se de começar com <!DOCTYPE html>",
    "💡 Toda tag que abre deve fechar: <tag></tag>",
    "💡 Use indentação para organizar seu código",
    "💡 O <head> contém informações sobre a página",
    "💡 O <body> contém o conteúdo visível",
    "💡 Teste seu código clicando em 'Testar' antes de verificar",
  ]

  const randomHint = hints[Math.floor(Math.random() * hints.length)]
  showNotification(randomHint, "info", 5000)
}

// Habilitar botão de conclusão
function enableCompleteButton() {
  const completeButton = document.getElementById("complete-button")
  if (completeButton) {
    completeButton.classList.remove("disabled")
    completeButton.style.background = "linear-gradient(135deg, #4CAF50, #45a049)"
  }
}

// Concluir fase
function completePhase() {
  if (!exerciseCompleted) {
    showNotification("Complete o exercício primeiro! 🎯", "warning")
    return
  }

  // Salvar progresso
  const progress = JSON.parse(localStorage.getItem("codeseasons_progress") || "{}")
  if (!progress[window.phaseData.season]) {
    progress[window.phaseData.season] = []
  }

  if (!progress[window.phaseData.season].includes(window.phaseData.phase)) {
    progress[window.phaseData.season].push(window.phaseData.phase)
    localStorage.setItem("codeseasons_progress", JSON.stringify(progress))
  }

  // Mostrar celebração
  showPhaseCompletionModal()
}

// Configurar sugestões do tutor
function setupTutorSuggestions() {
  // Adicionar sugestões contextuais baseadas na fase atual
  const suggestions = document.querySelector(".tutor-suggestions")
  if (suggestions && window.phaseData.season === "verao" && window.phaseData.phase === 1) {
    suggestions.innerHTML = `
            <div class="suggestion-title">💡 Perguntas sugeridas:</div>
            <button class="suggestion-btn" onclick="askSuggestion('o que é html')">O que é HTML?</button>
            <button class="suggestion-btn" onclick="askSuggestion('o que é head')">Para que serve o head?</button>
            <button class="suggestion-btn" onclick="askSuggestion('o que é body')">Para que serve o body?</button>
            <button class="suggestion-btn" onclick="askSuggestion('o que é tag')">Como funcionam as tags?</button>
        `
  }
}

// Fazer pergunta sugerida
function askSuggestion(question) {
  const input = document.getElementById("tutorInput")
  input.value = question
  sendToTutor()
}

// Toggle fullscreen para preview
function toggleFullscreen() {
  const preview = document.getElementById("code-preview")
  if (preview) {
    if (preview.requestFullscreen) {
      preview.requestFullscreen()
    } else if (preview.webkitRequestFullscreen) {
      preview.webkitRequestFullscreen()
    } else if (preview.msRequestFullscreen) {
      preview.msRequestFullscreen()
    }
  }
}

// Toggle fullscreen para preview do usuário
function toggleUserFullscreen() {
  const preview = document.getElementById("user-code-preview")
  if (preview) {
    if (preview.requestFullscreen) {
      preview.requestFullscreen()
    } else if (preview.webkitRequestFullscreen) {
      preview.webkitRequestFullscreen()
    } else if (preview.msRequestFullscreen) {
      preview.msRequestFullscreen()
    }
  }
}

// Mostrar modal de conclusão da fase
function showPhaseCompletionModal() {
  const modal = document.createElement("div")
  modal.className = "completion-modal"
  modal.innerHTML = `
        <div class="modal-content">
            <div class="completion-animation">
                <div class="success-icon">🎉</div>
                <div class="confetti"></div>
            </div>
            <h2>Parabéns!</h2>
            <p>Você completou a <strong>Fase ${window.phaseData.phase}</strong> com sucesso!</p>
            <div class="completion-stats">
                <div class="stat">
                    <span class="stat-icon">⭐</span>
                    <span class="stat-value">+100 XP</span>
                </div>
                <div class="stat">
                    <span class="stat-icon">🏆</span>
                    <span class="stat-value">Nova Conquista</span>
                </div>
                <div class="stat">
                    <span class="stat-icon">🔥</span>
                    <span class="stat-value">Sequência +1</span>
                </div>
            </div>
            <div class="completion-actions">
                <button class="action-button secondary" onclick="closeCompletionModal()">
                    Continuar Estudando
                </button>
                <button class="action-button primary" onclick="goToNextPhase()">
                    Próxima Fase
                </button>
            </div>
        </div>
    `

  modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.8);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10000;
        animation: modalFadeIn 0.3s ease;
    `

  document.body.appendChild(modal)
  addCompletionModalStyles()
  createConfetti()
}

// Adicionar estilos do modal
function addCompletionModalStyles() {
  if (document.getElementById("completion-modal-styles")) return

  const style = document.createElement("style")
  style.id = "completion-modal-styles"
  style.textContent = `
        @keyframes modalFadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }
        
        .completion-modal .modal-content {
            background: white;
            padding: 3rem;
            border-radius: 20px;
            text-align: center;
            max-width: 500px;
            position: relative;
            animation: modalSlideUp 0.5s ease;
        }
        
        @keyframes modalSlideUp {
            from { transform: translateY(50px); opacity: 0; }
            to { transform: translateY(0); opacity: 1; }
        }
        
        .completion-animation {
            position: relative;
            margin-bottom: 2rem;
        }
        
        .success-icon {
            font-size: 4rem;
            animation: bounce 1s infinite;
        }
        
        .completion-modal h2 {
            color: var(--dark);
            margin-bottom: 1rem;
            font-size: 2rem;
        }
        
        .completion-modal p {
            color: var(--gray);
            margin-bottom: 2rem;
            font-size: 1.1rem;
        }
        
        .completion-stats {
            display: flex;
            justify-content: center;
            gap: 2rem;
            margin-bottom: 2rem;
        }
        
        .stat {
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 0.5rem;
            background: var(--light-gray);
            padding: 1rem;
            border-radius: 10px;
            min-width: 100px;
        }
        
        .stat-icon {
            font-size: 2rem;
        }
        
        .stat-value {
            font-weight: 600;
            color: var(--dark);
        }
        
        .completion-actions {
            display: flex;
            gap: 1rem;
            justify-content: center;
        }
        
        .confetti {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
        }
    `

  document.head.appendChild(style)
}

// Criar confetti
function createConfetti() {
  const confettiContainer = document.querySelector(".confetti")
  const colors = ["#FF6B35", "#FFD23F", "#FF8E53", "#4CAF50", "#2196F3", "#9C27B0"]

  for (let i = 0; i < 50; i++) {
    const confetti = document.createElement("div")
    confetti.style.cssText = `
            position: absolute;
            width: 10px;
            height: 10px;
            background: ${colors[Math.floor(Math.random() * colors.length)]};
            top: ${Math.random() * 100}%;
            left: ${Math.random() * 100}%;
            animation: confettiFall ${2 + Math.random() * 3}s ease-out forwards;
            animation-delay: ${Math.random() * 2}s;
        `

    confettiContainer.appendChild(confetti)
  }

  // Adicionar animação do confetti
  if (!document.getElementById("confetti-animation")) {
    const style = document.createElement("style")
    style.id = "confetti-animation"
    style.textContent = `
            @keyframes confettiFall {
                0% {
                    transform: translateY(-100px) rotate(0deg);
                    opacity: 1;
                }
                100% {
                    transform: translateY(300px) rotate(720deg);
                    opacity: 0;
                }
            }
        `
    document.head.appendChild(style)
  }
}

// Fechar modal de conclusão
function closeCompletionModal() {
  const modal = document.querySelector(".completion-modal")
  if (modal) {
    modal.style.animation = "modalFadeOut 0.3s ease"
    setTimeout(() => {
      modal.remove()
    }, 300)
  }

  if (!document.getElementById("modal-fadeout")) {
    const style = document.createElement("style")
    style.id = "modal-fadeout"
    style.textContent = `
            @keyframes modalFadeOut {
                from { opacity: 1; }
                to { opacity: 0; }
            }
        `
    document.head.appendChild(style)
  }
}

// Ir para próxima fase
function goToNextPhase() {
  const nextPhase = window.phaseData.phase + 1
  if (nextPhase <= 4) {
    window.location.href = `/season/${window.phaseData.season}/phase/${nextPhase}`
  } else {
    // Última fase - voltar para estação
    window.location.href = `/season/${window.phaseData.season}`
  }
}

// Mostrar notificação melhorada
function showNotification(message, type = "info", duration = 4000) {
  const notification = document.createElement("div")
  notification.className = `notification ${type}`

  const icons = {
    success: "✅",
    error: "❌",
    warning: "⚠️",
    info: "💡",
  }

  notification.innerHTML = `
        <span class="notification-icon">${icons[type] || icons.info}</span>
        <span class="notification-text">${message}</span>
        <button class="notification-close" onclick="this.parentElement.remove()">×</button>
    `

  notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === "success" ? "#4CAF50" : type === "error" ? "#f44336" : type === "warning" ? "#ff9800" : "#2196F3"};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 10px;
        display: flex;
        align-items: center;
        gap: 0.5rem;
        z-index: 10001;
        box-shadow: 0 4px 20px rgba(0,0,0,0.3);
        animation: notificationSlideIn 0.3s ease;
        max-width: 350px;
        min-width: 250px;
    `

  document.body.appendChild(notification)

  // Remover após duração especificada
  setTimeout(() => {
    if (notification.parentElement) {
      notification.style.animation = "notificationSlideOut 0.3s ease"
      setTimeout(() => {
        notification.remove()
      }, 300)
    }
  }, duration)

  // Adicionar CSS das animações
  if (!document.getElementById("notification-animations")) {
    const style = document.createElement("style")
    style.id = "notification-animations"
    style.textContent = `
            @keyframes notificationSlideIn {
                from { transform: translateX(400px); opacity: 0; }
                to { transform: translateX(0); opacity: 1; }
            }
            @keyframes notificationSlideOut {
                from { transform: translateX(0); opacity: 1; }
                to { transform: translateX(400px); opacity: 0; }
            }
            .notification-icon {
                font-size: 1.2rem;
            }
            .notification-text {
                font-weight: 500;
                flex: 1;
            }
            .notification-close {
                background: none;
                border: none;
                color: white;
                font-size: 1.2rem;
                cursor: pointer;
                padding: 0;
                margin-left: 0.5rem;
                opacity: 0.8;
            }
            .notification-close:hover {
                opacity: 1;
            }
        `
    document.head.appendChild(style)
  }
}

const sendToTutor = () => {
  console.log("sendToTutor function called")
}
