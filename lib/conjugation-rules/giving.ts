import type {
  ConjugationForm,
  ConjugationRule,
  JapaneseVerb,
} from "@/lib/types";
import { addVerbEnding, getVerbStem } from "@/lib/conjugation";

export const givingRules: Map<ConjugationForm, ConjugationRule[]> = new Map([
  [
    {
      tense: "giving",
      polarity: "affirmative",
      formality: "plain",
    },
    [
      {
        transform: (verb: JapaneseVerb) =>
          addVerbEnding(getVerbStem(verb, "te"), "あげる"),
      },
    ],
  ],
  [
    {
      tense: "giving",
      polarity: "affirmative",
      formality: "polite",
    },
    [
      {
        transform: (verb: JapaneseVerb) =>
          addVerbEnding(getVerbStem(verb, "te"), "あげます"),
      },
    ],
  ],
  [
    {
      tense: "giving",
      polarity: "negative",
      formality: "plain",
    },
    [
      {
        transform: (verb: JapaneseVerb) =>
          addVerbEnding(getVerbStem(verb, "te"), "あげない"),
      },
    ],
  ],
  [
    {
      tense: "giving",
      polarity: "negative",
      formality: "polite",
    },
    [
      {
        transform: (verb: JapaneseVerb) =>
          addVerbEnding(getVerbStem(verb, "te"), "あげません"),
      },
    ],
  ],
]);
