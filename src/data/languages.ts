import { Language, Lesson, Quiz, ProjectTemplate } from "../types";

export const coreLanguages: Language[] = [
  {
    id: "python",
    name: "Python",
    paradigmIds: ["imperative", "procedural", "oop", "functional"],
    yearCreated: 1991,
    creator: "Guido van Rossum",
    mainUseCases: ["AI/ML", "Web", "Data Science", "Scripting", "Education"],
    basicSyntaxCode: `# Exemplo de Python
def saudar(nome: str) -> str:
    return f"Olá, {nome}! Bem-vindo ao DevForge."

# Estrutura de repetição expressiva
for i in range(3):
    print(saudar("Dev"))`,
    pros: [
      "Sintaxe limpa, legível e extremamente produtiva",
      "Ecossistema gigante de inteligência artificial e ciência de dados (TensorFlow, PyTorch, Pandas)",
      "Comunidade extremamente ativa com farta documentação"
    ],
    cons: [
      "Desempenho inferior comparado a linguagens compiladas nativas (C/C++, Rust)",
      "Dificuldades com multi-threading devido ao Global Interpreter Lock (GIL)",
      "Consumo de memória considerável"
    ],
    popularity: 98,
    description: "Conhecida por sua legibilidade incomparável, Python se tornou a linguagem número 1 para Inteligência Artificial, Ciência de Dados e automação de sistemas no mundo moderno.",
    whereToLearn: "https://www.python.org/doc/ ou canais de elite (dev.to, freeCodeCamp)",
    isCore: true,
    difficulty: "Beginner"
  },
  {
    id: "javascript_typescript",
    name: "JavaScript & TypeScript",
    paradigmIds: ["imperative", "functional", "oop", "event_driven"],
    yearCreated: 1995, // JS: 1995, TS: 2012
    creator: "Brendan Eich (JS) & Anders Hejlsberg (TS)",
    mainUseCases: ["Web", "Systems (Node)", "Mobile (React Native)", "Game Dev"],
    basicSyntaxCode: `// Exemplo de TypeScript
interface User {
  id: number;
  name: string;
}

function greetUser(user: User): string {
  return \`Olá, \${user.name}! Seu ID é \${user.id}.\`;
}

console.log(greetUser({ id: 101, name: "Alice" }));`,
    pros: [
      "Linguagem oficial da web (roda em 100% dos navegadores)",
      "TypeScript adiciona tipagem estática que previne 80% dos bugs comuns",
      "Ecossistema NPM é o maior catálogo de pacotes reutilizáveis do planeta"
    ],
    cons: [
      "Comportamentos implícitos bizarros em JavaScript legado (ex: [] + {} )",
      "Processo de build e ferramentas de transpilação às vezes complexos",
      "Single-threaded nativo (depende do loop de eventos para assincronismo)"
    ],
    popularity: 99,
    description: "Dominando todo o desenvolvimento Front-end e com presença massiva no Back-end (Node.js), a combinação JS/TS é indispensável para qualquer desenvolvedor de software moderno.",
    whereToLearn: "https://www.typescriptlang.org/docs/ ou MDN Web Docs",
    isCore: true,
    difficulty: "Beginner"
  },
  {
    id: "rust",
    name: "Rust",
    paradigmIds: ["imperative", "oop", "functional"],
    yearCreated: 2015,
    creator: "Graydon Hoare (Mozilla)",
    mainUseCases: ["Systems", "WebAssembly", "Cloud Native", "Embedded", "Cryptography"],
    basicSyntaxCode: `// Exemplo de Rust
fn main() {
    let nome = String::from("Rustacean");
    saudar(&nome);
}

fn saudar(nome: &str) {
    println!("Olá, {}! Memória segura garantida.", nome);
}`,
    pros: [
      "Segurança de memória estrita sem garbage collector (sistema de Ownership)",
      "Velocidade e performance comparáveis diretamente a C e C++",
      "Excelente gerenciador de pacotes e build (Cargo)"
    ],
    cons: [
      "Curva de aprendizado íngreme, especialmente sobre o Borrow Checker",
      "Tempos de compilação significativamente lentos",
      "Sintaxe densa e complexa para iniciantes"
    ],
    popularity: 92,
    description: "Rust foi votada a linguagem mais amada por desenvolvedores por anos seguidos. Ela redefine a programação de sistemas ao garantir segurança de memória em tempo de compilação, eliminando bugs críticos.",
    whereToLearn: "https://doc.rust-lang.org/book/ (The Rust Book)",
    isCore: true,
    difficulty: "Advanced"
  },
  {
    id: "golang",
    name: "Go (Golang)",
    paradigmIds: ["imperative", "procedural", "oop"],
    yearCreated: 2009,
    creator: "Robert Griesemer, Rob Pike, Ken Thompson (Google)",
    mainUseCases: ["Cloud Native", "Web APIs", "DevOps/CLI", "Distributed Systems"],
    basicSyntaxCode: `// Exemplo de Go
package main

import "fmt"

func main() {
    ch := make(chan string)
    go func() {
        ch <- "Go Goroutine enviando dados!"
    }()
    msg := <-ch
    fmt.Println(msg)
}`,
    pros: [
      "Concorrência nativa de alta performance baseada em CSP (Goroutines)",
      "Compilação ultra rápida gerando um único binário estático e leve",
      "Sintaxe minimalista criada para ser fácil de aprender e ler"
    ],
    cons: [
      "Falta de algumas conveniências de OOP tradicional (sem herança clássica)",
      "Tratamento de erros explícito e repetitivo (if err != nil)",
      "Garbage Collector pode introduzir pequenas pausas de latência"
    ],
    popularity: 91,
    description: "Criada pelo Google para resolver problemas de escala de sistemas, Go é a espinha dorsal de ferramentas de infraestrutura como Docker e Kubernetes.",
    whereToLearn: "https://go.dev/tour/ (A Tour of Go)",
    isCore: true,
    difficulty: "Intermediate"
  },
  {
    id: "java",
    name: "Java",
    paradigmIds: ["imperative", "oop", "functional"],
    yearCreated: 1995,
    creator: "James Gosling (Sun Microsystems)",
    mainUseCases: ["Enterprise backend", "Android Dev", "Big Data", "Financial Systems"],
    basicSyntaxCode: `// Exemplo de Java
public class Main {
    public static void main(String[] args) {
        String mensagem = "Escreva uma vez, rode em qualquer lugar!";
        System.out.println(mensagem);
    }
}`,
    pros: [
      "Independência de plataforma total através da Java Virtual Machine (JVM)",
      "Segurança e robustez corporativa consolidada por 30 anos no mercado",
      "Excelente gerenciamento de memória automático e ecossistema robusto"
    ],
    cons: [
      "Sintaxe muito verbosa exigindo muito código boilerplate",
      "Inicialização lenta (Cold Start) comparado a linguagens compiladas nativas",
      "Consumo de memória RAM expressivo pela JVM"
    ],
    popularity: 88,
    description: "O gigante do desenvolvimento corporativo. Java impulsiona sistemas bancários mundiais, servidores de grande escala e milhões de dispositivos Android.",
    whereToLearn: "https://dev.java/learn/ ou documentação da Oracle",
    isCore: true,
    difficulty: "Intermediate"
  },
  {
    id: "csharp",
    name: "C# (.NET)",
    paradigmIds: ["imperative", "oop", "functional", "event_driven"],
    yearCreated: 2000,
    creator: "Anders Hejlsberg (Microsoft)",
    mainUseCases: ["Game Dev (Unity)", "Enterprise APIs", "Windows Desktop", "Cloud Apps"],
    basicSyntaxCode: `// Exemplo de C#
using System;

class Program {
    static void Main() {
        var dev = new { Nome = "Forge", Nivel = "Elite" };
        Console.WriteLine($"Dev: {dev.Nome}, Skills: {dev.Nivel}");
    }
}`,
    pros: [
      "Integração perfeita com o moderno ecossistema multi-plataforma .NET Core",
      "Linguagem oficial do motor de jogos Unity (Líder em Game Dev)",
      "Recursos modernos constantes (LINQ, async/await de alta qualidade)"
    ],
    cons: [
      "Ainda tem certa dependência histórica de ferramentas Microsoft (embora hoje seja aberto)",
      "Pode ser excessivamente complexo devido à quantidade de recursos acumulados",
      "Configurações iniciais de projeto .NET assustam iniciantes"
    ],
    popularity: 89,
    description: "C# combina a elegância do Java com inovações constantes de linguagem, sendo amplamente adotada tanto no desenvolvimento de jogos indie e AAA quanto no corporativo de alta confiabilidade.",
    whereToLearn: "https://learn.microsoft.com/dotnet/csharp/",
    isCore: true,
    difficulty: "Intermediate"
  },
  {
    id: "cpp",
    name: "C & C++",
    paradigmIds: ["imperative", "procedural", "oop"],
    yearCreated: 1985, // C++: 1985, C: 1972
    creator: "Dennis Ritchie (C) & Bjarne Stroustrup (C++)",
    mainUseCases: ["Operating Systems", "Game Engines", "Browsers", "Embedded", "High-Freq Trading"],
    basicSyntaxCode: `// Exemplo de C++
#include <iostream>
#include <vector>

int main() {
    std::vector<int> nums = {10, 20, 30};
    for (int n : nums) {
        std::cout << n << " ";
    }
    return 0;
}`,
    pros: [
      "Controle cirúrgico total de memória e recursos de hardware",
      "Velocidade e eficiência crua incomparáveis na indústria",
      "Compatibilidade retroativa gigantesca e base de código universal"
    ],
    cons: [
      "Sem gerenciamento automático de memória (risco constante de Memory Leaks e Buffer Overflows)",
      "Sintaxe complexa e com comportamento indefinido (Undefined Behavior)",
      "Falta de um gerenciador de pacotes universal padrão (como NPM ou Cargo)"
    ],
    popularity: 87,
    description: "As linguagens fundamentais que construíram a computação moderna. Se você precisa de velocidade absoluta, controle de ponteiros de memória e escrever motores de jogos ou sistemas operacionais, C/C++ são obrigatórias.",
    whereToLearn: "https://en.cppreference.com/ ou learncpp.com",
    isCore: true,
    difficulty: "Advanced"
  },
  {
    id: "php",
    name: "PHP",
    paradigmIds: ["imperative", "oop", "functional"],
    yearCreated: 1995,
    creator: "Rasmus Lerdorf",
    mainUseCases: ["Server-Side Web", "CMS (WordPress, Drupal)", "Web APIs"],
    basicSyntaxCode: `<?php
// Exemplo de PHP moderno
class DevAcademy {
    public function __construct(private string $nome) {}
    public function saudar(): string {
        return "Bem-vindo ao " . $this->nome;
    }
}

$forge = new DevAcademy("DevForge");
echo $forge->saudar();`,
    pros: [
      "Alimenta cerca de 75-80% de todos os sites da internet mundial",
      "Framework Laravel oferece uma das melhores experiências de desenvolvimento Back-end",
      "Extremamente simples de implantar (basta fazer o upload para o servidor)"
    ],
    cons: [
      "Histórico de design inconsistente e funções legadas confusas no núcleo",
      "Preconceito de mercado injusto, baseado em versões antigas (PHP 4/5)",
      "Dificuldade histórica para tarefas concorrentes de alto desempenho"
    ],
    popularity: 80,
    description: "Longe de morrer, o PHP moderno (versões 8+) com o ecossistema Laravel é robusto, rápido e domina o desenvolvimento web mundial de ponta a ponta.",
    whereToLearn: "https://www.php.net/docs.php ou Laracasts",
    isCore: true,
    difficulty: "Beginner"
  },
  {
    id: "kotlin",
    name: "Kotlin",
    paradigmIds: ["imperative", "oop", "functional"],
    yearCreated: 2011,
    creator: "JetBrains",
    mainUseCases: ["Android Dev", "Backend Web", "Multiplatform Mobile (KMP)"],
    basicSyntaxCode: `// Exemplo de Kotlin
fun main() {
    val instrutor = "DevForge AI"
    println("Instrutor: $instrutor")
    
    // Tratamento nativo de Nulabilidade
    val nome: String? = null
    println(nome?.length ?: "Nome nulo seguro")
}`,
    pros: [
      "Linguagem oficial recomendada pelo Google para o desenvolvimento Android",
      "100% interoperável com qualquer código ou biblioteca Java existente",
      "Elimina erros de NullPointerException por meio de tipos que aceitam nulo explicitamente"
    ],
    cons: [
      "Tempos de compilação iniciais podem ser mais lentos que o Java",
      "Tamanho final do pacote APK móvel ligeiramente maior devido à runtime",
      "Kotlin Multiplatform ainda exige curva para compartilhar 100% do código"
    ],
    popularity: 85,
    description: "Kotlin trouxe modernidade, segurança de nulos e expressividade para a JVM, destronando o Java no desenvolvimento móvel e conquistando espaço expressivo em servidores corporativos.",
    whereToLearn: "https://kotlinlang.org/docs/home.html",
    isCore: true,
    difficulty: "Intermediate"
  },
  {
    id: "swift",
    name: "Swift",
    paradigmIds: ["imperative", "oop", "functional"],
    yearCreated: 2014,
    creator: "Apple",
    mainUseCases: ["iOS/macOS App Development", "Apple Watch/TV", "Systems"],
    basicSyntaxCode: `// Exemplo de Swift
import Foundation

struct Estudante {
    let nome: String
    var progressoXP: Int
}

let aluno = Estudante(nome: "Forge Master", progressoXP: 250)
print("Estudante \\(aluno.nome) possui \\(aluno.progressoXP) XP!")`,
    pros: [
      "Desempenho incrivelmente rápido e seguro",
      "Sintaxe limpa, moderna e amigável com inferência de tipos avançada",
      "Integração perfeita com SwiftUI para criar telas nativas belíssimas"
    ],
    cons: [
      "Ecossistema restrito predominantemente a dispositivos Apple",
      "Desenvolvimento em Swift requer quase obrigatoriamente um Mac",
      "Mudanças frequentes na API em versões iniciais criaram desgaste histórico"
    ],
    popularity: 83,
    description: "Substituta moderna do Objective-C, Swift é a linguagem compilada segura criada pela Apple para construir aplicativos fluidos para iPhone, iPad, Mac e Apple Watch.",
    whereToLearn: "https://www.swift.org/documentation/ ou Playgrounds do Swift",
    isCore: true,
    difficulty: "Intermediate"
  },
  {
    id: "sql",
    name: "SQL",
    paradigmIds: ["declarative"],
    yearCreated: 1974,
    creator: "Donald D. Chamberlin & Raymond F. Boyce (IBM)",
    mainUseCases: ["Relational Databases", "Data Analysis", "Reporting", "Backend Sync"],
    basicSyntaxCode: `-- Exemplo de SQL ANSI
CREATE TABLE alunos (
    id INTEGER PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    xp INTEGER DEFAULT 0
);

INSERT INTO alunos (nome, xp) VALUES ('Dev Elite', 1500);

SELECT nome, xp FROM alunos WHERE xp > 1000;`,
    pros: [
      "O padrão absoluto de manipulação de dados estruturados há mais de 50 anos",
      "Declarativa e extremamente simples de ler para consultas complexas",
      "Conhecimento de SQL é exigido em praticamente 95% das vagas de engenharia de software"
    ],
    cons: [
      "Pode se tornar complexo demais em queries gigantestas de relatórios (milhares de linhas)",
      "Incompatibilidades sutis entre diferentes dialetos (PostgreSQL, MySQL, SQL Server)",
      "Não é projetada para programação procedural comum (embora existam PL/SQL, PL/pgSQL)"
    ],
    popularity: 96,
    description: "Structured Query Language. A linguagem declarativa de bancos de dados relacionais que permite ao desenvolvedor descrever precisamente quais dados deseja obter de tabelas interconectadas.",
    whereToLearn: "https://sqlbolt.com/ ou documentação do PostgreSQL",
    isCore: true,
    difficulty: "Beginner"
  }
];

