import type { ConjugationForm, ConjugationRule, JapaneseVerb } from "@/lib/types";
import { getVerbStem } from "@/lib/conjugation";

export const imperativeRules: Map<ConjugationForm, ConjugationRule[]> = new Map([
  [{
    tense: "imperative",
    polarity: "affirmative",
    formality: "plain"
  }, [{
    transform: (verb: JapaneseVerb) =>
      verb.type === "ichidan"
        ? getVerbStem(verb, "i") + "ろ"
        : getVerbStem(verb, "e") + "ろ",
  }]],
  [{
    tense: "imperative",
    polarity: "affirmative",
    formality: "polite"
  }, [{
    transform: (verb: JapaneseVerb) => getVerbStem(verb, "te") + "ください",
  }]],
  [{
    tense: "imperative",
    polarity: "negative",
    formality: "plain"
  }, [{
    transform: (verb: JapaneseVerb) =>
      verb.type === "ichidan"
        ? getVerbStem(verb, "i") + "るな"
        : getVerbStem(verb, "a") + "な",
  }]],
  [{
    tense: "imperative",
    polarity: "negative",
    formality: "polite"
  }, [{
    transform: (verb: JapaneseVerb) => getVerbStem(verb, "a") + "ないでください",
  }]],
]);
