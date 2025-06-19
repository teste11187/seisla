// JavaScript específico para páginas de estação

// Variáveis globais
let currentSeason = ""
let userProgress = {}

// Inicialização
document.addEventListener("DOMContentLoaded", () => {
  initializeSeason()
  loadSeasonProgress()
  setupPhaseNavigation()
  createSeasonSpecificAnimations()
})

// Inicializar estação
function initializeSeason() {
  // Detectar estação atual pela classe do body
  const body = document.body
  if (body.classList.contains("season-verao")) {
    currentSeason = "verao"
  } else if (body.classList.contains("season-primavera")) {
    currentSeason = "primavera"
  } else if (body.classList.contains("season-outono")) {
    currentSeason = "outono"
  } else if (body.classList.contains("season-inverno")) {
    currentSeason = "inverno"
  }
}

// Carregar progresso da estação
function loadSeasonProgress() {
  const progress = JSON.parse(localStorage.getItem("codeseasons_progress") || "{}")
  userProgress = progress[currentSeason] || []

  updatePhaseStates()
  updateProgressIndicator()
  updateStats()
}

// Atualizar estados das fases
function updatePhaseStates() {
  const phaseCards = document.querySelectorAll(".phase-card")

  phaseCards.forEach((card, index) => {
    const phaseNumber = index + 1
    const statusElement = card.querySelector(".phase-status")
    const statusIcon = card.querySelector(".status-icon")
    const statusText = card.querySelector(".status-text")

    if (userProgress.includes(phaseNumber)) {
      // Fase completada
      card.classList.remove("locked")
      card.classList.add("completed")
      statusElement.classList.remove("locked")
      statusElement.classList.add("completed")
      statusIcon.textContent = "✅"
      statusText.textContent = "Concluída"
    } else if (phaseNumber === 1 || userProgress.includes(phaseNumber - 1)) {
      // Fase desbloqueada
      card.classList.remove("locked")
      statusElement.classList.remove("locked")
      statusElement.classList.add("unlocked")
      statusIcon.textContent = "🔓"
      statusText.textContent = "Disponível"
    } else {
      // Fase bloqueada
      card.classList.add("locked")
      statusElement.classList.add("locked")
      statusIcon.textContent = "🔒"
      statusText.textContent = "Bloqueada"
    }
  })
}

// Atualizar indicador de progresso
function updateProgressIndicator() {
  const progressText = document.querySelector(".progress-indicator .progress-text")
  if (progressText) {
    progressText.textContent = `${userProgress.length}/4 Fases`
  }
}

// Atualizar estatísticas
function updateStats() {
  const stats = {
    lessons: userProgress.length * 3, // 3 lições por fase
    points: userProgress.length * 100, // 100 pontos por fase
    achievements: Math.floor(userProgress.length / 2), // 1 conquista a cada 2 fases
    streak: calculateStreak(),
  }

  animateStatNumbers(stats)
}

// Calcular sequência de dias
function calculateStreak() {
  // Simulação - em um app real, viria do backend
  return Math.min(userProgress.length * 2, 30)
}

// Animar números das estatísticas
function animateStatNumbers(stats) {
  const statNumbers = document.querySelectorAll(".stat-number")
  const values = [stats.lessons, stats.points, stats.achievements, stats.streak]

  statNumbers.forEach((element, index) => {
    animateNumber(element, 0, values[index], 1000)
  })
}

// Animar um número específico
function animateNumber(element, start, end, duration) {
  const startTime = performance.now()

  function update(currentTime) {
    const elapsed = currentTime - startTime
    const progress = Math.min(elapsed / duration, 1)

    const current = Math.floor(start + (end - start) * easeOutQuart(progress))
    element.textContent = current

    if (progress < 1) {
      requestAnimationFrame(update)
    }
  }

  requestAnimationFrame(update)
}

// Função de easing
function easeOutQuart(t) {
  return 1 - Math.pow(1 - t, 4)
}

