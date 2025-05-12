import { useGameStore } from "@/stores/gameStore";
import {
  tenseOptions,
  polarityOptions,
  formalityOptions,
} from "@/lib/verbOptions";

export default function ConjugationExplanation() {
  const { tense, polarity, formality } = useGameStore();

  const tenseOption = tenseOptions.find((t) => t.id === tense);
  const polarityOption = polarityOptions.find((p) => p.id === polarity);
  const formalityOption = formalityOptions.find((f) => f.id === formality);

  return (
    <div className="space-y-4">
      <div className="rounded-lg border p-4">
        <h3 className="mb-2 text-lg font-semibold">Tense</h3>
        <p className="text-muted-foreground">{tenseOption?.longDescription}</p>
      </div>

      {tenseOption?.hasPolarity && (
        <div className="rounded-lg border p-4">
          <h3 className="mb-2 text-lg font-semibold">Polarity</h3>
          <p className="text-muted-foreground">
            {polarityOption?.longDescription}
          </p>
        </div>
      )}

      {tenseOption?.hasFormality && (
        <div className="rounded-lg border p-4">
          <h3 className="mb-2 text-lg font-semibold">Formality</h3>
          <p className="text-muted-foreground">
            {formalityOption?.longDescription}
          </p>
        </div>
      )}
    </div>
  );
}
