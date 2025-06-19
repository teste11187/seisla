from flask import Flask, render_template, request, jsonify, session
import json
import sqlite3
from datetime import datetime
import os
import re

app = Flask(__name__)
app.secret_key = 'educational_programming_secret_key_2024'

# Configuração do banco de dados
def init_db():
    conn = sqlite3.connect('educational_content.db')
    cursor = conn.cursor()
    
    # Tabela de usuários
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            username TEXT UNIQUE NOT NULL,
            email TEXT UNIQUE NOT NULL,
            progress TEXT DEFAULT '{}',
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    ''')
    
    # Tabela de conteúdo educacional
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS educational_content (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            season TEXT NOT NULL,
            phase INTEGER NOT NULL,
            topic TEXT NOT NULL,
            content TEXT NOT NULL,
            code_example TEXT,
            code_explanation TEXT,
            exercise TEXT,
            answer TEXT,
            difficulty INTEGER DEFAULT 1
        )
    ''')
    
    # Tabela expandida de respostas do tutor IA
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS ai_tutor_responses (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            question TEXT NOT NULL,
            answer TEXT NOT NULL,
            category TEXT NOT NULL,
            keywords TEXT,
            context TEXT
        )
    ''')
    
    conn.commit()
    conn.close()

# Função para popular o banco com conteúdo educacional super detalhado
def populate_database():
    conn = sqlite3.connect('educational_content.db')
    cursor = conn.cursor()
    
    # Verificar se já existe conteúdo
    cursor.execute('SELECT COUNT(*) FROM educational_content')
    if cursor.fetchone()[0] > 0:
        conn.close()
        return
    
    # Conteúdo super detalhado da Estação Verão (HTML)
    html_content = [
        {
            'season': 'verao',
            'phase': 1,
            'topic': 'Estrutura Básica HTML - Fundamentos',
            'content': '''
            <h2>🌞 Bem-vindo ao Mundo do HTML!</h2>
            
            <div class="intro-box">
                <h3>🎯 O que você vai aprender nesta lição:</h3>
                <ul>
                    <li>O que é HTML e por que é importante</li>
                    <li>A anatomia de um documento HTML</li>
                    <li>Como cada linha de código funciona</li>
                    <li>Estrutura básica que todo site precisa ter</li>
                </ul>
            </div>

            <h3>🤔 O que é HTML?</h3>
            <p><strong>HTML</strong> significa <em>HyperText Markup Language</em> (Linguagem de Marcação de Hipertexto). Pense no HTML como o <strong>esqueleto</strong> de uma página web - ele define a estrutura e organiza o conteúdo.</p>
            
            <div class="analogy-box">
                <h4>🏠 Analogia da Casa:</h4>
                <p>Se uma página web fosse uma casa:</p>
                <ul>
                    <li><strong>HTML</strong> = Estrutura (paredes, teto, portas)</li>
                    <li><strong>CSS</strong> = Decoração (cores, móveis, estilo)</li>
                    <li><strong>JavaScript</strong> = Funcionalidades (luz, campainha, portão automático)</li>
                </ul>
            </div>

            <h3>📋 Anatomia de um Documento HTML</h3>
            <p>Todo documento HTML tem uma estrutura básica obrigatória. É como uma receita - se você não seguir os ingredientes básicos, não vai funcionar!</p>

            <div class="structure-explanation">
                <h4>🔍 Vamos entender cada parte:</h4>
                
                <div class="code-part">
                    <h5>1. DOCTYPE - A Declaração</h5>
                    <p><code>&lt;!DOCTYPE html&gt;</code></p>
                    <p><strong>O que faz:</strong> Diz ao navegador "Ei, este é um documento HTML5!"</p>
                    <p><strong>Por que é importante:</strong> Sem isso, o navegador pode interpretar seu código de forma estranha.</p>
                </div>

                <div class="code-part">
                    <h5>2. HTML - O Container Principal</h5>
                    <p><code>&lt;html lang="pt-br"&gt;</code></p>
                    <p><strong>O que faz:</strong> É como uma caixa gigante que contém TUDO da sua página.</p>
                    <p><strong>lang="pt-br":</strong> Informa que o conteúdo está em português brasileiro (ajuda leitores de tela e tradutores).</p>
                </div>

                <div class="code-part">
                    <h5>3. HEAD - Os Metadados</h5>
                    <p><code>&lt;head&gt;</code></p>
                    <p><strong>O que faz:</strong> Contém informações SOBRE a página, mas que não aparecem na tela.</p>
                    <p><strong>Analogia:</strong> É como a etiqueta de uma roupa - tem informações importantes, mas você não vê quando está vestindo.</p>
                </div>

                <div class="code-part">
                    <h5>4. META CHARSET - Codificação</h5>
                    <p><code>&lt;meta charset="UTF-8"&gt;</code></p>
                    <p><strong>O que faz:</strong> Define como o navegador deve interpretar caracteres especiais (ç, ã, é, etc.).</p>
                    <p><strong>UTF-8:</strong> É o padrão universal que funciona com qualquer idioma.</p>
                </div>

                <div class="code-part">
                    <h5>5. VIEWPORT - Responsividade</h5>
                    <p><code>&lt;meta name="viewport" content="width=device-width, initial-scale=1.0"&gt;</code></p>
                    <p><strong>O que faz:</strong> Faz sua página funcionar bem em celulares e tablets.</p>
                    <p><strong>Sem isso:</strong> Sua página vai aparecer minúscula no celular!</p>
                </div>

                <div class="code-part">
                    <h5>6. TITLE - O Título</h5>
                    <p><code>&lt;title&gt;Minha Primeira Página&lt;/title&gt;</code></p>
                    <p><strong>O que faz:</strong> Define o texto que aparece na aba do navegador.</p>
                    <p><strong>Importante:</strong> É o que aparece nos resultados do Google!</p>
                </div>

                <div class="code-part">
                    <h5>7. BODY - O Conteúdo Visível</h5>
                    <p><code>&lt;body&gt;</code></p>
                    <p><strong>O que faz:</strong> Tudo que está aqui dentro aparece na página para o usuário ver.</p>
                    <p><strong>É aqui que a mágica acontece!</strong></p>
                </div>
            </div>

            <h3>🎨 Tags: Os Blocos de Construção</h3>
            <p>Tags são como <strong>etiquetas</strong> que dizem ao navegador como interpretar cada pedaço de conteúdo.</p>
            
            <div class="tag-explanation">
                <h4>📝 Anatomia de uma Tag:</h4>
                <p><code>&lt;tag&gt;conteúdo&lt;/tag&gt;</code></p>
                <ul>
                    <li><strong>&lt;tag&gt;</strong> = Tag de abertura</li>
                    <li><strong>conteúdo</strong> = O que vai aparecer na página</li>
                    <li><strong>&lt;/tag&gt;</strong> = Tag de fechamento (note a barra /)</li>
                </ul>
            </div>

            <h3>🚀 Por que HTML é Importante?</h3>
            <div class="importance-grid">
                <div class="importance-item">
                    <h4>🌐 Base da Web</h4>
                    <p>Todo site na internet usa HTML. É a linguagem universal da web!</p>
                </div>
                <div class="importance-item">
                    <h4>♿ Acessibilidade</h4>
                    <p>HTML bem estruturado permite que pessoas com deficiência naveguem pelo seu site.</p>
                </div>
                <div class="importance-item">
                    <h4>🔍 SEO</h4>
                    <p>Google e outros buscadores leem seu HTML para entender seu conteúdo.</p>
                </div>
                <div class="importance-item">
                    <h4>📱 Compatibilidade</h4>
                    <p>HTML funciona em qualquer dispositivo: computador, celular, tablet, TV!</p>
                </div>
            </div>

            <div class="next-steps">
                <h3>🎯 Próximos Passos:</h3>
                <p>Agora que você entende a teoria, vamos ver um exemplo prático e depois você vai criar seu primeiro código HTML!</p>
            </div>
            ''',
            'code_example': '''<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Minha Primeira Página HTML</title>
