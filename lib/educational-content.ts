export interface Phase {
  id: number
  title: string
  description: string
  content: string
  exercises: Exercise[]
  completed: boolean
  unlocked: boolean
}

export interface Exercise {
  id: string
  instruction: string
  expectedCode: string
  hint: string
  difficulty: "easy" | "medium" | "hard"
  points: number
}

export interface Season {
  id: string
  name: string
  language: string
  description: string
  phases: Phase[]
  totalPhases: number
  completedPhases: number
  unlocked: boolean
}

export const educationalContent: Record<string, Season> = {
  summer: {
    id: "summer",
    name: "Verão",
    language: "HTML",
    description: "Estruture suas páginas com HTML",
    totalPhases: 4,
    completedPhases: 0,
    unlocked: true,
    phases: [
      {
        id: 1,
        title: "Estrutura Básica HTML",
        description: "Aprenda os elementos fundamentais do HTML",
        completed: false,
        unlocked: true,
        content: `
# A Base de Tudo: HTML

HTML (HyperText Markup Language) é a linguagem de marcação que estrutura o conteúdo da web. É como o esqueleto de uma casa - define onde cada elemento vai ficar!

## O que é HTML?

HTML não é uma linguagem de programação, mas sim uma linguagem de **marcação**. Isso significa que ela usa "tags" (etiquetas) para marcar e estruturar o conteúdo.

## Estrutura Básica

Todo documento HTML precisa ter uma estrutura básica:

\`\`\`html
<!DOCTYPE html>
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
</html>
\`\`\`

## Elementos Principais

### DOCTYPE
- **O que é**: Declara o tipo de documento
- **Por que usar**: Informa ao navegador que tipo de HTML estamos usando
- **Exemplo**: \`<!DOCTYPE html>\` (para HTML5)

### HTML
- **O que é**: Elemento raiz que contém todo o conteúdo
- **Atributos importantes**: \`lang="pt-br"\` (define o idioma)
- **Por que importante**: Ajuda na acessibilidade e SEO

### HEAD
- **O que é**: Contém metadados da página (informações não visíveis)
- **O que vai dentro**: título, charset, viewport, links para CSS
- **Exemplo**:
\`\`\`html
<head>
    <meta charset="UTF-8">
    <title>Título da Página</title>
</head>
\`\`\`

### BODY
- **O que é**: Contém todo o conteúdo visível da página
- **O que vai dentro**: textos, imagens, links, formulários
- **Exemplo**:
\`\`\`html
<body>
    <h1>Título Principal</h1>
    <p>Parágrafo de texto</p>
</body>
\`\`\`

## Tags Básicas para Começar

### Títulos (h1 a h6)
\`\`\`html
<h1>Título Principal</h1>
<h2>Subtítulo</h2>
<h3>Título de Seção</h3>
\`\`\`

### Parágrafos
\`\`\`html
<p>Este é um parágrafo de texto.</p>
\`\`\`

### Links
\`\`\`html
<a href="https://www.google.com">Ir para o Google</a>
\`\`\`

### Imagens
\`\`\`html
<img src="imagem.jpg" alt="Descrição da imagem">
\`\`\`

## Dicas Importantes

1. **Sempre feche as tags**: \`<p>texto</p>\`
2. **Use indentação**: Deixa o código mais legível
3. **Atributo alt em imagens**: Importante para acessibilidade
4. **Estrutura semântica**: Use as tags certas para cada conteúdo

## Próximos Passos

Agora que você conhece a estrutura básica, vamos praticar criando sua primeira página HTML!
        `,
        exercises: [
          {
            id: "basic-structure",
            instruction:
              'Crie uma página HTML básica com um título "Bem-vindo ao Verão" e um parágrafo explicando o que você vai aprender sobre HTML.',
            expectedCode: `<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <title>Bem-vindo ao Verão</title>
</head>
<body>
    <h1>Bem-vindo ao Verão</h1>
    <p>Vou aprender HTML nesta estação!</p>
</body>
</html>`,
            hint: "Lembre-se de incluir a estrutura básica: DOCTYPE, html, head e body!",
            difficulty: "easy",
            points: 50,
          },
          {
            id: "multiple-elements",
            instruction:
              "Crie uma página com um título principal, dois subtítulos (h2) e três parágrafos explicando por que HTML é importante.",
            expectedCode: `<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <title>Importância do HTML</title>
</head>
<body>
    <h1>Por que HTML é Importante?</h1>
    <h2>Estrutura da Web</h2>
    <p>HTML é a base de todas as páginas web.</p>
    <h2>Acessibilidade</h2>
    <p>HTML semântico torna sites acessíveis para todos.</p>
    <p>É a linguagem universal da internet.</p>
</body>
</html>`,
            hint: "Use h1 para o título principal, h2 para subtítulos e p para parágrafos.",
            difficulty: "easy",
            points: 75,
          },
        ],
      },
      {
        id: 2,
        title: "Tags e Atributos",
        description: "Domine as principais tags HTML e seus atributos",
        completed: false,
        unlocked: false,
        content: `
# Tags e Atributos HTML

Agora que você conhece a estrutura básica, vamos mergulhar nas tags mais importantes e como usar atributos para dar mais funcionalidade ao seu HTML.

## O que são Atributos?

Atributos fornecem informações adicionais sobre os elementos HTML. Eles sempre vão dentro da tag de abertura:

\`\`\`html
<tag atributo="valor">conteúdo</tag>
\`\`\`

## Tags de Texto

### Formatação Básica
\`\`\`html
<strong>Texto em negrito (importante)</strong>
<em>Texto em itálico (ênfase)</em>
<mark>Texto destacado</mark>
<small>Texto pequeno</small>
\`\`\`

### Quebras e Linhas
\`\`\`html
<br> <!-- Quebra de linha -->
<hr> <!-- Linha horizontal -->
\`\`\`

## Links Avançados

### Link Básico
\`\`\`html
<a href="https://www.exemplo.com">Link Externo</a>
\`\`\`

### Link para Email
\`\`\`html
<a href="mailto:contato@exemplo.com">Enviar Email</a>
\`\`\`

### Link para Telefone
\`\`\`html
<a href="tel:+5511999999999">Ligar</a>
\`\`\`

### Link que Abre em Nova Aba
\`\`\`html
<a href="https://www.exemplo.com" target="_blank">Abrir em Nova Aba</a>
\`\`\`

## Imagens

### Imagem Básica
\`\`\`html
<img src="foto.jpg" alt="Descrição da foto">
\`\`\`

### Imagem com Dimensões
\`\`\`html
<img src="foto.jpg" alt="Descrição" width="300" height="200">
\`\`\`

### Imagem Responsiva
\`\`\`html
<img src="foto.jpg" alt="Descrição" style="max-width: 100%; height: auto;">
\`\`\`

## Listas

### Lista Não Ordenada (com bolinhas)
\`\`\`html
<ul>
    <li>Item 1</li>
    <li>Item 2</li>
    <li>Item 3</li>
</ul>
\`\`\`

### Lista Ordenada (com números)
\`\`\`html
<ol>
    <li>Primeiro item</li>
    <li>Segundo item</li>
    <li>Terceiro item</li>
</ol>
\`\`\`

### Lista de Definições
\`\`\`html
<dl>
    <dt>HTML</dt>
    <dd>HyperText Markup Language</dd>
    <dt>CSS</dt>
    <dd>Cascading Style Sheets</dd>
</dl>
\`\`\`

## Divisões e Seções

### Div (Divisão Genérica)
\`\`\`html
<div class="container">
    <p>Conteúdo dentro da div</p>
</div>
\`\`\`

### Span (Elemento Inline)
\`\`\`html
<p>Este é um <span style="color: red;">texto colorido</span> no parágrafo.</p>
\`\`\`

## Atributos Globais Importantes

### ID (Identificador Único)
\`\`\`html
<div id="cabecalho">Cabeçalho da página</div>
\`\`\`

### Class (Classe para Estilização)
\`\`\`html
<p class="destaque importante">Texto com classes</p>
\`\`\`

### Title (Tooltip)
\`\`\`html
<p title="Esta é uma dica">Passe o mouse aqui</p>
\`\`\`

### Style (Estilo Inline)
\`\`\`html
<p style="color: blue; font-size: 18px;">Texto estilizado</p>
\`\`\`

## Comentários HTML

Use comentários para documentar seu código:
\`\`\`html
<!-- Este é um comentário que não aparece na página -->
<p>Este texto aparece na página</p>
\`\`\`

## Boas Práticas

1. **Sempre use alt em imagens** para acessibilidade
2. **Use títulos hierárquicos** (h1, depois h2, depois h3...)
3. **Seja descritivo nos links** ("Clique aqui" é ruim, "Baixar relatório PDF" é bom)
4. **Use comentários** para explicar seções complexas
5. **Mantenha a indentação** para código legível

## Exemplo Prático

\`\`\`html
<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <title>Minha Página Completa</title>
</head>
<body>
    <!-- Cabeçalho da página -->
    <div id="cabecalho">
        <h1>Meu Site Pessoal</h1>
        <p>Bem-vindo ao meu cantinho na web!</p>
    </div>

    <!-- Conteúdo principal -->
    <div id="conteudo">
        <h2>Sobre Mim</h2>
        <p>Olá! Eu sou <strong>João</strong> e estou aprendendo <em>HTML</em>.</p>
        
        <h2>Minhas Habilidades</h2>
        <ul>
            <li>HTML básico</li>
            <li>Estruturação de conteúdo</li>
            <li>Tags e atributos</li>
        </ul>

        <h2>Contato</h2>
        <p>
            <a href="mailto:joao@exemplo.com">Envie um email</a> ou 
            <a href="tel:+5511999999999">ligue para mim</a>
        </p>
    </div>
</body>
</html>
\`\`\`
        `,
        exercises: [
          {
            id: "text-formatting",
            instruction:
              "Crie uma página sobre você usando diferentes tags de formatação: strong, em, mark. Inclua também uma lista de seus hobbies.",
            expectedCode: `<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <title>Sobre Mim</title>
</head>
<body>
    <h1>Sobre Mim</h1>
    <p>Meu nome é <strong>João</strong> e tenho <em>25 anos</em>.</p>
    <p>Estou <mark>muito animado</mark> para aprender programação!</p>
    
    <h2>Meus Hobbies</h2>
    <ul>
        <li>Ler livros</li>
        <li>Jogar videogame</li>
        <li>Programar</li>
    </ul>
</body>
</html>`,
            hint: "Use <strong> para negrito, <em> para itálico, <mark> para destaque e <ul><li> para listas.",
            difficulty: "easy",
            points: 75,
          },
        ],
      },
    ],
  },
}

export const tutorResponses = {
  greetings: [
    "Olá! Eu sou seu tutor IA! 🤖",
    "Estou aqui para te ajudar a dominar HTML!",
    "Vamos aprender juntos de forma divertida!",
    "Qualquer dúvida, é só me chamar!",
  ],

  htmlTips: [
    "Lembre-se: HTML é sobre estrutura, não aparência!",
    "Sempre feche suas tags: <p>texto</p>",
    "Use indentação para deixar seu código mais legível",
    "O atributo 'alt' em imagens é essencial para acessibilidade",
    "Dica: Use sempre tags semânticas para melhor estrutura",
  ],

  encouragement: [
    "Você está indo muito bem! Continue assim! 🌟",
    "Cada erro é uma oportunidade de aprender!",
    "A prática leva à perfeição. Continue codando!",
    "Você já deu o primeiro passo, que é o mais difícil!",
    "Lembre-se: todo programador já foi iniciante um dia!",
  ],

  debugging: [
    "Verifique se todas as tags estão fechadas corretamente",
    "Confira se o DOCTYPE está no início do documento",
    "Certifique-se de que a estrutura html > head > body está correta",
    "Lembre-se de usar aspas nos valores dos atributos",
    "Verifique a indentação do seu código",
  ],
}
