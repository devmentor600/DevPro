import React, { useState } from "react";
import { paradigmsData } from "../data/paradigms";
import { Paradigm } from "../types";
import { 
  CheckCircle, 
  XCircle, 
  Cpu, 
  HelpCircle, 
  Award, 
  Sparkles, 
  Code,
  Check
} from "lucide-react";

interface ParadigmsSectionProps {
  onAwardXp: (xp: number) => void;
  completedQuizzes: string[];
  onCompleteQuiz: (quizId: string) => void;
}

export default function ParadigmsSection({ onAwardXp, completedQuizzes, onCompleteQuiz }: ParadigmsSectionProps) {
  const [selectedParadigm, setSelectedParadigm] = useState<Paradigm>(paradigmsData[0]);
  const [quizAnswers, setQuizAnswers] = useState<Record<string, number>>({});
  const [quizSubmitted, setQuizSubmitted] = useState<Record<string, boolean>>({});
  const [feedbackMsg, setFeedbackMsg] = useState<string | null>(null);

  // Paradigm-specific hardcoded mini questions to make learning highly active and gamified!
  const paradigmQuizzes: Record<string, { question: string; options: string[]; answer: number; explanation: string }> = {
    imperative: {
      question: "Qual é a principal característica do paradigma Imperativo?",
      options: [
        "Expressar a lógica de computação sem descrever controle de fluxo.",
        "Descrever passo a passo as mudanças de estado por meio de instruções sequenciais explícitas.",
        "Tratar variáveis como imutáveis e evitar efeitos colaterais.",
        "Diz apenas ao computador 'o que' fazer e deixa o motor decidir o 'como'."
      ],
      answer: 1,
      explanation: "O paradigma Imperativo foca em como resolver o problema, ordenando comandos sequenciais e alterando variáveis mutáveis na memória diretamente."
    },
    procedural: {
      question: "Qual o principal benefício do paradigma Procedural em relação ao Imperativo linear?",
      options: [
        "Elimina completamente a mutabilidade.",
        "Adiciona suporte nativo a Prolog e tabelas de lógica.",
        "Modulariza e reutiliza o código dividindo instruções em funções/procedimentos.",
        "Permite que o navegador compile Rust nativamente."
      ],
      answer: 2,
      explanation: "O paradigma Procedural organiza o código imperativo em sub-rotinas (procedimentos ou funções) reutilizáveis de escopo bem delimitado."
    },
    oop: {
      question: "O conceito de esconder detalhes internos de implementação e expor apenas uma interface pública é chamado de:",
      options: [
        "Polimorfismo",
        "Herança",
        "Abstração",
        "Encapsulamento"
      ],
      answer: 3,
      explanation: "O Encapsulamento protege o estado interno de um objeto contra acessos diretos externos indesejados, disponibilizando métodos de acesso controlados."
    },
    functional: {
      question: "O que caracteriza uma 'Função Pura' no paradigma Funcional?",
      options: [
        "Ela sempre gera a mesma saída para a mesma entrada e não altera estados globais ou gera efeitos colaterais.",
        "Ela obrigatoriamente contém um loop 'for' otimizado.",
        "Ela é escrita sem o uso de variáveis locais.",
        "Ela só funciona com números inteiros positivos."
      ],
      answer: 0,
      explanation: "Funções puras garantem previsibilidade e segurança contra condições de corrida, pois não dependem e nem alteram estados externos."
    },
    declarative: {
      question: "Qual das opções abaixo representa uma linguagem puramente Declarativa?",
      options: ["C", "SQL", "Java", "Go"],
      answer: 1,
      explanation: "SQL é declarativa por excelência. Você declara quais dados deseja (ex: SELECT nome FROM alunos) sem descrever como o banco deve localizá-los fisicamente."
    },
    logic: {
      question: "Como o motor do Prolog processa os programas?",
      options: [
        "Compilando diretamente para bytecode do Java.",
        "Avaliando funções lambda recursivas.",
        "Dizendo passo a passo ao hardware para alterar registradores.",
        "Utilizando regras lógicas e fatos predefinidos para realizar inferências automáticas."
      ],
      answer: 3,
      explanation: "Prolog roda um motor de inferência que tenta provar consultas com base em fatos e regras definidas na base de conhecimento lógica."
    },
    event_driven: {
      question: "Qual componente é vital para manter um fluxo eficiente e assíncrono no paradigma orientado a eventos?",
      options: [
        "Compilador C++ nativo",
        "Event Loop (Loop de Eventos)",
        "Herança múltipla",
        "Banco de dados relacional"
      ],
      answer: 1,
      explanation: "O Event Loop escuta constantemente a fila de eventos e despacha callbacks sem bloquear a execução principal da aplicação."
    }
  };

  const handleSelectParadigm = (p: Paradigm) => {
    setSelectedParadigm(p);
    setFeedbackMsg(null);
  };

  const handleAnswerSelect = (paradigmId: string, optionIndex: number) => {
    if (quizSubmitted[paradigmId]) return;
    setQuizAnswers(prev => ({ ...prev, [paradigmId]: optionIndex }));
  };

  const handleSubmitQuiz = (paradigmId: string) => {
    const selectedAnswer = quizAnswers[paradigmId];
    if (selectedAnswer === undefined) {
      setFeedbackMsg("Por favor, selecione uma resposta antes de enviar.");
      return;
    }

    const currentQuiz = paradigmQuizzes[paradigmId];
    const isCorrect = selectedAnswer === currentQuiz.answer;

    setQuizSubmitted(prev => ({ ...prev, [paradigmId]: true }));

    if (isCorrect) {
      const quizId = `quiz_paradigm_${paradigmId}`;
      if (!completedQuizzes.includes(quizId)) {
        onAwardXp(150); // Award 150 XP
        onCompleteQuiz(quizId);
        setFeedbackMsg("Resposta correta! Parabéns, você ganhou +150 XP! Seu conhecimento em fundamentos aumentou.");
      } else {
        setFeedbackMsg("Resposta correta! Você já realizou este quiz, mas seu conhecimento foi validado novamente.");
      }
    } else {
      setFeedbackMsg("Hum, resposta incorreta! Leia o conteúdo acima novamente e tente de novo.");
    }
  };

  const handleRetryQuiz = (paradigmId: string) => {
    setQuizSubmitted(prev => ({ ...prev, [paradigmId]: false }));
    setQuizAnswers(prev => {
      const copy = { ...prev };
      delete copy[paradigmId];
      return copy;
    });
    setFeedbackMsg(null);
  };

  const currentQuiz = paradigmQuizzes[selectedParadigm.id];
  const isCompleted = completedQuizzes.includes(`quiz_paradigm_${selectedParadigm.id}`);

  return (
    <div className="flex flex-col lg:flex-row gap-8 p-6 lg:p-8 text-[#E5E5E5] max-w-7xl mx-auto" id="paradigms-view">
      
      {/* Sidebar List of Paradigms */}
      <div className="w-full lg:w-1/3 flex flex-col gap-3">
        <div className="mb-4">
          <div className="flex items-center gap-2 text-indigo-400 font-bold tracking-wide uppercase text-xs">
            <Cpu className="h-4 w-4" />
            Camada de Fundamentos
          </div>
          <h2 className="text-2xl font-extrabold text-white mt-1">Paradigmas de Programação</h2>
          <p className="text-neutral-400 text-xs mt-1 leading-relaxed">
            Antes de programar em qualquer linguagem, domine os fundamentos lógicos que definem toda a computação universal.
          </p>
        </div>

        <div className="space-y-2">
          {paradigmsData.map((p) => {
            const isSel = selectedParadigm.id === p.id;
            const isQuizDone = completedQuizzes.includes(`quiz_paradigm_${p.id}`);
            return (
              <button
                key={p.id}
                onClick={() => handleSelectParadigm(p)}
                className={`w-full p-4 rounded text-left border transition-all flex items-center justify-between group ${
                  isSel 
                    ? "bg-[#161616] border-indigo-600/50 shadow-md shadow-indigo-950/10" 
                    : "bg-[#0F0F0F] border-[#1F1F1F] hover:bg-[#161616]/40 hover:border-[#2A2A2A]"
                }`}
              >
                <div>
                  <h3 className={`font-bold text-sm ${isSel ? "text-indigo-400" : "text-neutral-200"}`}>
                    {p.name}
                  </h3>
                  <p className="text-neutral-400 text-xs line-clamp-1 mt-0.5 pr-4">
                    {p.description}
                  </p>
                </div>
                {isQuizDone && (
                  <span className="bg-indigo-600/10 text-indigo-400 p-1.5 rounded border border-indigo-600/20 text-xs flex items-center justify-center">
                    <Check className="h-3.5 w-3.5 stroke-[3]" />
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Paradigm Content Panel */}
      <div className="w-full lg:w-2/3 flex flex-col gap-6">
        <div className="bg-[#0F0F0F] border border-[#1F1F1F] rounded overflow-hidden shadow-xl p-6 lg:p-8">
          
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#1F1F1F] pb-5">
            <div>
              <span className="text-xs font-bold text-indigo-400 uppercase tracking-widest bg-indigo-600/10 px-2.5 py-1 rounded border border-indigo-600/20">
                Paradigma Ativo
              </span>
              <h1 className="text-2xl lg:text-3xl font-extrabold text-white mt-2">
                {selectedParadigm.name}
              </h1>
            </div>
            {isCompleted && (
              <div className="flex items-center gap-1.5 bg-indigo-600/10 border border-indigo-600/30 text-indigo-400 text-xs font-bold px-3 py-1.5 rounded self-start md:self-center">
                <Award className="h-4 w-4" /> COMPLETO (+150 XP)
              </div>
            )}
          </div>

          {/* Description */}
          <div className="mt-6">
            <p className="text-neutral-300 text-sm leading-relaxed font-medium">
              {selectedParadigm.description}
            </p>
          </div>

          {/* Key Principles */}
          <div className="mt-6 bg-[#0A0A0A]/40 border border-[#1F1F1F] rounded p-5">
            <h3 className="font-bold text-sm text-neutral-200 mb-3 flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-indigo-400" /> Princípios Fundamentais
            </h3>
            <ul className="space-y-2">
              {selectedParadigm.keyPrinciples.map((principle, idx) => (
                <li key={idx} className="flex items-start gap-2.5 text-xs text-neutral-300 leading-relaxed">
                  <Check className="h-4 w-4 text-indigo-400 mt-0.5 shrink-0" />
                  <span>{principle}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Pros & Cons */}
          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="border border-[#1F1F1F] bg-[#111] p-4 rounded">
              <h4 className="font-bold text-xs text-indigo-400 mb-2.5 flex items-center gap-1.5">
                <CheckCircle className="h-4 w-4" /> Vantagens (Pros)
              </h4>
              <ul className="space-y-1.5">
                {selectedParadigm.pros.map((pro, idx) => (
                  <li key={idx} className="text-xs text-neutral-300 leading-relaxed list-disc list-inside">
                    {pro}
                  </li>
                ))}
              </ul>
            </div>

            <div className="border border-[#1F1F1F] bg-[#111] p-4 rounded">
              <h4 className="font-bold text-xs text-rose-400 mb-2.5 flex items-center gap-1.5">
                <XCircle className="h-4 w-4" /> Desvantagens (Cons)
              </h4>
              <ul className="space-y-1.5">
                {selectedParadigm.cons.map((con, idx) => (
                  <li key={idx} className="text-xs text-neutral-300 leading-relaxed list-disc list-inside">
                    {con}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Example Languages */}
          <div className="mt-6 flex flex-wrap items-center gap-2 text-xs">
            <span className="text-neutral-400 font-bold">Linguagens de Exemplo:</span>
            {selectedParadigm.languagesExamples.map((lang, idx) => (
              <span key={idx} className="bg-[#1A1A1A] text-neutral-200 px-2.5 py-1 rounded border border-[#2A2A2A] font-semibold">
                {lang}
              </span>
            ))}
          </div>

          {/* Code Snippet Box */}
          <div className="mt-6">
            <h3 className="font-bold text-sm text-neutral-200 mb-2.5 flex items-center gap-1.5">
              <Code className="h-4 w-4 text-indigo-400" /> Representação Visual do Código
            </h3>
            <div className="bg-black border border-[#1F1F1F] rounded p-4 font-mono text-xs text-[#E5E5E5] overflow-x-auto whitespace-pre leading-relaxed">
              {selectedParadigm.shortCodeSnippet}
            </div>
          </div>
        </div>

        {/* Dynamic Gamified Quiz Card */}
        {currentQuiz && (
          <div className="bg-[#0F0F0F] border border-[#1F1F1F] rounded p-6 lg:p-8 shadow-xl relative overflow-hidden">
            <div className="absolute right-0 top-0 w-32 h-32 bg-indigo-600/5 blur-3xl rounded-full" />
            
            <h3 className="text-lg font-bold text-neutral-200 flex items-center gap-2 border-b border-[#1F1F1F] pb-3 mb-5">
              <HelpCircle className="h-5 w-5 text-indigo-400 animate-bounce" />
              Desafio de Paradigma: Teste de Absorção
            </h3>

            <p className="text-sm font-semibold text-neutral-200 mb-4 leading-relaxed">
              {currentQuiz.question}
            </p>

            <div className="space-y-2.5">
              {currentQuiz.options.map((option, idx) => {
                const isSelected = quizAnswers[selectedParadigm.id] === idx;
                const isSubmitted = quizSubmitted[selectedParadigm.id];
                const isAnswerCorrect = idx === currentQuiz.answer;

                let optClass = "border-[#1F1F1F] bg-[#0A0A0A] hover:bg-[#161616]/40 hover:border-[#2A2A2A]";
                if (isSelected) optClass = "border-indigo-600 bg-indigo-600/5 text-indigo-400";
                
                if (isSubmitted) {
                  if (isAnswerCorrect) {
                    optClass = "border-indigo-600 bg-indigo-600/10 text-indigo-400";
                  } else if (isSelected) {
                    optClass = "border-rose-500 bg-rose-500/10 text-rose-300";
                  } else {
                    optClass = "border-[#1F1F1F] bg-black text-neutral-500 opacity-60";
                  }
                }

                return (
                  <button
                    key={idx}
                    disabled={isSubmitted}
                    onClick={() => handleAnswerSelect(selectedParadigm.id, idx)}
                    className={`w-full p-3.5 rounded border text-left text-xs font-medium transition-all flex items-center justify-between ${optClass}`}
                  >
                    <span>{option}</span>
                    {isSubmitted && isAnswerCorrect && (
                      <CheckCircle className="h-4.5 w-4.5 text-indigo-400 shrink-0 ml-2" />
                    )}
                    {isSubmitted && isSelected && !isAnswerCorrect && (
                      <XCircle className="h-4.5 w-4.5 text-rose-400 shrink-0 ml-2" />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Action buttons & feedback */}
            <div className="mt-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              {feedbackMsg && (
                <p className={`text-xs font-semibold leading-relaxed max-w-md ${
                  feedbackMsg.includes("correta") ? "text-indigo-400" : "text-rose-400"
                }`}>
                  {feedbackMsg}
                </p>
              )}
              
              <div className="flex gap-2 ml-auto shrink-0">
                {quizSubmitted[selectedParadigm.id] ? (
                  <button
                    onClick={() => handleRetryQuiz(selectedParadigm.id)}
                    className="bg-[#1A1A1A] hover:bg-[#252525] text-neutral-200 text-xs px-4 py-2.5 rounded border border-[#2A2A2A] font-bold transition-all"
                  >
                    Tentar Novamente
                  </button>
                ) : (
                  <button
                    onClick={() => handleSubmitQuiz(selectedParadigm.id)}
                    className="bg-white hover:bg-neutral-200 text-black text-xs px-5 py-2.5 rounded font-bold transition-colors shadow-md"
                  >
                    Enviar Resposta
                  </button>
                )}
              </div>
            </div>

            {quizSubmitted[selectedParadigm.id] && (
              <div className="mt-4 p-4 rounded bg-black border border-[#1F1F1F] text-xs text-neutral-400 leading-relaxed font-medium">
                <span className="font-bold text-neutral-300">Explicação do Especialista: </span>
                {currentQuiz.explanation}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