</head>
<body>
    <h1>Olá, Mundo!</h1>
    <p>Esta é minha primeira página HTML!</p>
    <p>Estou aprendendo na estação <strong>Verão</strong> do CodeSeasons!</p>
</body>
</html>''',
            'code_explanation': '''
            <h3>🔍 Vamos Analisar Cada Linha do Código:</h3>
            
            <div class="line-by-line">
                <div class="code-line">
                    <div class="line-number">1</div>
                    <div class="line-code">&lt;!DOCTYPE html&gt;</div>
                    <div class="line-explanation">
                        <strong>Declaração do Tipo de Documento</strong><br>
                        • Informa ao navegador que este é um documento HTML5<br>
                        • Deve ser SEMPRE a primeira linha<br>
                        • Não é uma tag HTML, é uma instrução especial
                    </div>
                </div>

                <div class="code-line">
                    <div class="line-number">2</div>
                    <div class="line-code">&lt;html lang="pt-br"&gt;</div>
                    <div class="line-explanation">
                        <strong>Elemento Raiz HTML</strong><br>
                        • Container principal que envolve todo o conteúdo<br>
                        • <code>lang="pt-br"</code> define o idioma como português brasileiro<br>
                        • Ajuda leitores de tela e ferramentas de tradução
                    </div>
                </div>

                <div class="code-line">
                    <div class="line-number">3</div>
                    <div class="line-code">&lt;head&gt;</div>
                    <div class="line-explanation">
                        <strong>Cabeçalho do Documento</strong><br>
                        • Contém metadados (informações sobre a página)<br>
                        • Conteúdo aqui NÃO aparece na página visível<br>
                        • Inclui título, codificação, links para CSS, etc.
                    </div>
                </div>

                <div class="code-line">
                    <div class="line-number">4</div>
                    <div class="line-code">&lt;meta charset="UTF-8"&gt;</div>
                    <div class="line-explanation">
                        <strong>Codificação de Caracteres</strong><br>
                        • UTF-8 suporta todos os caracteres especiais (ç, ã, é, 中文, 🎉)<br>
                        • Evita problemas com acentos e símbolos<br>
                        • É uma tag auto-fechada (não precisa de &lt;/meta&gt;)
                    </div>
                </div>

                <div class="code-line">
                    <div class="line-number">5</div>
                    <div class="line-code">&lt;meta name="viewport" content="width=device-width, initial-scale=1.0"&gt;</div>
                    <div class="line-explanation">
                        <strong>Configuração de Viewport</strong><br>
                        • <code>width=device-width</code>: largura = largura do dispositivo<br>
                        • <code>initial-scale=1.0</code>: zoom inicial de 100%<br>
                        • Essencial para sites responsivos (que funcionam no celular)
                    </div>
                </div>

                <div class="code-line">
                    <div class="line-number">6</div>
                    <div class="line-code">&lt;title&gt;Minha Primeira Página HTML&lt;/title&gt;</div>
                    <div class="line-explanation">
                        <strong>Título da Página</strong><br>
                        • Aparece na aba do navegador<br>
                        • Usado pelos buscadores (Google, Bing)<br>
                        • Aparece quando você salva a página nos favoritos
                    </div>
                </div>

                <div class="code-line">
                    <div class="line-number">7</div>
                    <div class="line-code">&lt;/head&gt;</div>
                    <div class="line-explanation">
                        <strong>Fechamento do Head</strong><br>
                        • Toda tag que abre deve fechar<br>
                        • Note a barra (/) antes do nome da tag<br>
                        • Marca o fim dos metadados
                    </div>
                </div>

                <div class="code-line">
                    <div class="line-number">8</div>
                    <div class="line-code">&lt;body&gt;</div>
                    <div class="line-explanation">
                        <strong>Corpo do Documento</strong><br>
                        • Aqui vai TODO o conteúdo visível da página<br>
                        • Textos, imagens, vídeos, formulários, etc.<br>
                        • É onde a criatividade acontece!
                    </div>
                </div>

                <div class="code-line">
                    <div class="line-number">9</div>
                    <div class="line-code">&lt;h1&gt;Olá, Mundo!&lt;/h1&gt;</div>
                    <div class="line-explanation">
                        <strong>Título Principal (Heading 1)</strong><br>
                        • &lt;h1&gt; é o título mais importante da página<br>
                        • Aparece grande e em negrito por padrão<br>
                        • Só deve ter UM &lt;h1&gt; por página (boas práticas de SEO)
                    </div>
                </div>

                <div class="code-line">
                    <div class="line-number">10</div>
                    <div class="line-code">&lt;p&gt;Esta é minha primeira página HTML!&lt;/p&gt;</div>
                    <div class="line-explanation">
                        <strong>Parágrafo</strong><br>
                        • &lt;p&gt; define um parágrafo de texto<br>
                        • Adiciona espaçamento automático antes e depois<br>
                        • É a tag mais usada para texto comum
                    </div>
                </div>

                <div class="code-line">
                    <div class="line-number">11</div>
                    <div class="line-code">&lt;p&gt;Estou aprendendo na estação &lt;strong&gt;Verão&lt;/strong&gt; do CodeSeasons!&lt;/p&gt;</div>
                    <div class="line-explanation">
                        <strong>Parágrafo com Ênfase</strong><br>
                        • Outro parágrafo normal<br>
                        • &lt;strong&gt; deixa o texto em negrito E indica importância<br>
                        • Melhor que &lt;b&gt; para acessibilidade
                    </div>
                </div>

                <div class="code-line">
                    <div class="line-number">12</div>
                    <div class="line-code">&lt;/body&gt;</div>
                    <div class="line-explanation">
                        <strong>Fechamento do Body</strong><br>
                        • Marca o fim do conteúdo visível<br>
                        • Toda tag &lt;body&gt; deve ter seu &lt;/body&gt;
                    </div>
                </div>

                <div class="code-line">
                    <div class="line-number">13</div>
                    <div class="line-code">&lt;/html&gt;</div>
                    <div class="line-explanation">
                        <strong>Fechamento do HTML</strong><br>
                        • Última linha do documento<br>
                        • Fecha o container principal<br>
                        • Fim do documento HTML!
                    </div>
                </div>
            </div>

            <div class="code-tips">
                <h3>💡 Dicas Importantes:</h3>
                <ul>
                    <li><strong>Indentação:</strong> Use espaços ou tabs para organizar o código</li>
                    <li><strong>Sempre feche as tags:</strong> &lt;p&gt; precisa de &lt;/p&gt;</li>
                    <li><strong>Ordem importa:</strong> DOCTYPE primeiro, depois html, head, body</li>
                    <li><strong>Case-insensitive:</strong> &lt;HTML&gt; = &lt;html&gt;, mas use minúsculas</li>
                </ul>
            </div>
            ''',
            'exercise': '''
            <div class="exercise-intro">
                <h3>🎯 Seu Primeiro Desafio HTML!</h3>
                <p>Agora é sua vez de criar! Você vai construir uma página HTML básica sobre você mesmo.</p>
            </div>

            <div class="exercise-requirements">
                <h4>📋 Requisitos (todos obrigatórios):</h4>
                <ol>
                    <li>Comece com <code>&lt;!DOCTYPE html&gt;</code></li>
                    <li>Use <code>&lt;html lang="pt-br"&gt;</code></li>
                    <li>Inclua a seção <code>&lt;head&gt;</code> com:
                        <ul>
                            <li><code>&lt;meta charset="UTF-8"&gt;</code></li>
                            <li><code>&lt;meta name="viewport" content="width=device-width, initial-scale=1.0"&gt;</code></li>
                            <li><code>&lt;title&gt;</code> com seu nome</li>
                        </ul>
                    </li>
                    <li>Na seção <code>&lt;body&gt;</code>, inclua:
                        <ul>
                            <li>Um título principal <code>&lt;h1&gt;</code> com "Olá, eu sou [Seu Nome]!"</li>
                            <li>Um parágrafo <code>&lt;p&gt;</code> se apresentando</li>
                            <li>Outro parágrafo dizendo que você está aprendendo HTML</li>
                        </ul>
                    </li>
                    <li>Feche todas as tags corretamente</li>
                </ol>
            </div>

            <div class="exercise-example">
                <h4>💡 Exemplo de como deve ficar:</h4>
                <p><strong>Título da aba:</strong> João Silva</p>
                <p><strong>Na página:</strong></p>
                <div class="example-output">
                    <h1 style="margin: 0.5rem 0;">Olá, eu sou João Silva!</h1>
                    <p style="margin: 0.5rem 0;">Meu nome é João, tenho 25 anos e adoro tecnologia.</p>
                    <p style="margin: 0.5rem 0;">Estou aprendendo HTML no CodeSeasons e estou muito animado!</p>
                </div>
            </div>

            <div class="exercise-tips">
                <h4>🚀 Dicas para o Sucesso:</h4>
                <ul>
                    <li>Copie a estrutura básica do exemplo e modifique o conteúdo</li>
                    <li>Substitua "Seu Nome" pelo seu nome real</li>
                    <li>Seja criativo na apresentação, mas mantenha a estrutura</li>
                    <li>Teste seu código clicando em "Executar" antes de verificar</li>
                </ul>
            </div>
            ''',
            'answer': '''<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>João Silva</title>
