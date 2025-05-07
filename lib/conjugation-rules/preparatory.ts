import type {
  ConjugationForm,
  ConjugationRule,
  JapaneseVerb,
} from "@/lib/types";
import { addVerbEnding, getVerbStem } from "@/lib/conjugation";

export const preparatoryRules: Map<ConjugationForm, ConjugationRule[]> =
  new Map([
    [
      {
        tense: "preparatory",
        polarity: "affirmative",
        formality: "plain",
      },
      [
        {
          transform: (verb: JapaneseVerb) =>
            addVerbEnding(getVerbStem(verb, "te"), "おく"),
        },
      ],
    ],
    [
      {
        tense: "preparatory",
        polarity: "affirmative",
        formality: "polite",
      },
      [
        {
          transform: (verb: JapaneseVerb) =>
            addVerbEnding(getVerbStem(verb, "te"), "おきます"),
        },
      ],
    ],
    [
      {
        tense: "preparatory",
        polarity: "negative",
        formality: "plain",
      },
      [
        {
          transform: (verb: JapaneseVerb) =>
            addVerbEnding(getVerbStem(verb, "te"), "おかない"),
        },
      ],
    ],
    [
      {
        tense: "preparatory",
        polarity: "negative",
        formality: "polite",
      },
      [
        {
          transform: (verb: JapaneseVerb) =>
            addVerbEnding(getVerbStem(verb, "te"), "おきません"),
        },
      ],
    ],
  ]);
