import { Tense, Polarity, JLPTLevel, Formality } from "@/lib/types";

// Initial state values to use for both initialization and reset
export const initialState = {
    selectedTenses: ["present" as Tense],
    tense: "present" as Tense,
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
    tenseStats: {},
};