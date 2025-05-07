"use client";

import { useRef, useEffect, useState } from "react";
import { useGameStore } from "@/stores/gameStore";
import { Input } from "@/components/ui/input";
import { romajiToJapanese } from "@/lib/romaji";

export default function AnswerInput() {
  const inputRef = useRef<HTMLInputElement>(null);
  const { currentVerb, checkAnswer, isCorrect, showAnswer } = useGameStore();
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [currentVerb]);

  useEffect(() => {
    setInputValue("");
  }, [currentVerb]);

  if (!currentVerb) return null;

  return (
    <div className="mb-6">
      <Input
        ref={inputRef}
        type="text"
        className="w-full rounded-md border p-2 text-lg text-center"
        placeholder="Type your answer here..."
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter" && !isCorrect && !showAnswer) {
            checkAnswer(e.currentTarget.value);
          }
        }}
        disabled={isCorrect || showAnswer}
      />
      {inputValue && (
        <div className="mt-2 text-center text-sm text-gray-500">
          {romajiToJapanese(inputValue)}
        </div>
      )}
    </div>
  );
}
