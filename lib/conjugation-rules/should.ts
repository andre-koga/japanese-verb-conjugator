import type {
  ConjugationForm,
  ConjugationRule,
  JapaneseVerb,
} from "@/lib/types";
import { addVerbEnding, getVerbStem } from "@/lib/conjugation";

export const shouldRules: Map<ConjugationForm, ConjugationRule[]> = new Map([
  [
    {
      tense: "should",
      polarity: "affirmative",
      formality: "plain",
    },
    [
      {
        transform: (verb: JapaneseVerb) =>
          addVerbEnding(getVerbStem(verb, "e"), "べき"),
      },
    ],
  ],
  [
    {
      tense: "should",
      polarity: "affirmative",
      formality: "polite",
    },
    [
      {
        transform: (verb: JapaneseVerb) =>
          addVerbEnding(getVerbStem(verb, "e"), "べきです"),
      },
    ],
  ],
  [
    {
      tense: "should",
      polarity: "negative",
      formality: "plain",
    },
    [
      {
        transform: (verb: JapaneseVerb) =>
          addVerbEnding(getVerbStem(verb, "e"), "べきではない"),
      },
    ],
  ],
  [
    {
      tense: "should",
      polarity: "negative",
      formality: "polite",
    },
    [
      {
        transform: (verb: JapaneseVerb) =>
          addVerbEnding(getVerbStem(verb, "e"), "べきではありません"),
      },
    ],
  ],
]);
