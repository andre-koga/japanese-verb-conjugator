"use client";

import { Button } from "@/components/ui/button";
import VerbCard from "@/components/VerbCard";
import InstructionsDisplay from "@/components/InstructionsDisplay";
import AnswerInput from "@/components/AnswerInput";
import TenseExplanation from "@/components/TenseExplanation";
import NextButton from "@/components/NextButton";
import ScoreDisplay from "@/components/ScoreDisplay";
import TenseSelector from "@/components/TenseSelector";
import PolaritySelector from "@/components/PolaritySelector";
import FormalitySelector from "@/components/FormalitySelector";
import JLPTLevelSelector from "@/components/JLPTLevelSelector";
import DictionaryFormAlert from "@/components/DictionaryFormAlert";

export default function Home() {
  return (
    <div className="min-h-screen p-8">
      <h1 className="mb-6 text-center text-3xl font-bold">
        日本語動詞活用練習
      </h1>
      <h2 className="mb-8 text-center text-xl font-semibold">
        Conjugation Practice
      </h2>

      <div className="mb-8 rounded-lg p-6 shadow-lg">
        <div className="mb-6 grid gap-8 md:grid-cols-2">
          <JLPTLevelSelector />
          <TenseSelector />
          <PolaritySelector />
          <FormalitySelector />
        </div>

        <DictionaryFormAlert />

        <Button
          className="mb-6 w-full rounded px-4 py-2 text-white"
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
