import type {
  ConjugationForm,
  ConjugationRule,
  JapaneseVerb,
} from "@/lib/types";
import { addVerbEnding, getVerbStem } from "@/lib/conjugation";

export const purposeGoingRules: Map<ConjugationForm, ConjugationRule[]> =
  new Map([
    [
      {
        tense: "purpose going",
        polarity: "affirmative",
        formality: "plain",
      },
      [
        {
          transform: (verb: JapaneseVerb) =>
            addVerbEnding(getVerbStem(verb, "i"), "にいく"),
        },
      ],
    ],
    [
      {
        tense: "purpose going",
        polarity: "affirmative",
        formality: "polite",
      },
      [
        {
          transform: (verb: JapaneseVerb) =>
            addVerbEnding(getVerbStem(verb, "i"), "にいきます"),
        },
      ],
    ],
    [
      {
        tense: "purpose going",
        polarity: "negative",
        formality: "plain",
      },
      [
        {
          transform: (verb: JapaneseVerb) =>
            addVerbEnding(getVerbStem(verb, "i"), "にいかない"),
        },
      ],
    ],
    [
      {
        tense: "purpose going",
        polarity: "negative",
        formality: "polite",
      },
      [
        {
          transform: (verb: JapaneseVerb) =>
            addVerbEnding(getVerbStem(verb, "i"), "にいきません"),
        },
      ],
    ],
  ]);
