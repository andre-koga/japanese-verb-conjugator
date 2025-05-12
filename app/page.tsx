"use client";

import { Button } from "@/components/ui/button";
import VerbDisplay from "@/components/VerbDisplay";
import PageTitle from "@/components/PageTitle";
import JLPTLevelSelector from "@/components/JLPTLevelSelector";
import TenseSelector from "@/components/TenseSelector";
import PolaritySelector from "@/components/PolaritySelector";
import FormalitySelector from "@/components/FormalitySelector";
import DictionaryFormAlert from "@/components/DictionaryFormAlert";
import AnswerInput from "@/components/AnswerInput";
import ConjugationExplanation from "@/components/TenseExplanation";
import ScoreDisplay from "@/components/ScoreDisplay";
import { useGameStore } from "@/stores/gameStore";
import { toast } from "sonner";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

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
  };

  return (
    <div className="min-h-screen space-y-8">
      <PageTitle title="日本語動詞活用練習" subtitle="Conjugation Practice" />

      <Tabs defaultValue="practice" className="w-full space-y-4">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="practice">Practice</TabsTrigger>
          <TabsTrigger value="explanation">Explanation</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
        </TabsList>

        <TabsContent value="practice" className="space-y-8 rounded-lg">
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

          {!showOptionsMenu && (
            <>
              <VerbDisplay />
              <AnswerInput />
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
        </TabsContent>

        <TabsContent value="explanation">
          <ConjugationExplanation />
        </TabsContent>

        <TabsContent value="performance" className="space-y-8 rounded-lg">
          <ScoreDisplay />
          {/* Footer with reset button */}
          <div className="mt-12 flex flex-col items-center">
            <Button variant="destructive" onClick={handleClearStorage}>
              Clear All Saved Data
            </Button>

            <p className="text-muted-foreground mt-2 text-center text-xs">
              This will reset all settings and scores to default values.
            </p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
