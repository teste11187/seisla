// Variáveis globais
let tutorOpen = false

// Inicialização quando a página carrega
document.addEventListener("DOMContentLoaded", () => {
  initializeAnimations()
  loadUserProgress()
  setupTutorFunctionality()
})

// Função para rolar suavemente até as estações
function scrollToSeasons() {
  document.getElementById("seasons").scrollIntoView({
    behavior: "smooth",
    block: "start",
  })
}

// Navegação para estações
function navigateToSeason(seasonName) {
  // Adicionar efeito de transição
  const card = event.currentTarget
  card.style.transform = "scale(0.95)"

  setTimeout(() => {
    window.location.href = `/season/${seasonName}`
  }, 200)
}

// Inicializar animações
function initializeAnimations() {
  // Animação de entrada para os cards
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1"
        entry.target.style.transform = "translateY(0)"
      }
    })
  }, observerOptions)

  // Observar todos os cards de estação
  document.querySelectorAll(".season-card").forEach((card) => {
    card.style.opacity = "0"
    card.style.transform = "translateY(30px)"
    card.style.transition = "all 0.6s ease"
    observer.observe(card)
  })

  // Efeito parallax suave no scroll
  window.addEventListener("scroll", () => {
    const scrolled = window.pageYOffset
    const parallaxElements = document.querySelectorAll(".floating-elements")

    parallaxElements.forEach((element) => {
      const speed = 0.5
      element.style.transform = `translateY(${scrolled * speed}px)`
    })
  })
}

// Carregar progresso do usuário
function loadUserProgress() {
  // Simular carregamento do progresso (em um app real, viria do backend)
  const progress = {
    verao: 0,
    primavera: 0,
    outono: 0,
    inverno: 0,
  }

  // Atualizar barras de progresso
  Object.keys(progress).forEach((season) => {
    updateSeasonProgress(season, progress[season])
  })
}

// Atualizar progresso de uma estação
function updateSeasonProgress(season, completedPhases) {
  const seasonCard = document.querySelector(
    `.season-card.${season === "verao" ? "summer" : season === "primavera" ? "spring" : season === "outono" ? "autumn" : "winter"}`,
  )

  if (seasonCard) {
    const progressFill = seasonCard.querySelector(".progress-fill")
    const progressText = seasonCard.querySelector(".progress-text")

    const percentage = (completedPhases / 4) * 100
    progressFill.style.width = `${percentage}%`
    progressText.textContent = `${completedPhases}/4 Fases`

    // Adicionar efeito visual se completou
    if (completedPhases === 4) {
      seasonCard.classList.add("completed")
      addCompletionEffect(seasonCard)
    }
  }
}

// Efeito visual de conclusão
function addCompletionEffect(card) {
  const effect = document.createElement("div")
  effect.className = "completion-effect"
  effect.innerHTML = "🎉"
  effect.style.cssText = `
        position: absolute;
        top: 10px;
        right: 10px;
        font-size: 2rem;
        animation: celebration 2s ease-in-out infinite;
        z-index: 10;
    `

  card.appendChild(effect)

  // Adicionar animação CSS
  if (!document.getElementById("celebration-style")) {
    const style = document.createElement("style")
    style.id = "celebration-style"
    style.textContent = `
            @keyframes celebration {
                0%, 100% { transform: scale(1) rotate(0deg); }
                25% { transform: scale(1.2) rotate(-10deg); }
                75% { transform: scale(1.2) rotate(10deg); }
            }
        `
    document.head.appendChild(style)
  }
}

// Configurar funcionalidade do tutor IA
function setupTutorFunctionality() {
  const tutorInput = document.getElementById("tutorInput")

  // Enviar mensagem ao pressionar Enter
  tutorInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      sendToTutor()
    }
  })

  // Fechar tutor inicialmente
  const tutorBody = document.querySelector(".tutor-body")
  tutorBody.style.display = "none"
}

// Toggle do tutor IA
function toggleTutor() {
  const tutorBody = document.querySelector(".tutor-body")
  tutorOpen = !tutorOpen

  if (tutorOpen) {
    tutorBody.style.display = "flex"
    tutorBody.style.animation = "slideUp 0.3s ease"
  } else {
    tutorBody.style.animation = "slideDown 0.3s ease"
    setTimeout(() => {
      tutorBody.style.display = "none"
    }, 300)
  }
}