export const encyclopediaLanguages: Language[] = [
  {
    id: "haskell",
    name: "Haskell",
    paradigmIds: ["functional", "declarative"],
    yearCreated: 1990,
    mainUseCases: ["Finance", "Academic Research", "Compiler Design", "Big Data"],
    basicSyntaxCode: `// Fatorial em Haskell
fatorial :: Integer -> Integer
fatorial 0 = 1
fatorial n = n * fatorial (n - 1)`,
    pros: ["Imutabilidade absoluta", "Tipagem estática avançada", "Avaliação preguiçosa (Lazy Evaluation)"],
    cons: ["Extremamente difícil de ler no início", "Baixa oferta de vagas de trabalho", "Curva matemática íngreme"],
    popularity: 45,
    description: "Uma linguagem funcional puramente declarativa com tipagem estática forte e avaliação preguiçosa. É a favorita do meio acadêmico e de sistemas financeiros ultrasseguros.",
    whereToLearn: "https://www.haskell.org/",
    isCore: false,
    difficulty: "Advanced"
  },
  {
    id: "elixir",
    name: "Elixir",
    paradigmIds: ["functional", "event_driven"],
    yearCreated: 2011,
    creator: "José Valim",
    mainUseCases: ["Distributed Web APIs", "Real-time Messaging", "IoT"],
    basicSyntaxCode: `# Exemplo de Elixir (Pattern Matching)
defmodule Saudador do
  def ola(%{nome: nome}), do: IO.puts("Olá, #{nome}!")
end
Saudador.ola(%{nome: "José"})`,
    pros: ["Extremamente escalável na máquina virtual Erlang BEAM", "Suporta milhões de conexões simultâneas de forma leve", "Sintaxe moderna inspirada em Ruby"],
    cons: ["Comunidade menor que JS/Python", "Paradigma puramente funcional exige mudança mental", "Bibliotecas de machine learning em estágio inicial"],
    popularity: 68,
    description: "Criada pelo brasileiro José Valim, Elixir roda em cima da confiável máquina virtual Erlang BEAM, fornecendo concorrência espetacular e tolerância a falhas para microsserviços.",
    whereToLearn: "https://elixir-lang.org/",
    isCore: false,
    difficulty: "Intermediate"
  },
  {
    id: "prolog",
    name: "Prolog",
    paradigmIds: ["logic", "declarative"],
    yearCreated: 1972,
    mainUseCases: ["AI", "Natural Language Processing", "Expert Systems"],
    basicSyntaxCode: `humano(socrates).
mortal(X) :- humano(X).
% Consulta: ?- mortal(socrates). (True)`,
    pros: ["Excelente para lógica simbólica e quebra-cabeças complexos", "Provador de teoremas interno", "Fácil definição de regras"],
    cons: ["Inadequada para aplicações web ou móveis tradicionais", "Consumo alto de recursos para buscas cegas", "Dificuldade em depurar"],
    popularity: 20,
    description: "A linguagem pioneira em programação lógica. Ideal para computação simbólica, processamento de linguagem natural e sistemas que requerem dedução de regras de negócio complexas.",
    whereToLearn: "https://www.swi-prolog.org/",
    isCore: false,
    difficulty: "Advanced"
  },
  {
    id: "lua",
    name: "Lua",
    paradigmIds: ["procedural", "functional", "oop"],
    yearCreated: 1993,
    creator: "Roberto Ierusalimschy, Waldemar Celes, Luiz Henrique de Figueiredo (PUC-Rio)",
    mainUseCases: ["Game Scripting (Roblox, WoW)", "Embedded Systems", "Nginx Config"],
    basicSyntaxCode: `-- Tabela em Lua (Estrutura única de dados)
local jogador = { nome = "Forge", level = 42 }
print("Bem vindo, " .. jogador.nome)`,
    pros: ["Linguagem extremamente leve e rápida de embutir em C", "Criada no Brasil na PUC-Rio", "Excelente para automação de scripts de jogos"],
    cons: ["Poucas estruturas nativas além de tabelas associativas", "Indexação começa em 1 (pode confundir programadores)", "Escopo padrão global se omitir 'local'"],
    popularity: 75,
    description: "Desenvolvida no Brasil, Lua é mundialmente famosa por ser a linguagem de extensão e scripting mais rápida do mundo, servindo de base para jogos como Roblox e World of Warcraft.",
    whereToLearn: "https://www.lua.org/",
    isCore: false,
    difficulty: "Beginner"
  },
  {
    id: "cobol",
    name: "COBOL",
    paradigmIds: ["imperative", "procedural"],
    yearCreated: 1959,
    creator: "Grace Hopper e comitê CODASYL",
    mainUseCases: ["Legacy Banking", "Insurance Servers", "Government Systems"],
    basicSyntaxCode: `IDENTIFICATION DIVISION.
PROGRAM-ID. HELLO-WORLD.
PROCEDURE DIVISION.
    DISPLAY 'HELLO, WORLD!'.
    STOP RUN.`,
    pros: ["Extremamente preciso para contabilidade financeira", "Roda o núcleo de grandes bancos há mais de 60 anos", "Processamento em lote super robusto"],
    cons: ["Sintaxe incrivelmente verbosa baseada em cartões perfurados", "Escassez severa de novos programadores", "Difícil de integrar com tecnologias modernas"],
    popularity: 38,
    description: "Common Business-Oriented Language. Criada na década de 50 sob liderança de Grace Hopper, ainda processa trilhões de dólares diariamente em sistemas bancários legados pelo mundo.",
    whereToLearn: "https://www.mainframe.com ou canais especializados de mainframe",
    isCore: false,
    difficulty: "Advanced"
  },
  {
    id: "julia",
    name: "Julia",
    paradigmIds: ["imperative", "functional", "oop"],
    yearCreated: 2012,
    mainUseCases: ["Scientific Computing", "Machine Learning", "Numerical Analysis"],
    basicSyntaxCode: `# Exemplo de Julia (Despacho Múltiplo)
f(x::Float64, y::Float64) = x * y + 10.0
println(f(2.0, 3.0))`,
    pros: ["Velocidade de C com a simplicidade de escrita do Python", "Despacho múltiplo (Multiple Dispatch) espetacular", "Excelente para álgebra linear de alta performance"],
    cons: ["Tempo para o primeiro gráfico ser desenhado (Time-to-first-plot) lento", "Comunidade ainda menor que Python no mercado", "Ferramental mais jovem"],
    popularity: 65,
    description: "Concebida para computação científica de alto desempenho, a linguagem Julia resolve o problema de 'duas linguagens' ao entregar código fácil de escrever que compila direto para código de máquina superveloz.",
    whereToLearn: "https://julialang.org/",
    isCore: false,
    difficulty: "Intermediate"
  },
  {
    id: "brainfuck",
    name: "Brainfuck",
    paradigmIds: ["imperative"],
    yearCreated: 1993,
    creator: "Urban Müller",
    mainUseCases: ["Esoteric Programming", "Brain Exercising"],
    basicSyntaxCode: `++++++++++[>+++++++>++++++++++>+++>+<<<<-]>++.>+.+++++++..+++.>++.<<+++++++++++++++.>.+++.------.--------.>+.>.`,
    pros: ["Possui apenas 8 comandos de caracteres simples", "Compiladores extremamente pequenos (menos de 200 bytes)", "Divertido de resolver quebra-cabeças"],
    cons: ["Completamente ilegível e impraticável para desenvolvimento real", "Falta de suporte para qualquer biblioteca real", "Sem tipos ou estruturas de dados normais"],
    popularity: 15,
    description: "Uma linguagem de programação esotérica (esolang) projetada puramente para desafiar os limites da mente. Composta de apenas 8 comandos, é Turing-completa mas intencionalmente dolorosa de codificar.",
    whereToLearn: "Esoteric Wiki",
    isCore: false,
    difficulty: "Advanced"
  },
  {
    id: "lisp",
    name: "Lisp (Common Lisp & Scheme)",
    paradigmIds: ["functional", "procedural", "oop"],
    yearCreated: 1958,
    creator: "John McCarthy",
    mainUseCases: ["Artificial Intelligence History", "Editor Config (Emacs)", "Macros"],
    basicSyntaxCode: `;; Exemplo de Lisp
(defun fatorial (n)
  (if (<= n 1)
      1
      (* n (fatorial (- n 1)))))`,
    pros: ["Sistema de Macros extremamente poderoso", "Código é tratado como dados (Homoiconicidade)", "Excelente REPL para desenvolvimento iterativo"],
    cons: ["Sintaxe repleta de parênteses (pode ser confusa de equilibrar)", "Mercado corporativo moderno muito restrito", "Falta de tipagem estática na versão tradicional"],
    popularity: 50,
    description: "Uma das linguagens de alto nível mais antigas do mundo. Lisp introduziu conceitos geniais como Garbage Collection, estruturas em árvore e computação recursiva, influenciando quase todas as linguagens modernas.",
    whereToLearn: "Practical Common Lisp",
    isCore: false,
    difficulty: "Advanced"
  }
];