// Configurar navegação das fases
function setupPhaseNavigation() {
  const phaseCards = document.querySelectorAll(".phase-card")

  phaseCards.forEach((card) => {
    card.addEventListener("click", function () {
      if (!this.classList.contains("locked")) {
        const phase = this.dataset.phase
        navigateToPhase(currentSeason, phase)
      } else {
        showLockedPhaseMessage()
      }
    })
  })
}

// Navegar para uma fase
function navigateToPhase(season, phase) {
  // Efeito de transição
  const card = event.currentTarget
  card.style.transform = "scale(0.95)"

  setTimeout(() => {
    window.location.href = `/season/${season}/phase/${phase}`
  }, 200)
}

// Mostrar mensagem de fase bloqueada
function showLockedPhaseMessage() {
  const message = document.createElement("div")
  message.className = "locked-message"
  message.innerHTML = `
        <div class="locked-content">
            <span class="locked-icon">🔒</span>
            <span class="locked-text">Complete a fase anterior para desbloquear!</span>
        </div>
    `

  message.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: rgba(0, 0, 0, 0.9);
        color: white;
        padding: 2rem;
        border-radius: 15px;
        z-index: 10000;
        text-align: center;
        animation: fadeInScale 0.3s ease;
    `

  document.body.appendChild(message)

  // Remover após 3 segundos
  setTimeout(() => {
    message.style.animation = "fadeOutScale 0.3s ease"
    setTimeout(() => {
      message.remove()
    }, 300)
  }, 3000)

  // Adicionar CSS das animações
  if (!document.getElementById("locked-message-style")) {
    const style = document.createElement("style")
    style.id = "locked-message-style"
    style.textContent = `
            @keyframes fadeInScale {
                from { opacity: 0; transform: translate(-50%, -50%) scale(0.8); }
                to { opacity: 1; transform: translate(-50%, -50%) scale(1); }
            }
            @keyframes fadeOutScale {
                from { opacity: 1; transform: translate(-50%, -50%) scale(1); }
                to { opacity: 0; transform: translate(-50%, -50%) scale(0.8); }
            }
            .locked-content {
                display: flex;
                align-items: center;
                gap: 1rem;
                font-size: 1.1rem;
                font-weight: 600;
            }
            .locked-icon {
                font-size: 2rem;
            }
        `
    document.head.appendChild(style)
  }
}

// Criar animações específicas da estação
function createSeasonSpecificAnimations() {
  switch (currentSeason) {
    case "verao":
      createSummerAnimations()
      break
    case "primavera":
      createSpringAnimations()
      break
    case "outono":
      createAutumnAnimations()
      break
    case "inverno":
      createWinterAnimations()
      break
  }
}

// Animações do verão
function createSummerAnimations() {
  // Criar raios de sol dinâmicos
  const sunRays = document.querySelector(".sun-rays-big")
  if (sunRays) {
    setInterval(() => {
      sunRays.style.filter = `brightness(${0.8 + Math.random() * 0.4})`
    }, 2000)
  }

  // Adicionar partículas de calor
  createHeatParticles()
}

// Criar partículas de calor
function createHeatParticles() {
  const container = document.querySelector(".intro-visual")
  if (!container) return

  setInterval(() => {
    if (Math.random() > 0.7) {
      const particle = document.createElement("div")
      particle.style.cssText = `
                position: absolute;
                bottom: 0;
                left: ${Math.random() * 100}%;
                width: 3px;
                height: 3px;
                background: rgba(255, 215, 0, 0.6);
                border-radius: 50%;
                pointer-events: none;
                animation: heatRise 3s ease-out forwards;
            `

      container.appendChild(particle)

      setTimeout(() => {
        particle.remove()
      }, 3000)
    }
  }, 500)

  // Adicionar CSS da animação
  if (!document.getElementById("heat-particles-style")) {
    const style = document.createElement("style")
    style.id = "heat-particles-style"
    style.textContent = `
            @keyframes heatRise {
                0% {
                    opacity: 1;
                    transform: translateY(0) scale(1);
                }
                100% {
                    opacity: 0;
                    transform: translateY(-200px) scale(0.5);
                }
            }
        `
    document.head.appendChild(style)
  }
}

// Animações da primavera
function createSpringAnimations() {
  // Criar pétalas caindo
  createFallingPetals()
}

// Criar pétalas caindo
function createFallingPetals() {
  const container = document.querySelector(".intro-visual")
  if (!container) return

  const petals = ["🌸", "🌺", "🌼", "🌻"]

  setInterval(() => {
    if (Math.random() > 0.8) {
      const petal = document.createElement("div")
      petal.textContent = petals[Math.floor(Math.random() * petals.length)]
      petal.style.cssText = `
                position: absolute;
                top: -20px;
                left: ${Math.random() * 100}%;
                font-size: 1.5rem;
                pointer-events: none;
                animation: petalFall ${3 + Math.random() * 2}s ease-in forwards;
            `

      container.appendChild(petal)

      setTimeout(() => {
        petal.remove()
      }, 5000)
    }
  }, 1000)

  // Adicionar CSS da animação
  if (!document.getElementById("petal-fall-style")) {
    const style = document.createElement("style")
    style.id = "petal-fall-style"
    style.textContent = `
            @keyframes petalFall {
                0% {
                    transform: translateY(-20px) rotate(0deg);
                    opacity: 1;
                }
                100% {
                    transform: translateY(400px) rotate(360deg);
                    opacity: 0;
                }
            }
        `
    document.head.appendChild(style)
  }
}

// Animações do outono
function createAutumnAnimations() {
  // Criar folhas caindo
  createFallingLeaves()
}

// Criar folhas caindo
function createFallingLeaves() {
  const container = document.querySelector(".intro-visual")
  if (!container) return

  const leaves = ["🍂", "🍁", "🍃"]

  setInterval(() => {
    if (Math.random() > 0.7) {
      const leaf = document.createElement("div")
      leaf.textContent = leaves[Math.floor(Math.random() * leaves.length)]
      leaf.style.cssText = `
                position: absolute;
                top: -20px;
                left: ${Math.random() * 100}%;
                font-size: 1.2rem;
                pointer-events: none;
                animation: leafFall ${4 + Math.random() * 3}s ease-in forwards;
            `

      container.appendChild(leaf)

      setTimeout(() => {
        leaf.remove()
      }, 7000)
    }
  }, 800)

  // Adicionar CSS da animação
  if (!document.getElementById("leaf-fall-style")) {
    const style = document.createElement("style")
    style.id = "leaf-fall-style"
    style.textContent = `
            @keyframes leafFall {
                0% {
                    transform: translateY(-20px) rotate(0deg);
                    opacity: 1;
                }
                25% {
                    transform: translateY(100px) translateX(20px) rotate(90deg);
                }
                50% {
                    transform: translateY(200px) translateX(-10px) rotate(180deg);
                }
                75% {
                    transform: translateY(300px) translateX(15px) rotate(270deg);
                }
                100% {
                    transform: translateY(400px) translateX(-5px) rotate(360deg);
                    opacity: 0;
                }
            }
        `
    document.head.appendChild(style)
  }
}

// Animações do inverno
function createWinterAnimations() {
  // Criar flocos de neve
  createSnowflakes()
}

// Criar flocos de neve
function createSnowflakes() {
  const container = document.querySelector(".intro-visual")
  if (!container) return

  setInterval(() => {
    if (Math.random() > 0.6) {
      const snowflake = document.createElement("div")
      snowflake.textContent = "❄️"
      snowflake.style.cssText = `
                position: absolute;
                top: -20px;
                left: ${Math.random() * 100}%;
                font-size: ${0.8 + Math.random() * 0.8}rem;
                pointer-events: none;
                animation: snowFall ${5 + Math.random() * 3}s linear forwards;
            `

      container.appendChild(snowflake)

      setTimeout(() => {
        snowflake.remove()
      }, 8000)
    }
  }, 300)

  // Adicionar CSS da animação
  if (!document.getElementById("snow-fall-style")) {
    const style = document.createElement("style")
    style.id = "snow-fall-style"
    style.textContent = `
            @keyframes snowFall {
                0% {
                    transform: translateY(-20px) rotate(0deg);
                    opacity: 1;
                }
                100% {
                    transform: translateY(400px) rotate(360deg);
                    opacity: 0;
                }
            }
        `
    document.head.appendChild(style)
  }
}

// Função para marcar fase como concluída
function completePhase(phaseNumber) {
  if (!userProgress.includes(phaseNumber)) {
    userProgress.push(phaseNumber)
    userProgress.sort((a, b) => a - b)

    // Salvar no localStorage
    const allProgress = JSON.parse(localStorage.getItem("codeseasons_progress") || "{}")
    allProgress[currentSeason] = userProgress
    localStorage.setItem("codeseasons_progress", JSON.stringify(allProgress))

    // Atualizar UI
    updatePhaseStates()
    updateProgressIndicator()
    updateStats()

    // Mostrar celebração
    showPhaseCompletionCelebration(phaseNumber)
  }
}

// Mostrar celebração de conclusão de fase
function showPhaseCompletionCelebration(phaseNumber) {
  const celebration = document.createElement("div")
  celebration.className = "phase-completion-celebration"
  celebration.innerHTML = `
        <div class="celebration-content">
            <div class="celebration-icon">🎉</div>
            <h3>Parabéns!</h3>
            <p>Você completou a Fase ${phaseNumber}!</p>
            <div class="celebration-rewards">
                <div class="reward">
                    <span class="reward-icon">⭐</span>
                    <span>+100 Pontos</span>
                </div>
                <div class="reward">
                    <span class="reward-icon">🏆</span>
                    <span>Nova Conquista</span>
                </div>
            </div>
            <button onclick="closeCelebration()" class="celebration-button">Continuar</button>
        </div>
    `

  celebration.style.cssText = `
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
        animation: celebrationFadeIn 0.5s ease;
    `

  document.body.appendChild(celebration)

  // Adicionar CSS da celebração
  if (!document.getElementById("celebration-style")) {
    const style = document.createElement("style")
    style.id = "celebration-style"
    style.textContent = `
            @keyframes celebrationFadeIn {
                from { opacity: 0; }
                to { opacity: 1; }
            }
            .celebration-content {
                background: white;
                padding: 3rem;
                border-radius: 20px;
                text-align: center;
                max-width: 400px;
                animation: celebrationBounce 0.5s ease;
            }
            @keyframes celebrationBounce {
                from { transform: scale(0.8); }
                to { transform: scale(1); }
            }
            .celebration-icon {
                font-size: 4rem;
                margin-bottom: 1rem;
                animation: bounce 1s infinite;
            }
            .celebration-content h3 {
                font-size: 2rem;
                color: var(--dark);
                margin-bottom: 1rem;
            }
            .celebration-content p {
                color: var(--gray);
                margin-bottom: 2rem;
            }
            .celebration-rewards {
                display: flex;
                justify-content: center;
                gap: 2rem;
                margin-bottom: 2rem;
            }
            .reward {
                display: flex;
                align-items: center;
                gap: 0.5rem;
                background: var(--light-gray);
                padding: 0.5rem 1rem;
                border-radius: 20px;
                font-weight: 600;
            }
            .reward-icon {
                font-size: 1.2rem;
            }
            .celebration-button {
                background: var(--summer-primary);
                color: white;
                border: none;
                padding: 1rem 2rem;
                border-radius: 25px;
                font-weight: 600;
                cursor: pointer;
                transition: all 0.3s ease;
            }
            .celebration-button:hover {
                transform: translateY(-2px);
                box-shadow: 0 5px 15px rgba(0,0,0,0.2);
            }
        `
    document.head.appendChild(style)
  }
}

// Fechar celebração
function closeCelebration() {
  const celebration = document.querySelector(".phase-completion-celebration")
  if (celebration) {
    celebration.style.animation = "celebrationFadeOut 0.3s ease"
    setTimeout(() => {
      celebration.remove()
    }, 300)
  }

  // Adicionar animação de saída
  if (!document.getElementById("celebration-fadeout-style")) {
    const style = document.createElement("style")
    style.id = "celebration-fadeout-style"
    style.textContent = `
            @keyframes celebrationFadeOut {
                from { opacity: 1; }
                to { opacity: 0; }
            }
        `
    document.head.appendChild(style)
  }
}