// Enviar mensagem para o tutor IA
async function sendToTutor() {
  const input = document.getElementById("tutorInput")
  const question = input.value.trim()

  if (!question) return

  // Adicionar mensagem do usuário
  addMessage(question, "user")
  input.value = ""

  // Mostrar indicador de digitação
  showTypingIndicator()

  try {
    const response = await fetch("/api/ai-tutor", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ question: question }),
    })

    const data = await response.json()

    // Remover indicador de digitação
    removeTypingIndicator()

    // Adicionar resposta do bot
    setTimeout(() => {
      addMessage(data.answer, "bot")
    }, 500)
  } catch (error) {
    removeTypingIndicator()
    addMessage("Desculpe, ocorreu um erro. Tente novamente!", "bot")
  }
}

// Adicionar mensagem ao chat
function addMessage(text, sender) {
  const messagesContainer = document.getElementById("tutorMessages")
  const messageDiv = document.createElement("div")
  messageDiv.className = `message ${sender}-message`

  const icon = sender === "bot" ? "🤖" : "👤"
  messageDiv.innerHTML = `
        <span class="message-icon">${icon}</span>
        <span class="message-text">${text}</span>
    `

  messagesContainer.appendChild(messageDiv)
  messagesContainer.scrollTop = messagesContainer.scrollHeight

  // Animação de entrada
  messageDiv.style.opacity = "0"
  messageDiv.style.transform = "translateY(20px)"
  messageDiv.style.transition = "all 0.3s ease"

  setTimeout(() => {
    messageDiv.style.opacity = "1"
    messageDiv.style.transform = "translateY(0)"
  }, 100)
}

// Mostrar indicador de digitação
function showTypingIndicator() {
  const messagesContainer = document.getElementById("tutorMessages")
  const typingDiv = document.createElement("div")
  typingDiv.className = "message bot-message typing-indicator"
  typingDiv.innerHTML = `
        <span class="message-icon">🤖</span>
        <span class="message-text">
            <div class="typing-dots">
                <span></span>
                <span></span>
                <span></span>
            </div>
        </span>
    `

  messagesContainer.appendChild(typingDiv)
  messagesContainer.scrollTop = messagesContainer.scrollHeight

  // Adicionar CSS para animação dos pontos
  if (!document.getElementById("typing-style")) {
    const style = document.createElement("style")
    style.id = "typing-style"
    style.textContent = `
            .typing-dots {
                display: flex;
                gap: 3px;
            }
            .typing-dots span {
                width: 6px;
                height: 6px;
                background: #666;
                border-radius: 50%;
                animation: typing 1.4s infinite;
            }
            .typing-dots span:nth-child(2) { animation-delay: 0.2s; }
            .typing-dots span:nth-child(3) { animation-delay: 0.4s; }
            @keyframes typing {
                0%, 60%, 100% { transform: translateY(0); }
                30% { transform: translateY(-10px); }
            }
        `
    document.head.appendChild(style)
  }
}

// Remover indicador de digitação
function removeTypingIndicator() {
  const typingIndicator = document.querySelector(".typing-indicator")
  if (typingIndicator) {
    typingIndicator.remove()
  }
}

// Efeitos de hover nos cards
document.addEventListener("DOMContentLoaded", () => {
  const seasonCards = document.querySelectorAll(".season-card")

  seasonCards.forEach((card) => {
    card.addEventListener("mouseenter", function () {
      // Pausar animações de fundo durante o hover
      const animations = this.querySelectorAll('[style*="animation"]')
      animations.forEach((el) => {
        el.style.animationPlayState = "paused"
      })
    })

    card.addEventListener("mouseleave", function () {
      // Retomar animações
      const animations = this.querySelectorAll('[style*="animation"]')
      animations.forEach((el) => {
        el.style.animationPlayState = "running"
      })
    })
  })
})

