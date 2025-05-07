import type { ConjugationForm, ConjugationRule, JapaneseVerb } from "@/lib/types";
import { getVerbStem } from "@/lib/conjugation";

export const receivingRules: Map<ConjugationForm, ConjugationRule[]> = new Map([
  [{
    tense: "receiving",
    polarity: "affirmative",
    formality: "plain"
  }, [{
    transform: (verb: JapaneseVerb) => getVerbStem(verb, "te") + "もらう",
  }]],
  [{
    tense: "receiving",
    polarity: "affirmative",
    formality: "polite"
  }, [{
    transform: (verb: JapaneseVerb) => getVerbStem(verb, "te") + "いただきます",
  }]],
  [{
    tense: "receiving",
    polarity: "negative",
    formality: "plain"
  }, [{
    transform: (verb: JapaneseVerb) => getVerbStem(verb, "te") + "もらわない",
  }]],
  [{
    tense: "receiving",
    polarity: "negative",
    formality: "polite"
  }, [{
    transform: (verb: JapaneseVerb) => getVerbStem(verb, "te") + "いただきません",
  }]],
]);
