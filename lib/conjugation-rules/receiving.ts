import type {
  ConjugationForm,
  ConjugationRule,
  JapaneseVerb,
} from "@/lib/types";
import { addVerbEnding, getVerbStem } from "@/lib/conjugation";

export const receivingRules: Map<ConjugationForm, ConjugationRule[]> = new Map([
  [
    {
      tense: "receiving",
      polarity: "affirmative",
      formality: "plain",
    },
    [
      {
        transform: (verb: JapaneseVerb) =>
          addVerbEnding(getVerbStem(verb, "te"), "もらう"),
      },
    ],
  ],
  [
    {
      tense: "receiving",
      polarity: "affirmative",
      formality: "polite",
    },
    [
      {
        transform: (verb: JapaneseVerb) =>
          addVerbEnding(getVerbStem(verb, "te"), "いただきます"),
      },
    ],
  ],
  [
    {
      tense: "receiving",
      polarity: "negative",
      formality: "plain",
    },
    [
      {
        transform: (verb: JapaneseVerb) =>
          addVerbEnding(getVerbStem(verb, "te"), "もらわない"),
      },
    ],
  ],
  [
    {
      tense: "receiving",
      polarity: "negative",
      formality: "polite",
    },
    [
      {
        transform: (verb: JapaneseVerb) =>
          addVerbEnding(getVerbStem(verb, "te"), "いただきません"),
      },
    ],
  ],
]);
