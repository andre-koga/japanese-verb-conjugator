import type { ConjugationForm, ConjugationRule, JapaneseVerb } from "@/lib/types";
import { getVerbStem } from "@/lib/conjugation";

export const preparatoryRules: Map<ConjugationForm, ConjugationRule[]> = new Map([
  [{
    tense: "preparatory",
    polarity: "affirmative",
    formality: "plain"
  }, [{
    transform: (verb: JapaneseVerb) => getVerbStem(verb, "te") + "おく",
  }]],
  [{
    tense: "preparatory",
    polarity: "affirmative",
    formality: "polite"
  }, [{
    transform: (verb: JapaneseVerb) => getVerbStem(verb, "te") + "おきます",
  }]],
  [{
    tense: "preparatory",
    polarity: "negative",
    formality: "plain"
  }, [{
    transform: (verb: JapaneseVerb) => getVerbStem(verb, "te") + "おかない",
  }]],
  [{
    tense: "preparatory",
    polarity: "negative",
    formality: "polite"
  }, [{
    transform: (verb: JapaneseVerb) => getVerbStem(verb, "te") + "おきません",
  }]],
]);
