import { useGameStore } from "@/stores/gameStore";

const tenses = [
  "Present",
  "Past",
  "Te-form",
  "Potential",
  "Volitional",
  "Imperative",
  "Conditional",
] as const;

export default function TenseSelector() {
  const { tense, setTense } = useGameStore();

  return (
    <div>
      <label className="mb-2 block font-medium">Tense</label>
      <select
        className="w-full rounded-md border p-2"
        value={tense}
        onChange={(e) => setTense(e.target.value)}
      >
        {tenses.map((t) => (
          <option key={t} value={t}>
            {t}
          </option>
        ))}
      </select>
    </div>
  );
}
