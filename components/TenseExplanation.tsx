import { useGameStore } from "@/stores/gameStore";

export default function TenseExplanation() {
  const { tense, polarity, formality, showAnswer } = useGameStore();

  if (!showAnswer) return null;

  return (
    <div className="mb-6 rounded-lg border p-4">
      <h3 className="mb-2 text-lg font-semibold">Conjugation Rules</h3>
      <div className="space-y-2">
        <p>
          <span className="font-medium">Tense:</span> {tense}
        </p>
        <p>
          <span className="font-medium">Polarity:</span> {polarity}
        </p>
        <p>
          <span className="font-medium">Formality:</span> {formality}
        </p>
        {/* Add specific conjugation rules here based on the selected options */}
      </div>
    </div>
  );
}