export const coreLessons: Record<string, Lesson[]> = {
  python: [
    {
      id: "py_01",
      title: "Introdução e Sintaxe Limpa",
      description: "Aprenda por que o Python é tão popular e entenda a importância de indentar o código corretamente.",
      content: `### Bem-vindo ao Python!

Python é uma linguagem de alto nível com sintaxe extremamente focada na **legibilidade do desenvolvedor**. O lema do Python é: *"Código é lido muito mais vezes do que é escrito"*.

#### A Regra de Ouro: Indentação
Ao contrário de linguagens como Java ou C++ que usam chaves \`{}\` para definir blocos de código, o Python usa **espaços em branco (indentação)**. Normalmente usamos **4 espaços** para indicar que um bloco de código pertence a uma função, loop ou condicional.

#### Variáveis Dinâmicas
No Python, você não precisa declarar o tipo da variável antes de criá-la. O interpretador deduz automaticamente:
\`\`\`python
nome = "DevForge" # String
idade = 26        # Integer
ativo = True      # Boolean
\`\`\`

#### Sua Missão:
Crie uma variável chamada \`linguagem\` com o valor \`"Python"\` e uma variável chamada \`ano\` com o valor \`1991\`.`,
      codeExample: `linguagem = "Python"\nano = 1991\nprint(f"A linguagem {linguagem} foi criada em {ano}!")`,
      codeLanguage: "python",
      exercise: {
        instruction: "Crie as variáveis 'linguagem' e 'ano' conforme instruído acima.",
        starterCode: "# Escreva seu código aqui\n",
        solution: "linguagem = \"Python\"\nano = 1991"
      }
    },
    {
      id: "py_02",
      title: "Funções e Loops Expressivos",
      description: "Entenda como automatizar fluxos com loops 'for' e como agrupar lógica com 'def'.",
      content: `### Funções e Estruturas de Repetição

Em Python, definimos funções usando a palavra-chave \`def\`.

\`\`\`python
def saudar_desenvolvedor(nome):
    return f"Olá, {nome}! Prepare-se para codar."
\`\`\`

#### Estrutura de Repetição 'for'
Para percorrer uma lista ou intervalo de números, usamos \`for\` aliado à função \`range()\`:

\`\`\`python
# Roda de 0 até 2
for i in range(3):
    print(f"Contagem: {i}")
\`\`\`

#### Sua Missão:
Crie uma função chamada \`dobro\` que recebe um número \`n\` e retorna o valor de \`n * 2\`.`,
      codeExample: `def dobro(n):\n    return n * 2\n\nprint(dobro(5)) # Retorna 10`,
      codeLanguage: "python",
      exercise: {
        instruction: "Defina a função 'dobro(n)' que calcula o dobro do número fornecido.",
        starterCode: "def dobro(n):\n    # Seu código aqui\n",
        solution: "def dobro(n):\n    return n * 2"
      }
    }
  ],
  rust: [
    {
      id: "rust_01",
      title: "Segurança de Memória sem GC",
      description: "Descubra o revolucionário conceito de Ownership (propriedade) do Rust.",
      content: `### O Coração do Rust: Ownership

Rust não possui um **Garbage Collector** (como Java ou C#) e não exige que você **gerencie a memória manualmente** (como C/C++). 

Como ele consegue ser seguro e rápido ao mesmo tempo? Através do sistema de **Ownership** (Propriedade).

#### Três Regras Básicas:
1. Cada valor no Rust tem um dono (uma variável).
2. Só pode existir **um dono por vez**.
3. Quando o dono sai de escopo, o valor é limpo da memória automaticamente.

#### Exemplo de Movimentação de Dono (Move):
\`\`\`rust
let s1 = String::from("Olá");
let s2 = s1; // O dono agora é s2! s1 se torna INVÁLIDA e não pode mais ser usada.
\`\`\`

Se você deseja emprestar o valor sem transferir o dono, você deve usar **referências (Borrowing)** com o caractere \`&\`:
\`\`\`rust
let s1 = String::from("Olá");
let tam = calcular_tamanho(&s1); // Emprestando s1 de forma segura!
\`\`\`

#### Sua Missão:
Crie uma variável imutável chamada \`idade\` com o valor \`26\` usando a palavra-chave \`let\`.`,
      codeExample: `fn main() {\n    let idade = 26;\n    println!("Idade: {}", idade);\n}`,
      codeLanguage: "rust",
      exercise: {
        instruction: "Crie a variável 'idade' igual a 26.",
        starterCode: "fn main() {\n    // Crie a variável idade aqui\n}",
        solution: "fn main() {\n    let idade = 26;\n}"
      }
    }
  ],
  javascript_typescript: [
    {
      id: "js_01",
      title: "O Loop de Eventos e Assincronismo",
      description: "Aprenda a lidar com operações assíncronas usando Promises e Async/Await de forma elegante.",
      content: `### Assincronismo no Core da Web

O JavaScript é uma linguagem **single-threaded** (uma única linha de execução), mas ele lida com milhares de requisições de rede de forma simultânea graças ao **Event Loop (Loop de Eventos)**.

Para escrever código assíncrono moderno e limpo, usamos as palavras-chave \`async\` e \`await\`.

#### Exemplo prático:
\`\`\`typescript
async function buscarDadosDaAPI() {
  try {
    const resposta = await fetch("https://api.github.com/users/octocat");
    const dados = await resposta.json();
    console.log(dados.name);
  } catch (erro) {
    console.error("Algo deu errado:", erro);
  }
}
\`\`\`

#### Sua Missão:
Crie uma função assíncrona chamada \`obterVersao\` que simplesmente retorna o número \`1\`.`,
      codeExample: `async function obterVersao() {\n  return 1;\n}\n\nobterVersao().then(console.log);`,
      codeLanguage: "typescript",
      exercise: {
        instruction: "Defina a função assíncrona 'obterVersao' retornando o número 1.",
        starterCode: "async function obterVersao() {\n  // Seu código aqui\n}",
        solution: "async function obterVersao() {\n  return 1;\n}"
      }
    }
  ]
};

