import React from "react";
import { 
  BookOpen, 
  Compass, 
  Briefcase, 
  User, 
  Layers, 
  Sparkles,
  Terminal,
  X
} from "lucide-react";

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  userXp: number;
  userLevel: number;
  isOpen: boolean;
  onClose: () => void;
}

export default function Sidebar({ activeTab, setActiveTab, userXp, userLevel, isOpen, onClose }: SidebarProps) {
  const menuItems = [
    { id: "paradigms", label: "Paradigmas de Ensino", icon: Layers, desc: "Fundamentos Universais" },
    { id: "core", label: "Trilhas de Elite", icon: BookOpen, desc: "Linguagens do Mercado" },
    { id: "encyclopedia", label: "Universal Explorer", icon: Compass, desc: "150+ Linguagens" },
    { id: "career", label: "Simulador de Carreira & IA", icon: Briefcase, desc: "Entrevista & Portfólio" },
    { id: "profile", label: "Meu Perfil", icon: User, desc: "XP, Nível & Badges" },
  ];

  const nextLevelXp = userLevel * 1000;
  const progressPercent = Math.min(100, Math.floor((userXp / nextLevelXp) * 100));

  return (
    <>
      {/* Dark backdrop overlay for mobile viewports */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden transition-opacity duration-300"
          onClick={onClose}
        />
      )}

      <aside 
        className={`fixed inset-y-0 left-0 z-50 w-80 bg-[#0F0F0F] border-r border-[#1F1F1F] flex flex-col justify-between h-screen text-[#E5E5E5] transition-transform duration-300 ease-in-out lg:sticky lg:top-0 lg:translate-x-0 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`} 
        id="devforge-sidebar"
      >
        {/* Brand Header */}
        <div className="p-6 relative">
          {/* Close button for mobile menu */}
          <button
            onClick={onClose}
            className="absolute top-6 right-6 lg:hidden p-1.5 rounded text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors cursor-pointer"
            aria-label="Fechar menu"
          >
            <X className="h-5 w-5" />
          </button>

          <div className="flex items-center gap-3">
            <div className="bg-indigo-600 p-2.5 rounded flex items-center justify-center font-bold">
              <Terminal className="h-6 w-6 text-white stroke-[2.5]" />
            </div>
            <div>
              <h1 className="text-xl font-extrabold tracking-tight text-white">
                DevForge
              </h1>
              <span className="text-[10px] uppercase tracking-widest font-bold text-indigo-400">
                Programming Academy
              </span>
            </div>
          </div>

          {/* User XP Widget */}
          <div className="mt-8 bg-[#161616] rounded-xl p-4 border border-[#222] backdrop-blur-sm">
            <div className="flex justify-between items-center mb-2">
              <div className="flex items-center gap-1.5">
                <Sparkles className="h-4 w-4 text-amber-400 animate-pulse" />
                <span className="text-xs font-bold text-neutral-300">Nível {userLevel}</span>
              </div>
              <span className="text-xs font-mono text-indigo-400 font-bold">{userXp} / {nextLevelXp} XP</span>
            </div>
            <div className="w-full bg-[#222] h-1.5 rounded-full overflow-hidden">
              <div 
                className="bg-indigo-500 h-full transition-all duration-500"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
            <p className="text-[10px] text-neutral-500 mt-1.5 text-center">
              Falta {nextLevelXp - userXp} XP para o nível {userLevel + 1}!
            </p>
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="px-4 flex-1 py-4 space-y-1 overflow-y-auto">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id);
                  onClose();
                }}
                className={`w-full flex items-center gap-3 px-4 py-3.5 text-left transition-all group border-l-2 cursor-pointer ${
                  isActive 
                    ? "bg-indigo-600/10 text-indigo-400 rounded-md border-indigo-600 font-medium" 
                    : "text-neutral-400 hover:text-white hover:bg-[#161616]/40 border-transparent"
                }`}
              >
                <Icon className={`h-5 w-5 ${isActive ? "text-indigo-400" : "text-neutral-500 group-hover:text-neutral-300"}`} />
                <div>
                  <div className="text-sm font-semibold">{item.label}</div>
                  <div className="text-[10px] text-neutral-500 font-medium group-hover:text-neutral-400">{item.desc}</div>
                </div>
              </button>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="p-6 border-t border-[#1F1F1F] bg-[#0A0A0A]/40">
          <div className="text-[10px] text-neutral-500 text-center font-mono">
            PRO-EDITION v2026.1 <br />
            <span className="text-indigo-400/80 font-semibold">● 100% Offline-First Enabled</span>
          </div>
        </div>
      </aside>
    </>
  );
}
