"use client";

import { useRef, useEffect } from "react";
import { useGameStore } from "@/stores/gameStore";
import { Input } from "@/components/ui/input";
import { toHiragana } from "hepburn";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export default function AnswerInput() {
  const inputRef = useRef<HTMLInputElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const {
    currentVerb,
    checkAnswer,
    isCorrect,
    showAnswer,
    newQuestion,
    currentAnswer,
    setCurrentAnswer,
  } = useGameStore();

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [currentVerb]);

  useEffect(() => {
    if (isCorrect || showAnswer) {
      setTimeout(() => {
        buttonRef.current?.focus();
      }, 100);
    }
  }, [isCorrect, showAnswer]);

  const handleSubmit = () => {
    if (!isCorrect && !showAnswer && currentAnswer.trim()) {
      checkAnswer(currentAnswer);
    } else if (isCorrect || showAnswer) {
      newQuestion();
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setCurrentAnswer(value);
  };

  if (!currentVerb) return null;

  const hiraganaValue = toHiragana(currentAnswer);
  const hasNonHiragana = /[^ぁ-んー]/.test(hiraganaValue);
  const canSubmit = !hasNonHiragana && currentAnswer.trim();

  return (
    <div className="mb-6">
      <div className="flex flex-col gap-1">
        <div className="flex gap-2">
          <Input
            ref={inputRef}
            type="text"
            className={cn(
              "w-full rounded-md border p-2 text-center text-lg",
              showAnswer && (isCorrect ? "border-correct" : "border-incorrect"),
            )}
            placeholder="Type your answer here..."
            value={currentAnswer}
            onChange={handleInputChange}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                if (canSubmit && !isCorrect && !showAnswer) {
                  handleSubmit();
                } else if (isCorrect || showAnswer) {
                  handleSubmit();
                }
              }
            }}
            disabled={isCorrect || showAnswer}
          />
          <Button
            ref={buttonRef}
            onClick={handleSubmit}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSubmit();
              }
            }}
            disabled={!canSubmit && !isCorrect && !showAnswer}
            className={cn(
              "focus:!border-foreground/60 border-2 border-transparent px-6",
              isCorrect && "bg-correct hover:bg-correct/80",
              !isCorrect && showAnswer && "bg-incorrect hover:bg-incorrect/80",
            )}
            tabIndex={0}
          >
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
        {hiraganaValue && !isCorrect && !showAnswer && (
          <p className="text-muted-foreground mt-2 text-center text-sm">
            {hiraganaValue}
          </p>
        )}
      </div>
    </div>
  );
}
