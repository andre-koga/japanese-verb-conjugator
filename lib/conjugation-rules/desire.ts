import type {
  ConjugationForm,
  ConjugationRule,
  JapaneseVerb,
} from "@/lib/types";
import { addVerbEnding, getVerbStem } from "@/lib/conjugation";

export const desireRules: Map<ConjugationForm, ConjugationRule[]> = new Map([
  [
    {
      tense: "desire",
      polarity: "affirmative",
      formality: "plain",
    },
    [
      {
        transform: (verb: JapaneseVerb) =>
          addVerbEnding(getVerbStem(verb, "i"), "たい"),
      },
    ],
  ],
  [
    {
      tense: "desire",
      polarity: "affirmative",
      formality: "polite",
    },
    [
      {
        transform: (verb: JapaneseVerb) =>
          addVerbEnding(getVerbStem(verb, "i"), "たいです"),
      },
    ],
  ],
  [
    {
      tense: "desire",
      polarity: "negative",
      formality: "plain",
    },
    [
      {
        transform: (verb: JapaneseVerb) =>
          addVerbEnding(getVerbStem(verb, "i"), "たくない"),
      },
    ],
  ],
  [
    {
      tense: "desire",
      polarity: "negative",
      formality: "polite",
    },
    [
      {
        transform: (verb: JapaneseVerb) =>
          addVerbEnding(getVerbStem(verb, "i"), "たくありません"),
      },
    ],
  ],
]);
