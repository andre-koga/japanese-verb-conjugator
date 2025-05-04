"use client";

import { Button } from "@/components/ui/button";
import VerbCard from "@/components/VerbCard";
import PageTitle from "@/components/PageTitle";
import JLPTLevelSelector from "@/components/JLPTLevelSelector";
import TenseSelector from "@/components/TenseSelector";
import PolaritySelector from "@/components/PolaritySelector";
import FormalitySelector from "@/components/FormalitySelector";
import DictionaryFormAlert from "@/components/DictionaryFormAlert";
import InstructionsDisplay from "@/components/InstructionsDisplay";
import AnswerInput from "@/components/AnswerInput";
import NextButton from "@/components/NextButton";
import TenseExplanation from "@/components/TenseExplanation";
import ScoreDisplay from "@/components/ScoreDisplay";

export default function Home() {
  return (
    <div className="min-h-screen space-y-4">
      <PageTitle title="日本語動詞活用練習" subtitle="Conjugation Practice" />

      <div className="rounded-lg space-y-4">
        <JLPTLevelSelector />
        <TenseSelector />

        <div className="grid gap-4 md:grid-cols-2">
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
