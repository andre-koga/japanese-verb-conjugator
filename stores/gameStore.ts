import { create } from "zustand";
import { persist } from "zustand/middleware";
import type {
  Formality,
  JLPTLevel,
  Polarity,
  Tense,
  ConjugationForm,
  GameState,
} from "@/lib/types";
import { conjugate, checkAnswer } from "@/lib/conjugation";
import { initialState } from "@/lib/config/gameConfig";
import { allVerbs } from "@/lib/jlpt-verbs";
import { toHiragana } from "hepburn";
import { tenseOptions } from "@/lib/verbOptions";

const useGameStore = create<GameState>()(
  persist(
    (set, get) => ({
      // Initial state
      ...initialState,

      // Actions
      setSelectedTenses: (tenses: Tense[]) => {
        // If array is empty, keep at least one tense
        const selectedTenses: Tense[] =
          tenses.length > 0 ? tenses : ["present indicative" as Tense];
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
      toggleOptionsMenu: () =>
        set((state) => ({ showOptionsMenu: !state.showOptionsMenu })),

      setCurrentAnswer: (answer: string) => set({ currentAnswer: answer }),

      newQuestion: () => {
        // Get a random tense from the selected tenses
        const {
          selectedTenses,
          selectedPolarities,
          selectedFormalities,
          enabledJLPTLevels,
          recentVerbs,
        } = get();

        // Filter out any invalid tenses
        const validTenses = selectedTenses.filter(tense =>
          tenseOptions.some(option => option.id === tense)
        );

        // If no valid tenses, use the first tense from tenseOptions
        if (validTenses.length === 0) {
          set({ selectedTenses: [tenseOptions[0].id] });
          return get().newQuestion();
        }

        const randomTenseIndex = Math.floor(
          Math.random() * validTenses.length,
        );
        const randomTense = validTenses[randomTenseIndex];

        // Get the tense option to check its capabilities
        const tenseOption = tenseOptions.find(t => t.id === randomTense);
        if (!tenseOption) {
          console.error("Invalid tense:", randomTense);
          return get().newQuestion();
        }

        // Only select polarity and formality if the tense supports them
        let randomPolarity = "affirmative" as Polarity;
        let randomFormality = "plain" as Formality;

        if (tenseOption.hasPolarity && tenseOption.hasFormality) {
          if (tenseOption.allowedCombinations) {
            // If there are allowed combinations, randomly select one
            const randomCombination = tenseOption.allowedCombinations[
              Math.floor(Math.random() * tenseOption.allowedCombinations.length)
            ];
            randomPolarity = randomCombination.polarity;
            randomFormality = randomCombination.formality;
          } else {
            // If no specific combinations are defined, randomly select from available options
            const randomPolarityIndex = Math.floor(
              Math.random() * selectedPolarities.length,
            );
            randomPolarity = selectedPolarities[randomPolarityIndex];

            const randomFormalityIndex = Math.floor(
              Math.random() * selectedFormalities.length,
            );
            randomFormality = selectedFormalities[randomFormalityIndex];
          }
        } else if (tenseOption.hasPolarity) {
          // If only polarity is supported
          const randomPolarityIndex = Math.floor(
            Math.random() * selectedPolarities.length,
          );
          randomPolarity = selectedPolarities[randomPolarityIndex];
        } else if (tenseOption.hasFormality) {
          // If only formality is supported
          const randomFormalityIndex = Math.floor(
            Math.random() * selectedFormalities.length,
          );
          randomFormality = selectedFormalities[randomFormalityIndex];
        }

        // Update the current tense, polarity, and formality
        set({
          tense: randomTense,
          polarity: randomPolarity,
          formality: randomFormality,
          showOptionsMenu: false, // Hide options when starting practice
          currentAnswer: "", // Reset current answer
        });

        // Get a random level from selected levels
        const randomLevel =
          enabledJLPTLevels[
          Math.floor(Math.random() * enabledJLPTLevels.length)
          ];
        const levelVerbs = allVerbs[randomLevel];

        // Filter out recent verbs
        const availableVerbs = levelVerbs.filter(
          (verb) => !recentVerbs.some(rv => rv.dictionary === verb.dictionary)
        );

        // If all verbs have been used recently, clear the recent verbs list
        if (availableVerbs.length === 0) {
          set({ recentVerbs: [] });
          return get().newQuestion();
        }

        // Get a random verb from available verbs
        const randomIndex = Math.floor(Math.random() * availableVerbs.length);
        const selectedVerb = availableVerbs[randomIndex];

        // Add to recent verbs and maintain size limit
        const newRecentVerbs = [...recentVerbs, selectedVerb];
        if (newRecentVerbs.length > 10) {
          newRecentVerbs.shift();
        }

        set({
          currentVerb: selectedVerb,
          isCorrect: false,
          showAnswer: false,
          recentVerbs: newRecentVerbs,
        });
      },

      checkAnswer: (answer) => {
        const { currentVerb, tense, polarity, formality } = get();
        if (!currentVerb) return;

        // Get the correct conjugation using the conjugator
        const form: ConjugationForm = { tense, polarity, formality };
        const correctAnswerKana = conjugate(currentVerb, form)[1];

        // Convert the input to hiragana before comparison
        const convertedAnswer = toHiragana(answer);

        // Check if the answer is correct using the sophisticated check
        const isCorrect = checkAnswer(correctAnswerKana, convertedAnswer);

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
          tenseStats: {} as Record<Tense, { correct: number; total: number }>,
          polarityStats: {} as Record<Polarity, { correct: number; total: number }>,
          formalityStats: {} as Record<Formality, { correct: number; total: number }>,
          currentVerb: null,
          isCorrect: false,
          showAnswer: false,
          showOptionsMenu: true, // Show options when resetting
          recentVerbs: [], // Clear recent verbs
          currentAnswer: "", // Reset current answer
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
