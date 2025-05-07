import type { ConjugationForm, ConjugationRule, JapaneseVerb } from "@/lib/types";
import { getVerbStem } from "@/lib/conjugation";

export const potentialRules: Map<ConjugationForm, ConjugationRule[]> = new Map([
  [{
    tense: "potential",
    polarity: "affirmative",
    formality: "plain"
  }, [{
    transform: (verb: JapaneseVerb) =>
      verb.type === "ichidan"
        ? getVerbStem(verb, "i") + "られる"
        : getVerbStem(verb, "e") + "る",
  }]],
  [{
    tense: "potential",
    polarity: "affirmative",
    formality: "polite"
  }, [{
    transform: (verb: JapaneseVerb) =>
      verb.type === "ichidan"
        ? getVerbStem(verb, "i") + "られます"
        : getVerbStem(verb, "e") + "ます",
  }]],
  [{
    tense: "potential",
    polarity: "negative",
    formality: "plain"
  }, [{
    transform: (verb: JapaneseVerb) =>
      verb.type === "ichidan"
        ? getVerbStem(verb, "i") + "られない"
        : getVerbStem(verb, "e") + "ない",
  }]],
  [{
    tense: "potential",
    polarity: "negative",
    formality: "polite"
  }, [{
    transform: (verb: JapaneseVerb) =>
      verb.type === "ichidan"
        ? getVerbStem(verb, "i") + "られません"
        : getVerbStem(verb, "e") + "ません",
  }]],
]);
