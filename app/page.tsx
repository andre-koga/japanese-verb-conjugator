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
import { useGameStore } from "@/stores/gameStore";
import { toast } from "sonner";

export default function Home() {
  const {
    newQuestion,
    currentVerb,
    showOptionsMenu,
    toggleOptionsMenu,
    setShowOptionsMenu,
    clearStorage,
  } = useGameStore();

  // Determine if practice has content to display
  const hasPracticeContent = currentVerb !== null;

  const handleClearStorage = () => {
    clearStorage();
    toast.success("All data has been cleared successfully", {
      description: "Settings and practice data have been reset to defaults",
      duration: 3000,
    });
    // Force reload the page to ensure everything is reset
    window.location.reload();
  };

  return (
    <div className="min-h-screen space-y-4">
      <PageTitle title="日本語動詞活用練習" subtitle="Conjugation Practice" />

      <div className="rounded-lg space-y-4">
        {/* Show options when showOptionsMenu is true */}
        {showOptionsMenu && (
          <>
            <JLPTLevelSelector />
            <TenseSelector />

            <div className="grid gap-4 md:grid-cols-2">
              <PolaritySelector />
              <FormalitySelector />
            </div>

            <DictionaryFormAlert />
          </>
        )}

        <Button
          className="w-full rounded"
          variant="default"
          onClick={() => {
            if (!hasPracticeContent) {
              // Start practice if not already started
              newQuestion();
            } else if (showOptionsMenu) {
              // Hide options and continue practice
              setShowOptionsMenu(false);
            } else {
              // Show options
              toggleOptionsMenu();
            }
          }}
        >
          {!hasPracticeContent
            ? "Start Practice"
            : showOptionsMenu
              ? "Continue Practice"
              : "Go Back"}
        </Button>

        {!showOptionsMenu && (
          <>
            <VerbCard />
            <InstructionsDisplay />
            <AnswerInput />
            <NextButton />
            <TenseExplanation />
            <ScoreDisplay />
          </>
        )}

        {/* Footer with reset button */}
        <div className="mt-12 border-t pt-4 flex flex-col items-center">
          <Button variant="destructive" onClick={handleClearStorage}>
            Clear All Saved Data
          </Button>

          <p className="mt-2 text-xs text-center text-muted-foreground">
            This will reset all settings and scores to default values.
          </p>
        </div>
      </div>
    </div>
  );
}
