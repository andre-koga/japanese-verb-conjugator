import type {
  ConjugationForm,
  ConjugationRule,
  JapaneseVerb,
} from "@/lib/types";
import { addVerbEnding, getVerbStem } from "@/lib/conjugation";

export const passiveRules: Map<ConjugationForm, ConjugationRule[]> = new Map([
  [
    {
      tense: "passive",
      polarity: "affirmative",
      formality: "plain",
    },
    [
      {
        transform: (verb: JapaneseVerb) =>
          verb.type === "ichidan"
            ? addVerbEnding(getVerbStem(verb, "i"), "られる")
            : addVerbEnding(getVerbStem(verb, "a"), "れる"),
      },
    ],
  ],
  [
    {
      tense: "passive",
      polarity: "affirmative",
      formality: "polite",
    },
    [
      {
        transform: (verb: JapaneseVerb) =>
          verb.type === "ichidan"
            ? addVerbEnding(getVerbStem(verb, "i"), "られます")
            : addVerbEnding(getVerbStem(verb, "a"), "れます"),
      },
    ],
  ],
  [
    {
      tense: "passive",
      polarity: "negative",
      formality: "plain",
    },
    [
      {
        transform: (verb: JapaneseVerb) =>
          verb.type === "ichidan"
            ? addVerbEnding(getVerbStem(verb, "i"), "られない")
            : addVerbEnding(getVerbStem(verb, "a"), "れない"),
      },
    ],
  ],
  [
    {
      tense: "passive",
      polarity: "negative",
      formality: "polite",
    },
    [
      {
        transform: (verb: JapaneseVerb) =>
          verb.type === "ichidan"
            ? addVerbEnding(getVerbStem(verb, "i"), "られません")
            : addVerbEnding(getVerbStem(verb, "a"), "れません"),
      },
    ],
  ],
]);
