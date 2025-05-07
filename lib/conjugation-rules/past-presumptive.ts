import type {
    ConjugationForm,
    ConjugationRule,
    JapaneseVerb,
} from "@/lib/types";
import { addVerbEnding, getVerbStem } from "@/lib/conjugation";

export const pastPresumptiveRules: Map<ConjugationForm, ConjugationRule[]> = new Map([
    [
        {
            tense: "past presumptive",
            polarity: "affirmative",
            formality: "plain",
        },
        [
            {
                transform: (verb: JapaneseVerb) =>
                    addVerbEnding(getVerbStem(verb, "ta"), "だろう"),
            },
        ],
    ],
    [
        {
            tense: "past presumptive",
            polarity: "affirmative",
            formality: "polite",
        },
        [
            {
                transform: (verb: JapaneseVerb) =>
                    addVerbEnding(getVerbStem(verb, "ta"), "でしょう"),
            },
        ],
    ],
    [
        {
            tense: "past presumptive",
            polarity: "negative",
            formality: "plain",
        },
        [
            {
                transform: (verb: JapaneseVerb) =>
                    addVerbEnding(getVerbStem(verb, "a"), "なかっただろう"),
            },
        ],
    ],
    [
        {
            tense: "past presumptive",
            polarity: "negative",
            formality: "polite",
        },
        [
            {
                transform: (verb: JapaneseVerb) =>
                    addVerbEnding(getVerbStem(verb, "a"), "なかったでしょう"),
            },
        ],
    ],
]); 