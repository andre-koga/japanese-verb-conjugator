type VerbType = "godan" | "ichidan";

type Transitivity = "transitive" | "intransitive";

// Create a type for the conjugation form
export type ConjugationForm = {
  tense: Tense;
  polarity: Polarity;
  formality: Formality;
};

// Create a type for irregular verb forms that only requires exceptions
type IrregularVerbForms = Map<ConjugationForm, [string, string]>;

export type GodanVowel = "a" | "i" | "u" | "e" | "o" | "te" | "ta";

export type JLPTLevel = "N5" | "N4" | "N3" | "N2" | "N1";

export type JLPTLevelData = {
  id: JLPTLevel;
  label: string;
  difficulty:
    | "Beginner"
    | "Basic"
    | "Intermediate"
    | "Pre-Advanced"
    | "Advanced";
  description: string;
};

export type VerbEnding =
  | "u"
  | "ku"
  | "gu"
  | "su"
  | "tsu"
  | "nu"
  | "bu"
  | "mu"
  | "ru";

export type Polarity = "affirmative" | "negative";

export type Formality = "plain" | "polite";

// Create a discriminated union type for JapaneseVerb
export type JapaneseVerb =
  | {
      dictionary: string;
      kana: string;
      meaning: string;
      type: VerbType;
      transitivity?: Transitivity;
      JLPTLevel?: JLPTLevel;
    }
  | {
      dictionary: string;
      kana: string;
      meaning: string;
      type: "irregular";
      irregularForms: IrregularVerbForms;
      regularPattern: VerbType;
      transitivity?: Transitivity;
      JLPTLevel?: JLPTLevel;
    };

export interface ConjugationRule {
  transform: (verb: JapaneseVerb) => [string, string];
}

export type Tense =
  | "present"
  | "past"
  | "te form"
  | "potential"
  | "passive"
  | "causative"
  | "imperative"
  | "volitional"
  | "conditional ba"
  | "conditional tara"
  | "progressive"
  | "desire"
  | "causative passive"
  | "conditional nara"
  | "conditional to"
  | "should"
  | "must"
  | "attemptive"
  | "preparatory"
  | "regrettable"
  | "giving"
  | "receiving"
  | "receiving favor"
  | "simultaneous"
  | "purpose going"
  | "purpose coming";

export type TenseGroup = {
  isEssential: boolean;
  label: string;
  description: string;
};

export interface TenseStats {
  correct: number;
  total: number;
}

export interface GameStateVariables {
  selectedTenses: Tense[];
  tense: Tense;
  selectedPolarities: Polarity[];
  polarity: Polarity;
  selectedFormalities: Formality[];
  formality: Formality;
  JLPTLevel: JLPTLevel;
  enabledJLPTLevels: JLPTLevel[];
  showOptionsMenu: boolean;
  currentVerb: JapaneseVerb | null;
  isCorrect: boolean;
  showAnswer: boolean;
  score: number;
  totalQuestions: number;
  tenseStats: Record<string, TenseStats>;
  recentVerbs: string[];
}

export interface GameState extends GameStateVariables {
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
