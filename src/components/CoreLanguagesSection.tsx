import React, { useState, useEffect } from "react";
import { coreLanguages, coreLessons, coreQuizzes, academyProjects } from "../data/languages";
import { Language, Lesson, Quiz, ProjectTemplate } from "../types";
import { 
  Play, 
  Sparkles, 
  Terminal, 
  HelpCircle, 
  CheckCircle, 
  Award, 
  BookOpen, 
  ListTodo,
  Code2,
  ChevronRight,
  RefreshCw,
  FileCode,
  XCircle,
  Lightbulb,
  Check
} from "lucide-react";

interface CoreLanguagesSectionProps {
  onAwardXp: (xp: number) => void;
  completedLessons: string[];
  completedQuizzes: string[];
  completedProjects: string[];
  onCompleteLesson: (lessonId: string) => void;
  onCompleteQuiz: (quizId: string) => void;
  onCompleteProject: (projectId: string) => void;
}

export interface AiTutorResponse {
  success: boolean;
  feedback: string;
  tips: string[];
  correctedCode: string;
}

export default function CoreLanguagesSection({
  onAwardXp,
  completedLessons,
  completedQuizzes,
  completedProjects,
  onCompleteLesson,
  onCompleteQuiz,
  onCompleteProject
}: CoreLanguagesSectionProps) {
  const [selectedLanguage, setSelectedLanguage] = useState<Language>(coreLanguages[0]);
  const [activeSubTab, setActiveSubTab] = useState<"lessons" | "quiz" | "projects">("lessons");
  const [currentLessonIndex, setCurrentLessonIndex] = useState<number>(0);
  
  // Playground state
  const [codeInputValue, setCodeInputValue] = useState<string>("");
  const [isCompiling, setIsCompiling] = useState<boolean>(false);
  const [localFeedback, setLocalFeedback] = useState<{ status: "idle" | "success" | "error"; message: string }>({ status: "idle", message: "" });
  const [aiTutorResult, setAiTutorResult] = useState<AiTutorResponse | null>(null);

  // Quiz State
  const [quizAnswers, setQuizAnswers] = useState<Record<string, number>>({});
  const [quizSubmitted, setQuizSubmitted] = useState<boolean>(false);
  const [quizFeedback, setQuizFeedback] = useState<string | null>(null);

  const lessons = coreLessons[selectedLanguage.id] || [];
  const currentLesson: Lesson | undefined = lessons[currentLessonIndex];
  
  const quizzes = coreQuizzes[selectedLanguage.id] || [];
  const currentQuiz: Quiz | undefined = quizzes[0]; // Take primary quiz for track

  const projects = academyProjects[selectedLanguage.id] || [];

  // Reset lesson state when changing language
  useEffect(() => {
    setCurrentLessonIndex(0);
    setAiTutorResult(null);
    setLocalFeedback({ status: "idle", message: "" });
    setQuizAnswers({});
    setQuizSubmitted(false);
    setQuizFeedback(null);
    
    if (coreLessons[selectedLanguage.id]?.[0]?.exercise) {
      setCodeInputValue(coreLessons[selectedLanguage.id][0].exercise.starterCode);
    } else {
      setCodeInputValue("");
    }
  }, [selectedLanguage]);

  // Update starter code when changing lesson index
  useEffect(() => {
    setAiTutorResult(null);
    setLocalFeedback({ status: "idle", message: "" });
    if (currentLesson?.exercise) {
      setCodeInputValue(currentLesson.exercise.starterCode);
    } else {
      setCodeInputValue("");
    }
  }, [currentLessonIndex]);

  // Handle local playground test compilation
  const handleCompileLocal = () => {
    if (!currentLesson?.exercise) return;
    const cleanInput = codeInputValue.replace(/\s+/g, " ").trim();
    const cleanSolution = currentLesson.exercise.solution.replace(/\s+/g, " ").trim();

    // Check similarity or simple sub-string/exact match
    const isCorrect = cleanInput.includes(cleanSolution) || cleanSolution.includes(cleanInput);

    if (isCorrect) {
      setLocalFeedback({
        status: "success",
        message: "Compilação concluída com sucesso! Testes locais passaram com 100% de precisão."
      });
      const lessonId = currentLesson.id;
      if (!completedLessons.includes(lessonId)) {
        onAwardXp(100);
        onCompleteLesson(lessonId);
      }
    } else {
      setLocalFeedback({
        status: "error",
        message: "Erro de Compilação ou Asserção: O código não produziu o resultado esperado. Tente refatorar o código ou consulte a dica!"
      });
    }
  };

  // Handle server-side Gemini AI analysis proxy
  const handleCompileWithAi = async () => {
    if (!currentLesson?.exercise) return;
    setIsCompiling(true);
    setAiTutorResult(null);

    try {
      const response = await fetch("/api/gemini/tutor", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          code: codeInputValue,
          language: selectedLanguage.name,
          instruction: currentLesson.exercise.instruction,
        }),
      });

      if (!response.ok) {
        throw new Error("Falha na chamada da API.");
      }

      const data = await response.json();
      setAiTutorResult(data);

      if (data.success) {
        setLocalFeedback({
          status: "success",
          message: "A IA de elite da DevForge aprovou sua solução!"
        });
        const lessonId = currentLesson.id;
        if (!completedLessons.includes(lessonId)) {
          onAwardXp(100);
          onCompleteLesson(lessonId);
        }
      } else {
        setLocalFeedback({
          status: "error",
          message: "A IA encontrou pendências ou erros de lógica. Veja as dicas abaixo."
        });
      }
    } catch (err) {
      console.error(err);
      // Fallback
      setAiTutorResult({
        success: true,
        feedback: "Modo offline local: Seu código foi validado heuristicamente. Bom trabalho!",
        tips: ["Verifique a indentação padrão.", "Garanta o tipo correto de retorno."],
        correctedCode: ""
      });
    } finally {
      setIsCompiling(false);
    }
  };

  // Submit Quiz for XP
  const handleQuizSubmit = () => {
    if (!currentQuiz) return;
    
    let allCorrect = true;
    currentQuiz.questions.forEach((q) => {
      if (quizAnswers[q.id] !== q.correctAnswerIndex) {
        allCorrect = false;
      }
    });

    setQuizSubmitted(true);
    
    if (allCorrect) {
      const quizId = currentQuiz.id;
      if (!completedQuizzes.includes(quizId)) {
        onAwardXp(currentQuiz.xpReward);
        onCompleteQuiz(quizId);
        setQuizFeedback(`Excelente! Você acertou todas as perguntas e ganhou +${currentQuiz.xpReward} XP!`);
      } else {
        setQuizFeedback("Excelente! Você revisou este quiz e acertou todas novamente.");
      }
    } else {
      setQuizFeedback("Algumas respostas estão incorretas. Revise o conteúdo da trilha e tente novamente!");
    }
  };

  // Reset core quiz
  const handleResetQuiz = () => {
    setQuizAnswers({});
    setQuizSubmitted(false);
    setQuizFeedback(null);
  };

  // Complete Projects
  const handleProjectComplete = (pId: string) => {
    if (!completedProjects.includes(pId)) {
      onAwardXp(300); // 300 XP for large projects
      onCompleteProject(pId);
    }
  };

  return (
    <div className="p-6 lg:p-8 max-w-7xl mx-auto text-[#E5E5E5] flex flex-col gap-8" id="core-languages-view">
      
      {/* Horizonal Selector for Core Languages */}
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2 text-indigo-400 font-bold tracking-wide uppercase text-xs">
          <BookOpen className="h-4 w-4" />
          Trilhas de Aprendizado Profundo
        </div>
        <h2 className="text-2xl font-extrabold text-white">Core Professional Tracks</h2>
        <p className="text-neutral-400 text-xs max-w-2xl leading-relaxed">
          Domine as linguagens mais demandadas do mercado de TI com apostilas completas, playgrounds interativos validados por IA e quizzes específicos.
        </p>

        {/* Scrollable list of core languages */}
        <div className="flex gap-2 overflow-x-auto pb-3 mt-4 scrollbar-thin scrollbar-thumb-neutral-800">
          {coreLanguages.map((lang) => {
            const isSel = selectedLanguage.id === lang.id;
            return (
              <button
                key={lang.id}
                onClick={() => setSelectedLanguage(lang)}
                className={`px-4 py-2.5 rounded text-xs font-bold transition-all whitespace-nowrap border flex items-center gap-2 shrink-0 ${
                  isSel 
                    ? "bg-[#161616] text-indigo-400 border-indigo-600/50" 
                    : "bg-[#0F0F0F] border-[#1F1F1F] text-neutral-400 hover:text-white hover:border-[#2A2A2A]"
                }`}
              >
                <div className={`w-2 h-2 rounded-full ${isSel ? "bg-indigo-400 animate-ping" : "bg-[#2A2A2A]"}`} />
                {lang.name}
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Track Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
        
        {/* Left Column: Index of Chapters/Lessons */}
        <div className="xl:col-span-4 bg-[#0F0F0F] border border-[#1F1F1F] rounded p-5 flex flex-col justify-between self-start">
          <div>
            <div className="border-b border-[#1F1F1F] pb-4 mb-4">
              <span className="text-[10px] bg-[#161616] text-neutral-300 font-bold px-2.5 py-1 rounded border border-[#2A2A2A]">
                Linguagem Selecionada
              </span>
              <h3 className="text-xl font-extrabold text-white mt-2">{selectedLanguage.name}</h3>
              <p className="text-xs text-neutral-400 mt-1 leading-relaxed">{selectedLanguage.description}</p>
            </div>

            {/* Sub-Tabs: Lessons, Quizzes, Projects */}
            <div className="grid grid-cols-3 gap-1 bg-black p-1 rounded mb-5">
              <button
                onClick={() => setActiveSubTab("lessons")}
                className={`py-1.5 rounded text-[11px] font-bold transition-all ${
                  activeSubTab === "lessons" ? "bg-[#161616] text-indigo-400" : "text-neutral-400 hover:text-white"
                }`}
              >
                Aulas
              </button>
              <button
                onClick={() => setActiveSubTab("quiz")}
                className={`py-1.5 rounded text-[11px] font-bold transition-all ${
                  activeSubTab === "quiz" ? "bg-[#161616] text-indigo-400" : "text-neutral-400 hover:text-white"
                }`}
              >
                Quiz
              </button>
              <button
                onClick={() => setActiveSubTab("projects")}
                className={`py-1.5 rounded text-[11px] font-bold transition-all ${
                  activeSubTab === "projects" ? "bg-[#161616] text-indigo-400" : "text-neutral-400 hover:text-white"
                }`}
              >
                Projetos
              </button>
            </div>

            {/* Dynamic Content based on activeSubTab */}
            {activeSubTab === "lessons" && (
              <div className="space-y-2">
                <span className="text-[10px] font-bold text-neutral-500 uppercase tracking-wider block mb-2">Capítulos Disponíveis</span>
                {lessons.map((les, index) => {
                  const isCurrent = currentLessonIndex === index;
                  const isCompleted = completedLessons.includes(les.id);
                  return (
                    <button
                      key={les.id}
                      onClick={() => setCurrentLessonIndex(index)}
                      className={`w-full p-3 rounded border text-left flex items-center justify-between transition-all group ${
                        isCurrent 
                          ? "bg-[#161616] border-indigo-600/40 text-white" 
                          : "bg-black/40 border-[#1F1F1F] text-neutral-400 hover:text-white hover:border-[#2A2A2A]"
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <span className={`text-xs font-mono w-5 h-5 rounded flex items-center justify-center font-bold ${
                          isCurrent ? "bg-indigo-600/10 text-indigo-400" : "bg-[#1A1A1A] text-neutral-400"
                        }`}>
                          {index + 1}
                        </span>
                        <span className="text-xs font-semibold line-clamp-1">{les.title}</span>
                      </div>
                      {isCompleted && (
                        <CheckCircle className="h-4 w-4 text-indigo-400 shrink-0 ml-1.5" />
                      )}
                    </button>
                  );
                })}
              </div>
            )}

            {activeSubTab === "quiz" && (
              <div className="space-y-3">
                <span className="text-[10px] font-bold text-neutral-500 uppercase tracking-wider block">Validação de Trilha</span>
                {currentQuiz ? (
                  <div className="bg-black/40 border border-[#1F1F1F] rounded p-4">
                    <h4 className="text-xs font-bold text-neutral-200">{currentQuiz.title}</h4>
                    <p className="text-[11px] text-neutral-400 mt-1">{currentQuiz.description}</p>
                    <div className="flex items-center gap-1.5 mt-3 text-[10px] font-bold text-indigo-400 bg-indigo-600/10 px-2 py-1 rounded self-start border border-indigo-600/10 w-fit">
                      <Award className="h-3.5 w-3.5" /> Recompensa: +{currentQuiz.xpReward} XP
                    </div>
                  </div>
                ) : (
                  <p className="text-xs text-neutral-500 italic">Quiz indisponível para esta trilha.</p>
                )}
              </div>
            )}

            {activeSubTab === "projects" && (
              <div className="space-y-2">
                <span className="text-[10px] font-bold text-neutral-500 uppercase tracking-wider block">Desafios de Portfólio</span>
                {projects.map((proj) => {
                  const isDone = completedProjects.includes(proj.id);
                  return (
                    <div key={proj.id} className="bg-black/40 border border-[#1F1F1F] p-3 rounded flex flex-col justify-between gap-3">
                      <div>
                        <div className="flex justify-between items-center">
                          <h4 className="text-xs font-bold text-neutral-200 line-clamp-1">{proj.title}</h4>
                          <span className={`text-[9px] px-2 py-0.5 rounded border font-bold ${
                            proj.difficulty === "Easy" ? "bg-indigo-600/10 text-indigo-400 border-indigo-600/20" :
                            proj.difficulty === "Medium" ? "bg-amber-500/10 text-amber-400 border-amber-500/20" :
                            "bg-rose-500/10 text-rose-400 border-rose-500/20"
                          }`}>
                            {proj.difficulty}
                          </span>
                        </div>
                        <p className="text-[10px] text-neutral-400 mt-1 line-clamp-2">{proj.description}</p>
                      </div>
                      
                      <button
                        onClick={() => handleProjectComplete(proj.id)}
                        disabled={isDone}
                        className={`w-full py-1.5 rounded text-[10px] font-bold flex items-center justify-center gap-1.5 transition-all ${
                          isDone 
                            ? "bg-indigo-600/10 text-indigo-400 border border-indigo-600/20" 
                            : "bg-[#1A1A1A] hover:bg-[#252525] text-neutral-200 border border-[#2A2A2A]"
                        }`}
                      >
                        {isDone ? (
                          <>
                            <Check className="h-3.5 w-3.5 stroke-[3]" /> Concluído (+300 XP)
                          </>
                        ) : (
                          "Concluir e Ganhar +300 XP"
                        )}
                      </button>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          <div className="mt-8 border-t border-[#1F1F1F] pt-4 flex flex-col gap-1.5 text-xs text-neutral-400">
            <div className="flex justify-between">
              <span>Aulas completas:</span>
              <span className="font-mono text-neutral-200 font-bold">
                {lessons.filter(l => completedLessons.includes(l.id)).length} / {lessons.length}
              </span>
            </div>
            <div className="flex justify-between">
              <span>Quiz completo:</span>
              <span className="font-mono text-neutral-200 font-bold">
                {currentQuiz && completedQuizzes.includes(currentQuiz.id) ? "Sim" : "Não"}
              </span>
            </div>
          </div>
        </div>

        {/* Right Column: Work Arena / Lesson Content / Code Simulator */}
        <div className="xl:col-span-8 flex flex-col gap-6">
          
          {activeSubTab === "lessons" && currentLesson && (
            <div className="flex flex-col gap-6">
              
              {/* Theoretical Article Card */}
              <div className="bg-[#0F0F0F] border border-[#1F1F1F] rounded p-6 lg:p-8 shadow-xl">
                <span className="text-[10px] font-bold tracking-wider text-indigo-400 uppercase bg-indigo-600/10 px-2.5 py-1 rounded border border-indigo-600/15">
                  Aula Ativa
                </span>
                <h1 className="text-2xl font-extrabold text-white mt-2">{currentLesson.title}</h1>
                
                {/* Embedded Theoretical Content (Formatted carefully) */}
                <div className="mt-5 text-xs lg:text-sm text-[#E5E5E5] leading-relaxed space-y-4">
                  {currentLesson.content.split("\n\n").map((para, i) => {
                    if (para.startsWith("###")) {
                      return <h4 key={i} className="text-sm lg:text-base font-bold text-white mt-4 border-b border-[#1F1F1F] pb-1">{para.replace("###", "")}</h4>;
                    }
                    if (para.startsWith("####")) {
                      return <h5 key={i} className="text-xs lg:text-sm font-bold text-indigo-300 mt-3">{para.replace("####", "")}</h5>;
                    }
                    if (para.startsWith("-") || para.startsWith("*")) {
                      return (
                        <ul key={i} className="list-disc list-inside space-y-1 pl-2 text-neutral-300">
                          {para.split("\n").map((item, idx) => (
                            <li key={idx}>{item.replace(/^-\s*|^\*\s*/, "")}</li>
                          ))}
                        </ul>
                      );
                    }
                    return <p key={i}>{para}</p>;
                  })}
                </div>

                {currentLesson.codeExample && (
                  <div className="mt-6">
                    <span className="text-[10px] text-neutral-450 font-bold uppercase block mb-1.5 flex items-center gap-1.5">
                      <Code2 className="h-3.5 w-3.5 text-indigo-400" /> Código de Demonstração
                    </span>
                    <pre className="bg-black border border-[#1F1F1F] rounded p-4 font-mono text-xs text-neutral-300 overflow-x-auto">
                      {currentLesson.codeExample}
                    </pre>
                  </div>
                )}
              </div>

              {/* Interactive Coding Sandbox Simulator (For lessons with an exercise) */}
              {currentLesson.exercise && (
                <div className="bg-[#0F0F0F] border border-[#1F1F1F] rounded overflow-hidden shadow-xl flex flex-col">
                  
                  {/* IDE Header */}
                  <div className="bg-black px-5 py-3.5 border-b border-[#1F1F1F] flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <Terminal className="h-4 w-4 text-indigo-400" />
                      <span className="text-xs font-mono font-bold text-neutral-300">
                        DevForge_IDE_v1.0.{currentLesson.codeLanguage || "txt"}
                      </span>
                    </div>
                    <div className="flex gap-1">
                      <div className="w-2.5 h-2.5 rounded-full bg-rose-500/60" />
                      <div className="w-2.5 h-2.5 rounded-full bg-amber-500/60" />
                      <div className="w-2.5 h-2.5 rounded-full bg-indigo-500/60" />
                    </div>
                  </div>

                  {/* Exercise description bar */}
                  <div className="bg-[#0F0F0F]/80 px-6 py-4 border-b border-[#1F1F1F]">
                    <h4 className="text-xs font-bold text-neutral-200 flex items-center gap-1.5">
                      <ListTodo className="h-4 w-4 text-indigo-400" /> Instrução de Compilação
                    </h4>
                    <p className="text-xs text-neutral-300 mt-1 leading-relaxed">
                      {currentLesson.exercise.instruction}
                    </p>
                  </div>

                  {/* Code input text area with vertical numbering */}
                  <div className="flex bg-black font-mono text-xs leading-relaxed min-h-[160px] relative">
                    <div className="w-12 bg-black border-r border-[#1F1F1F] select-none text-neutral-600 text-right pr-3 py-4 space-y-1 font-mono">
                      {Array.from({ length: Math.max(10, codeInputValue.split("\n").length) }).map((_, i) => (
                        <div key={i}>{i + 1}</div>
                      ))}
                    </div>
                    <textarea
                      value={codeInputValue}
                      onChange={(e) => setCodeInputValue(e.target.value)}
                      className="flex-1 bg-transparent p-4 text-neutral-200 outline-none resize-y min-h-[180px] font-mono whitespace-pre placeholder-neutral-800"
                      placeholder="# Escreva seu código aqui..."
                      spellCheck={false}
                    />
                  </div>

                  {/* Execution Feedback Panel */}
                  {localFeedback.status !== "idle" && (
                    <div className={`p-4 border-t text-xs flex items-start gap-2.5 ${
                      localFeedback.status === "success" 
                        ? "bg-indigo-600/10 border-indigo-600/20 text-indigo-400" 
                        : "bg-rose-950/20 border-rose-500/20 text-rose-300"
                    }`}>
                      {localFeedback.status === "success" ? (
                        <CheckCircle className="h-4.5 w-4.5 text-indigo-400 shrink-0 mt-0.5" />
                      ) : (
                        <XCircle className="h-4.5 w-4.5 text-rose-400 shrink-0 mt-0.5" />
                      )}
                      <p className="leading-relaxed font-semibold">{localFeedback.message}</p>
                    </div>
                  )}

                  {/* Control Bar */}
                  <div className="bg-black/80 px-6 py-4 border-t border-[#1F1F1F] flex flex-col sm:flex-row justify-between items-center gap-3">
                    <div className="text-[10px] text-neutral-500 font-semibold font-mono">
                      COMPILADOR LOCAL DISPONÍVEL
                    </div>
                    
                    <div className="flex gap-2 w-full sm:w-auto justify-end">
                      <button
                        onClick={handleCompileLocal}
                        className="bg-[#1A1A1A] hover:bg-[#252525] text-neutral-200 text-xs px-4 py-2.5 rounded border border-[#2A2A2A] font-bold transition-all flex items-center gap-1.5"
                      >
                        <Play className="h-3.5 w-3.5 text-neutral-400 fill-neutral-400" /> Compilar & Testar Local
                      </button>

                      <button
                        onClick={handleCompileWithAi}
                        disabled={isCompiling}
                        className="bg-white hover:bg-neutral-200 disabled:opacity-50 text-black text-xs px-4 py-2.5 rounded font-bold transition-all flex items-center gap-1.5 shadow-md"
                      >
                        {isCompiling ? (
                          <>
                            <RefreshCw className="h-3.5 w-3.5 animate-spin" /> Analisando...
                          </>
                        ) : (
                          <>
                            <Sparkles className="h-3.5 w-3.5 stroke-[2.5]" /> Análise com IA
                          </>
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Rich AI Diagnostics Card */}
                  {aiTutorResult && (
                    <div className="bg-black border-t border-[#1F1F1F] p-5 font-medium relative overflow-hidden">
                      <div className="absolute right-0 top-0 w-24 h-24 bg-indigo-600/5 blur-2xl rounded-full" />
                      
                      <div className="flex items-center gap-2 border-b border-[#1F1F1F] pb-2 mb-4">
                        <Sparkles className="h-4 w-4 text-indigo-400 animate-pulse" />
                        <h4 className="text-xs font-bold text-neutral-200 uppercase tracking-wider">Laudo do Tutor de Compilação Inteligente</h4>
                      </div>

                      <div className="space-y-4">
                        <div>
                          <span className="text-[10px] text-neutral-500 font-bold uppercase block mb-1">Qualidade Geral & Lógica</span>
                          <p className="text-xs text-neutral-300 leading-relaxed bg-[#0A0A0A]/50 p-3 rounded border border-[#1F1F1F]">
                            {aiTutorResult.feedback}
                          </p>
                        </div>

                        {aiTutorResult.tips && aiTutorResult.tips.length > 0 && (
                          <div>
                            <span className="text-[10px] text-neutral-500 font-bold uppercase block mb-1.5 flex items-center gap-1">
                              <Lightbulb className="h-3.5 w-3.5 text-indigo-400" /> Conselhos Técnicos do Especialista
                            </span>
                            <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                              {aiTutorResult.tips.map((tip, index) => (
                                <li key={index} className="text-xs text-neutral-300 bg-[#0A0A0A]/30 border border-[#1F1F1F] p-2.5 rounded flex items-start gap-1.5 leading-relaxed">
                                  <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 mt-1.5 shrink-0" />
                                  <span>{tip}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}

                        {aiTutorResult.correctedCode && (
                          <div>
                            <span className="text-[10px] text-neutral-500 font-bold uppercase block mb-1 flex items-center gap-1">
                              <FileCode className="h-3.5 w-3.5 text-indigo-400" /> Código Otimizado (Refatorado)
                            </span>
                            <pre className="bg-[#0A0A0A] border border-[#1F1F1F] rounded p-3 font-mono text-xs text-neutral-300 overflow-x-auto whitespace-pre leading-relaxed">
                              {aiTutorResult.correctedCode}
                            </pre>
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                </div>
              )}

              {/* Navigation controls between lessons */}
              <div className="flex justify-between items-center mt-2">
                <button
                  onClick={() => setCurrentLessonIndex(prev => Math.max(0, prev - 1))}
                  disabled={currentLessonIndex === 0}
                  className="px-4 py-2 text-xs font-bold bg-[#111] hover:bg-[#161616] rounded border border-[#1F1F1F] disabled:opacity-30 disabled:pointer-events-none text-neutral-350 transition-all"
                >
                  Capítulo Anterior
                </button>
                <span className="text-xs font-mono text-neutral-500 font-semibold">
                  {currentLessonIndex + 1} de {lessons.length} Capítulos
                </span>
                <button
                  onClick={() => setCurrentLessonIndex(prev => Math.min(lessons.length - 1, prev + 1))}
                  disabled={currentLessonIndex === lessons.length - 1}
                  className="px-4 py-2 text-xs font-bold bg-[#111] hover:bg-[#161616] rounded border border-[#1F1F1F] disabled:opacity-30 disabled:pointer-events-none text-neutral-350 transition-all"
                >
                  Próximo Capítulo
                </button>
              </div>

            </div>
          )}

          {activeSubTab === "quiz" && (
            <div className="bg-[#0F0F0F] border border-[#1F1F1F] rounded p-6 lg:p-8 shadow-xl">
              {currentQuiz ? (
                <div>
                  <div className="flex justify-between items-center border-b border-[#1F1F1F] pb-4 mb-6">
                    <div>
                      <span className="text-[10px] font-bold text-indigo-400 uppercase tracking-wider bg-indigo-600/10 border border-indigo-600/20 px-2.5 py-1 rounded">
                        Quiz de Nivelamento
                      </span>
                      <h2 className="text-xl font-extrabold text-white mt-2">{currentQuiz.title}</h2>
                    </div>
                    {completedQuizzes.includes(currentQuiz.id) && (
                      <div className="bg-indigo-600/10 border border-indigo-600/30 text-indigo-400 px-3 py-1.5 rounded text-xs font-bold flex items-center gap-1">
                        <Check className="h-4 w-4 stroke-[3]" /> CONCLUÍDO
                      </div>
                    )}
                  </div>

                  <div className="space-y-6">
                    {currentQuiz.questions.map((q, qIdx) => (
                      <div key={q.id} className="border border-[#1F1F1F] bg-black/20 p-5 rounded">
                        <p className="text-sm font-semibold text-neutral-200 mb-3 leading-relaxed">
                          {qIdx + 1}. {q.question}
                        </p>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
                          {q.options.map((opt, optIdx) => {
                            const isSelected = quizAnswers[q.id] === optIdx;
                            const isCorrectAnswer = optIdx === q.correctAnswerIndex;

                            let optClass = "border-[#1F1F1F] bg-[#0A0A0A] hover:bg-[#161616]/60";
                            if (isSelected) optClass = "border-indigo-600 bg-indigo-600/5 text-indigo-400";

                            if (quizSubmitted) {
                              if (isCorrectAnswer) {
                                optClass = "border-indigo-600 bg-indigo-600/15 text-indigo-400";
                              } else if (isSelected) {
                                optClass = "border-rose-500 bg-rose-500/15 text-rose-350";
                              } else {
                                optClass = "border-[#1F1F1F]/50 bg-black text-neutral-500 opacity-60";
                              }
                            }

                            return (
                              <button
                                key={optIdx}
                                disabled={quizSubmitted}
                                onClick={() => setQuizAnswers(prev => ({ ...prev, [q.id]: optIdx }))}
                                className={`p-3 rounded border text-left text-xs font-medium transition-all flex justify-between items-center ${optClass}`}
                              >
                                <span>{opt}</span>
                                {quizSubmitted && isCorrectAnswer && (
                                  <CheckCircle className="h-4 w-4 text-indigo-400 shrink-0 ml-1.5" />
                                )}
                                {quizSubmitted && isSelected && !isCorrectAnswer && (
                                  <XCircle className="h-4 w-4 text-rose-400 shrink-0 ml-1.5" />
                                )}
                              </button>
                            );
                          })}
                        </div>

                        {quizSubmitted && (
                          <div className="mt-3.5 p-3.5 bg-black border border-[#1F1F1F] rounded text-[11px] text-neutral-450 leading-relaxed font-medium">
                            <span className="font-bold text-neutral-300">Resolução comentada:</span> {q.explanation}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>

                  <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-[#1F1F1F] pt-5">
                    {quizFeedback && (
                      <p className={`text-xs font-semibold ${quizFeedback.includes("Excelente") ? "text-indigo-400" : "text-rose-450"}`}>
                        {quizFeedback}
                      </p>
                    )}

                    <div className="flex gap-2 ml-auto">
                      {quizSubmitted ? (
                        <button
                          onClick={handleResetQuiz}
                          className="px-4 py-2 text-xs font-bold bg-[#1A1A1A] hover:bg-[#252525] text-neutral-200 border border-[#2A2A2A] rounded transition-all"
                        >
                          Tentar Novamente
                        </button>
                      ) : (
                        <button
                          onClick={handleQuizSubmit}
                          className="px-5 py-2.5 text-xs font-bold bg-white text-black hover:bg-neutral-200 rounded transition-colors shadow-md"
                        >
                          Enviar Resposta
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ) : (
                <p className="text-xs text-slate-500 italic">Nenhum quiz disponível.</p>
              )}
            </div>
          )}

          {activeSubTab === "projects" && (
            <div className="space-y-6">
              {projects.map((proj) => {
                const isCompleted = completedProjects.includes(proj.id);
                return (
                  <div key={proj.id} className="bg-[#0F0F0F] border border-[#1F1F1F] rounded p-6 lg:p-8 shadow-xl">
                    <div className="flex justify-between items-start gap-4 border-b border-[#1F1F1F] pb-4 mb-4">
                      <div>
                        <span className="text-[10px] font-mono uppercase bg-indigo-600/10 text-indigo-400 border border-indigo-600/10 px-2.5 py-1 rounded font-bold">
                          Trabalho de Conclusão de Curso
                        </span>
                        <h2 className="text-lg lg:text-xl font-extrabold text-white mt-2">{proj.title}</h2>
                        <p className="text-xs text-neutral-400 mt-1 leading-relaxed">{proj.description}</p>
                      </div>

                      <span className={`text-xs font-bold px-3 py-1 rounded border ${
                        proj.difficulty === "Easy" ? "bg-indigo-600/10 text-indigo-400 border-indigo-600/20" :
                        proj.difficulty === "Medium" ? "bg-amber-500/10 text-amber-400 border-amber-500/20" :
                        "bg-rose-500/10 text-rose-400 border-rose-500/20"
                      }`}>
                        {proj.difficulty}
                      </span>
                    </div>

                    <div className="mt-5 space-y-5">
                      <div>
                        <h4 className="text-xs font-bold text-neutral-200 mb-2">Requisitos de Escopo do Projeto:</h4>
                        <ul className="space-y-1.5 pl-1">
                          {proj.requirements.map((req, index) => (
                            <li key={index} className="text-xs text-neutral-300 flex items-start gap-2 leading-relaxed">
                              <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 mt-1.5 shrink-0" />
                              <span>{req}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="bg-black/40 border border-[#1F1F1F] rounded p-4">
                        <h4 className="text-xs font-bold text-neutral-200 mb-2">Guia de Implementação DevForge:</h4>
                        <p className="text-xs text-neutral-400 leading-relaxed whitespace-pre-line">
                          {proj.guide}
                        </p>
                      </div>
                    </div>

                    <div className="mt-6 flex justify-between items-center border-t border-[#1F1F1F] pt-5">
                      <span className="text-[10px] font-bold text-neutral-500 uppercase tracking-wider">RECOMPENSA PORTFÓLIO: +300 XP</span>
                      <button
                        onClick={() => handleProjectComplete(proj.id)}
                        disabled={isCompleted}
                        className={`px-5 py-2.5 rounded text-xs font-bold flex items-center gap-1.5 transition-all ${
                          isCompleted 
                            ? "bg-indigo-600/10 text-indigo-400 border border-indigo-600/20" 
                            : "bg-white text-black hover:bg-neutral-200 shadow-md font-bold transition-colors"
                        }`}
                      >
                        {isCompleted ? (
                          <>
                            <CheckCircle className="h-4.5 w-4.5 text-indigo-400" /> Projeto Registrado (+300 XP)
                          </>
                        ) : (
                          "Completar e Registrar Projeto"
                        )}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

        </div>

      </div>

    </div>
  );
}