</head>
<body>
    <h1>Olá, eu sou João Silva!</h1>
    <p>Meu nome é João, tenho 25 anos e adoro tecnologia.</p>
    <p>Estou aprendendo HTML no CodeSeasons e estou muito animado!</p>
</body>
</html>''',
            'difficulty': 1
        }
    ]
    
    # Inserir conteúdo HTML
    for content in html_content:
        cursor.execute('''
            INSERT INTO educational_content 
            (season, phase, topic, content, code_example, code_explanation, exercise, answer, difficulty)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
        ''', (content['season'], content['phase'], content['topic'], content['content'], 
              content['code_example'], content['code_explanation'], content['exercise'], content['answer'], content['difficulty']))
    
    # Respostas super inteligentes do Tutor IA
    ai_responses = [
        # Saudações
        {
            'question': 'oi|olá|ola|hey|hi|hello|bom dia|boa tarde|boa noite|tudo bem|como vai',
            'answer': 'Olá! 👋 Tudo bem sim, obrigado por perguntar! Sou o CodeBot, seu tutor pessoal de programação. Estou aqui para te ajudar a dominar HTML, CSS, JavaScript e Python de forma divertida! Como posso te ajudar hoje? 😊',
            'category': 'saudacao',
            'keywords': 'saudação, cumprimento, oi, olá, hello',
            'context': 'greeting'
        },
        {
            'question': 'tchau|bye|até logo|falou|até mais|adeus',
            'answer': 'Até logo! 👋 Foi um prazer te ajudar hoje. Continue praticando e lembre-se: cada linha de código te deixa mais próximo de se tornar um desenvolvedor incrível! Nos vemos na próxima lição! 🚀',
            'category': 'despedida',
            'keywords': 'despedida, tchau, bye',
            'context': 'farewell'
        },
        
        # HTML - Conceitos Básicos
        {
            'question': 'o que é html|que é html|html é|define html|conceito html|significado html',
            'answer': 'HTML significa HyperText Markup Language (Linguagem de Marcação de Hipertexto). É a linguagem padrão para criar páginas web! 🌐\n\nPense no HTML como o esqueleto de uma casa:\n• Ele define a ESTRUTURA da página\n• Organiza o conteúdo (títulos, parágrafos, imagens)\n• Não cuida da aparência (isso é trabalho do CSS)\n• É interpretado pelos navegadores para mostrar as páginas\n\nTodo site que você visita usa HTML como base!',
            'category': 'html',
            'keywords': 'html, definição, conceito, linguagem, marcação',
            'context': 'html_basics'
        },
        {
            'question': 'o que é div|que é div|div é|define div|para que serve div|div html',
            'answer': 'A tag <div> é como uma "caixa invisível" no HTML! 📦\n\n🎯 **Para que serve:**\n• Agrupar outros elementos HTML\n• Organizar o layout da página\n• Aplicar estilos CSS a um grupo de elementos\n• Criar seções na página\n\n💡 **Exemplo prático:**\n```html\n<div class="cabecalho">\n    <h1>Meu Site</h1>\n    <p>Bem-vindo!</p>\n</div>\n```\n\n🔍 **Características:**\n• É um elemento de BLOCO (ocupa toda a largura)\n• Não tem significado semântico (é genérica)\n• É invisível por padrão\n• Muito usada com CSS para layout',
            'category': 'html',
            'keywords': 'div, container, bloco, agrupamento, layout',
            'context': 'html_elements'
        },
        {
            'question': 'o que é tag|que é tag|tag html|define tag|como funciona tag',
            'answer': 'Tags são como "etiquetas" que dizem ao navegador como interpretar cada parte do conteúdo! 🏷️\n\n🔍 **Anatomia de uma tag:**\n```html\n<tag>conteúdo</tag>\n```\n\n📋 **Partes:**\n• `<tag>` = Tag de abertura\n• `conteúdo` = O que aparece na página\n• `</tag>` = Tag de fechamento (note a barra /)\n\n💡 **Exemplos:**\n• `<h1>Título</h1>` = Título principal\n• `<p>Texto</p>` = Parágrafo\n• `<strong>Importante</strong>` = Texto em negrito\n\n⚠️ **Importante:** Sempre feche as tags que você abrir!',
            'category': 'html',
            'keywords': 'tag, elemento, abertura, fechamento, sintaxe',
            'context': 'html_syntax'
        },
        {
            'question': 'o que é head|que é head|head html|para que serve head|cabeçalho html',
            'answer': 'A tag <head> é como a "carteira de identidade" da sua página! 🆔\n\n🎯 **O que contém:**\n• Informações SOBRE a página (metadados)\n• Título que aparece na aba do navegador\n• Links para arquivos CSS e JavaScript\n• Configurações de codificação e viewport\n\n📋 **Elementos comuns no <head>:**\n```html\n<head>\n    <meta charset="UTF-8">\n    <title>Título da Página</title>\n    <meta name="viewport" content="width=device-width, initial-scale=1.0">\n</head>\n```\n\n🔍 **Importante:** O conteúdo do <head> NÃO aparece na página visível, mas é essencial para o funcionamento correto!',
            'category': 'html',
            'keywords': 'head, cabeçalho, metadados, título, meta',
            'context': 'html_structure'
        },
        {
            'question': 'o que é body|que é body|body html|para que serve body|corpo html',
            'answer': 'A tag <body> é onde a mágica acontece! ✨ É o "corpo" da sua página web.\n\n🎯 **Função:**\n• Contém TODO o conteúdo visível da página\n• Textos, imagens, vídeos, formulários, botões\n• Tudo que o usuário vê e interage\n\n📋 **Exemplo:**\n```html\n<body>\n    <h1>Meu Site</h1>\n    <p>Bem-vindo ao meu site!</p>\n    <img src="foto.jpg" alt="Minha foto">\n</body>\n```\n\n🔍 **Regra importante:** Só pode ter UM <body> por página HTML!\n\n💡 **Dica:** Se você pode ver na página, está no <body>!',
            'category': 'html',
            'keywords': 'body, corpo, conteúdo, visível, página',
            'context': 'html_structure'
        },
        
        # HTML - Tags específicas
        {
            'question': 'o que é h1|que é h1|h1 html|título html|heading html',
            'answer': 'A tag <h1> é o "título principal" da sua página! 👑\n\n🎯 **Características:**\n• É o título MAIS importante da página\n• Aparece grande e em negrito por padrão\n• Usado pelos buscadores (Google) para entender o tema\n• Só deve ter UM <h1> por página (boa prática)\n\n📋 **Hierarquia de títulos:**\n• <h1> = Título principal\n• <h2> = Subtítulos\n• <h3> = Sub-subtítulos\n• ... até <h6>\n\n💡 **Exemplo:**\n```html\n<h1>Meu Blog de Tecnologia</h1>\n<h2>Artigo sobre HTML</h2>\n<h3>Introdução ao HTML</h3>\n```',
            'category': 'html',
            'keywords': 'h1, título, heading, hierarquia, seo',
            'context': 'html_headings'
        },
        {
            'question': 'o que é p|que é p|p html|parágrafo html|tag p',
            'answer': 'A tag <p> é para criar parágrafos de texto! 📝\n\n🎯 **Função:**\n• Agrupa frases relacionadas\n• Adiciona espaçamento automático antes e depois\n• É a tag mais usada para texto comum\n\n💡 **Exemplo:**\n```html\n<p>Este é um parágrafo de texto.</p>\n<p>Este é outro parágrafo separado.</p>\n```\n\n🔍 **Resultado visual:**\nCada <p> fica em uma linha separada com espaço entre eles.\n\n⚠️ **Dica:** Use <p> para texto, não <br> para quebrar linhas!',
            'category': 'html',
            'keywords': 'p, parágrafo, texto, conteúdo',
            'context': 'html_text'
        },
        
        # Programação Geral
        {
            'question': 'como aprender programação|como começar programar|dicas programação|estudar programação',
            'answer': 'Ótima pergunta! Aqui estão minhas dicas para aprender programação com sucesso: 🚀\n\n📚 **1. Comece com o básico:**\n• HTML (estrutura) → CSS (estilo) → JavaScript (interação)\n• Entenda COMO funciona antes de decorar sintaxe\n\n💪 **2. Pratique MUITO:**\n• Código todo dia, mesmo que 15 minutos\n• Faça projetos pessoais\n• Resolva exercícios\n\n🤝 **3. Participe da comunidade:**\n• Fóruns, Discord, grupos no Telegram\n• GitHub para compartilhar código\n\n🎯 **4. Seja paciente:**\n• Programação é como aprender um idioma\n• Erros são normais e necessários!\n\nVocê está no caminho certo aqui no CodeSeasons! 😊',
            'category': 'geral',
            'keywords': 'aprender, programação, dicas, estudar, começar',
            'context': 'learning_tips'
        },
        
        # Ajuda e Suporte
        {
            'question': 'ajuda|help|socorro|não entendi|não sei|dúvida|como fazer',
            'answer': 'Claro que posso te ajudar! 🤝 Estou aqui para isso!\n\n🎯 **Como posso te ajudar melhor:**\n• Me conte qual parte específica você não entendeu\n• Mostre o código que está tentando fazer\n• Descreva o erro que está acontecendo\n\n💡 **Perguntas que posso responder:**\n• "O que é [conceito]?"\n• "Como fazer [tarefa]?"\n• "Por que meu código não funciona?"\n• "Qual a diferença entre [A] e [B]?"\n\n😊 **Lembre-se:** Não existe pergunta boba! Todo programador já foi iniciante um dia. Pode perguntar à vontade!',
            'category': 'ajuda',
            'keywords': 'ajuda, help, dúvida, socorro, não entendi',
            'context': 'help_support'
        },
        
        # Motivação
        {
            'question': 'difícil|muito difícil|não consigo|desistir|frustrado|complicado',
            'answer': 'Ei, respira fundo! 😌 É totalmente normal se sentir assim.\n\n💪 **Todo programador já passou por isso:**\n• Até os experts erraram muito no começo\n• Programação É difícil mesmo, mas é recompensadora\n• Cada erro te ensina algo novo\n\n🎯 **Dicas para superar a frustração:**\n• Faça uma pausa de 10 minutos\n• Volte ao básico se necessário\n• Celebre pequenas vitórias\n• Lembre-se: você já chegou até aqui!\n\n🌟 **Frase motivacional:**\n"O código que não funciona hoje será a base do seu sucesso amanhã!"\n\nVocê consegue! Estou aqui para te ajudar. Qual parte específica está difícil? 🚀',
            'category': 'motivacao',
            'keywords': 'difícil, frustração, desistir, motivação',
            'context': 'motivation'
        }
    ]
    
    # Inserir respostas do tutor IA
    for response in ai_responses:
        cursor.execute('''
            INSERT INTO ai_tutor_responses (question, answer, category, keywords, context)
            VALUES (?, ?, ?, ?, ?)
        ''', (response['question'], response['answer'], response['category'], response['keywords'], response['context']))
    
    conn.commit()
    conn.close()

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/season/<season_name>')
def season(season_name):
    return render_template('season.html', season=season_name)

@app.route('/season/<season_name>/phase/<int:phase_num>')
def phase(season_name, phase_num):
    conn = sqlite3.connect('educational_content.db')
    cursor = conn.cursor()
    
    cursor.execute('''
        SELECT topic, content, code_example, code_explanation, exercise, answer, difficulty
        FROM educational_content 
        WHERE season = ? AND phase = ?
    ''', (season_name, phase_num))
    
    content = cursor.fetchone()
    conn.close()
    
    if content:
        return render_template('phase.html', 
                             season=season_name, 
                             phase=phase_num,
                             topic=content[0],
                             content=content[1],
                             code_example=content[2],
                             code_explanation=content[3],
                             exercise=content[4],
                             answer=content[5],
                             difficulty=content[6])
    else:
        return render_template('coming_soon.html', season=season_name, phase=phase_num)

@app.route('/api/ai-tutor', methods=['POST'])
def ai_tutor():
    question = request.json.get('question', '').lower().strip()
    
    if not question:
        return jsonify({'answer': 'Por favor, faça uma pergunta! 😊'})
    
    conn = sqlite3.connect('educational_content.db')
    cursor = conn.cursor()
    
    # Buscar resposta usando regex para padrões mais inteligentes
    cursor.execute('SELECT question, answer FROM ai_tutor_responses')
    responses = cursor.fetchall()
    
    best_match = None
    for pattern, answer in responses:
        # Usar regex para busca mais inteligente
        if re.search(pattern, question, re.IGNORECASE):
            best_match = answer
            break
    
    conn.close()
    
    if best_match:
        return jsonify({'answer': best_match})
    else:
        # Resposta padrão mais inteligente
        fallback_response = f'''Hmm, ainda não sei responder especificamente sobre "{question}" 🤔

