import type {
  ConjugationForm,
  ConjugationRule,
  JapaneseVerb,
} from "@/lib/types";
import { addVerbEnding, getVerbStem } from "@/lib/conjugation";

export const progressiveRules: Map<ConjugationForm, ConjugationRule[]> =
  new Map([
    [
      {
        tense: "progressive",
        polarity: "affirmative",
        formality: "plain",
      },
      [
        {
          transform: (verb: JapaneseVerb) =>
            addVerbEnding(getVerbStem(verb, "te"), "いる"),
        },
      ],
    ],
    [
      {
        tense: "progressive",
        polarity: "affirmative",
        formality: "polite",
      },
      [
        {
          transform: (verb: JapaneseVerb) =>
            addVerbEnding(getVerbStem(verb, "te"), "います"),
        },
      ],
    ],
    [
      {
        tense: "progressive",
        polarity: "negative",
        formality: "plain",
      },
      [
        {
          transform: (verb: JapaneseVerb) =>
            addVerbEnding(getVerbStem(verb, "te"), "いない"),
        },
      ],
    ],
    [
      {
        tense: "progressive",
        polarity: "negative",
        formality: "polite",
      },
      [
        {
          transform: (verb: JapaneseVerb) =>
            addVerbEnding(getVerbStem(verb, "te"), "いません"),
        },
      ],
    ],
  ]);
