import type { ConjugationForm, ConjugationRule, JapaneseVerb } from "@/lib/types";
import { getVerbStem } from "@/lib/conjugation";

export const givingRules: Map<ConjugationForm, ConjugationRule[]> = new Map([
  [{
    tense: "giving",
    polarity: "affirmative",
    formality: "plain"
  }, [{
    transform: (verb: JapaneseVerb) => getVerbStem(verb, "te") + "あげる",
  }]],
  [{
    tense: "giving",
    polarity: "affirmative",
    formality: "polite"
  }, [{
    transform: (verb: JapaneseVerb) => getVerbStem(verb, "te") + "あげます",
  }]],
  [{
    tense: "giving",
    polarity: "negative",
    formality: "plain"
  }, [{
    transform: (verb: JapaneseVerb) => getVerbStem(verb, "te") + "あげない",
  }]],
  [{
    tense: "giving",
    polarity: "negative",
    formality: "polite"
  }, [{
    transform: (verb: JapaneseVerb) => getVerbStem(verb, "te") + "あげません",
  }]],
]);
