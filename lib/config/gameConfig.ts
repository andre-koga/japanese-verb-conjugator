import {
  Tense,
  Polarity,
  JLPTLevel,
  Formality,
  GameStateVariables,
} from "@/lib/types";
import { tenseOptions } from "@/lib/verbOptions";

// Initial state values to use for both initialization and reset
export const initialState: GameStateVariables = {
  selectedTenses: ["present indicative" as Tense],
  tense: "present indicative" as Tense,
  selectedPolarities: ["affirmative" as Polarity],
  polarity: "affirmative" as Polarity,
  selectedFormalities: ["plain" as Formality],
  formality: "plain" as Formality,
  JLPTLevel: "N5" as JLPTLevel,
  enabledJLPTLevels: ["N5" as JLPTLevel],
  showOptionsMenu: true,
  currentVerb: null,
  isCorrect: false,
  showAnswer: false,
  score: 0,
  totalQuestions: 0,
  tenseStats: Object.fromEntries(
    tenseOptions.map(option => [option.id, { correct: 0, total: 0 }])
  ) as Record<Tense, { correct: number; total: number }>,
  polarityStats: {} as Record<Polarity, { correct: number; total: number }>,
  formalityStats: {} as Record<Formality, { correct: number; total: number }>,
  recentVerbs: [],
};
