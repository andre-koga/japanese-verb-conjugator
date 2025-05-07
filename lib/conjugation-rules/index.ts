// Combine all rules into a single Map
import { basicRules } from "@/lib/conjugation-rules/basic";
import { shouldRules } from "@/lib/conjugation-rules/should";
import { mustRules } from "@/lib/conjugation-rules/must";
import { attemptiveRules } from "@/lib/conjugation-rules/attemptive";
import { preparatoryRules } from "@/lib/conjugation-rules/preparatory";
import { regrettableRules } from "@/lib/conjugation-rules/regrettable";
import { givingRules } from "@/lib/conjugation-rules/giving";
import { receivingRules } from "@/lib/conjugation-rules/receiving";
import { simultaneousRules } from "@/lib/conjugation-rules/simultaneous";
import { purposeGoingRules } from "@/lib/conjugation-rules/purposeGoing";
import { purposeComingRules } from "@/lib/conjugation-rules/purposeComing";
import { causativeRules } from "@/lib/conjugation-rules/causative";
import { conditionalRules } from "@/lib/conjugation-rules/conditional";
import { desireRules } from "@/lib/conjugation-rules/desire";
import { imperativeRules } from "@/lib/conjugation-rules/imperative";
import { passiveRules } from "@/lib/conjugation-rules/passive";
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
for (const [form, rules] of shouldRules) {
  allRules.set(getFormKey(form), rules);
}
for (const [form, rules] of mustRules) {
  allRules.set(getFormKey(form), rules);
}
for (const [form, rules] of attemptiveRules) {
  allRules.set(getFormKey(form), rules);
}
for (const [form, rules] of preparatoryRules) {
  allRules.set(getFormKey(form), rules);
}
for (const [form, rules] of regrettableRules) {
  allRules.set(getFormKey(form), rules);
}
for (const [form, rules] of givingRules) {
  allRules.set(getFormKey(form), rules);
}
for (const [form, rules] of receivingRules) {
  allRules.set(getFormKey(form), rules);
}
for (const [form, rules] of simultaneousRules) {
  allRules.set(getFormKey(form), rules);
}
for (const [form, rules] of purposeGoingRules) {
  allRules.set(getFormKey(form), rules);
}
for (const [form, rules] of purposeComingRules) {
  allRules.set(getFormKey(form), rules);
}
for (const [form, rules] of causativeRules) {
  allRules.set(getFormKey(form), rules);
}
for (const [form, rules] of conditionalRules) {
  allRules.set(getFormKey(form), rules);
}
for (const [form, rules] of desireRules) {
  allRules.set(getFormKey(form), rules);
}
for (const [form, rules] of imperativeRules) {
  allRules.set(getFormKey(form), rules);
}
for (const [form, rules] of passiveRules) {
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
