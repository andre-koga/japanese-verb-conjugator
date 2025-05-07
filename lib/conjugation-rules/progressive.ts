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
        tense: "present progressive",
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
        tense: "present progressive",
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
        tense: "present progressive",
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
        tense: "present progressive",
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