export const coreQuizzes: Record<string, Quiz[]> = {
  python: [
    {
      id: "py_quiz_01",
      title: "Quiz: Fundamentos de Python",
      description: "Teste seus conhecimentos básicos sobre a sintaxe, filosofia e estrutura do Python.",
      xpReward: 100,
      questions: [
        {
          id: "py_q1",
          question: "Como o Python delimita blocos de código (escopos)?",
          options: [
            "Usando chaves { }",
            "Usando palavras-chave 'begin' e 'end'",
            "Usando indentação (espaços em branco)",
            "Usando ponto-e-vírgula no final de cada instrução"
          ],
          correctAnswerIndex: 2,
          explanation: "Python usa estritamente a indentação (recuo de espaços em branco) para delimitar o escopo de funções, condicionais e loops."
        },
        {
          id: "py_q2",
          question: "Qual das seguintes bibliotecas é o padrão da indústria para Deep Learning em Python?",
          options: ["Pandas", "PyTorch", "Django", "NumPy"],
          correctAnswerIndex: 1,
          explanation: "PyTorch (junto com o TensorFlow) é o ecossistema líder mundial para treinar e implantar redes neurais profundas."
        }
      ]
    }
  ],
  rust: [
    {
      id: "rust_quiz_01",
      title: "Quiz: Ownership e Memória",
      description: "Será que você domina o borrow checker e as regras de empréstimo do Rust?",
      xpReward: 150,
      questions: [
        {
          id: "rust_q1",
          question: "O que acontece ao atribuir 's1' (do tipo String) para 's2' no Rust (ex: let s2 = s1;)?",
          options: [
            "O valor de s1 é copiado por completo na memória heap para s2",
            "O Ownership do valor é transferido (Moved) para s2, e s1 torna-se inválida",
            "Cria-se uma referência compartilhada imutável automática",
            "A compilação falha pois strings não podem ser reatribuídas"
          ],
          correctAnswerIndex: 1,
          explanation: "No Rust, tipos complexos alocados na heap têm seu Ownership movido na atribuição. Portanto, s1 passa o dono para s2 e s1 deixa de existir no escopo atual."
        }
      ]
    }
  ],
  javascript_typescript: [
    {
      id: "js_quiz_01",
      title: "Quiz: Assincronismo e Tipos",
      description: "Desafie-se sobre Promises e interfaces de TypeScript.",
      xpReward: 120,
      questions: [
        {
          id: "js_q1",
          question: "Como o TypeScript ajuda o desenvolvedor comparado ao JavaScript clássico?",
          options: [
            "Deixando o programa mais leve na execução no navegador",
            "Garantindo tipagem estática que previne bugs no momento da compilação",
            "Permitindo rodar o código direto em servidores sem compilação",
            "Substituindo o loop de eventos por threads tradicionais"
          ],
          correctAnswerIndex: 1,
          explanation: "TypeScript adiciona um sistema de tipos estático que analisa seu código antes da execução, identificando possíveis erros antes mesmo do código rodar."
        }
      ]
    }
  ]
};

