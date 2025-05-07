import type {
  ConjugationForm,
  ConjugationRule,
  JapaneseVerb,
} from "@/lib/types";
import { addVerbEnding, getVerbStem } from "@/lib/conjugation";

export const causativeRules: Map<ConjugationForm, ConjugationRule[]> = new Map([
  [
    {
      tense: "causative",
      polarity: "affirmative",
      formality: "plain",
    },
    [
      {
        transform: (verb: JapaneseVerb) => {
          const stem = getVerbStem(verb, "a");
          return verb.type === "ichidan"
            ? addVerbEnding(stem, "させる")
            : addVerbEnding(stem, "せる");
        },
      },
    ],
  ],
  [
    {
      tense: "causative",
      polarity: "affirmative",
      formality: "polite",
    },
    [
      {
        transform: (verb: JapaneseVerb) => {
          const stem = getVerbStem(verb, "a");
          return verb.type === "ichidan"
            ? addVerbEnding(stem, "させます")
            : addVerbEnding(stem, "せます");
        },
      },
    ],
  ],
  [
    {
      tense: "causative",
      polarity: "negative",
      formality: "plain",
    },
    [
      {
        transform: (verb: JapaneseVerb) => {
          const stem = getVerbStem(verb, "a");
          return verb.type === "ichidan"
            ? addVerbEnding(stem, "させない")
            : addVerbEnding(stem, "せない");
        },
      },
    ],
  ],
  [
    {
      tense: "causative",
      polarity: "negative",
      formality: "polite",
    },
    [
      {
        transform: (verb: JapaneseVerb) => {
          const stem = getVerbStem(verb, "a");
          return verb.type === "ichidan"
            ? addVerbEnding(stem, "させません")
            : addVerbEnding(stem, "せません");
        },
      },
    ],
  ],
]);
