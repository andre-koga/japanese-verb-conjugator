// Combine all rules into a single Map
import { basicRules } from "@/lib/conjugation-rules/basic";
import { causativeRules } from "@/lib/conjugation-rules/causative";
import { conditionalRules } from "@/lib/conjugation-rules/conditional";
import { imperativeRules } from "@/lib/conjugation-rules/imperative";
import { passiveRules } from "@/lib/conjugation-rules/passive";
import { pastPresumptiveRules } from "@/lib/conjugation-rules/past-presumptive";
import { pastProgressiveRules } from "@/lib/conjugation-rules/past-progressive";
import { potentialRules } from "@/lib/conjugation-rules/potential";
import { progressiveRules } from "@/lib/conjugation-rules/progressive";
import { volitionalRules } from "@/lib/conjugation-rules/volitional";
import type { ConjugationRule } from "@/lib/types";
import { getFormKey } from "@/lib/types";

// Create a new Map to store all rules
export const allRules = new Map<string, ConjugationRule[]>();

// Add rules from each module to the Map
for (const [form, rules] of basicRules) {
  allRules.set(getFormKey(form), rules);
}
for (const [form, rules] of causativeRules) {
  allRules.set(getFormKey(form), rules);
}
for (const [form, rules] of conditionalRules) {
  allRules.set(getFormKey(form), rules);
}
for (const [form, rules] of imperativeRules) {
  allRules.set(getFormKey(form), rules);
}
for (const [form, rules] of passiveRules) {
  allRules.set(getFormKey(form), rules);
}
for (const [form, rules] of pastPresumptiveRules) {
  allRules.set(getFormKey(form), rules);
}
for (const [form, rules] of pastProgressiveRules) {
  allRules.set(getFormKey(form), rules);
}
for (const [form, rules] of potentialRules) {
  allRules.set(getFormKey(form), rules);
}
for (const [form, rules] of progressiveRules) {
  allRules.set(getFormKey(form), rules);
}
for (const [form, rules] of volitionalRules) {
  allRules.set(getFormKey(form), rules);
}
