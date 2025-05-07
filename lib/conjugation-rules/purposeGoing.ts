import type { ConjugationForm, ConjugationRule, JapaneseVerb } from "@/lib/types";
import { getVerbStem } from "@/lib/conjugation";

export const purposeGoingRules: Map<ConjugationForm, ConjugationRule[]> = new Map([
  [{
    tense: "purpose going",
    polarity: "affirmative",
    formality: "plain"
  }, [{
    transform: (verb: JapaneseVerb) => getVerbStem(verb, "i") + "にいく",
  }]],
  [{
    tense: "purpose going",
    polarity: "affirmative",
    formality: "polite"
  }, [{
    transform: (verb: JapaneseVerb) => getVerbStem(verb, "i") + "にいきます",
  }]],
  [{
    tense: "purpose going",
    polarity: "negative",
    formality: "plain"
  }, [{
    transform: (verb: JapaneseVerb) => getVerbStem(verb, "i") + "にいかない",
  }]],
  [{
    tense: "purpose going",
    polarity: "negative",
    formality: "polite"
  }, [{
    transform: (verb: JapaneseVerb) => getVerbStem(verb, "i") + "にいきません",
  }]],
]);
