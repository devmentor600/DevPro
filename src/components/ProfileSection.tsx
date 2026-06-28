import React, { useState } from "react";
import { UserProgress } from "../types";
import { 
  Award, 
  Download, 
  Upload, 
  Trash2, 
  ShieldCheck, 
  Zap, 
  Layers, 
  BookOpen, 
  CheckCircle2, 
  RefreshCw,
  Clock,
  Sparkles,
  Database
} from "lucide-react";

interface ProfileSectionProps {
  userXp: number;
  userLevel: number;
  completedLessons: string[];
  completedQuizzes: string[];
  completedProjects: string[];
  favoriteLanguages: string[];
  onResetProgress: () => void;
  onImportProgress: (jsonString: string) => boolean;
}

export default function ProfileSection({
  userXp,
  userLevel,
  completedLessons,
  completedQuizzes,
  completedProjects,
  favoriteLanguages,
  onResetProgress,
  onImportProgress
}: ProfileSectionProps) {
  const [importString, setImportString] = useState<string>("");
  const [importStatus, setImportStatus] = useState<{ status: "idle" | "success" | "error"; message: string }>({ status: "idle", message: "" });

  // Custom Badges list dynamically awarded based on real stats!
  const badgesList = [
    {
      id: "foundation",
      name: "Arquiteto Fundador",
      desc: "Completou pelo menos 1 quiz de paradigma de ensino.",
      condition: completedQuizzes.some(q => q.includes("paradigm")),
      icon: Layers,
      color: "from-blue-500 to-cyan-400"
    },
    {
      id: "syntax_master",
      name: "Sintaxe Fluente",
      desc: "Concluiu pelo menos 2 capítulos de trilhas profundas.",
      condition: completedLessons.length >= 2,
      icon: CheckCircle2,
      color: "from-emerald-500 to-teal-400"
    },
    {
      id: "portfolio_builder",
      name: "Construtor de Portfólio",
      desc: "Registrou seu primeiro projeto de engenharia de software.",
      condition: completedProjects.length >= 1,
      icon: Award,
      color: "from-indigo-500 to-violet-400"
    },
    {
      id: "polyglot",
      name: "Linguista Universal",
      desc: "Marcou pelo menos 3 linguagens na Enciclopédia.",
      condition: favoriteLanguages.length >= 3,
      icon: Sparkles,
      color: "from-pink-500 to-rose-400"
    },
    {
      id: "god_level",
      name: "Lenda do Código",
      desc: "Atingiu nível 3 ou mais na DevForge Academy.",
      condition: userLevel >= 3,
      icon: Zap,
      color: "from-amber-500 to-orange-400"
    }
  ];

  const handleExportData = () => {
    const dataToExport = {
      xp: userXp,
      level: userLevel,
      completedLessons,
      completedQuizzes,
      completedProjects,
      favoriteLanguages,
      timestamp: Date.now()
    };

    const blob = new Blob([JSON.stringify(dataToExport, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `devforge_progress_backup_${Date.now()}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleImportSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!importString.trim()) return;

    const success = onImportProgress(importString);
    if (success) {
      setImportStatus({ status: "success", message: "Backup importado com sucesso! Recarregando progresso." });
      setImportString("");
    } else {
      setImportStatus({ status: "error", message: "Erro de validação de esquema: Certifique-se de que o JSON de backup é válido." });
    }

    setTimeout(() => {
      setImportStatus({ status: "idle", message: "" });
    }, 2500);
  };

  return (
    <div className="p-6 lg:p-8 max-w-7xl mx-auto text-[#E5E5E5] flex flex-col gap-8" id="profile-view">
      
      {/* Title block */}
      <div>
        <div className="flex items-center gap-2 text-indigo-400 font-bold tracking-wide uppercase text-xs">
          <Award className="h-4 w-4" />
          Conquistas & Gestão de Progresso
        </div>
        <h2 className="text-2xl font-extrabold text-white">Painel do Desenvolvedor</h2>
        <p className="text-neutral-400 text-xs mt-1 max-w-2xl leading-relaxed">
          Acompanhe seu avanço intelectual nas trilhas de programação, audite seus badges honorários conquistados ou faça backups persistentes de seus dados.
        </p>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Gamified Stats & Badges */}
        <div className="xl:col-span-8 space-y-6">
          
          {/* Detailed stats grids */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-[#0F0F0F] border border-[#1F1F1F] rounded p-5 flex items-center gap-4 relative overflow-hidden">
              <div className="p-3 rounded bg-indigo-600/10 border border-indigo-600/25 text-indigo-400">
                <Zap className="h-6 w-6 stroke-[2.5]" />
              </div>
              <div>
                <span className="text-[10px] text-neutral-400 font-bold block uppercase tracking-wider">Total de Prestígio</span>
                <p className="text-xl font-extrabold text-neutral-200 mt-0.5">{userXp} XP</p>
                <span className="text-[9px] text-neutral-500 block mt-1">Acumulado offline</span>
              </div>
            </div>

            <div className="bg-[#0F0F0F] border border-[#1F1F1F] rounded p-5 flex items-center gap-4 relative overflow-hidden">
              <div className="p-3 rounded bg-indigo-600/10 border border-indigo-600/25 text-indigo-400">
                <Layers className="h-6 w-6 stroke-[2.5]" />
              </div>
              <div>
                <span className="text-[10px] text-neutral-400 font-bold block uppercase tracking-wider">Aulas Concluídas</span>
                <p className="text-xl font-extrabold text-neutral-200 mt-0.5">{completedLessons.length} Capítulos</p>
                <span className="text-[9px] text-neutral-500 block mt-1">Aproveitamento total</span>
              </div>
            </div>

            <div className="bg-[#0F0F0F] border border-[#1F1F1F] rounded p-5 flex items-center gap-4 relative overflow-hidden">
              <div className="p-3 rounded bg-indigo-600/10 border border-indigo-600/25 text-indigo-400">
                <BookOpen className="h-6 w-6 stroke-[2.5]" />
              </div>
              <div>
                <span className="text-[10px] text-neutral-400 font-bold block uppercase tracking-wider">Projetos no Portfólio</span>
                <p className="text-xl font-extrabold text-neutral-200 mt-0.5">{completedProjects.length} Registros</p>
                <span className="text-[9px] text-neutral-500 block mt-1">Qualificação curricular</span>
              </div>
            </div>
          </div>

          {/* Badge Showcase catalog */}
          <div className="bg-[#0F0F0F] border border-[#1F1F1F] rounded p-6 lg:p-8 space-y-6 shadow-xl">
            <div className="border-b border-[#1F1F1F] pb-3">
              <h3 className="font-extrabold text-sm text-neutral-200 uppercase tracking-wider flex items-center gap-1.5">
                <ShieldCheck className="h-4.5 w-4.5 text-indigo-400" /> Galeria de Badges Honorários
              </h3>
              <p className="text-neutral-400 text-xs mt-1">
                Conquistas de prestígio geradas conforme você avança na academia.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {badgesList.map((badge) => {
                const Icon = badge.icon;
                const isEarned = badge.condition;
                return (
                  <div
                    key={badge.id}
                    className={`border p-4.5 rounded flex flex-col justify-between gap-4 transition-all ${
                      isEarned 
                        ? `bg-black border-indigo-650/25 shadow-md` 
                        : "bg-black/10 border-[#1F1F1F] opacity-30 select-none"
                    }`}
                  >
                    <div className="flex justify-between items-start">
                      <div className={`p-2.5 rounded border flex items-center justify-center ${
                        isEarned 
                          ? "bg-indigo-600/10 text-indigo-400 border-indigo-600/20" 
                          : "bg-neutral-800 text-neutral-500 border-neutral-700"
                      }`}>
                        <Icon className="h-5 w-5 stroke-[2.5]" />
                      </div>
                      
                      {isEarned && (
                        <span className="text-[8px] uppercase tracking-widest bg-indigo-650/15 text-indigo-400 font-extrabold border border-indigo-600/20 px-2 py-0.5 rounded">
                          Conquistado
                        </span>
                      )}
                    </div>

                    <div>
                      <h4 className="text-xs font-bold text-[#E5E5E5] mt-1">{badge.name}</h4>
                      <p className="text-[10px] text-neutral-400 leading-relaxed mt-1">{badge.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

        </div>

        {/* Right Column: Database backup manager (Offline-First compliance) */}
        <div className="xl:col-span-4 bg-[#0F0F0F] border border-[#1F1F1F] rounded p-6 shadow-xl space-y-6">
          <div className="border-b border-[#1F1F1F] pb-4">
            <h3 className="font-extrabold text-sm text-slate-200 flex items-center gap-1.5 uppercase">
              <Database className="h-4.5 w-4.5 text-indigo-400" /> Sincronização & Backup Local
            </h3>
            <p className="text-[11px] text-neutral-400 mt-1 leading-relaxed">
              Como uma plataforma focada em durabilidade offline-first, exporte e proteja seus dados de estudo de forma legível em JSON.
            </p>
          </div>

          <div className="space-y-4">
            {/* Export trigger */}
            <div className="bg-black/40 border border-[#1F1F1F] p-4 rounded space-y-3">
              <h4 className="text-xs font-bold text-neutral-200">Exportar Progresso</h4>
              <p className="text-[10px] text-neutral-400 leading-relaxed">
                Gere um download contendo todos os seus XP, nível, lições, projetos concluidos e linguagens marcadas.
              </p>
              <button
                onClick={handleExportData}
                className="w-full bg-[#161616] hover:bg-[#252525] text-neutral-200 border border-[#2A2A2A] text-xs font-bold py-2 px-3 rounded flex items-center justify-center gap-1.5 transition-all cursor-pointer"
              >
                <Download className="h-4 w-4 text-neutral-400" /> Baixar Backup Local (.json)
              </button>
            </div>

            {/* Import Trigger form */}
            <form onSubmit={handleImportSubmit} className="bg-black/40 border border-[#1F1F1F] p-4 rounded space-y-3">
              <h4 className="text-xs font-bold text-neutral-200">Importar Progresso</h4>
              <p className="text-[10px] text-neutral-400 leading-relaxed">
                Cole o conteúdo JSON bruto de seu backup para restaurar instantaneamente o progresso em qualquer dispositivo.
              </p>
              
              <textarea
                rows={3}
                required
                value={importString}
                onChange={(e) => setImportString(e.target.value)}
                placeholder='Cole o conteúdo do backup {"xp": 1500, "level": 2 ...}'
                className="w-full bg-black border border-[#1F1F1F] rounded p-2.5 text-xs text-neutral-300 font-mono outline-none focus:border-indigo-600/40 resize-none"
              />

              {importStatus.status !== "idle" && (
                <p className={`text-[10px] font-bold text-center ${
                  importStatus.status === "success" ? "text-indigo-400" : "text-rose-450"
                }`}>
                  {importStatus.message}
                </p>
              )}

              <button
                type="submit"
                className="w-full bg-[#161616] hover:bg-[#252525] text-neutral-200 border border-[#2A2A2A] text-xs font-bold py-2 px-3 rounded flex items-center justify-center gap-1.5 transition-all cursor-pointer"
              >
                <Upload className="h-4 w-4 text-neutral-400" /> Validar & Importar Backup
              </button>
            </form>

            {/* Complete hard reset of local progress */}
            <div className="pt-2 border-t border-[#1F1F1F]">
              <button
                onClick={() => { if (confirm("Tem certeza que deseja redefinir TODA a sua jornada de estudos de forma irreversível?")) onResetProgress(); }}
                className="w-full bg-rose-950/15 hover:bg-rose-950/30 text-rose-450 border border-rose-500/25 text-[10px] font-bold py-2.5 rounded flex items-center justify-center gap-1.5 transition-all cursor-pointer"
              >
                <Trash2 className="h-4 w-4" /> Resetar Todo o Progresso
              </button>
            </div>

          </div>

        </div>

      </div>

    </div>
  );
}
