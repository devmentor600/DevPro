import React, { useState, useEffect } from "react";
import Sidebar from "./components/Sidebar";
import ParadigmsSection from "./components/ParadigmsSection";
import CoreLanguagesSection from "./components/CoreLanguagesSection";
import LanguageExplorerSection from "./components/LanguageExplorerSection";
import CareerSection from "./components/CareerSection";
import ProfileSection from "./components/ProfileSection";
import { Language } from "./types";
import { Sparkles, X, Menu, Terminal } from "lucide-react";

export default function App() {
  // Navigation active tab
  const [activeTab, setActiveTab] = useState<string>("paradigms");

  // Mobile responsiveness drawer state
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);

  // Core offline states
  const [userXp, setUserXp] = useState<number>(0);
  const [userLevel, setUserLevel] = useState<number>(1);
  const [completedLessons, setCompletedLessons] = useState<string[]>([]);
  const [completedQuizzes, setCompletedQuizzes] = useState<string[]>([]);
  const [completedProjects, setCompletedProjects] = useState<string[]>([]);
  const [favoriteLanguages, setFavoriteLanguages] = useState<string[]>([]);
  const [userAddedLanguages, setUserAddedLanguages] = useState<Language[]>([]);

  // Level Up overlay message
  const [showLevelUpAlert, setShowLevelUpAlert] = useState<boolean>(false);
  const [newLevelNum, setNewLevelNum] = useState<number>(1);

  // Load from LocalStorage (Offline-First)
  useEffect(() => {
    try {
      const xp = localStorage.getItem("df_xp");
      const lvl = localStorage.getItem("df_level");
      const lessons = localStorage.getItem("df_lessons");
      const quizzes = localStorage.getItem("df_quizzes");
      const projects = localStorage.getItem("df_projects");
      const favs = localStorage.getItem("df_favs");
      const customLangs = localStorage.getItem("df_custom_langs");

      if (xp) setUserXp(Number(xp));
      if (lvl) setUserLevel(Number(lvl));
      if (lessons) setCompletedLessons(JSON.parse(lessons));
      if (quizzes) setCompletedQuizzes(JSON.parse(quizzes));
      if (projects) setCompletedProjects(JSON.parse(projects));
      if (favs) setFavoriteLanguages(JSON.parse(favs));
      if (customLangs) setUserAddedLanguages(JSON.parse(customLangs));
    } catch (e) {
      console.error("Local storage loading error, starting fresh", e);
    }
  }, []);

  // Save changes to LocalStorage automatically on any update
  const saveStateToLocalStorage = (
    xp: number,
    lvl: number,
    lessons: string[],
    quizList: string[],
    projectList: string[],
    favList: string[],
    customLangs: Language[]
  ) => {
    localStorage.setItem("df_xp", String(xp));
    localStorage.setItem("df_level", String(lvl));
    localStorage.setItem("df_lessons", JSON.stringify(lessons));
    localStorage.setItem("df_quizzes", JSON.stringify(quizList));
    localStorage.setItem("df_projects", JSON.stringify(projectList));
    localStorage.setItem("df_favs", JSON.stringify(favList));
    localStorage.setItem("df_custom_langs", JSON.stringify(customLangs));
  };

  // Level Up logic handler
  const checkLevelUp = (currentXp: number, currentLevel: number): { nextLevel: number; leveledUp: boolean } => {
    let lvl = currentLevel;
    let nextLevelNeeded = lvl * 1000;
    let leveledUp = false;

    while (currentXp >= nextLevelNeeded) {
      lvl += 1;
      nextLevelNeeded = lvl * 1000;
      leveledUp = true;
    }

    return { nextLevel: lvl, leveledUp };
  };

  // Award XP to user
  const handleAwardXp = (xpAwarded: number) => {
    const updatedXp = userXp + xpAwarded;
    const { nextLevel, leveledUp } = checkLevelUp(updatedXp, userLevel);

    setUserXp(updatedXp);
    localStorage.setItem("df_xp", String(updatedXp));

    if (leveledUp) {
      setUserLevel(nextLevel);
      setNewLevelNum(nextLevel);
      localStorage.setItem("df_level", String(nextLevel));
      setShowLevelUpAlert(true);
    }

    // Save state helper
    saveStateToLocalStorage(
      updatedXp,
      leveledUp ? nextLevel : userLevel,
      completedLessons,
      completedQuizzes,
      completedProjects,
      favoriteLanguages,
      userAddedLanguages
    );
  };

  // Add lesson completed
  const handleCompleteLesson = (lessonId: string) => {
    if (completedLessons.includes(lessonId)) return;
    const updated = [...completedLessons, lessonId];
    setCompletedLessons(updated);
    saveStateToLocalStorage(userXp, userLevel, updated, completedQuizzes, completedProjects, favoriteLanguages, userAddedLanguages);
  };

  // Add quiz completed
  const handleCompleteQuiz = (quizId: string) => {
    if (completedQuizzes.includes(quizId)) return;
    const updated = [...completedQuizzes, quizId];
    setCompletedQuizzes(updated);
    saveStateToLocalStorage(userXp, userLevel, completedLessons, updated, completedProjects, favoriteLanguages, userAddedLanguages);
  };

  // Add project completed
  const handleCompleteProject = (projectId: string) => {
    if (completedProjects.includes(projectId)) return;
    const updated = [...completedProjects, projectId];
    setCompletedProjects(updated);
    saveStateToLocalStorage(userXp, userLevel, completedLessons, completedQuizzes, updated, favoriteLanguages, userAddedLanguages);
  };

  // Toggle favorite / "quero aprender"
  const handleToggleFavorite = (langId: string) => {
    let updated: string[];
    if (favoriteLanguages.includes(langId)) {
      updated = favoriteLanguages.filter(id => id !== langId);
    } else {
      updated = [...favoriteLanguages, langId];
    }
    setFavoriteLanguages(updated);
    saveStateToLocalStorage(userXp, userLevel, completedLessons, completedQuizzes, completedProjects, updated, userAddedLanguages);
  };

  // Add a custom user registered language (Sistema de Expansão)
  const handleAddCustomLanguage = (newLang: Language) => {
    const updated = [...userAddedLanguages, newLang];
    setUserAddedLanguages(updated);
    saveStateToLocalStorage(userXp, userLevel, completedLessons, completedQuizzes, completedProjects, favoriteLanguages, updated);
  };

  // Full hard-reset of study profile
  const handleResetProgress = () => {
    setUserXp(0);
    setUserLevel(1);
    setCompletedLessons([]);
    setCompletedQuizzes([]);
    setCompletedProjects([]);
    setFavoriteLanguages([]);
    setUserAddedLanguages([]);
    localStorage.clear();
    setActiveTab("paradigms");
  };

  // Import JSON study profile
  const handleImportProgress = (jsonString: string): boolean => {
    try {
      const parsed = JSON.parse(jsonString);
      if (typeof parsed.xp !== "number" || typeof parsed.level !== "number") {
        return false;
      }

      setUserXp(parsed.xp);
      setUserLevel(parsed.level);
      setCompletedLessons(parsed.completedLessons || []);
      setCompletedQuizzes(parsed.completedQuizzes || []);
      setCompletedProjects(parsed.completedProjects || []);
      setFavoriteLanguages(parsed.favoriteLanguages || []);
      
      saveStateToLocalStorage(
        parsed.xp,
        parsed.level,
        parsed.completedLessons || [],
        parsed.completedQuizzes || [],
        parsed.completedProjects || [],
        parsed.favoriteLanguages || [],
        userAddedLanguages
      );

      return true;
    } catch (e) {
      console.error(e);
      return false;
    }
  };

  // Determine which sub view screen to render based on navigation tab selection
  const renderTabContent = () => {
    switch (activeTab) {
      case "paradigms":
        return (
          <ParadigmsSection
            onAwardXp={handleAwardXp}
            completedQuizzes={completedQuizzes}
            onCompleteQuiz={handleCompleteQuiz}
          />
        );
      case "core":
        return (
          <CoreLanguagesSection
            onAwardXp={handleAwardXp}
            completedLessons={completedLessons}
            completedQuizzes={completedQuizzes}
            completedProjects={completedProjects}
            onCompleteLesson={handleCompleteLesson}
            onCompleteQuiz={handleCompleteQuiz}
            onCompleteProject={handleCompleteProject}
          />
        );
      case "encyclopedia":
        return (
          <LanguageExplorerSection
            favoriteLanguages={favoriteLanguages}
            userAddedLanguages={userAddedLanguages}
            onToggleFavorite={handleToggleFavorite}
            onAddCustomLanguage={handleAddCustomLanguage}
          />
        );
      case "career":
        return (
          <CareerSection
            completedLessons={completedLessons}
            completedQuizzes={completedQuizzes}
            completedProjects={completedProjects}
            userXp={userXp}
            userLevel={userLevel}
          />
        );
      case "profile":
        return (
          <ProfileSection
            userXp={userXp}
            userLevel={userLevel}
            completedLessons={completedLessons}
            completedQuizzes={completedQuizzes}
            completedProjects={completedProjects}
            favoriteLanguages={favoriteLanguages}
            onResetProgress={handleResetProgress}
            onImportProgress={handleImportProgress}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex bg-[#0A0A0A] text-[#E5E5E5] min-h-screen font-sans antialiased selection:bg-indigo-600 selection:text-white" id="devforge-app">
      
      {/* Navigation Sidebar */}
      <Sidebar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        userXp={userXp} 
        userLevel={userLevel} 
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />

      {/* Main Work Content Panel */}
      <main className="flex-1 overflow-y-auto max-h-screen flex flex-col">
        {/* Mobile Top Header (only visible on viewports under lg breakpoint) */}
        <header className="lg:hidden flex items-center justify-between p-4 bg-[#0F0F0F] border-b border-[#1F1F1F] sticky top-0 z-30 backdrop-blur-md bg-opacity-80">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsSidebarOpen(true)}
              className="p-2 rounded text-neutral-400 hover:text-white hover:bg-[#161616] transition-colors cursor-pointer"
              aria-label="Abrir menu"
            >
              <Menu className="h-5 w-5" />
            </button>
            
            <div className="flex items-center gap-1.5 ml-1">
              <Terminal className="h-5 w-5 text-indigo-500" />
              <span className="font-extrabold text-white text-sm tracking-tight">DevForge</span>
            </div>
          </div>

          {/* Mobile Status Bar Indicator */}
          <div className="flex items-center gap-2">
            <div className="bg-[#161616] border border-[#222] px-2.5 py-1 rounded flex items-center gap-1 text-[10px] font-bold">
              <Sparkles className="h-3 w-3 text-amber-400" />
              <span className="text-neutral-300">Nível {userLevel}</span>
              <span className="text-neutral-500">•</span>
              <span className="text-indigo-400">{userXp} XP</span>
            </div>
          </div>
        </header>

        <div className="flex-1">
          {renderTabContent()}
        </div>
      </main>

      {/* MODAL overlay: Spectacular level-up alert! */}
      {showLevelUpAlert && (
        <div className="fixed inset-0 bg-black/85 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-[#0F0F0F] border border-[#1F1F1F] rounded-xl p-8 max-w-sm w-full text-center space-y-6 shadow-2xl relative overflow-hidden">
            <div className="absolute right-0 top-0 w-32 h-32 bg-indigo-600/5 blur-3xl rounded-full" />
            
            <Sparkles className="h-16 w-16 text-amber-400 mx-auto animate-bounce" />
            
            <div className="space-y-2">
              <h3 className="text-2xl font-extrabold text-white uppercase tracking-wide">Level Up!</h3>
              <p className="text-neutral-400 text-xs">
                Sua proficiência de desenvolvimento expandiu. Você atingiu um novo patamar técnico na DevForge!
              </p>
            </div>

            <div className="inline-block px-6 py-4 bg-indigo-600/10 border border-indigo-600/30 rounded-xl">
              <span className="text-neutral-400 text-[10px] font-bold uppercase tracking-widest block">Novo Patamar</span>
              <span className="text-4xl font-extrabold text-indigo-400 font-mono">Nível {newLevelNum}</span>
            </div>

            <button
              onClick={() => setShowLevelUpAlert(false)}
              className="w-full bg-white text-black hover:bg-neutral-200 font-extrabold text-xs py-3 rounded-xl transition-all shadow-md"
            >
              Continuar Jornada de Estudos
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
