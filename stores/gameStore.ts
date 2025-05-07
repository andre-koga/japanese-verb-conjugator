import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Formality, JLPTLevel, Polarity, Tense } from "@/lib/types";
import { conjugator } from "@/lib/conjugation";
import { initialState } from "@/lib/config/gameConfig";

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
  selectedTenses: Tense[]; // Multiple tense selection
  tense: Tense; // Current active tense
  selectedPolarities: Polarity[]; // Multiple polarity selection
  polarity: Polarity; // Current active polarity
  selectedFormalities: Formality[]; // Multiple formality selection
  formality: Formality; // Current active formality
  JLPTLevel: JLPTLevel;
  enabledJLPTLevels: JLPTLevel[];
  showOptionsMenu: boolean; // Track if options menu is visible

  // Game state
  currentVerb: Verb | null;
  isCorrect: boolean;
  showAnswer: boolean;
  score: number;
  totalQuestions: number;
  tenseStats: Record<string, TenseStats>;

  // Actions
  setSelectedTenses: (tenses: Tense[]) => void;
  setTense: (tense: Tense) => void;
  setSelectedPolarities: (polarities: Polarity[]) => void;
  setPolarity: (polarity: Polarity) => void;
  setSelectedFormalities: (formalities: Formality[]) => void;
  setFormality: (formality: Formality) => void;
  setJLPTLevel: (level: JLPTLevel) => void;
  setEnabledJLPTLevels: (levels: JLPTLevel[]) => void;
  setShowOptionsMenu: (show: boolean) => void; // Set options visibility
  toggleOptionsMenu: () => void; // Toggle options visibility
  newQuestion: () => void;
  checkAnswer: (answer: string) => void;
  resetGame: () => void;
  clearStorage: () => void; // Clear all storage and reset to defaults
}

const useGameStore = create<GameState>()(
  persist(
    (set, get) => ({
      // Initial state
      ...initialState,

      // Actions
      setSelectedTenses: (tenses: Tense[]) => {
        // If array is empty, keep at least one tense
        const selectedTenses: Tense[] =
          tenses.length > 0 ? tenses : ["present" as Tense];
        // Also update the current tense if needed
        const currentTense = get().tense;
        if (!tenses.includes(currentTense) && tenses.length > 0) {
          set({ selectedTenses, tense: tenses[0] });
        } else {
          set({ selectedTenses });
        }
      },
      setTense: (tense: Tense) => set({ tense }),

      setSelectedPolarities: (polarities: Polarity[]) => {
        // If array is empty, keep at least one polarity
        const selectedPolarities: Polarity[] =
          polarities.length > 0 ? polarities : ["affirmative" as Polarity];
        // Also update the current polarity if needed
        const currentPolarity = get().polarity;
        if (!polarities.includes(currentPolarity) && polarities.length > 0) {
          set({ selectedPolarities, polarity: polarities[0] });
        } else {
          set({ selectedPolarities });
        }
      },
      setPolarity: (polarity: Polarity) => set({ polarity }),

      setSelectedFormalities: (formalities: Formality[]) => {
        // If array is empty, keep at least one formality
        const selectedFormalities: Formality[] =
          formalities.length > 0 ? formalities : ["plain" as Formality];
        // Also update the current formality if needed
        const currentFormality = get().formality;
        if (!formalities.includes(currentFormality) && formalities.length > 0) {
          set({ selectedFormalities, formality: formalities[0] });
        } else {
          set({ selectedFormalities });
        }
      },
      setFormality: (formality: Formality) => set({ formality }),

      setJLPTLevel: (level: JLPTLevel) => set({ JLPTLevel: level }),
      setEnabledJLPTLevels: (levels: JLPTLevel[]) =>
        set({ enabledJLPTLevels: levels }),

      setShowOptionsMenu: (show: boolean) => set({ showOptionsMenu: show }),
      toggleOptionsMenu: () => set((state) => ({ showOptionsMenu: !state.showOptionsMenu })),

      newQuestion: () => {
        // Get a random tense from the selected tenses
        const { selectedTenses, selectedPolarities, selectedFormalities } = get();

        const randomTenseIndex = Math.floor(
          Math.random() * selectedTenses.length,
        );
        const randomTense = selectedTenses[randomTenseIndex];

        // Get a random polarity from the selected polarities
        const randomPolarityIndex = Math.floor(
          Math.random() * selectedPolarities.length,
        );
        const randomPolarity = selectedPolarities[randomPolarityIndex];

        // Get a random formality from the selected formalities
        const randomFormalityIndex = Math.floor(
          Math.random() * selectedFormalities.length,
        );
        const randomFormality = selectedFormalities[randomFormalityIndex];

        // Update the current tense, polarity, and formality
        set({
          tense: randomTense,
          polarity: randomPolarity,
          formality: randomFormality,
          showOptionsMenu: false // Hide options when starting practice
        });

        // Get random verb from the conjugator
        const randomVerb = conjugator.getRandomVerb();

        set({
          currentVerb: {
            dictionaryForm: randomVerb.dictionary,
            meaning: randomVerb.meaning,
            type: randomVerb.type,
            JLPTLevel: "N5", // This could be updated with the actual JLPT level
          },
          isCorrect: false,
          showAnswer: false,
        });
      },

      checkAnswer: (answer) => {
        const { currentVerb, tense, polarity, formality } = get();
        if (!currentVerb) return;

        // Find the verb in the conjugator
        const verbObj = conjugator.findVerb(currentVerb.dictionaryForm);
        if (!verbObj) return;

        // Get the correct conjugation
        const correctAnswer = conjugator.conjugate(verbObj, tense, polarity, formality);

        // Check if the answer is correct
        const isCorrect = answer.trim() === correctAnswer.trim();

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
          showOptionsMenu: true, // Show options when resetting
        }),

      clearStorage: () => {
        // Clear persisted storage
        localStorage.removeItem("game-storage");

        // Reset to initial state
        set(initialState);
      },
    }),
    {
      name: "game-storage",
    },
  ),
);

export { useGameStore };