// Função para adicionar partículas interativas
function createInteractiveParticles() {
  const particlesContainer = document.createElement("div")
  particlesContainer.className = "interactive-particles"
  particlesContainer.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: -1;
    `

  document.body.appendChild(particlesContainer)

  // Criar partículas que seguem o mouse
  document.addEventListener("mousemove", (e) => {
    if (Math.random() > 0.9) {
      // Criar partícula ocasionalmente
      createParticle(e.clientX, e.clientY)
    }
  })
}

function createParticle(x, y) {
  const particle = document.createElement("div")
  particle.style.cssText = `
        position: absolute;
        left: ${x}px;
        top: ${y}px;
        width: 4px;
        height: 4px;
        background: radial-gradient(circle, #FFD700, #FF6B35);
        border-radius: 50%;
        pointer-events: none;
        animation: particleFade 2s ease-out forwards;
    `

  document.querySelector(".interactive-particles").appendChild(particle)

  // Remover partícula após animação
  setTimeout(() => {
    particle.remove()
  }, 2000)
}

// Adicionar CSS para animação das partículas
if (!document.getElementById("particle-style")) {
  const style = document.createElement("style")
  style.id = "particle-style"
  style.textContent = `
        @keyframes particleFade {
            0% {
                opacity: 1;
                transform: scale(1) translateY(0);
            }
            100% {
                opacity: 0;
                transform: scale(0) translateY(-50px);
            }
        }
    `
  document.head.appendChild(style)
}

// Inicializar partículas interativas
createInteractiveParticles()

// Função para salvar progresso do usuário
function saveUserProgress(season, phase) {
  // Em um app real, isso salvaria no backend
  const progress = JSON.parse(localStorage.getItem("codeseasons_progress") || "{}")

  if (!progress[season]) {
    progress[season] = []
  }

  if (!progress[season].includes(phase)) {
    progress[season].push(phase)
    localStorage.setItem("codeseasons_progress", JSON.stringify(progress))

    // Atualizar UI
    updateSeasonProgress(season, progress[season].length)

    // Mostrar notificação de conquista
    showAchievementNotification(season, phase)
  }
}

// Mostrar notificação de conquista
function showAchievementNotification(season, phase) {
  const notification = document.createElement("div")
  notification.className = "achievement-notification"
  notification.innerHTML = `
        <div class="achievement-icon">🏆</div>
        <div class="achievement-text">
            <strong>Parabéns!</strong><br>
            Você completou a Fase ${phase} da estação ${season}!
        </div>
    `

  notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: linear-gradient(135deg, #4CAF50, #45a049);
        color: white;
        padding: 1rem;
        border-radius: 10px;
        box-shadow: 0 4px 20px rgba(0,0,0,0.3);
        z-index: 10000;
        display: flex;
        align-items: center;
        gap: 1rem;
        transform: translateX(400px);
        transition: transform 0.5s ease;
    `

  document.body.appendChild(notification)

  // Animar entrada
  setTimeout(() => {
    notification.style.transform = "translateX(0)"
  }, 100)

  // Remover após 5 segundos
  setTimeout(() => {
    notification.style.transform = "translateX(400px)"
    setTimeout(() => {
      notification.remove()
    }, 500)
  }, 5000)
}

// Função para detectar dispositivo móvel
function isMobile() {
  return window.innerWidth <= 768
}

// Ajustar experiência para mobile
if (isMobile()) {
  // Reduzir animações em dispositivos móveis para melhor performance
  document.documentElement.style.setProperty("--animation-duration", "1s")

  // Simplificar efeitos de partículas
  const style = document.createElement("style")
  style.textContent = `
        @media (max-width: 768px) {
            .floating-elements { display: none; }
            .interactive-particles { display: none; }
            .stars::before { animation: none; }
        }
    `
  document.head.appendChild(style)
}

// Função para scroll suave para seções
function scrollToSection(sectionId) {
  const section = document.getElementById(sectionId)
  if (section) {
    section.scrollIntoView({
      behavior: "smooth",
      block: "start",
    })
  }
}

// Função para o botão Ver Exemplo
function verExemplo() {
  scrollToSection("exemplo-section")
}

// Adicionar event listeners quando a página carregar
document.addEventListener("DOMContentLoaded", () => {
  // Verificar se existe botão Ver Exemplo e adicionar evento
  const verExemploBtn = document.querySelector('[onclick*="verExemplo"]')
  if (verExemploBtn) {
    verExemploBtn.addEventListener("click", verExemplo)
  }
})
