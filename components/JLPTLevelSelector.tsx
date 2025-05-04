import { useGameStore } from "@/stores/gameStore";
import { Button } from "@/components/ui/button";
import { Toggle } from "@/components/ui/toggle";
import type { JLPTLevel } from "@/lib/types";
import { JLPTColor } from "@/lib/utils";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Label } from "@/components/ui/label";

const JLPTLevels = [
  {
    id: "N5",
    label: "N5",
    difficulty: "Beginner",
    vocabCount: "~800 words",
    description:
      "Basic Japanese knowledge, understanding simple conversations and text",
  },
  {
    id: "N4",
    label: "N4",
    difficulty: "Basic",
    vocabCount: "~1,500 words",
    description: "Basic everyday conversations, simple reading comprehension",
  },
  {
    id: "N3",
    label: "N3",
    difficulty: "Intermediate",
    vocabCount: "~3,000 words",
    description:
      "Understanding of everyday Japanese, reading newspapers and magazines with basic vocabulary",
  },
  {
    id: "N2",
    label: "N2",
    difficulty: "Pre-Advanced",
    vocabCount: "~6,000 words",
    description:
      "Able to understand most Japanese used in everyday situations and in a variety of circumstances",
  },
  {
    id: "N1",
    label: "N1",
    difficulty: "Advanced",
    vocabCount: "~10,000 words",
    description:
      "Comprehensive understanding of Japanese in a wide range of situations",
  },
] as const;

export default function JLPTLevelSelector() {
  const { enabledJLPTLevels, setEnabledJLPTLevels } = useGameStore();

  const toggleLevel = (level: JLPTLevel) => {
    if (enabledJLPTLevels.includes(level)) {
      // Don't allow deselecting all levels
      if (enabledJLPTLevels.length > 1) {
        setEnabledJLPTLevels(enabledJLPTLevels.filter((l) => l !== level));
      }
    } else {
      setEnabledJLPTLevels([...enabledJLPTLevels, level]);
    }
  };

  const toggleAllLevels = (select: boolean) => {
    if (select) {
      setEnabledJLPTLevels(JLPTLevels.map((l: { id: JLPTLevel }) => l.id));
    } else {
      // Keep at least one level selected
      setEnabledJLPTLevels([JLPTLevels[0].id as JLPTLevel]);
    }
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <h3 className="font-medium">JLPT Vocabulary Level</h3>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="xs"
            onClick={() => toggleAllLevels(true)}
          >
            Select All
          </Button>
          <Button
            variant="outline"
            size="xs"
            onClick={() => toggleAllLevels(false)}
          >
            Clear
          </Button>
        </div>
      </div>
      <div className="flex flex-wrap gap-2">
        <TooltipProvider>
          {JLPTLevels.map((level) => {
            const isActive = enabledJLPTLevels.includes(level.id as JLPTLevel);

            return (
              <Tooltip key={level.id}>
                <TooltipTrigger asChild>
                  <Toggle
                    size="sm"
                    variant="outline"
                    className={
                      isActive
                        ? JLPTColor(level.id as JLPTLevel)
                        : "bg-transparent"
                    }
                    pressed={isActive}
                    onClick={() => toggleLevel(level.id as JLPTLevel)}
                  >
                    <span className="flex items-center gap-1">
                      {level.label}
                      <Label className="text-xs opacity-70 font-normal">
                        {level.difficulty}
                      </Label>
                    </span>
                  </Toggle>
                </TooltipTrigger>
                <TooltipContent className="max-w-[200px]" side="top">
                  <div className="space-y-1">
                    <p className="font-semibold">{level.difficulty}</p>
                    <p className="text-xs">{level.vocabCount}</p>
                    <p className="text-xs">{level.description}</p>
                  </div>
                </TooltipContent>
              </Tooltip>
            );
          })}
        </TooltipProvider>
      </div>
      <div className="text-xs text-muted-foreground">
        {enabledJLPTLevels.length} of {JLPTLevels.length} selected
        <span className="ml-2 italic">
          (Note: Only N5 is currently available)
        </span>
      </div>
    </div>
  );
}
