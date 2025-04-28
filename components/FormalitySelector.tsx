import { useGameStore } from "@/stores/gameStore";

const formalities = ["Formal", "Informal"] as const;

export default function FormalitySelector() {
  const { formality, setFormality } = useGameStore();

  return (
    <div>
      <label className="mb-2 block font-medium">Formality</label>
      <select
        className="w-full rounded-md border p-2"
        value={formality}
        onChange={(e) => setFormality(e.target.value)}
      >
        {formalities.map((f) => (
          <option key={f} value={f}>
            {f}
          </option>
        ))}
      </select>
    </div>
  );
}
