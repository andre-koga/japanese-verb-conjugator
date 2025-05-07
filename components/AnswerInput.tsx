"use client";

import { useRef, useEffect, useState } from "react";
import { useGameStore } from "@/stores/gameStore";
import { Input } from "@/components/ui/input";
import { toHiragana } from "hepburn";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export default function AnswerInput() {
  const inputRef = useRef<HTMLInputElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const { currentVerb, checkAnswer, isCorrect, showAnswer, newQuestion } = useGameStore();
  const [inputValue, setInputValue] = useState("");
  const [hiraganaValue, setHiraganaValue] = useState("");
  const [canSubmit, setCanSubmit] = useState(true);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [currentVerb]);

  useEffect(() => {
    setInputValue("");
    setHiraganaValue("");
    setCanSubmit(true);
  }, [currentVerb]);

  useEffect(() => {
    if (isCorrect || showAnswer) {
      setTimeout(() => {
        buttonRef.current?.focus();
      }, 100);
    }
  }, [isCorrect, showAnswer]);

  const handleSubmit = () => {
    if (canSubmit && !isCorrect && !showAnswer && inputValue.trim()) {
      setInputValue(hiraganaValue);
      checkAnswer(inputValue);
    } else if (isCorrect || showAnswer) {
      newQuestion();
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);
    
    const converted = toHiragana(value);
    setHiraganaValue(converted);

    // Check if the input can be fully converted to hiragana
    const hasNonHiragana = /[^ぁ-んー]/.test(converted);
    setCanSubmit(!hasNonHiragana);
  };

  if (!currentVerb) return null;

  return (
    <div className="mb-6">
      <div className="flex flex-col gap-1">
        <div className="flex gap-2">
          <Input
            ref={inputRef}
            type="text"
            className={cn(
              "w-full rounded-md border p-2 text-center text-lg",
              showAnswer && (isCorrect ? "border-correct" : "border-destructive"),
            )}
            placeholder="Type your answer here..."
            value={inputValue}
            onChange={handleInputChange}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                if (canSubmit && !isCorrect && !showAnswer && inputValue.trim()) {
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
            disabled={(!canSubmit || !inputValue.trim()) && !isCorrect && !showAnswer}
            className={cn(
              "px-6 focus:!border-foreground/80 border-transparent border-2",
              (isCorrect) && "bg-green-600 hover:bg-green-600/80",
              (!isCorrect && showAnswer) && "bg-destructive hover:bg-destructive/80",
            )}
            tabIndex={0}
          >
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
        {hiraganaValue && !isCorrect && !showAnswer && (
          <p className="text-sm text-muted-foreground text-center mt-2">
            {hiraganaValue}
          </p>
        )}
      </div>
    </div>
  );
}
