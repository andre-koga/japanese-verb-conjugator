import type {
  ConjugationForm,
  ConjugationRule,
  JapaneseVerb,
} from "@/lib/types";
import { addVerbEnding, getVerbStem } from "@/lib/conjugation";

export const potentialRules: Map<ConjugationForm, ConjugationRule[]> = new Map([
  [
    {
      tense: "potential",
      polarity: "affirmative",
      formality: "plain",
    },
    [
      {
        transform: (verb: JapaneseVerb) =>
          verb.type === "ichidan"
            ? addVerbEnding(getVerbStem(verb, "i"), "られる")
            : addVerbEnding(getVerbStem(verb, "e"), "る"),
      },
    ],
  ],
  [
    {
      tense: "potential",
      polarity: "affirmative",
      formality: "polite",
    },
    [
      {
        transform: (verb: JapaneseVerb) =>
          verb.type === "ichidan"
            ? addVerbEnding(getVerbStem(verb, "i"), "られます")
            : addVerbEnding(getVerbStem(verb, "e"), "ます"),
      },
    ],
  ],
  [
    {
      tense: "potential",
      polarity: "negative",
      formality: "plain",
    },
    [
      {
        transform: (verb: JapaneseVerb) =>
          verb.type === "ichidan"
            ? addVerbEnding(getVerbStem(verb, "i"), "られない")
            : addVerbEnding(getVerbStem(verb, "e"), "ない"),
      },
    ],
  ],
  [
    {
      tense: "potential",
      polarity: "negative",
      formality: "polite",
    },
    [
      {
        transform: (verb: JapaneseVerb) =>
          verb.type === "ichidan"
            ? addVerbEnding(getVerbStem(verb, "i"), "られません")
            : addVerbEnding(getVerbStem(verb, "e"), "ません"),
      },
    ],
  ],
]);
