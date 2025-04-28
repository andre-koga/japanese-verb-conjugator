import { useGameStore } from "@/stores/gameStore";

export default function InstructionsDisplay() {
  const { currentVerb, tense, polarity, formality } = useGameStore();

  if (!currentVerb) return null;

  return (
    <div className="mb-6 rounded-lg border p-4">
      <h3 className="mb-2 text-lg font-semibold">Instructions</h3>
      <p className="text-gray-700 dark:text-gray-300">
        Conjugate {currentVerb.dictionaryForm} ({currentVerb.meaning}) to the{" "}
        {tense} tense, {polarity} form, in {formality} speech.
      </p>
    </div>
  );
}
