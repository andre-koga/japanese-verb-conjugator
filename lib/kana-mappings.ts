// Kana mappings for verb conjugation
export const kanaMappings = {
    // Godan verb endings and their vowel changes
    godan: {
        // う-row
        "う": { a: "わ", i: "い", u: "う", e: "え", o: "お" },
        "く": { a: "か", i: "き", u: "く", e: "け", o: "こ" },
        "ぐ": { a: "が", i: "ぎ", u: "ぐ", e: "げ", o: "ご" },
        "す": { a: "さ", i: "し", u: "す", e: "せ", o: "そ" },
        "つ": { a: "た", i: "ち", u: "つ", e: "て", o: "と" },
        "ぬ": { a: "な", i: "に", u: "ぬ", e: "ね", o: "の" },
        "ぶ": { a: "ば", i: "び", u: "ぶ", e: "べ", o: "ぼ" },
        "む": { a: "ま", i: "み", u: "む", e: "め", o: "も" },
        "る": { a: "ら", i: "り", u: "る", e: "れ", o: "ろ" },
    },
    // Special cases for te/ta form
    te: {
        "う": "って",
        "つ": "って",
        "る": "って",
        "ぬ": "んで",
        "ぶ": "んで",
        "む": "んで",
        "く": "いて",
        "ぐ": "いで",
        "す": "して",
    },
    ta: {
        "う": "った",
        "つ": "った",
        "る": "った",
        "ぬ": "んだ",
        "ぶ": "んだ",
        "む": "んだ",
        "く": "いた",
        "ぐ": "いだ",
        "す": "した",
    },
} as const;

// Type for the vowel changes
export type VowelChange = "a" | "i" | "u" | "e" | "o";

// Helper function to get the kana for a given ending and vowel
export function getKanaForVowel(ending: string, vowel: VowelChange): string {
    return kanaMappings.godan[ending as keyof typeof kanaMappings.godan]?.[vowel] || ending;
}

// Helper function to get the te/ta form kana
export function getTeTaKana(ending: string, isTe: boolean): string {
    const mapping = isTe ? kanaMappings.te : kanaMappings.ta;
    return mapping[ending as keyof typeof mapping] || ending;
} 