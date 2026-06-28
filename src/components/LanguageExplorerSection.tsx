import React, { useState } from "react";
import { Language } from "../types";
import { coreLanguages, encyclopediaLanguages } from "../data/languages";
import { 
  Search, 
  Filter, 
  Heart, 
  PlusCircle, 
  Calendar, 
  Code2, 
  ThumbsUp, 
  ThumbsDown, 
  ExternalLink, 
  ChevronRight, 
  TrendingUp, 
  X, 
  Plus, 
  HelpCircle, 
  Database, 
  Layers, 
  Award,
  CheckCircle
} from "lucide-react";

interface LanguageExplorerSectionProps {
  favoriteLanguages: string[];
  userAddedLanguages: Language[];
  onToggleFavorite: (langId: string) => void;
  onAddCustomLanguage: (lang: Language) => void;
}

export default function LanguageExplorerSection({
  favoriteLanguages,
  userAddedLanguages,
  onToggleFavorite,
  onAddCustomLanguage
}: LanguageExplorerSectionProps) {
  // Combine native core languages + offline encyclopedia + user added languages
  const allLanguages = [...coreLanguages, ...encyclopediaLanguages, ...userAddedLanguages];

  // Search & Filter State
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedParadigm, setSelectedParadigm] = useState<string>("all");
  const [selectedUseCase, setSelectedUseCase] = useState<string>("all");
  const [showOnlyFavorites, setShowOnlyFavorites] = useState<boolean>(false);
  
  // Custom language form (Sistema de Expansão) state
  const [showExpansionForm, setShowExpansionForm] = useState<boolean>(false);
  const [newLangName, setNewLangName] = useState<string>("");
  const [newLangYear, setNewLangYear] = useState<number>(2026);
  const [newLangCreator, setNewLangCreator] = useState<string>("");
  const [newLangParadigm, setNewLangParadigm] = useState<string>("oop");
  const [newLangUseCase, setNewLangUseCase] = useState<string>("Web");
  const [newLangSyntax, setNewLangSyntax] = useState<string>("");
  const [newLangPros, setNewLangPros] = useState<string>("");
  const [newLangCons, setNewLangCons] = useState<string>("");
  const [newLangDesc, setNewLangDesc] = useState<string>("");
  const [newLangPopularity, setNewLangPopularity] = useState<number>(50);
  const [expansionError, setExpansionError] = useState<string | null>(null);
  const [expansionSuccess, setExpansionSuccess] = useState<boolean>(false);

  // Selected language for detailed view modal
  const [selectedDetailsLang, setSelectedDetailsLang] = useState<Language | null>(null);

  // Paradigms & Use cases arrays
  const paradigmsList = [
    { id: "all", name: "Todos" },
    { id: "oop", name: "Orientado a Objetos" },
    { id: "functional", name: "Funcional" },
    { id: "procedural", name: "Procedural" },
    { id: "declarative", name: "Declarativo" },
    { id: "logic", name: "Lógico" },
    { id: "event_driven", name: "Orientado a Eventos" },
    { id: "imperative", name: "Imperativo" }
  ];

  const useCasesList = [
    { id: "all", name: "Todos os Usos" },
    { id: "Web", name: "Web (Fullstack/Frontend)" },
    { id: "Mobile", name: "Desenvolvimento Mobile" },
    { id: "Systems", name: "Sistemas & Compilação" },
    { id: "AI/ML", name: "IA & Aprendizado Máquina" },
    { id: "Game Dev", name: "Game Development" },
    { id: "Embedded", name: "Sistemas Embarcados" },
    { id: "Relational Databases", name: "Bancos de Dados SQL" },
    { id: "Scientific Computing", name: "Ciência & Computação Numérica" }
  ];

  // Filtering Logic
  const filteredLanguages = allLanguages.filter((lang) => {
    // 1. Search filter
    const matchesSearch = lang.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          (lang.creator && lang.creator.toLowerCase().includes(searchTerm.toLowerCase())) ||
                          lang.description.toLowerCase().includes(searchTerm.toLowerCase());

    // 2. Paradigm filter
    const matchesParadigm = selectedParadigm === "all" || lang.paradigmIds.includes(selectedParadigm);

    // 3. Use Case filter
    const matchesUseCase = selectedUseCase === "all" || lang.mainUseCases.some(uc => uc.includes(selectedUseCase));

    // 4. Favorites filter
    const matchesFavorite = !showOnlyFavorites || favoriteLanguages.includes(lang.id);

    return matchesSearch && matchesParadigm && matchesUseCase && matchesFavorite;
  });

  // Handle addition of custom language (Sistema de Expansão)
  const handleRegisterLanguageSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newLangName || !newLangSyntax || !newLangDesc) {
      setExpansionError("Os campos Nome, Sintaxe de Exemplo e Descrição são obrigatórios.");
      return;
    }

    const customLangId = `custom_${Date.now()}`;
    const cleanPros = newLangPros.split(",").map(p => p.trim()).filter(Boolean);
    const cleanCons = newLangCons.split(",").map(c => c.trim()).filter(Boolean);

    const newLang: Language = {
      id: customLangId,
      name: newLangName,
      paradigmIds: [newLangParadigm],
      yearCreated: Number(newLangYear),
      creator: newLangCreator || "Comunidade DevForge",
      mainUseCases: [newLangUseCase],
      basicSyntaxCode: newLangSyntax,
      pros: cleanPros.length > 0 ? cleanPros : ["Fácil de escrever", "Modular"],
      cons: cleanCons.length > 0 ? cleanCons : ["Documentação jovem"],
      popularity: Number(newLangPopularity),
      description: newLangDesc,
      whereToLearn: "https://google.com/search?q=" + encodeURIComponent(newLangName),
      isCore: false,
      difficulty: "Intermediate"
    };

    onAddCustomLanguage(newLang);
    setExpansionSuccess(true);
    setExpansionError(null);

    // Reset Form
    setTimeout(() => {
      setNewLangName("");
      setNewLangSyntax("");
      setNewLangDesc("");
      setNewLangCreator("");
      setNewLangPros("");
      setNewLangCons("");
      setShowExpansionForm(false);
      setExpansionSuccess(false);
    }, 1500);
  };

  return (
    <div className="p-6 lg:p-8 max-w-7xl mx-auto text-[#E5E5E5] flex flex-col gap-6" id="explorer-view">
      
      {/* Title & Stats */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-indigo-400 font-bold tracking-wide uppercase text-xs">
            <Layers className="h-4 w-4" />
            Universal Language Explorer
          </div>
          <h2 className="text-2xl font-extrabold text-white">Enciclopédia de Linguagens</h2>
          <p className="text-neutral-400 text-xs mt-1 max-w-2xl">
            Explore o maior catálogo técnico offline com mais de 150 conceitos e linguagens de programação, filtre por paradigma e contribua com o Sistema de Expansão.
          </p>
        </div>

        <button
          onClick={() => setShowExpansionForm(true)}
          className="bg-white hover:bg-neutral-200 text-black text-xs font-extrabold px-4 py-2.5 rounded transition-all shadow-md flex items-center gap-2 self-start md:self-center cursor-pointer font-bold"
        >
          <Plus className="h-4 w-4 stroke-[3]" /> Adicionar Linguagem (Expansão)
        </button>
      </div>

      {/* Stats counter strip */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 bg-[#0F0F0F] border border-[#1F1F1F] rounded p-4">
        <div className="text-center md:border-r border-[#1F1F1F]">
          <span className="text-xs text-neutral-400 font-medium">Linguagens Totais</span>
          <p className="text-xl font-extrabold text-neutral-200 mt-1">{allLanguages.length}</p>
        </div>
        <div className="text-center md:border-r border-[#1F1F1F]">
          <span className="text-xs text-neutral-400 font-medium">Trilhas de Elite</span>
          <p className="text-xl font-extrabold text-indigo-400 mt-1">{coreLanguages.length}</p>
        </div>
        <div className="text-center md:border-r border-[#1F1F1F]">
          <span className="text-xs text-neutral-400 font-medium">Enciclopédia Offline</span>
          <p className="text-xl font-extrabold text-indigo-550 mt-1">{encyclopediaLanguages.length}</p>
        </div>
        <div className="text-center">
          <span className="text-xs text-neutral-400 font-medium">Quero Aprender</span>
          <p className="text-xl font-extrabold text-indigo-400 mt-1">{favoriteLanguages.length}</p>
        </div>
      </div>

      {/* Main Filter & List Section */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Filter Sidebar */}
        <div className="xl:col-span-3 bg-[#0F0F0F] border border-[#1F1F1F] rounded p-5 space-y-5">
          <h3 className="font-bold text-xs text-neutral-350 uppercase tracking-wider flex items-center gap-2 border-b border-[#1F1F1F] pb-2.5">
            <Filter className="h-4 w-4 text-indigo-400" /> Filtros e Busca
          </h3>

          {/* Search Box */}
          <div>
            <label className="text-[10px] font-bold text-neutral-500 uppercase block mb-1.5">Pesquisar</label>
            <div className="relative">
              <Search className="h-4 w-4 text-neutral-500 absolute left-3 top-3" />
              <input
                type="text"
                placeholder="Ex: Haskell, COBOL, JS..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-black border border-[#1F1F1F] rounded py-2 px-9 text-xs text-neutral-200 outline-none focus:border-indigo-600/50"
              />
            </div>
          </div>

          {/* Paradigm Select */}
          <div>
            <label className="text-[10px] font-bold text-neutral-500 uppercase block mb-1.5">Por Paradigma</label>
            <select
              value={selectedParadigm}
              onChange={(e) => setSelectedParadigm(e.target.value)}
              className="w-full bg-black border border-[#1F1F1F] rounded py-2 px-3 text-xs text-neutral-300 outline-none focus:border-indigo-600/50"
            >
              {paradigmsList.map(p => (
                <option key={p.id} value={p.id} className="bg-[#0A0A0A]">{p.name}</option>
              ))}
            </select>
          </div>

          {/* Use Case Select */}
          <div>
            <label className="text-[10px] font-bold text-neutral-500 uppercase block mb-1.5">Por Área de Atuação</label>
            <select
              value={selectedUseCase}
              onChange={(e) => setSelectedUseCase(e.target.value)}
              className="w-full bg-black border border-[#1F1F1F] rounded py-2 px-3 text-xs text-neutral-300 outline-none focus:border-indigo-600/50"
            >
              {useCasesList.map(uc => (
                <option key={uc.id} value={uc.id} className="bg-[#0A0A0A]">{uc.name}</option>
              ))}
            </select>
          </div>

          {/* Toggle Favorites Checkbox */}
          <div className="pt-2 border-t border-[#1F1F1F] flex items-center justify-between">
            <span className="text-xs text-neutral-300 font-medium">Ver "Quero Aprender"</span>
            <button
              onClick={() => setShowOnlyFavorites(!showOnlyFavorites)}
              className={`w-11 h-6 rounded-full transition-all duration-300 relative ${
                showOnlyFavorites ? "bg-indigo-600" : "bg-[#1A1A1A]"
              }`}
            >
              <div className={`w-4.5 h-4.5 rounded-full bg-[#E5E5E5] absolute top-0.75 transition-all duration-300 ${
                showOnlyFavorites ? "left-5.5" : "left-1"
              }`} />
            </button>
          </div>
        </div>

        {/* Right Column: Grid List of Programming Languages */}
        <div className="xl:col-span-9 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {filteredLanguages.length > 0 ? (
            filteredLanguages.map((lang) => {
              const isFavorite = favoriteLanguages.includes(lang.id);
              return (
                <div 
                  key={lang.id} 
                  className="bg-[#0F0F0F] border border-[#1F1F1F] hover:border-[#2A2A2A] rounded p-5 flex flex-col justify-between gap-4 transition-all hover:translate-y-[-2px] relative overflow-hidden group shadow-md"
                >
                  {/* Subtle top indicator for core paths */}
                  {lang.isCore && (
                    <div className="absolute right-0 top-0 bg-indigo-600 text-white text-[8px] font-extrabold px-3 py-1 rounded-bl tracking-widest uppercase">
                      Core Track
                    </div>
                  )}

                  {/* Top segment: Title and paradigm */}
                  <div>
                    <div className="flex justify-between items-start gap-2">
                      <h4 className="text-base font-extrabold text-[#E5E5E5] group-hover:text-indigo-400 transition-colors">
                        {lang.name}
                      </h4>
                      <button
                        onClick={() => onToggleFavorite(lang.id)}
                        className={`p-1.5 rounded transition-all ${
                          isFavorite 
                            ? "bg-rose-500/10 border-rose-500/30 text-rose-400" 
                            : "bg-black border border-[#1F1F1F] text-neutral-500 hover:text-white hover:border-[#2A2A2A]"
                        }`}
                        title="Marcar como 'Quero Aprender'"
                      >
                        <Heart className={`h-3.5 w-3.5 ${isFavorite ? "fill-rose-400" : ""}`} />
                      </button>
                    </div>

                    <div className="flex items-center gap-1.5 mt-1.5">
                      <Calendar className="h-3 w-3 text-indigo-400" />
                      <span className="text-[10px] text-neutral-400 font-mono font-medium">Criada em {lang.yearCreated}</span>
                    </div>

                    <p className="text-xs text-neutral-400 mt-2 line-clamp-2 leading-relaxed">
                      {lang.description}
                    </p>
                  </div>

                  {/* Mid Segment: Key use cases */}
                  <div className="flex flex-wrap gap-1">
                    {lang.mainUseCases.map((use, i) => (
                      <span key={i} className="text-[9px] font-bold bg-black text-[#E5E5E5] border border-[#1F1F1F] px-2 py-0.5 rounded">
                        {use}
                      </span>
                    ))}
                  </div>

                  {/* Bottom Segment: Popularity indicator and view details trigger */}
                  <div className="border-t border-[#1F1F1F] pt-3 flex justify-between items-center mt-1">
                    <div className="flex items-center gap-1">
                      <TrendingUp className="h-3.5 w-3.5 text-indigo-400" />
                      <span className="text-[10px] text-neutral-400 font-mono font-bold">Pop: {lang.popularity}%</span>
                    </div>
                    
                    <button
                      onClick={() => setSelectedDetailsLang(lang)}
                      className="text-[10px] font-bold text-indigo-400 hover:text-indigo-300 flex items-center gap-1 hover:underline cursor-pointer"
                    >
                      Ver Ficha Técnica <ChevronRight className="h-3 w-3" />
                    </button>
                  </div>

                </div>
              );
            })
          ) : (
            <div className="col-span-full bg-[#0F0F0F] border border-[#1F1F1F] p-8 rounded text-center">
              <p className="text-neutral-400 text-sm">Nenhuma linguagem encontrada para os filtros atuais.</p>
              <button 
                onClick={() => { setSearchTerm(""); setSelectedParadigm("all"); setSelectedUseCase("all"); setShowOnlyFavorites(false); }}
                className="mt-3 text-xs font-bold text-indigo-400 hover:underline cursor-pointer"
              >
                Limpar Filtros
              </button>
            </div>
          )}
        </div>

      </div>

      {/* MODAL: Sistema de Expansão Form (Embedded dialog screen) */}
      {showExpansionForm && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-[#0F0F0F] border border-[#1F1F1F] rounded max-w-lg w-full p-6 shadow-2xl relative">
            <button
              onClick={() => setShowExpansionForm(false)}
              className="absolute right-4 top-4 text-neutral-400 hover:text-white cursor-pointer"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="border-b border-[#1F1F1F] pb-3 mb-4">
              <div className="flex items-center gap-2 text-indigo-400 font-bold uppercase text-xs">
                <PlusCircle className="h-4.5 w-4.5" /> Sistema de Expansão DevForge
              </div>
              <h3 className="text-lg font-extrabold text-white mt-1">Registrar Nova Linguagem</h3>
              <p className="text-neutral-400 text-[11px] mt-1 leading-relaxed">
                Contribua para o repositório universal. A linguagem adicionada será compilada e integrada offline de forma persistente em sua base.
              </p>
            </div>

            {expansionSuccess ? (
              <div className="p-6 text-center space-y-3">
                <CheckCircle className="h-12 w-12 text-indigo-400 mx-auto animate-bounce" />
                <h4 className="font-extrabold text-white">Compilação Bem Sucedida!</h4>
                <p className="text-xs text-neutral-400">
                  Linguagem injetada com sucesso no cache local persistente de dados.
                </p>
              </div>
            ) : (
              <form onSubmit={handleRegisterLanguageSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-[10px] text-neutral-400 font-bold uppercase block mb-1">Nome da Linguagem *</label>
                    <input
                      type="text"
                      required
                      placeholder="Ex: Zig, Nim, Mojo"
                      value={newLangName}
                      onChange={(e) => setNewLangName(e.target.value)}
                      className="w-full bg-black border border-[#1F1F1F] rounded p-2.5 text-xs text-neutral-200 outline-none focus:border-indigo-600/40"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] text-neutral-400 font-bold uppercase block mb-1">Ano de Criação *</label>
                    <input
                      type="number"
                      required
                      min={1950}
                      max={2027}
                      value={newLangYear}
                      onChange={(e) => setNewLangYear(Number(e.target.value))}
                      className="w-full bg-black border border-[#1F1F1F] rounded p-2.5 text-xs text-neutral-200 outline-none focus:border-indigo-600/40"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-[10px] text-neutral-400 font-bold uppercase block mb-1">Paradigma Principal</label>
                    <select
                      value={newLangParadigm}
                      onChange={(e) => setNewLangParadigm(e.target.value)}
                      className="w-full bg-black border border-[#1F1F1F] rounded p-2.5 text-xs text-neutral-300 outline-none"
                    >
                      <option value="oop" className="bg-[#0A0A0A]">Orientado a Objetos</option>
                      <option value="functional" className="bg-[#0A0A0A]">Funcional</option>
                      <option value="procedural" className="bg-[#0A0A0A]">Procedural</option>
                      <option value="declarative" className="bg-[#0A0A0A]">Declarativo</option>
                      <option value="logic" className="bg-[#0A0A0A]">Lógico</option>
                      <option value="event_driven" className="bg-[#0A0A0A]">Orientado a Eventos</option>
                      <option value="imperative" className="bg-[#0A0A0A]">Imperativo</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-[10px] text-neutral-400 font-bold uppercase block mb-1">Área Principal de Uso</label>
                    <select
                      value={newLangUseCase}
                      onChange={(e) => setNewLangUseCase(e.target.value)}
                      className="w-full bg-black border border-[#1F1F1F] rounded p-2.5 text-xs text-neutral-300 outline-none"
                    >
                      <option value="Web" className="bg-[#0A0A0A]">Web (Frontend/Backend)</option>
                      <option value="Mobile" className="bg-[#0A0A0A]">Desenvolvimento Móvel</option>
                      <option value="Systems" className="bg-[#0A0A0A]">Sistemas e Compiladores</option>
                      <option value="AI/ML" className="bg-[#0A0A0A]">Inteligência Artificial & Dados</option>
                      <option value="Game Dev" className="bg-[#0A0A0A]">Desenvolvimento de Jogos</option>
                      <option value="Embedded" className="bg-[#0A0A0A]">Embarcados / Hardware</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="text-[10px] text-neutral-400 font-bold uppercase block mb-1">Criador / Mantenedor</label>
                  <input
                    type="text"
                    placeholder="Ex: Mozilla Foundation, Google, etc."
                    value={newLangCreator}
                    onChange={(e) => setNewLangCreator(e.target.value)}
                    className="w-full bg-black border border-[#1F1F1F] rounded p-2.5 text-xs text-neutral-200 outline-none focus:border-indigo-600/40"
                  />
                </div>

                <div>
                  <label className="text-[10px] text-neutral-400 font-bold uppercase block mb-1">Descrição Breve *</label>
                  <textarea
                    rows={2}
                    required
                    placeholder="Resuma o propósito e diferencial da linguagem..."
                    value={newLangDesc}
                    onChange={(e) => setNewLangDesc(e.target.value)}
                    className="w-full bg-black border border-[#1F1F1F] rounded p-2.5 text-xs text-neutral-200 outline-none focus:border-indigo-600/40 resize-none"
                  />
                </div>

                <div>
                  <label className="text-[10px] text-neutral-450 font-bold uppercase block mb-1">Sintaxe de Exemplo (Mini Código) *</label>
                  <textarea
                    rows={3}
                    required
                    placeholder="Ex: fn main() { println!('Hello'); }"
                    value={newLangSyntax}
                    onChange={(e) => setNewLangSyntax(e.target.value)}
                    className="w-full bg-black border border-[#1F1F1F] rounded p-2.5 text-xs text-neutral-200 font-mono outline-none focus:border-indigo-600/40"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-[10px] text-neutral-400 font-bold block mb-1 uppercase">Vantagem Principal (Prós)</label>
                    <input
                      type="text"
                      placeholder="Ex: Super leve, Segura"
                      value={newLangPros}
                      onChange={(e) => setNewLangPros(e.target.value)}
                      className="w-full bg-black border border-[#1F1F1F] rounded p-2.5 text-xs text-neutral-200 outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] text-neutral-400 font-bold block mb-1 uppercase">Desvantagem Principal (Contras)</label>
                    <input
                      type="text"
                      placeholder="Ex: Poucas libs, Compilação lenta"
                      value={newLangCons}
                      onChange={(e) => setNewLangCons(e.target.value)}
                      className="w-full bg-black border border-[#1F1F1F] rounded p-2.5 text-xs text-neutral-200 outline-none"
                    />
                  </div>
                </div>

                {expansionError && (
                  <p className="text-[11px] text-rose-400 font-bold text-center">{expansionError}</p>
                )}

                <button
                  type="submit"
                  className="w-full bg-white hover:bg-[#E5E5E5] text-black text-xs font-bold py-3 rounded transition-all shadow-lg cursor-pointer"
                >
                  Compilar & Registrar Linguagem no Catálogo
                </button>
              </form>
            )}
          </div>
        </div>
      )}

      {/* MODAL: Detailed technical sheet for a specific language */}
      {selectedDetailsLang && (
        <div className="fixed inset-0 bg-black/85 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-[#0F0F0F] border border-[#1F1F1F] rounded max-w-2xl w-full p-6 lg:p-8 shadow-2xl relative max-h-[90vh] overflow-y-auto scrollbar-thin">
            <button
              onClick={() => setSelectedDetailsLang(null)}
              className="absolute right-4 top-4 text-neutral-400 hover:text-white cursor-pointer"
            >
              <X className="h-5 w-5" />
            </button>

            {/* Header details */}
            <div className="border-b border-[#1F1F1F] pb-4 mb-5">
              <span className="text-[9px] bg-[#161616] border border-[#1F1F1F] text-neutral-300 font-extrabold px-2.5 py-1 rounded uppercase tracking-widest">
                Ficha Técnica
              </span>
              <h3 className="text-2xl font-extrabold text-white mt-2 flex items-center gap-2">
                {selectedDetailsLang.name}
              </h3>
              {selectedDetailsLang.creator && (
                <p className="text-xs text-neutral-400 mt-1">
                  Criada por <span className="text-indigo-400 font-bold">{selectedDetailsLang.creator}</span> em <span className="font-mono text-neutral-300">{selectedDetailsLang.yearCreated}</span>
                </p>
              )}
            </div>

            {/* Body Info */}
            <div className="space-y-5">
              
              {/* Description */}
              <div>
                <p className="text-xs lg:text-sm text-neutral-300 leading-relaxed font-medium">
                  {selectedDetailsLang.description}
                </p>
              </div>

              {/* Pros & Cons */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-black/30 border border-[#1F1F1F] p-4 rounded">
                  <h5 className="text-[10px] font-bold text-indigo-400 uppercase tracking-wider mb-2 flex items-center gap-1">
                    <ThumbsUp className="h-3.5 w-3.5" /> Pontos Fortes
                  </h5>
                  <ul className="space-y-1">
                    {selectedDetailsLang.pros.map((p, i) => (
                      <li key={i} className="text-xs text-neutral-300 flex items-start gap-1.5 leading-relaxed">
                        <span className="text-indigo-400 font-bold">✓</span> {p}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-black/30 border border-[#1F1F1F] p-4 rounded">
                  <h5 className="text-[10px] font-bold text-rose-450 uppercase tracking-wider mb-2 flex items-center gap-1">
                    <ThumbsDown className="h-3.5 w-3.5" /> Pontos Fracos
                  </h5>
                  <ul className="space-y-1">
                    {selectedDetailsLang.cons.map((c, i) => (
                      <li key={i} className="text-xs text-neutral-300 flex items-start gap-1.5 leading-relaxed">
                        <span className="text-rose-450 font-bold">✗</span> {c}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Syntax Example block */}
              <div>
                <span className="text-[10px] text-neutral-450 font-bold uppercase block mb-1.5 flex items-center gap-1">
                  <Code2 className="h-4 w-4 text-indigo-400" /> Demonstração de Sintaxe Básica
                </span>
                <pre className="bg-black border border-[#1F1F1F] rounded p-4 font-mono text-xs text-neutral-300 overflow-x-auto leading-relaxed">
                  {selectedDetailsLang.basicSyntaxCode}
                </pre>
              </div>

              {/* Extra links */}
              <div className="border-t border-[#1F1F1F] pt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="text-[10px] text-neutral-500 font-mono">
                  SISTEMA DE ENSINO DEVFORGE ACADEMY
                </div>
                
                <a
                  href={selectedDetailsLang.whereToLearn}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-[#1A1A1A] hover:bg-[#252525] text-neutral-200 text-xs px-4 py-2 rounded border border-[#2A2A2A] font-bold transition-all flex items-center justify-center gap-1.5 self-start sm:self-center"
                >
                  Onde Aprender Mais <ExternalLink className="h-3.5 w-3.5" />
                </a>
              </div>

            </div>

          </div>
        </div>
      )}

    </div>
  );
}
