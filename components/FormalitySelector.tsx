import { Formality } from "@/lib/types";
import { useGameStore } from "@/stores/gameStore";
import { formalityOptions } from "@/lib/verbOptions";

export default function FormalitySelector() {
  const { formality, setFormality } = useGameStore();

  return (
    <div>
      <label className="mb-2 block font-medium">Formality</label>
      <select
        className="w-full rounded-md border p-2"
        value={formality}
        onChange={(e) => setFormality(e.target.value as Formality)}
      >
        {formalityOptions.map((f) => (
          <option key={f.id} value={f.id}>
            {f.label}
          </option>
        ))}
      </select>
    </div>
  );
}
