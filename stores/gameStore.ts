import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Formality, JLPTLevel, Polarity, Tense } from "@/lib/types";

interface Verb {
  dictionaryForm: string;
  meaning: string;
  type: "ichidan" | "godan" | "irregular";
  JLPTLevel: "N5" | "N4" | "N3" | "N2" | "N1";
}

interface TenseStats {
  correct: number;
  total: number;
}

interface GameState {
  // Game settings
  selectedTenses: Tense[]; // New field for multiple tense selection
  tense: Tense; // Current active tense
  polarity: Polarity;
  formality: Formality;
  JLPTLevel: JLPTLevel;
  enabledJLPTLevels: JLPTLevel[];

  // Game state
  currentVerb: Verb | null;
  isCorrect: boolean;
  showAnswer: boolean;
  score: number;
  totalQuestions: number;
  tenseStats: Record<string, TenseStats>;

  // Actions
  setSelectedTenses: (tenses: Tense[]) => void; // New action for multiple tenses
  setTense: (tense: Tense) => void; // Add this action
  setPolarity: (polarity: Polarity) => void;
  setFormality: (formality: Formality) => void;
  setJLPTLevel: (level: JLPTLevel) => void;
  setEnabledJLPTLevels: (levels: JLPTLevel[]) => void;
  newQuestion: () => void;
  checkAnswer: (answer: string) => void;
  resetGame: () => void;
}

const useGameStore = create<GameState>()(
  persist(
    (set, get) => ({
      // Initial state
      selectedTenses: ["present"],
      tense: "present",
      polarity: "affirmative",
      formality: "plain",
      JLPTLevel: "N5",
      enabledJLPTLevels: ["N5"],
      currentVerb: null,
      isCorrect: false,
      showAnswer: false,
      score: 0,
      totalQuestions: 0,
      tenseStats: {},

      // Actions
      setSelectedTenses: (tenses: Tense[]) => {
        // If array is empty, keep at least one tense
        const selectedTenses: Tense[] =
          tenses.length > 0 ? tenses : ["present"];
        // Also update the current tense if needed
        const currentTense = get().selectedTenses[0];
        if (!tenses.includes(currentTense) && tenses.length > 0) {
          set({ selectedTenses, tense: tenses[0] });
        } else {
          set({ selectedTenses });
        }
      },
      setTense: (tense: Tense) => set({ tense }),
      setPolarity: (polarity: Polarity) => set({ polarity }),
      setFormality: (formality: Formality) => set({ formality }),
      setJLPTLevel: (level: JLPTLevel) => set({ JLPTLevel: level }),
      setEnabledJLPTLevels: (levels: JLPTLevel[]) =>
        set({ enabledJLPTLevels: levels }),

      newQuestion: () => {
        // Get a random tense from the selected tenses
        const { selectedTenses } = get();
        const randomTenseIndex = Math.floor(
          Math.random() * selectedTenses.length,
        );
        const randomTense = selectedTenses[randomTenseIndex];

        // Update the current tense
        set({ tense: randomTense });

        // TODO: Implement verb selection logic
        set({
          currentVerb: {
            dictionaryForm: "食べる",
            meaning: "to eat",
            type: "ichidan",
            JLPTLevel: "N5",
          },
          isCorrect: false,
          showAnswer: false,
        });
      },

      checkAnswer: (answer) => {
        const { currentVerb } = get();
        if (!currentVerb) return;

        // TODO: Implement answer checking logic
        const isCorrect = answer === "食べます"; // Placeholder

        set((state) => ({
          isCorrect,
          showAnswer: true,
          score: isCorrect ? state.score + 1 : state.score,
          totalQuestions: state.totalQuestions + 1,
          tenseStats: {
            ...state.tenseStats,
            [state.tense]: {
              correct: isCorrect
                ? (state.tenseStats[state.tense]?.correct || 0) + 1
                : state.tenseStats[state.tense]?.correct || 0,
              total: (state.tenseStats[state.tense]?.total || 0) + 1,
            },
          },
        }));
      },

      resetGame: () =>
        set({
          score: 0,
          totalQuestions: 0,
          tenseStats: {},
          currentVerb: null,
          isCorrect: false,
          showAnswer: false,
        }),
    }),
    {
      name: "game-storage",
    },
  ),
);

export { useGameStore };
