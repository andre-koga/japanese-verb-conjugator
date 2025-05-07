import type {
  ConjugationForm,
  ConjugationRule,
  JapaneseVerb,
} from "@/lib/types";
import { addVerbEnding, getVerbStem } from "@/lib/conjugation";

export const mustRules: Map<ConjugationForm, ConjugationRule[]> = new Map([
  [
    {
      tense: "must",
      polarity: "affirmative",
      formality: "plain",
    },
    [
      {
        transform: (verb: JapaneseVerb) =>
          addVerbEnding(getVerbStem(verb, "a"), "なければならない"),
      },
    ],
  ],
  [
    {
      tense: "must",
      polarity: "affirmative",
      formality: "polite",
    },
    [
      {
        transform: (verb: JapaneseVerb) =>
          addVerbEnding(getVerbStem(verb, "a"), "なければなりません"),
      },
    ],
  ],
  [
    {
      tense: "must",
      polarity: "negative",
      formality: "plain",
    },
    [
      {
        transform: (verb: JapaneseVerb) =>
          addVerbEnding(getVerbStem(verb, "a"), "なくてもいい"),
      },
    ],
  ],
  [
    {
      tense: "must",
      polarity: "negative",
      formality: "polite",
    },
    [
      {
        transform: (verb: JapaneseVerb) =>
          addVerbEnding(getVerbStem(verb, "a"), "なくてもいいです"),
      },
    ],
  ],
]);
