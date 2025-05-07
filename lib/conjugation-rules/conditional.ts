import type {
  ConjugationForm,
  ConjugationRule,
  JapaneseVerb,
} from "@/lib/types";
import { addVerbEnding, getVerbStem } from "@/lib/conjugation";

export const conditionalRules: Map<ConjugationForm, ConjugationRule[]> =
  new Map([
    // BA FORM
    [
      {
        tense: "conditional ba",
        polarity: "affirmative",
        formality: "plain",
      },
      [
        {
          transform: (verb: JapaneseVerb) =>
            addVerbEnding(getVerbStem(verb, "e"), "れば"),
        },
      ],
    ],
    [
      {
        tense: "conditional ba",
        polarity: "affirmative",
        formality: "polite",
      },
      [
        {
          transform: (verb: JapaneseVerb) =>
            addVerbEnding(getVerbStem(verb, "e"), "れば"),
        },
      ],
    ],
    [
      {
        tense: "conditional ba",
        polarity: "negative",
        formality: "plain",
      },
      [
        {
          transform: (verb: JapaneseVerb) =>
            addVerbEnding(getVerbStem(verb, "a"), "なければ"),
        },
      ],
    ],
    [
      {
        tense: "conditional ba",
        polarity: "negative",
        formality: "polite",
      },
      [
        {
          transform: (verb: JapaneseVerb) =>
            addVerbEnding(getVerbStem(verb, "a"), "なければ"),
        },
      ],
    ],

    // TARA FORM
    [
      {
        tense: "conditional tara",
        polarity: "affirmative",
        formality: "plain",
      },
      [
        {
          transform: (verb: JapaneseVerb) => {
            const stems = getVerbStem(verb, "te");
            const dictionaryStem = stems[0].slice(0, -1);
            const kanaStem = stems[1].slice(0, -1);
            return addVerbEnding([dictionaryStem, kanaStem], "たら");
          },
        },
      ],
    ],
    [
      {
        tense: "conditional tara",
        polarity: "affirmative",
        formality: "polite",
      },
      [
        {
          transform: (verb: JapaneseVerb) => {
            const stems = getVerbStem(verb, "te");
            const dictionaryStem = stems[0].slice(0, -1);
            const kanaStem = stems[1].slice(0, -1);
            return addVerbEnding([dictionaryStem, kanaStem], "たら");
          },
        },
      ],
    ],
    [
      {
        tense: "conditional tara",
        polarity: "negative",
        formality: "plain",
      },
      [
        {
          transform: (verb: JapaneseVerb) =>
            addVerbEnding(getVerbStem(verb, "a"), "なかったら"),
        },
      ],
    ],
    [
      {
        tense: "conditional tara",
        polarity: "negative",
        formality: "polite",
      },
      [
        {
          transform: (verb: JapaneseVerb) =>
            addVerbEnding(getVerbStem(verb, "a"), "なかったら"),
        },
      ],
    ],
  ]);
