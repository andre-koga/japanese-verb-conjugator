import type {
  JapaneseVerb,
  JLPTLevel,
  GodanVowel,
  ConjugationForm,
} from "@/lib/types";
import { allRules } from "@/lib/conjugation-rules";
import { allVerbs } from "@/lib/jlpt-verbs";
import { useGameStore } from "@/stores/gameStore";
import { getFormKey } from "@/lib/types";
import { getKanaForVowel, getTeTaKana, type VowelChange } from "@/lib/kana-mappings";

export function getVerbStem(
  verb: JapaneseVerb,
  godanVowel?: GodanVowel,
  irregularStem?: (
    verb: JapaneseVerb,
    godanVowel?: GodanVowel,
  ) => [string, string],
): [string, string] {
  if (verb.type === "ichidan") {
    const stem: [string, string] = [verb.dictionary.slice(0, -1), verb.kana.slice(0, -1)]; // Remove the final 'る'
    if (godanVowel === "te") {
      return [stem[0] + "て", stem[1] + "て"];
    }
    return stem;
  } else if (verb.type === "godan") {
    const lastChar = verb.kana.slice(-1); // Get the last character
    const base = verb.dictionary.slice(0, -1); // Get the part before the last char
    const kanaBase = verb.kana.slice(0, -1);

    if (godanVowel === "te" || godanVowel === "ta") {
      const teTaKana = getTeTaKana(lastChar, godanVowel === "te");
      return [base + teTaKana, kanaBase + teTaKana];
    }

    const vowelChange = godanVowel as VowelChange;
    const newKana = getKanaForVowel(lastChar, vowelChange);
    return [base + newKana, kanaBase + newKana];
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
  if (verb.irregularForms) {
    const formKey = getFormKey(form);
    if (verb.irregularForms && verb.irregularForms[formKey]) {
      return verb.irregularForms[formKey];
    }
    console.log("No irregular form found for", verb.dictionary, formKey);
    return [verb.dictionary, verb.kana];
  }

  // Get the rules for this form
  const formKey = getFormKey(form);
  const rules = allRules.get(formKey);
  if (!rules) {
    console.log("No rules found for", verb.dictionary, formKey);
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
