type VerbType = "godan" | "ichidan";

type Transitivity = "transitive" | "intransitive";

// Create a type that represents all possible conjugation form keys
type ConjugationFormKey = `${Tense}-${Polarity}-${Formality}`;

// Create a type for irregular verb forms that only requires exceptions
type IrregularVerbForms = Partial<Record<ConjugationFormKey, string>>;

export type JLPTLevel = "N5" | "N4" | "N3" | "N2" | "N1";

export type JLPTLevelData = {
  id: JLPTLevel;
  label: string;
  difficulty: "Beginner" | "Basic" | "Intermediate" | "Pre-Advanced" | "Advanced";
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

export type SoundChange = "a" | "i" | "e" | "o" | "te";

export type Polarity = "affirmative" | "negative";

export type Formality = "plain" | "polite";

// Create a discriminated union type for JapaneseVerb
export type JapaneseVerb =
  | {
    dictionary: string;
    kana: string;
    meaning: string;
    type: VerbType;
    ending: VerbEnding;
    transitivity: Transitivity;
  }
  | {
    dictionary: string;
    kana: string;
    meaning: string;
    type: "irregular";
    irregularForms: IrregularVerbForms;
    // Optional: specify which regular pattern to follow for non-specified forms
    regularPattern: VerbType;
    transitivity: Transitivity;
  };

export interface ConjugationRule {
  appliesTo: string[];
  transform: (verb: JapaneseVerb) => string;
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
