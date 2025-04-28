import { useGameStore } from "@/stores/gameStore";

export default function VerbCard() {
  const { currentVerb } = useGameStore();

  if (!currentVerb) return null;

  return (
    <div className="mb-6 rounded-lg border p-4">
      <h3 className="mb-2 text-lg font-semibold">Current Verb</h3>
      <div className="space-y-2">
        <p>
          <span className="font-medium">Dictionary Form:</span>{" "}
          {currentVerb.dictionaryForm}
        </p>
        <p>
          <span className="font-medium">Meaning:</span> {currentVerb.meaning}
        </p>
        <p>
          <span className="font-medium">Type:</span> {currentVerb.type}
        </p>
      </div>
    </div>
  );
}
