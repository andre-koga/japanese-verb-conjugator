import type {
  ConjugationForm,
  ConjugationRule,
  JapaneseVerb,
} from "@/lib/types";
import { getVerbStem, addVerbEnding } from "@/lib/conjugation";

export const volitionalRules: Map<ConjugationForm, ConjugationRule[]> = new Map(
  [
    [
      {
        tense: "volitional",
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
        tense: "volitional",
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
        tense: "volitional",
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
        tense: "volitional",
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
