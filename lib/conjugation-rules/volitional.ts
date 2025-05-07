import type { ConjugationForm, ConjugationRule, JapaneseVerb } from "@/lib/types";
import { getVerbStem } from "@/lib/conjugation";

export const volitionalRules: Map<ConjugationForm, ConjugationRule[]> = new Map([
  [{
    tense: "volitional",
    polarity: "affirmative",
    formality: "plain"
  }, [{
    transform: (verb: JapaneseVerb) =>
      verb.type === "ichidan"
        ? getVerbStem(verb, "i") + "よう"
        : getVerbStem(verb, "o") + "う",
  }]],
  [{
    tense: "volitional",
    polarity: "affirmative",
    formality: "polite"
  }, [{
    transform: (verb: JapaneseVerb) => getVerbStem(verb, "i") + "ましょう",
  }]],
  [{
    tense: "volitional",
    polarity: "negative",
    formality: "plain"
  }, [{
    transform: (verb: JapaneseVerb) => getVerbStem(verb, "a") + "ないで",
  }]],
  [{
    tense: "volitional",
    polarity: "negative",
    formality: "polite"
  }, [{
    transform: (verb: JapaneseVerb) => getVerbStem(verb, "a") + "ないでください",
  }]],
]);
