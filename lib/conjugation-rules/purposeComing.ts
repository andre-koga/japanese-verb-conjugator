import type { ConjugationForm, ConjugationRule, JapaneseVerb } from "@/lib/types";
import { getVerbStem } from "@/lib/conjugation";

export const purposeComingRules: Map<ConjugationForm, ConjugationRule[]> = new Map([
  [{
    tense: "purpose coming",
    polarity: "affirmative",
    formality: "plain"
  }, [{
    transform: (verb: JapaneseVerb) => getVerbStem(verb, "i") + "にくる",
  }]],
  [{
    tense: "purpose coming",
    polarity: "affirmative",
    formality: "polite"
  }, [{
    transform: (verb: JapaneseVerb) => getVerbStem(verb, "i") + "にきます",
  }]],
  [{
    tense: "purpose coming",
    polarity: "negative",
    formality: "plain"
  }, [{
    transform: (verb: JapaneseVerb) => getVerbStem(verb, "i") + "にこない",
  }]],
  [{
    tense: "purpose coming",
    polarity: "negative",
    formality: "polite"
  }, [{
    transform: (verb: JapaneseVerb) => getVerbStem(verb, "i") + "にきません",
  }]],
]);
