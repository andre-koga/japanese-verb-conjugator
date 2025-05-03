import { Polarity } from "@/lib/types";
import { polarityOptions } from "@/lib/verbOptions";
import { useGameStore } from "@/stores/gameStore";

export default function PolaritySelector() {
  const { polarity, setPolarity } = useGameStore();

  return (
    <div>
      <label className="mb-2 block font-medium">Polarity</label>
      <select
        className="w-full rounded-md border p-2"
        value={polarity}
        onChange={(e) => setPolarity(e.target.value as Polarity)}
      >
        {polarityOptions.map((p) => (
          <option key={p.id} value={p.id}>
            {p.label}
          </option>
        ))}
      </select>
    </div>
  );
}
