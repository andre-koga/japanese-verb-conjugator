import type { ConjugationForm, ConjugationRule, JapaneseVerb } from "@/lib/types";
import { getVerbStem } from "@/lib/conjugation";

export const basicRules: Map<ConjugationForm, ConjugationRule[]> = new Map([
  [{
    tense: "present",
    polarity: "affirmative",
    formality: "plain"
  }, [{
    transform: (verb: JapaneseVerb) => verb.dictionary,
  }]],
  [{
    tense: "present",
    polarity: "affirmative",
    formality: "polite"
  }, [{
    transform: (verb: JapaneseVerb) => getVerbStem(verb, "i") + "ます",
  }]],
  [{
    tense: "present",
    polarity: "negative",
    formality: "plain"
  }, [{
    transform: (verb: JapaneseVerb) => getVerbStem(verb, "a") + "ない",
  }]],
  [{
    tense: "present",
    polarity: "negative",
    formality: "polite"
  }, [{
    transform: (verb: JapaneseVerb) => getVerbStem(verb, "i") + "ません",
  }]],

  // PAST TENSE
  [{
    tense: "past",
    polarity: "affirmative",
    formality: "plain"
  }, [{
    transform: (verb: JapaneseVerb) => getVerbStem(verb, "ta"),
  }]],
  [{
    tense: "past",
    polarity: "affirmative",
    formality: "polite"
  }, [{
    transform: (verb: JapaneseVerb) => getVerbStem(verb, "i") + "ました",
  }]],
  [{
    tense: "past",
    polarity: "negative",
    formality: "plain"
  }, [{
    transform: (verb: JapaneseVerb) => getVerbStem(verb, "a") + "なかった",
  }]],
  [{
    tense: "past",
    polarity: "negative",
    formality: "polite"
  }, [{
    transform: (verb: JapaneseVerb) => getVerbStem(verb, "i") + "ませんでした",
  }]],

  // TE FORM
  [{
    tense: "te form",
    polarity: "affirmative",
    formality: "plain"
  }, [{
    transform: (verb: JapaneseVerb) => getVerbStem(verb, "te"),
  }]],
  [{
    tense: "te form",
    polarity: "negative",
    formality: "plain"
  }, [{
    transform: (verb: JapaneseVerb) => getVerbStem(verb, "a") + "なくて",
  }]],
]);
