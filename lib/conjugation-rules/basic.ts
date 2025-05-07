import type {
  ConjugationForm,
  ConjugationRule,
  JapaneseVerb,
} from "@/lib/types";
import { addVerbEnding, getVerbStem } from "@/lib/conjugation";

export const basicRules: Map<ConjugationForm, ConjugationRule[]> = new Map([
  [
    {
      tense: "present indicative",
      polarity: "affirmative",
      formality: "plain",
    },
    [
      {
        transform: (verb: JapaneseVerb) => [verb.dictionary, verb.kana],
      },
    ],
  ],
  [
    {
      tense: "present indicative",
      polarity: "affirmative",
      formality: "polite",
    },
    [
      {
        transform: (verb: JapaneseVerb) =>
          addVerbEnding(getVerbStem(verb, "i"), "ます"),
      },
    ],
  ],
  [
    {
      tense: "present indicative",
      polarity: "negative",
      formality: "plain",
    },
    [
      {
        transform: (verb: JapaneseVerb) =>
          addVerbEnding(getVerbStem(verb, "a"), "ない"),
      },
    ],
  ],
  [
    {
      tense: "present indicative",
      polarity: "negative",
      formality: "polite",
    },
    [
      {
        transform: (verb: JapaneseVerb) =>
          addVerbEnding(getVerbStem(verb, "i"), "ません"),
      },
    ],
  ],

  // PAST TENSE
  [
    {
      tense: "past indicative",
      polarity: "affirmative",
      formality: "plain",
    },
    [
      {
        transform: (verb: JapaneseVerb) =>
          addVerbEnding(getVerbStem(verb, "ta"), "ました"),
      },
    ],
  ],
  [
    {
      tense: "past indicative",
      polarity: "affirmative",
      formality: "polite",
    },
    [
      {
        transform: (verb: JapaneseVerb) =>
          addVerbEnding(getVerbStem(verb, "i"), "ました"),
      },
    ],
  ],
  [
    {
      tense: "past indicative",
      polarity: "negative",
      formality: "plain",
    },
    [
      {
        transform: (verb: JapaneseVerb) =>
          addVerbEnding(getVerbStem(verb, "a"), "なかった"),
      },
    ],
  ],
  [
    {
      tense: "past indicative",
      polarity: "negative",
      formality: "polite",
    },
    [
      {
        transform: (verb: JapaneseVerb) =>
          addVerbEnding(getVerbStem(verb, "i"), "ませんでした"),
      },
    ],
  ],

  // TE FORM
  [
    {
      tense: "te form",
      polarity: "affirmative",
      formality: "plain",
    },
    [
      {
        transform: (verb: JapaneseVerb) =>
          addVerbEnding(getVerbStem(verb, "te"), "て"),
      },
    ],
  ],
  [
    {
      tense: "te form",
      polarity: "negative",
      formality: "plain",
    },
    [
      {
        transform: (verb: JapaneseVerb) =>
          addVerbEnding(getVerbStem(verb, "a"), "なくて"),
      },
    ],
  ],
]);
