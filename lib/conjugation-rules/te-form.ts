import type { ConjugationForm, ConjugationRule, JapaneseVerb } from "@/lib/types";
import { getVerbStem } from "@/lib/conjugation";

export const teFormRules: Map<ConjugationForm, ConjugationRule[]> = new Map([
    [
        {
            tense: "te form",
            polarity: "affirmative",
            formality: "plain",
        },
        [
            {
                transform: (verb: JapaneseVerb) => {
                    const [kanji, kana] = getVerbStem(verb, "te");
                    return [kanji, kana];
                },
            },
        ],
    ],
]); 