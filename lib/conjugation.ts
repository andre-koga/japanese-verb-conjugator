import type {
  JapaneseVerb,
  JLPTLevel,
  GodanVowel,
  ConjugationForm,
} from "@/lib/types";
import { allRules } from "@/lib/conjugation-rules";
import { allVerbs } from "@/lib/jlpt-verbs";
import { useGameStore } from "@/stores/gameStore";

export function getVerbStem(
  verb: JapaneseVerb,
  godanVowel?: GodanVowel,
  irregularStem?: (
    verb: JapaneseVerb,
    godanVowel?: GodanVowel,
  ) => [string, string],
): [string, string] {
  if (verb.type === "ichidan") {
    return [verb.dictionary.slice(0, -1), verb.kana.slice(0, -1)]; // Remove the final 'る'
  } else if (verb.type === "godan") {
    const lastChar = verb.dictionary.slice(-1); // Get the last character

    const base = verb.dictionary.slice(0, -1); // Get the part before the last char
    const kanaBase = verb.kana.slice(0, -1);

    switch (godanVowel) {
      case "a":
        if (lastChar === "う") return [base + "わ", kanaBase + "わ"];
        if (lastChar === "つ") return [base + "た", kanaBase + "た"];
        return [
          base + lastChar.replace(/u$/, "あ"),
          kanaBase + lastChar.replace(/u$/, "あ"),
        ];
      case "i":
        return [
          base + lastChar.replace(/u$/, "い"),
          kanaBase + lastChar.replace(/u$/, "い"),
        ];
      case "u":
        return [verb.dictionary, verb.kana]; // Dictionary form is the 'u' stem
      case "e":
        return [
          base + lastChar.replace(/u$/, "え"),
          kanaBase + lastChar.replace(/u$/, "え"),
        ];
      case "o":
        return [
          base + lastChar.replace(/u$/, "お"),
          kanaBase + lastChar.replace(/u$/, "お"),
        ];
      case "te":
      case "ta":
        //te and ta are special cases, handled together
        if (lastChar === "う" || lastChar === "つ" || lastChar === "る") {
          return [
            base + (godanVowel === "te" ? "って" : "った"),
            kanaBase + (godanVowel === "te" ? "って" : "った"),
          ];
        }
        if (lastChar === "ぬ" || lastChar === "ぶ" || lastChar === "む") {
          return [
            base + (godanVowel === "te" ? "んで" : "んだ"),
            kanaBase + (godanVowel === "te" ? "んで" : "んだ"),
          ];
        }
        if (lastChar === "く") {
          return [
            base + (godanVowel === "te" ? "いて" : "いた"),
            kanaBase + (godanVowel === "te" ? "いて" : "いた"),
          ];
        }
        if (lastChar === "ぐ") {
          return [
            base + (godanVowel === "te" ? "いで" : "いだ"),
            kanaBase + (godanVowel === "te" ? "いで" : "いだ"),
          ];
        }
        if (lastChar === "す") {
          return [
            base + (godanVowel === "te" ? "して" : "した"),
            kanaBase + (godanVowel === "te" ? "して" : "した"),
          ];
        }
        return [verb.dictionary, verb.kana]; //Should not reach here
      default:
        return [verb.dictionary, verb.kana]; //handles the 'u' case, and also the default
    }
  } else if (verb.type === "irregular" && irregularStem) {
    return irregularStem(verb, godanVowel);
  }

  return [verb.dictionary, verb.kana]; // Default fallback
}

export function addVerbEnding(
  verbStems: [string, string],
  ending: string,
): [string, string] {
  return [verbStems[0] + ending, verbStems[1] + ending];
}

export function checkAnswer(expected: string, actual: string): boolean {
  // Normalize both strings for comparison
  const normalizedExpected = expected.trim().replace(/\s+/g, "");
  const normalizedActual = actual.trim().replace(/\s+/g, "");

  // Exact match
  return normalizedExpected === normalizedActual;
}

export function conjugate(
  verb: JapaneseVerb,
  form: ConjugationForm,
): [string, string] {
  // Handle irregular verbs with pre-defined forms
  if (verb.type === "irregular") {
    if (verb.irregularForms && verb.irregularForms.has(form)) {
      return verb.irregularForms.get(form)!;
    }
    console.log("No irregular form found for", verb.dictionary, form);
    return [verb.dictionary, verb.kana];
  }

  // Get the rules for this form
  const rules = allRules.get(form);
  if (!rules) {
    console.log("No rules found for", verb.dictionary, form);
    return [verb.dictionary, verb.kana]; // Default to dictionary form if no rules found
  }

  // Apply the first rule
  return rules[0].transform(verb);
}

export function findVerb(dictionary: string): JapaneseVerb | undefined {
  // Get the currently selected levels from the store
  const selectedLevels = useGameStore.getState().enabledJLPTLevels;

  // Search through all selected levels
  for (const level of selectedLevels) {
    const verb = allVerbs[level as keyof typeof allVerbs].find(
      (v: JapaneseVerb) => v.dictionary === dictionary,
    );
    if (verb) return verb;
  }
  return undefined;
}

export function getVerbsForLevel(level: JLPTLevel): JapaneseVerb[] {
  return allVerbs[level];
}

export function getAllVerbs(): JapaneseVerb[] {
  const allSelectedVerbs: JapaneseVerb[] = [];
  const selectedLevels = useGameStore.getState().enabledJLPTLevels;
  for (const level of selectedLevels) {
    allSelectedVerbs.push(...allVerbs[level as keyof typeof allVerbs]);
  }
  return allSelectedVerbs;
}