export const academyProjects: Record<string, ProjectTemplate[]> = {
  python: [
    {
      id: "py_proj_01",
      title: "Analisador Inteligente de Log com IA",
      description: "Construa um pipeline em Python para parsear gigabytes de dados de log, identificando anomalias estruturais críticas.",
      difficulty: "Medium",
      requirements: [
        "Ler um arquivo local contendo registros de erros do servidor",
        "Filtrar as linhas por nível de criticidade (INFO, WARNING, ERROR)",
        "Gerar um relatório estatístico formatado em Markdown com totais",
        "Opcional: Utilizar uma biblioteca para exibir gráficos de barra no terminal"
      ],
      guide: "1. Use 'open()' para carregar o arquivo de logs.\n2. Crie um dicionário para agrupar as contagens.\n3. Escreva um arquivo 'relatorio.md' gravando os resultados estruturados."
    }
  ],
  rust: [
    {
      id: "rust_proj_01",
      title: "Servidor Web TCP Multithread do Zero",
      description: "Projete e implemente do zero um servidor de soquetes assíncronos e um Pool de Threads estático nativo em Rust.",
      difficulty: "Hard",
      requirements: [
        "Escutar conexões em um endereço IP e porta locais (socket binding)",
        "Gerenciar um pool de threads estático criado manualmente para lidar com requisições simultâneas",
        "Retornar respostas HTTP 200 válidas com arquivos HTML reais",
        "Garantir zero memory leaks ou corridas de dados no gerenciamento do Pool"
      ],
      guide: "1. Use 'std::net::TcpListener' para binds.\n2. Desenvolva um 'ThreadPool' que recebe closures usando canais sincronizados 'mpsc::channel'.\n3. Envie 'JoinHandle's em threads Worker dedicadas."
    }
  ]
};
