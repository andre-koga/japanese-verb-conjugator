import type { ConjugationForm, ConjugationRule, JapaneseVerb } from "@/lib/types";
import { getVerbStem } from "@/lib/conjugation";

export const mustRules: Map<ConjugationForm, ConjugationRule[]> = new Map([
  [{
    tense: "must",
    polarity: "affirmative",
    formality: "plain"
  }, [{
    transform: (verb: JapaneseVerb) => getVerbStem(verb, "a") + "なければならない",
  }]],
  [{
    tense: "must",
    polarity: "affirmative",
    formality: "polite"
  }, [{
    transform: (verb: JapaneseVerb) => getVerbStem(verb, "a") + "なければなりません",
  }]],
  [{
    tense: "must",
    polarity: "negative",
    formality: "plain"
  }, [{
    transform: (verb: JapaneseVerb) => getVerbStem(verb, "a") + "なくてもいい",
  }]],
  [{
    tense: "must",
    polarity: "negative",
    formality: "polite"
  }, [{
    transform: (verb: JapaneseVerb) => getVerbStem(verb, "a") + "なくてもいいです",
  }]],
]);
