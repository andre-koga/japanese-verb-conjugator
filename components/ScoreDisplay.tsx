import { useGameStore } from "@/stores/gameStore";

export default function ScoreDisplay() {
  const { score, totalQuestions, currentVerb } = useGameStore();

  // Don't render if practice hasn't started yet
  if (!currentVerb) return null;

  return (
    <div className="mb-6 rounded-lg border p-4">
      <h3 className="mb-2 text-lg font-semibold">Score</h3>
      <p className="text-gray-700 dark:text-gray-300">
        Correct: {score} / {totalQuestions}
      </p>
    </div>
  );
}
