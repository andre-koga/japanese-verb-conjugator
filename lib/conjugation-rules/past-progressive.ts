import type {
    ConjugationForm,
    ConjugationRule,
    JapaneseVerb,
} from "@/lib/types";
import { addVerbEnding, getVerbStem } from "@/lib/conjugation";

export const pastProgressiveRules: Map<ConjugationForm, ConjugationRule[]> = new Map([
    [
        {
            tense: "past progressive",
            polarity: "affirmative",
            formality: "plain",
        },
        [
            {
                transform: (verb: JapaneseVerb) =>
                    addVerbEnding(getVerbStem(verb, "te"), "いた"),
            },
        ],
    ],
    [
        {
            tense: "past progressive",
            polarity: "affirmative",
            formality: "polite",
        },
        [
            {
                transform: (verb: JapaneseVerb) =>
                    addVerbEnding(getVerbStem(verb, "te"), "いました"),
            },
        ],
    ],
    [
        {
            tense: "past progressive",
            polarity: "negative",
            formality: "plain",
        },
        [
            {
                transform: (verb: JapaneseVerb) =>
                    addVerbEnding(getVerbStem(verb, "te"), "いなかった"),
            },
        ],
    ],
    [
        {
            tense: "past progressive",
            polarity: "negative",
            formality: "polite",
        },
        [
            {
                transform: (verb: JapaneseVerb) =>
                    addVerbEnding(getVerbStem(verb, "te"), "いませんでした"),
            },
        ],
    ],
]); 