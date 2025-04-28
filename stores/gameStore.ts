import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { JLPTLevel } from "@/lib/types";

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
    tense: string;
    polarity: "Positive" | "Negative";
    formality: "Formal" | "Informal";
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
    setTense: (tense: string) => void;
    setPolarity: (polarity: "Positive" | "Negative") => void;
    setFormality: (formality: "Formal" | "Informal") => void;
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
            tense: "Present",
            polarity: "Positive",
            formality: "Formal",
            JLPTLevel: "N5",
            enabledJLPTLevels: ["N5"],
            currentVerb: null,
            isCorrect: false,
            showAnswer: false,
            score: 0,
            totalQuestions: 0,
            tenseStats: {},

            // Actions
            setTense: (tense) => set({ tense }),
            setPolarity: (polarity) => set({ polarity }),
            setFormality: (formality) => set({ formality }),
            setJLPTLevel: (level) => set({ JLPTLevel: level }),
            setEnabledJLPTLevels: (levels) => set({ enabledJLPTLevels: levels }),

            newQuestion: () => {
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
                const { currentVerb, tense, polarity, formality, tenseStats } = get();
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
                        [tense]: {
                            correct: isCorrect
                                ? (state.tenseStats[tense]?.correct || 0) + 1
                                : state.tenseStats[tense]?.correct || 0,
                            total: (state.tenseStats[tense]?.total || 0) + 1,
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
        }
    )
);

export { useGameStore }; 