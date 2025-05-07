import type { ConjugationForm, ConjugationRule, JapaneseVerb } from "@/lib/types";
import { getVerbStem } from "@/lib/conjugation";

export const causativeRules: Map<ConjugationForm, ConjugationRule[]> = new Map([
  [{
    tense: "causative",
    polarity: "affirmative",
    formality: "plain"
  }, [{
    transform: (verb: JapaneseVerb) => {
      const stem = getVerbStem(verb, "a");
      return verb.type === "ichidan" ? stem + "させる" : stem + "せる";
    },
  }]],
  [{
    tense: "causative",
    polarity: "affirmative",
    formality: "polite"
  }, [{
    transform: (verb: JapaneseVerb) => {
      const stem = getVerbStem(verb, "a");
      return verb.type === "ichidan" ? stem + "させます" : stem + "せます";
    },
  }]],
  [{
    tense: "causative",
    polarity: "negative",
    formality: "plain"
  }, [{
    transform: (verb: JapaneseVerb) => {
      const stem = getVerbStem(verb, "a");
      return verb.type === "ichidan" ? stem + "させない" : stem + "せない";
    },
  }]],
  [{
    tense: "causative",
    polarity: "negative",
    formality: "polite"
  }, [{
    transform: (verb: JapaneseVerb) => {
      const stem = getVerbStem(verb, "a");
      return verb.type === "ichidan" ? stem + "させません" : stem + "せません";
    },
  }]],
]);
