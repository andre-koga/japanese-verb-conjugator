import type {
  ConjugationForm,
  ConjugationRule,
  JapaneseVerb,
} from "@/lib/types";
import { addVerbEnding, getVerbStem } from "@/lib/conjugation";

export const attemptiveRules: Map<ConjugationForm, ConjugationRule[]> = new Map(
  [
    [
      {
        tense: "attemptive",
        polarity: "affirmative",
        formality: "plain",
      },
      [
        {
          transform: (verb: JapaneseVerb) =>
            addVerbEnding(getVerbStem(verb, "o"), "うとする"),
        },
      ],
    ],
    [
      {
        tense: "attemptive",
        polarity: "affirmative",
        formality: "polite",
      },
      [
        {
          transform: (verb: JapaneseVerb) =>
            addVerbEnding(getVerbStem(verb, "o"), "うとします"),
        },
      ],
    ],
    [
      {
        tense: "attemptive",
        polarity: "negative",
        formality: "plain",
      },
      [
        {
          transform: (verb: JapaneseVerb) =>
            addVerbEnding(getVerbStem(verb, "o"), "うとしない"),
        },
      ],
    ],
    [
      {
        tense: "attemptive",
        polarity: "negative",
        formality: "polite",
      },
      [
        {
          transform: (verb: JapaneseVerb) =>
            addVerbEnding(getVerbStem(verb, "o"), "うとしません"),
        },
      ],
    ],
  ],
);
