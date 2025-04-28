import { Button } from "@/components/ui/button";
import { useGameStore } from "@/stores/gameStore";

export default function NextButton() {
  const { isCorrect, showAnswer, newQuestion } = useGameStore();

  if (!isCorrect && !showAnswer) return null;

  return (
    <div className="mb-6">
      <Button
        className="w-full"
        onClick={() => {
          newQuestion();
        }}
      >
        Next Verb
      </Button>
    </div>
  );
}
