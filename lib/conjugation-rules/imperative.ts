import type {
  ConjugationForm,
  ConjugationRule,
  JapaneseVerb,
} from "@/lib/types";
import { addVerbEnding, getVerbStem } from "@/lib/conjugation";

export const imperativeRules: Map<ConjugationForm, ConjugationRule[]> = new Map(
  [
    [
      {
        tense: "imperative",
        polarity: "affirmative",
        formality: "plain",
      },
      [
        {
          transform: (verb: JapaneseVerb) =>
            verb.type === "ichidan"
              ? addVerbEnding(getVerbStem(verb, "i"), "ろ")
              : addVerbEnding(getVerbStem(verb, "e"), "ろ"),
        },
      ],
    ],
    [
      {
        tense: "imperative",
        polarity: "affirmative",
        formality: "polite",
      },
      [
        {
          transform: (verb: JapaneseVerb) =>
            addVerbEnding(getVerbStem(verb, "te"), "ください"),
        },
      ],
    ],
    [
      {
        tense: "imperative",
        polarity: "negative",
        formality: "plain",
      },
      [
        {
          transform: (verb: JapaneseVerb) =>
            verb.type === "ichidan"
              ? addVerbEnding(getVerbStem(verb, "i"), "るな")
              : addVerbEnding(getVerbStem(verb, "a"), "な"),
        },
      ],
    ],
    [
      {
        tense: "imperative",
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
