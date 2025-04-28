import { useGameStore } from "@/stores/gameStore";

const polarities = ["Positive", "Negative"] as const;

export default function PolaritySelector() {
  const { polarity, setPolarity } = useGameStore();

  return (
    <div>
      <label className="mb-2 block font-medium">Polarity</label>
      <select
        className="w-full rounded-md border p-2"
        value={polarity}
        onChange={(e) => setPolarity(e.target.value)}
      >
        {polarities.map((p) => (
          <option key={p} value={p}>
            {p}
          </option>
        ))}
      </select>
    </div>
  );
}
