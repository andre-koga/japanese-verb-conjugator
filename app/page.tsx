"use client";

import { Button } from "@/components/ui/button";
import {
  VerbCard,
  InstructionsDisplay,
  AnswerInput,
  TenseExplanation,
  NextButton,
  ScoreDisplay,
  TenseSelector,
  PolaritySelector,
  FormalitySelector,
  JLPTLevelSelector,
  DictionaryFormAlert,
  PageTitle,
} from "@/components";

export default function Home() {
  return (
    <div className="min-h-screen space-y-4">
      <PageTitle title="日本語動詞活用練習" subtitle="Conjugation Practice" />

      <div className="rounded-lg shadow-lg">
        <JLPTLevelSelector />
        <TenseSelector />

        <div className="grid gap-8 md:grid-cols-2">
          <PolaritySelector />
          <FormalitySelector />
        </div>

        <DictionaryFormAlert />

        <Button
          className="w-full rounded"
          variant="default"
          onClick={() => {
            // TODO: Implement start practice logic
          }}
        >
          Start Practice
        </Button>

        <VerbCard />
        <InstructionsDisplay />
        <AnswerInput />
        <NextButton />
        <TenseExplanation />
        <ScoreDisplay />
      </div>
    </div>
  );
}
