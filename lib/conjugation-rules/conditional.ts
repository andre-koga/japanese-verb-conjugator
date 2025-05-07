import type { ConjugationForm, ConjugationRule, JapaneseVerb } from "@/lib/types";
import { getVerbStem } from "@/lib/conjugation";

export const conditionalRules: Map<ConjugationForm, ConjugationRule[]> = new Map([
  // BA FORM
  [{
    tense: "conditional ba",
    polarity: "affirmative",
    formality: "plain"
  }, [{
    transform: (verb: JapaneseVerb) => {
      if (verb.type === "irregular") {
        if (verb.dictionary === "する") return "すれば";
        if (verb.dictionary === "くる") return "くれば";
        return verb.dictionary;
      }
      return getVerbStem(verb, "e") + "れば";
    },
  }]],
  [{
    tense: "conditional ba",
    polarity: "affirmative",
    formality: "polite"
  }, [{
    transform: (verb: JapaneseVerb) => {
      if (verb.type === "irregular") {
        if (verb.dictionary === "する") return "すれば";
        if (verb.dictionary === "くる") return "くれば";
        return verb.dictionary;
      }
      return getVerbStem(verb, "e") + "れば";
    },
  }]],
  [{
    tense: "conditional ba",
    polarity: "negative",
    formality: "plain"
  }, [{
    transform: (verb: JapaneseVerb) => {
      if (verb.type === "irregular") {
        if (verb.dictionary === "する") return "しなければ";
        if (verb.dictionary === "くる") return "こなければ";
        return verb.dictionary;
      }
      return getVerbStem(verb, "a") + "なければ";
    },
  }]],
  [{
    tense: "conditional ba",
    polarity: "negative",
    formality: "polite"
  }, [{
    transform: (verb: JapaneseVerb) => {
      if (verb.type === "irregular") {
        if (verb.dictionary === "する") return "しなければ";
        if (verb.dictionary === "くる") return "こなければ";
        return verb.dictionary;
      }
      return getVerbStem(verb, "a") + "なければ";
    },
  }]],

  // TARA FORM
  [{
    tense: "conditional tara",
    polarity: "affirmative",
    formality: "plain"
  }, [{
    transform: (verb: JapaneseVerb) => {
      if (verb.type === "irregular") {
        if (verb.dictionary === "する") return "したら";
        if (verb.dictionary === "くる") return "きたら";
        return verb.dictionary;
      }
      const teForm = getVerbStem(verb, "te");
      return teForm.replace("て", "たら").replace("で", "だら");
    },
  }]],
  [{
    tense: "conditional tara",
    polarity: "affirmative",
    formality: "polite"
  }, [{
    transform: (verb: JapaneseVerb) => {
      if (verb.type === "irregular") {
        if (verb.dictionary === "する") return "したら";
        if (verb.dictionary === "くる") return "きたら";
        return verb.dictionary;
      }
      const teForm = getVerbStem(verb, "te");
      return teForm.replace("て", "たら").replace("で", "だら");
    },
  }]],
  [{
    tense: "conditional tara",
    polarity: "negative",
    formality: "plain"
  }, [{
    transform: (verb: JapaneseVerb) => {
      if (verb.type === "irregular") {
        if (verb.dictionary === "する") return "しなかったら";
        if (verb.dictionary === "くる") return "こなかったら";
        return verb.dictionary;
      }
      return getVerbStem(verb, "a") + "なかったら";
    },
  }]],
  [{
    tense: "conditional tara",
    polarity: "negative",
    formality: "polite"
  }, [{
    transform: (verb: JapaneseVerb) => {
      if (verb.type === "irregular") {
        if (verb.dictionary === "する") return "しなかったら";
        if (verb.dictionary === "くる") return "こなかったら";
        return verb.dictionary;
      }
      return getVerbStem(verb, "a") + "なかったら";
    },
  }]],
]);
