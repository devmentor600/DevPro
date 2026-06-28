export interface Paradigm {
  id: string;
  name: string;
  description: string;
  keyPrinciples: string[];
  pros: string[];
  cons: string[];
  languagesExamples: string[];
  shortCodeSnippet: string;
}

export interface Language {
  id: string;
  name: string;
  paradigmIds: string[]; // can map to multiple paradigms
  yearCreated: number;
  creator?: string;
  mainUseCases: string[]; // e.g. "Web", "Mobile", "Embedded", "Game Dev", "AI/ML", "Systems"
  basicSyntaxCode: string;
  pros: string[];
  cons: string[];
  popularity: number; // 1-100 rating
  description: string;
  whereToLearn: string;
  isCore: boolean;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
}

export interface Lesson {
  id: string;
  title: string;
  description: string;
  content: string; // Markdown supported
  codeExample?: string;
  codeLanguage?: string;
  exercise?: {
    instruction: string;
    starterCode: string;
    solution: string;
    validationRegex?: string; // simplified client check
  };
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswerIndex: number;
  explanation: string;
}

export interface Quiz {
  id: string;
  title: string;
  description: string;
  questions: QuizQuestion[];
  xpReward: number;
}

export interface ProjectTemplate {
  id: string;
  title: string;
  description: string;
  difficulty: "Easy" | "Medium" | "Hard";
  requirements: string[];
  guide: string;
}

export interface InterviewMessage {
  sender: "recruiter" | "user";
  text: string;
  timestamp: string;
}

export interface UserProgress {
  xp: number;
  level: number;
  completedLessons: string[]; // lessonIds
  completedQuizzes: string[]; // quizIds
  completedProjects: string[]; // projectIds
  favoriteLanguages: string[]; // languageIds
  userAddedLanguages: Language[];
  interviewHistory: {
    languageId: string;
    chat: InterviewMessage[];
    score?: number;
    feedback?: string;
  }[];
}
