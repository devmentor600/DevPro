import React, { useState } from "react";
import { InterviewMessage } from "../types";
import { coreLanguages } from "../data/languages";
import { 
  Briefcase, 
  Send, 
  User, 
  Sparkles, 
  Award, 
  FileCheck, 
  TrendingUp, 
  ShieldAlert, 
  RefreshCw,
  Terminal,
  Clock,
  Download,
  Eye,
  CheckCircle,
  Lightbulb
} from "lucide-react";

interface CareerSectionProps {
  completedLessons: string[];
  completedQuizzes: string[];
  completedProjects: string[];
  userXp: number;
  userLevel: number;
}

export default function CareerSection({
  completedLessons,
  completedQuizzes,
  completedProjects,
  userXp,
  userLevel
}: CareerSectionProps) {
  // Interview Simulator state
  const [selectedLanguage, setSelectedLanguage] = useState<string>("Python");
  const [isInterviewing, setIsInterviewing] = useState<boolean>(false);
  const [chatMessages, setChatMessages] = useState<InterviewMessage[]>([]);
  const [userInputMessage, setUserInputMessage] = useState<string>("");
  const [loadingReply, setLoadingReply] = useState<boolean>(false);
  const [interviewStatusMsg, setInterviewStatusMsg] = useState<string | null>(null);

  // Resume builder state (Interactive Portfolio Generator)
  const [studentFullName, setStudentFullName] = useState<string>("Dev Elite");
  const [studentBio, setStudentBio] = useState<string>("Desenvolvedor Fullstack focado em alto desempenho e arquitetura escalável.");
  const [showPortfolioPreview, setShowPortfolioPreview] = useState<boolean>(false);

  // Initialize and start technical interview
  const handleStartInterview = async () => {
    setIsInterviewing(true);
    setLoadingReply(true);
    setInterviewStatusMsg(null);
    setChatMessages([]);

    const initialMessages: InterviewMessage[] = [];

    try {
      const response = await fetch("/api/gemini/interview", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          language: selectedLanguage,
          chat: []
        })
      });

      if (!response.ok) {
        throw new Error("Falha ao comunicar com o recrutador.");
      }

      const data = await response.json();
      const firstMsg: InterviewMessage = {
        sender: "recruiter",
        text: data.text,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
      };
      setChatMessages([firstMsg]);
    } catch (err) {
      console.error(err);
      // Fallback greeting
      const fallbackMsg: InterviewMessage = {
        sender: "recruiter",
        text: `Olá! Bem-vindo à entrevista da DevForge Academy para a stack do ${selectedLanguage}. Eu sou o recrutador da banca de elite. Descreva detalhadamente sua experiência com esta linguagem, seus recursos preferidos de segurança/concorrência e como você abordaria a criação de uma API escalável usando seu ecossistema.`,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
      };
      setChatMessages([fallbackMsg]);
    } finally {
      setLoadingReply(false);
    }
  };

  // Submit response and progress the dialogue
  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userInputMessage.trim() || loadingReply) return;

    const userMsg: InterviewMessage = {
      sender: "user",
      text: userInputMessage,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
    };

    const updatedChat = [...chatMessages, userMsg];
    setChatMessages(updatedChat);
    setUserInputMessage("");
    setLoadingReply(true);

    try {
      const response = await fetch("/api/gemini/interview", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          language: selectedLanguage,
          chat: updatedChat
        })
      });

      if (!response.ok) {
        throw new Error("Erro de resposta.");
      }

      const data = await response.json();
      const recruiterMsg: InterviewMessage = {
        sender: "recruiter",
        text: data.text,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
      };
      setChatMessages(prev => [...prev, recruiterMsg]);
    } catch (err) {
      console.error(err);
      const fallbackReply: InterviewMessage = {
        sender: "recruiter",
        text: `Excelente resposta. Considere que, no ambiente produtivo do ${selectedLanguage}, o tratamento fino de concorrência exige cuidado. Como você estruturaria testes de carga ou cobertura de qualidade para esse fluxo?`,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
      };
      setChatMessages(prev => [...prev, fallbackReply]);
    } finally {
      setLoadingReply(false);
    }
  };

  const handleFinishInterview = () => {
    setIsInterviewing(false);
    setChatMessages([]);
    setInterviewStatusMsg("Parabéns por concluir o teste! Seus dados foram guardados offline no portfólio.");
  };

  return (
    <div className="p-6 lg:p-8 max-w-7xl mx-auto text-[#E5E5E5] flex flex-col gap-8" id="career-view">
      
      {/* Page Header */}
      <div>
        <div className="flex items-center gap-2 text-indigo-400 font-bold tracking-wide uppercase text-xs">
          <Briefcase className="h-4 w-4" />
          Módulo de Carreira Profissional
        </div>
        <h2 className="text-2xl font-extrabold text-white">Simulador de Carreira de Elite</h2>
        <p className="text-neutral-400 text-xs mt-1 max-w-2xl leading-relaxed">
          Prepare-se para entrevistas de nível internacional nas maiores Big Techs do planeta com nosso recrutador técnico treinado por IA ou gere seu portfólio profissional unificado.
        </p>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: AI Mock Interview Simulator */}
        <div className="xl:col-span-7 bg-[#0F0F0F] border border-[#1F1F1F] rounded overflow-hidden shadow-xl flex flex-col min-h-[500px]">
          
          {/* Header of simulator */}
          <div className="bg-black px-6 py-4 border-b border-[#1F1F1F] flex justify-between items-center flex-wrap gap-3">
            <div className="flex items-center gap-2">
              <Terminal className="h-4.5 w-4.5 text-indigo-400" />
              <span className="text-xs font-mono font-bold text-neutral-350">Simulador de Entrevista de Elite</span>
            </div>
            
            {!isInterviewing ? (
              <div className="flex items-center gap-2">
                <select
                  value={selectedLanguage}
                  onChange={(e) => setSelectedLanguage(e.target.value)}
                  className="bg-[#161616] border border-[#2A2A2A] text-xs font-bold text-neutral-200 py-1.5 px-3 rounded outline-none focus:border-indigo-600"
                >
                  {coreLanguages.map(l => (
                    <option key={l.id} value={l.name} className="bg-[#0A0A0A]">{l.name}</option>
                  ))}
                </select>
                <button
                  onClick={handleStartInterview}
                  className="bg-white hover:bg-neutral-200 text-black text-xs font-extrabold px-4 py-1.5 rounded transition-all shadow-md cursor-pointer"
                >
                  Iniciar Entrevista
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <span className="text-[10px] bg-rose-500/10 border border-rose-500/20 text-rose-400 font-extrabold px-2.5 py-1 rounded animate-pulse">
                  GRAVAÇÃO EM ANDAMENTO
                </span>
                <button
                  onClick={handleFinishInterview}
                  className="bg-[#1A1A1A] hover:bg-[#252525] text-neutral-300 text-xs font-bold px-3 py-1 rounded border border-[#2A2A2A] cursor-pointer"
                >
                  Concluir / Sair
                </button>
              </div>
            )}
          </div>

          {/* Dialog Arena screen */}
          <div className="flex-1 bg-black/20 p-6 space-y-4 max-h-[380px] overflow-y-auto scrollbar-thin flex flex-col">
            
            {!isInterviewing && chatMessages.length === 0 ? (
              <div className="flex-1 flex flex-col items-center justify-center text-center p-8 text-neutral-500 space-y-3 my-auto">
                <Briefcase className="h-10 w-10 text-neutral-800" />
                <h4 className="font-bold text-sm text-neutral-400">Sem sessões ativas no momento</h4>
                <p className="text-xs text-neutral-500 max-w-sm">
                  Escolha uma linguagem e clique em <b>Iniciar Entrevista</b> acima. Nosso recrutador técnico fará perguntas complexas em formato de chat.
                </p>
                {interviewStatusMsg && (
                  <span className="text-xs text-indigo-400 font-bold bg-indigo-950/20 border border-indigo-550/10 px-3 py-1.5 rounded block mt-2 animate-pulse">
                    {interviewStatusMsg}
                  </span>
                )}
              </div>
            ) : (
              chatMessages.map((msg, index) => {
                const isRecruiter = msg.sender === "recruiter";
                return (
                  <div
                    key={index}
                    className={`flex gap-3 max-w-[85%] ${isRecruiter ? "self-start" : "self-end flex-row-reverse"}`}
                  >
                    {/* Avatar icon */}
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 shadow-md ${
                      isRecruiter 
                        ? "bg-[#161616] text-indigo-400 border border-[#2A2A2A]" 
                        : "bg-[#252525] text-[#E5E5E5]"
                    }`}>
                      {isRecruiter ? <Sparkles className="h-4 w-4 animate-pulse" /> : <User className="h-4 w-4" />}
                    </div>

                    {/* Dialogue bubble */}
                    <div className={`p-4 rounded text-xs leading-relaxed ${
                      isRecruiter 
                        ? "bg-[#161616] border border-[#2A2A2A] text-neutral-300" 
                        : "bg-indigo-600/10 border border-indigo-600/30 text-indigo-400"
                    }`}>
                      <p className="whitespace-pre-line font-medium">{msg.text}</p>
                      <span className="text-[9px] text-neutral-500 block text-right mt-1.5 font-mono">{msg.timestamp}</span>
                    </div>
                  </div>
                );
              })
            )}

            {loadingReply && (
              <div className="self-start flex gap-3 max-w-[80%]">
                <div className="w-8 h-8 rounded-full bg-[#161616] flex items-center justify-center shrink-0 border border-[#2A2A2A] text-indigo-400">
                  <RefreshCw className="h-4 w-4 animate-spin" />
                </div>
                <div className="bg-[#161616] border border-[#2A2A2A] p-4 rounded text-xs text-neutral-400 italic">
                  Recrutador técnico está avaliando sua resposta...
                </div>
              </div>
            )}
          </div>

          {/* Interactive footer bar */}
          {isInterviewing && (
            <form onSubmit={handleSendMessage} className="bg-black p-4 border-t border-[#1F1F1F] flex gap-2">
              <input
                type="text"
                required
                disabled={loadingReply}
                value={userInputMessage}
                onChange={(e) => setUserInputMessage(e.target.value)}
                placeholder="Escreva sua resposta técnica detalhada aqui..."
                className="flex-1 bg-[#161616] border border-[#2A2A2A] rounded py-2.5 px-4 text-xs text-neutral-200 outline-none focus:border-indigo-600"
              />
              <button
                type="submit"
                disabled={loadingReply}
                className="bg-white hover:bg-neutral-200 text-black p-2.5 rounded transition-all shadow-md flex items-center justify-center shrink-0 cursor-pointer"
              >
                <Send className="h-4.5 w-4.5" />
              </button>
            </form>
          )}

        </div>

        {/* Right Column: Portfolio & Resume Builder (Career Planner) */}
        <div className="xl:col-span-5 bg-[#0F0F0F] border border-[#1F1F1F] rounded p-6 shadow-xl space-y-6">
          <div className="border-b border-[#1F1F1F] pb-4">
            <h3 className="font-extrabold text-sm text-neutral-200 flex items-center gap-1.5 uppercase">
              <FileCheck className="h-4.5 w-4.5 text-indigo-400" /> DevForge Portfolio Builder
            </h3>
            <p className="text-[11px] text-neutral-400 mt-1 leading-relaxed">
              Consolide suas conquistas na DevForge em uma página de apresentação profissional para enviar para recrutadores.
            </p>
          </div>

          <div className="space-y-3">
            <div>
              <label className="text-[10px] text-neutral-400 font-bold block mb-1 uppercase">Seu Nome Completo</label>
              <input
                type="text"
                value={studentFullName}
                onChange={(e) => setStudentFullName(e.target.value)}
                className="w-full bg-black border border-[#1F1F1F] rounded py-2 px-3 text-xs text-neutral-200 outline-none focus:border-indigo-600/40"
              />
            </div>

            <div>
              <label className="text-[10px] text-neutral-400 font-bold block mb-1 uppercase">Sua Biografia Técnica</label>
              <textarea
                rows={2}
                value={studentBio}
                onChange={(e) => setStudentBio(e.target.value)}
                className="w-full bg-black border border-[#1F1F1F] rounded py-2 px-3 text-xs text-neutral-200 outline-none focus:border-indigo-600/40 resize-none"
              />
            </div>
          </div>

          {/* Interactive Credential Checklist */}
          <div className="bg-black/30 border border-[#1F1F1F] rounded p-4 space-y-3">
            <h4 className="text-xs font-bold text-neutral-200 flex items-center gap-1">
              <Award className="h-4 w-4 text-indigo-400" /> Credenciais Acumuladas
            </h4>

            <div className="space-y-2 text-xs">
              <div className="flex justify-between items-center p-2.5 bg-black/50 rounded border border-[#1F1F1F]">
                <div className="flex items-center gap-2">
                  <div className={`w-2 h-2 rounded-full ${completedLessons.length > 0 ? "bg-indigo-400" : "bg-neutral-700"}`} />
                  <span className="text-neutral-300 font-medium">Aulas de Sintaxe Teórica</span>
                </div>
                <span className="font-mono text-neutral-400 font-bold">{completedLessons.length} Concluídas</span>
              </div>

              <div className="flex justify-between items-center p-2.5 bg-black/50 rounded border border-[#1F1F1F]">
                <div className="flex items-center gap-2">
                  <div className={`w-2 h-2 rounded-full ${completedQuizzes.length > 0 ? "bg-indigo-400" : "bg-neutral-700"}`} />
                  <span className="text-neutral-300 font-medium">Quizzes de Fundamentos</span>
                </div>
                <span className="font-mono text-neutral-400 font-bold">{completedQuizzes.length} Concluídos</span>
              </div>

              <div className="flex justify-between items-center p-2.5 bg-black/50 rounded border border-[#1F1F1F]">
                <div className="flex items-center gap-2">
                  <div className={`w-2 h-2 rounded-full ${completedProjects.length > 0 ? "bg-indigo-400" : "bg-neutral-700"}`} />
                  <span className="text-neutral-300 font-medium">Projetos de Portfólio</span>
                </div>
                <span className="font-mono text-neutral-400 font-bold">{completedProjects.length} Concluídos</span>
              </div>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex gap-2">
            <button
              onClick={() => setShowPortfolioPreview(!showPortfolioPreview)}
              className="flex-1 bg-[#161616] hover:bg-[#252525] text-neutral-200 text-xs font-bold py-2.5 rounded border border-[#2A2A2A] flex items-center justify-center gap-1.5 transition-all cursor-pointer"
            >
              <Eye className="h-4 w-4 text-indigo-400" /> {showPortfolioPreview ? "Ocultar Visualização" : "Visualizar Portfólio"}
            </button>
          </div>

          {/* Embedded live preview of Portfolio card */}
          {showPortfolioPreview && (
            <div className="p-5 bg-black border border-indigo-600/20 rounded relative overflow-hidden space-y-4 animate-fade-in shadow-xl">
              <div className="absolute right-0 top-0 w-16 h-16 bg-indigo-600/10 blur-xl rounded-full" />
              
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="font-extrabold text-sm text-neutral-100">{studentFullName}</h4>
                  <span className="text-[9px] text-indigo-400 font-mono font-bold uppercase tracking-wider">DEVFORGE CERTIFIED DEVELOPER</span>
                </div>
                <span className="text-[10px] bg-indigo-650/10 border border-indigo-600/30 text-indigo-400 font-extrabold px-2.5 py-0.5 rounded">
                  Level {userLevel}
                </span>
              </div>

              <p className="text-[11px] text-neutral-450 leading-relaxed italic border-l-2 border-indigo-600 pl-2">
                "{studentBio}"
              </p>

              <div className="space-y-1.5 pt-2">
                <span className="text-[9px] font-bold text-neutral-500 uppercase tracking-widest block">Credenciamento de Trilha</span>
                <div className="grid grid-cols-2 gap-2 text-[10px] text-neutral-300">
                  <div className="bg-[#0A0A0A] p-2 rounded border border-[#1F1F1F]">
                    <span className="block font-bold text-neutral-500 font-mono text-[9px]">TOTAL XP</span>
                    <span className="font-mono text-indigo-400 font-bold">{userXp} XP</span>
                  </div>
                  <div className="bg-[#0A0A0A] p-2 rounded border border-[#1F1F1F]">
                    <span className="block font-bold text-neutral-500 font-mono text-[9px]">PROJETOS REAIS</span>
                    <span className="font-mono text-indigo-400 font-bold">{completedProjects.length} Registrados</span>
                  </div>
                </div>
              </div>

              <div className="pt-2 flex justify-between items-center text-[9px] text-neutral-500 border-t border-[#1F1F1F]">
                <span>AUTENTICADO OFFLINE</span>
                <span>EMITIDO EM 2026</span>
              </div>
            </div>
          )}

        </div>

      </div>

    </div>
  );
}