Mas posso te ajudar com:
• **HTML:** tags, estrutura, elementos
• **Conceitos:** o que é div, head, body, etc.
• **Dúvidas gerais:** como aprender, dicas de estudo
• **Motivação:** quando estiver difícil!

Tente reformular sua pergunta ou me pergunte algo como:
• "O que é HTML?"
• "Para que serve a tag div?"
• "Como fazer um título em HTML?"

Estou aqui para te ajudar! 😊'''
        
        return jsonify({'answer': fallback_response})

@app.route('/api/check-exercise', methods=['POST'])
def check_exercise():
    user_code = request.json.get('code', '').strip()
    season = request.json.get('season', '')
    phase = request.json.get('phase', 1)
    
    if not user_code:
        return jsonify({
            'score': 0,
            'feedback': ['❌ Você precisa escrever algum código primeiro!'],
            'passed': False
        })
    
    score = 0
    feedback = []
    
    # Verificações específicas para HTML básico
    if season == 'verao' and phase == 1:
        # Verificar DOCTYPE
        if '<!doctype html>' in user_code.lower() or '<!DOCTYPE html>' in user_code:
            score += 15
            feedback.append('✅ Excelente! Você incluiu o DOCTYPE HTML5!')
        else:
            feedback.append('❌ Faltou o DOCTYPE. Adicione <!DOCTYPE html> no início.')
        
        # Verificar tag html com lang
        if '<html lang="pt-br">' in user_code.lower() or '<html lang="pt-br"' in user_code.lower():
            score += 15
            feedback.append('✅ Perfeito! Você definiu o idioma como português brasileiro!')
        elif '<html>' in user_code.lower():
            score += 10
            feedback.append('⚠️ Tag HTML presente, mas considere adicionar lang="pt-br"')
        else:
            feedback.append('❌ Faltou a tag <html>. Ela deve envolver todo o conteúdo.')
        
        # Verificar head
        if '<head>' in user_code.lower() and '</head>' in user_code.lower():
            score += 15
            feedback.append('✅ Ótimo! Seção <head> presente e fechada corretamente!')
        else:
            feedback.append('❌ Faltou a seção <head> completa.')
        
        # Verificar meta charset
        if 'charset="utf-8"' in user_code.lower():
            score += 10
            feedback.append('✅ Codificação UTF-8 configurada!')
        else:
            feedback.append('❌ Adicione <meta charset="UTF-8"> no head.')
        
        # Verificar viewport
        if 'viewport' in user_code.lower():
            score += 10
            feedback.append('✅ Viewport configurado para responsividade!')
        else:
            feedback.append('⚠️ Considere adicionar meta viewport para dispositivos móveis.')
        
        # Verificar title
        if '<title>' in user_code.lower() and '</title>' in user_code.lower():
            score += 10
            feedback.append('✅ Título da página definido!')
        else:
            feedback.append('❌ Faltou a tag <title> no head.')
        
        # Verificar body
        if '<body>' in user_code.lower() and '</body>' in user_code.lower():
            score += 15
            feedback.append('✅ Seção <body> presente e fechada!')
        else:
            feedback.append('❌ Faltou a seção <body> completa.')
        
        # Verificar h1
        if '<h1>' in user_code.lower() and '</h1>' in user_code.lower():
            score += 10
            feedback.append('✅ Título principal <h1> incluído!')
        else:
            feedback.append('❌ Adicione um título principal com <h1>.')
        
        # Verificar parágrafos
        p_count = user_code.lower().count('<p>')
        if p_count >= 2:
            score += 10
            feedback.append(f'✅ Ótimo! Você criou {p_count} parágrafos!')
        elif p_count == 1:
            score += 5
            feedback.append('⚠️ Você tem 1 parágrafo. O exercício pede pelo menos 2.')
        else:
            feedback.append('❌ Adicione pelo menos 2 parágrafos com <p>.')
    
    # Verificações gerais
    if score < 30:
        feedback.append('💡 Dica: Revise a estrutura básica HTML e tente novamente!')
    elif score < 60:
        feedback.append('💡 Você está no caminho certo! Verifique os itens em vermelho.')
    elif score < 80:
        feedback.append('🎉 Muito bom! Só faltam alguns detalhes para ficar perfeito!')
    else:
        feedback.append('🏆 Excelente trabalho! Você dominou a estrutura básica HTML!')
    
    return jsonify({
        'score': min(score, 100),
        'feedback': feedback,
        'passed': score >= 75
    })

if __name__ == '__main__':
    init_db()
    populate_database()
    app.run(debug=True)
