import type { ConjugationForm, ConjugationRule, JapaneseVerb } from "@/lib/types";
import { getVerbStem } from "@/lib/conjugation";

export const simultaneousRules: Map<ConjugationForm, ConjugationRule[]> = new Map([
  [{
    tense: "simultaneous",
    polarity: "affirmative",
    formality: "plain"
  }, [{
    transform: (verb: JapaneseVerb) => getVerbStem(verb, "a") + "ながら",
  }]],
  [{
    tense: "simultaneous",
    polarity: "affirmative",
    formality: "polite"
  }, [{
    transform: (verb: JapaneseVerb) => getVerbStem(verb, "a") + "ながら",
  }]],
  [{
    tense: "simultaneous",
    polarity: "negative",
    formality: "plain"
  }, [{
    transform: (verb: JapaneseVerb) => getVerbStem(verb, "a") + "ないながら",
  }]],
  [{
    tense: "simultaneous",
    polarity: "negative",
    formality: "polite"
  }, [{
    transform: (verb: JapaneseVerb) => getVerbStem(verb, "a") + "ませんながら",
  }]],
]);
