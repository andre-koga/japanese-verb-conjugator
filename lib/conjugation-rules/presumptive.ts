import type {
  ConjugationForm,
  ConjugationRule,
  JapaneseVerb,
} from "@/lib/types";
import { getVerbStem, addVerbEnding } from "@/lib/conjugation";

export const presumptiveRules: Map<ConjugationForm, ConjugationRule[]> = new Map(
  [
    [
      {
        tense: "presumptive",
        polarity: "affirmative",
        formality: "plain",
      },
      [
        {
          transform: (verb: JapaneseVerb) =>
            verb.type === "ichidan"
              ? addVerbEnding(getVerbStem(verb, "i"), "よう")
              : addVerbEnding(getVerbStem(verb, "o"), "う"),
        },
      ],
    ],
    [
      {
        tense: "presumptive",
        polarity: "affirmative",
        formality: "polite",
      },
      [
        {
          transform: (verb: JapaneseVerb) =>
            addVerbEnding(getVerbStem(verb, "i"), "ましょう"),
        },
      ],
    ],
    [
      {
        tense: "presumptive",
        polarity: "negative",
        formality: "plain",
      },
      [
        {
          transform: (verb: JapaneseVerb) =>
            addVerbEnding(getVerbStem(verb, "a"), "ないで"),
        },
      ],
    ],
    [
      {
        tense: "presumptive",
        polarity: "negative",
        formality: "polite",
      },
      [
        {
          transform: (verb: JapaneseVerb) =>
            addVerbEnding(getVerbStem(verb, "a"), "ないでください"),
        },
      ],
    ],
  ],
);
