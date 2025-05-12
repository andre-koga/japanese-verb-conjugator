import { useGameStore } from "@/stores/gameStore";
import { Button } from "@/components/ui/button";
import { Toggle } from "@/components/ui/toggle";
import type { JLPTLevel } from "@/lib/types";
import { JLPTColor } from "@/lib/utils";
import { JLPTLevels } from "@/lib/config/selectorConst";
import { allVerbs } from "@/lib/jlpt-verbs";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Label } from "@/components/ui/label";

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
      setEnabledJLPTLevels(JLPTLevels.map((l) => l.id));
    } else {
      // Keep at least one level selected
      setEnabledJLPTLevels([JLPTLevels[0].id]);
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
            const isActive = enabledJLPTLevels.includes(level.id);

            return (
              <Tooltip key={level.id}>
                <TooltipTrigger asChild>
                  <Toggle
                    size="sm"
                    variant="outline"
                    className={
                      isActive ? JLPTColor(level.id) : "bg-transparent"
                    }
                    pressed={isActive}
                    onClick={() => toggleLevel(level.id)}
                  >
                    <span className="flex items-center gap-1">
                      {level.label}
                      <Label className="text-xs font-normal opacity-70">
                        {level.difficulty}
                      </Label>
                    </span>
                  </Toggle>
                </TooltipTrigger>
                <TooltipContent className="max-w-[200px]" side="top">
                  <div className="space-y-1">
                    <p className="font-semibold">{level.difficulty}</p>
                    <p className="text-xs">{level.description}</p>
                    <p className="text-muted-foreground text-xs">
                      {allVerbs[level.id].length} verbs available
                    </p>
                  </div>
                </TooltipContent>
              </Tooltip>
            );
          })}
        </TooltipProvider>
      </div>
      <div className="text-muted-foreground text-xs">
        {enabledJLPTLevels.length} of {JLPTLevels.length} selected
        <span className="ml-2 italic">
          (Note: Only N5 is currently available)
        </span>
      </div>
    </div>
  );
}
