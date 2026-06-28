import { Paradigm } from "../types";

export const paradigmsData: Paradigm[] = [
  {
    id: "imperative",
    name: "Imperativo (Imperative)",
    description: "Focado em COMO o computador deve executar as tarefas, descrevendo passo a passo as mudanças de estado por meio de comandos e atribuições.",
    keyPrinciples: [
      "Instruções sequenciais explícitas",
      "Mutabilidade de variáveis (manipulação direta de memória)",
      "Estruturas de controle de fluxo explícitas (loops, condicionais)"
    ],
    pros: [
      "Altamente intuitivo (se assemelha a uma receita)",
      "Controle preciso sobre recursos do sistema e hardware",
      "Excelente desempenho e eficiência de execução"
    ],
    cons: [
      "Mais propenso a bugs de concorrência devido ao estado mutável compartilhado",
      "Dificuldade de manutenção e modularização em bases de código gigantes",
      "Código costuma ser mais extenso e verboso"
    ],
    languagesExamples: ["C", "C++", "Assembly", "Fortran"],
    shortCodeSnippet: `// Exemplo Imperativo em Pseudocódigo
int soma = 0;
for (int i = 1; i <= 5; i++) {
    soma = soma + i; // Altera diretamente o estado de 'soma'
}`
  },
  {
    id: "procedural",
    name: "Procedural",
    description: "Uma evolução do paradigma Imperativo baseado no conceito de chamadas de procedimento (procedimentos, funções, subrotinas) para modularizar o código.",
    keyPrinciples: [
      "Divisão de tarefas em funções e subrotinas",
      "Localidade de variáveis (escopo local vs global)",
      "Reutilização de blocos de instruções sequenciais"
    ],
    pros: [
      "Muito mais organizado que o imperativo puramente linear",
      "Fácil reutilização de funções em diferentes partes do programa",
      "Redução de redundância de código"
    ],
    cons: [
      "Ainda depende fortemente de variáveis globais em projetos grandes",
      "Mudanças em estruturas de dados globais podem quebrar várias funções",
      "Dificuldade de modelar entidades complexas do mundo real"
    ],
    languagesExamples: ["C", "Pascal", "Go", "BASIC", "Fortran"],
    shortCodeSnippet: `// Exemplo Procedural em C
#include <stdio.h>

int calcularArea(int largura, int altura) {
    return largura * altura;
}

int main() {
    int area = calcularArea(10, 5);
    printf("Área: %d", area);
    return 0;
}`
  },
  {
    id: "oop",
    name: "Orientado a Objetos (OOP)",
    description: "Organiza o design de software em torno de 'objetos' (que contêm dados e comportamentos), em vez de funções e lógica puramente sequencial.",
    keyPrinciples: [
      "Encapsulamento (esconder detalhes internos e expor interfaces)",
      "Herança (reutilizar código de classes superiores)",
      "Polimorfismo (uma mesma interface com comportamentos distintos)",
      "Abstração (modelar elementos complexos do mundo real)"
    ],
    pros: [
      "Excelente para mapear e modelar cenários complexos do mundo real",
      "Altamente modular e extensível através de padrões de design",
      "Facilita o trabalho em grandes equipes em bases de dados unificadas"
    ],
    cons: [
      "Pode gerar estruturas de classes excessivamente complexas (over-engineering)",
      "Geralmente consome mais memória e processamento que o procedural puro",
      "Curva de aprendizado íngreme para dominar design patterns e princípios SOLID"
    ],
    languagesExamples: ["Java", "C#", "C++", "Python", "Ruby", "TypeScript"],
    shortCodeSnippet: `// Exemplo de OOP em C#
public class Animal {
    public string Nome { get; set; }
    public virtual void EmitirSom() => Console.WriteLine("Som genérico");
}

public class Cachorro : Animal {
    public override void EmitirSom() => Console.WriteLine("Au Au!");
}`
  },
  {
    id: "functional",
    name: "Funcional (Functional)",
    description: "Trata a computação como a avaliação de funções matemáticas e evita dados mutáveis e estados mutáveis (foco em O QUE resolver).",
    keyPrinciples: [
      "Imutabilidade (valores não mudam após criados)",
      "Funções puras (mesma entrada sempre gera mesma saída, sem efeitos colaterais)",
      "Funções de primeira classe e alta ordem (funções que recebem ou retornam funções)",
      "Composição de funções"
    ],
    pros: [
      "Extremamente seguro para programação concorrente e paralela",
      "Código altamente previsível, fácil de testar e debugar",
      "Sintaxe declarativa e matemática elegante"
    ],
    cons: [
      "Consumo de memória potencialmente maior devido à cópia constante de dados imutáveis",
      "Conceitos matemáticos complexos (Monads, Functors) assustam iniciantes",
      "Nem sempre é o paradigma mais performático para acesso direto a hardware"
    ],
    languagesExamples: ["Haskell", "Lisp", "Clojure", "Elixir", "Scala", "F#", "JavaScript"],
    shortCodeSnippet: `// Exemplo Funcional em JavaScript (ES6+)
const numeros = [1, 2, 3, 4, 5];
// Sem efeitos colaterais, map e filter retornam novas listas
const dobradosPares = numeros
  .filter(n => n % 2 === 0)
  .map(n => n * 2); // [4, 8]`
  },
  {
    id: "declarative",
    name: "Declarativo (Declarative)",
    description: "Expressa a lógica de uma computação sem descrever seu fluxo de controle. Foca em O QUE o programa deve realizar, não em COMO fazer.",
    keyPrinciples: [
      "Abstração total do controle de fluxo (sem loops implícitos no código do usuário)",
      "Foco na descrição do resultado desejado",
      "Uso de expressões em vez de comandos"
    ],
    pros: [
      "Altamente legível, quase como ler instruções humanas",
      "Menos boilerplate e linhas de código",
      "Otimização interna robusta feita pelo motor que executa a instrução"
    ],
    cons: [
      "Dificuldade de customização fina de performance",
      "Pode se comportar como uma 'caixa preta' se a ferramenta subjacente tiver bugs",
      "Menos flexível para fluxos algorítmicos gerais não previstos pela linguagem"
    ],
    languagesExamples: ["SQL", "HTML", "CSS", "Prolog", "LaTeX"],
    shortCodeSnippet: `-- Exemplo Declarativo em SQL
SELECT nome, salario 
FROM programadores 
WHERE stack = 'Rust' 
ORDER BY salario DESC;`
  },
  {
    id: "logic",
    name: "Lógico (Logic)",
    description: "Baseado em lógica matemática formal. O programador declara fatos e regras, e o interpretador deduz as respostas por meio de inferências.",
    keyPrinciples: [
      "Fatos (declarações verdades sobre o mundo)",
      "Regras (fórmulas lógicas relacionando fatos)",
      "Consultas (perguntas disparadas para o motor de inferência provar)"
    ],
    pros: [
      "Excelente para sistemas especialistas, inteligência artificial simbólica e provadores de teoremas",
      "Capacidade incrível de processar relações e restrições complexas",
      "Código limpo focado em regras de negócios reais"
    ],
    cons: [
      "Extremamente lento para fins gerais de computação (como web design ou renderização)",
      "Curva de aprendizado totalmente diferente de qualquer outra linguagem",
      "Dificuldade em depurar cadeias de inferência longas"
    ],
    languagesExamples: ["Prolog", "Datalog", "ASP"],
    shortCodeSnippet: `% Exemplo Lógico em Prolog
pai(joao, maria).
pai(maria, pedro).

% Regra: X é avô de Y se X é pai de Z, e Z é pai de Y.
avo(X, Y) :- pai(X, Z), pai(Z, Y).`
  },
  {
    id: "event_driven",
    name: "Orientado a Eventos (Event-Driven)",
    description: "O fluxo do programa é determinado por eventos externos: cliques de mouse, ações do usuário, mensagens de rede ou sensores de hardware.",
    keyPrinciples: [
      "Loop de Eventos (Event Loop) assíncrono",
      "Gatilhos (Event Emitters/Triggers)",
      "Escutadores (Listeners/Handlers) ou callbacks de resposta"
    ],
    pros: [
      "Essencial para criar interfaces de usuário dinâmicas e reativas (GUI)",
      "Altamente eficiente em operações de Entrada/Saída (I/O non-blocking)",
      "Desacoplamento fantástico entre quem produz o evento e quem o consome"
    ],
    cons: [
      "Pode levar ao 'Callback Hell' se o código assíncrono não for bem gerenciado",
      "Dificuldade de rastrear a ordem exata de execução temporal",
      "Mudanças rápidas de estado assíncrono podem gerar condições de corrida de dados"
    ],
    languagesExamples: ["JavaScript", "TypeScript", "Node.js", "C#", "Python (asyncio)"],
    shortCodeSnippet: `// Exemplo Orientado a Eventos em JavaScript
button.addEventListener('click', (event) => {
    console.log("Botão clicado em: " + event.timestamp);
    atualizarUI();
});`
  }
];
