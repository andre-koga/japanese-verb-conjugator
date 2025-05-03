export * from "./list-n5";
export * from "./list-n4";
export * from "./list-n3";
export * from "./list-n2";
export * from "./list-n1";

import { N5Verbs } from "./list-n5";
import { N4Verbs } from "./list-n4";
import { N3Verbs } from "./list-n3";
import { N2Verbs } from "./list-n2";
import { N1Verbs } from "./list-n1";
import type { JapaneseVerb } from "@/lib/types";

// Sort helper function to ensure all verb lists are alphabetically sorted by dictionary form
function sortVerbs(verbs: JapaneseVerb[]) {
  return [...verbs].sort((a, b) => a.dictionary.localeCompare(b.dictionary));
}

// Export consistently sorted verb lists
export const allVerbs = {
  N5: sortVerbs(N5Verbs),
  N4: sortVerbs(N4Verbs),
  N3: sortVerbs(N3Verbs),
  N2: sortVerbs(N2Verbs),
  N1: sortVerbs(N1Verbs),
};
