import type {
  ConjugationForm,
  ConjugationRule,
  JapaneseVerb,
} from "@/lib/types";
import { addVerbEnding, getVerbStem } from "@/lib/conjugation";

export const regrettableRules: Map<ConjugationForm, ConjugationRule[]> =
  new Map([
    [
      {
        tense: "regrettable",
        polarity: "affirmative",
        formality: "plain",
      },
      [
        {
          transform: (verb: JapaneseVerb) =>
            addVerbEnding(getVerbStem(verb, "te"), "しまう"),
        },
      ],
    ],
    [
      {
        tense: "regrettable",
        polarity: "affirmative",
        formality: "polite",
      },
      [
        {
          transform: (verb: JapaneseVerb) =>
            addVerbEnding(getVerbStem(verb, "te"), "しまいます"),
        },
      ],
    ],
    [
      {
        tense: "regrettable",
        polarity: "negative",
        formality: "plain",
      },
      [
        {
          transform: (verb: JapaneseVerb) =>
            addVerbEnding(getVerbStem(verb, "te"), "しまわない"),
        },
      ],
    ],
    [
      {
        tense: "regrettable",
        polarity: "negative",
        formality: "polite",
      },
      [
        {
          transform: (verb: JapaneseVerb) =>
            addVerbEnding(getVerbStem(verb, "te"), "しまいません"),
        },
      ],
    ],
  ]);
