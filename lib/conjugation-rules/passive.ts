import type { ConjugationForm, ConjugationRule, JapaneseVerb } from "@/lib/types";
import { getVerbStem } from "@/lib/conjugation";

export const passiveRules: Map<ConjugationForm, ConjugationRule[]> = new Map([
  [{
    tense: "passive",
    polarity: "affirmative",
    formality: "plain"
  }, [{
    transform: (verb: JapaneseVerb) =>
      verb.type === "ichidan"
        ? getVerbStem(verb, "i") + "られる"
        : getVerbStem(verb, "a") + "れる",
  }]],
  [{
    tense: "passive",
    polarity: "affirmative",
    formality: "polite"
  }, [{
    transform: (verb: JapaneseVerb) =>
      verb.type === "ichidan"
        ? getVerbStem(verb, "i") + "られます"
        : getVerbStem(verb, "a") + "れます",
  }]],
  [{
    tense: "passive",
    polarity: "negative",
    formality: "plain"
  }, [{
    transform: (verb: JapaneseVerb) =>
      verb.type === "ichidan"
        ? getVerbStem(verb, "i") + "られない"
        : getVerbStem(verb, "a") + "れない",
  }]],
  [{
    tense: "passive",
    polarity: "negative",
    formality: "polite"
  }, [{
    transform: (verb: JapaneseVerb) =>
      verb.type === "ichidan"
        ? getVerbStem(verb, "i") + "られません"
        : getVerbStem(verb, "a") + "れません",
  }]],
]);
