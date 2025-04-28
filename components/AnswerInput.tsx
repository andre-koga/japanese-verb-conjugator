"use client";

import { useRef, useEffect } from "react";
import { useGameStore } from "@/stores/gameStore";

export default function AnswerInput() {
  const inputRef = useRef<HTMLInputElement>(null);
  const { currentVerb, checkAnswer, isCorrect, showAnswer } = useGameStore();

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [currentVerb]);

  if (!currentVerb) return null;

  return (
    <div className="mb-6">
      <input
        ref={inputRef}
        type="text"
        className="w-full rounded-md border p-2 text-lg"
        placeholder="Type your answer here..."
        onKeyDown={(e) => {
          if (e.key === "Enter" && !isCorrect && !showAnswer) {
            checkAnswer(e.currentTarget.value);
          }
        }}
        disabled={isCorrect || showAnswer}
      />
    </div>
  );
}
