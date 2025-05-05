import { useGameStore } from "@/stores/gameStore";
import { Checkbox } from "@/components/ui/checkbox";
import { tenseOptions } from "@/lib/verbOptions";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Tense } from "@/lib/types";
import { Label } from "@/components/ui/label";
import { InfoIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function TenseSelector() {
  const { selectedTenses, setSelectedTenses } = useGameStore();

  const handleTenseToggle = (tense: Tense) => {
    // If tense is already selected, remove it
    // If not, add it to the selection
    if (selectedTenses.includes(tense)) {
      setSelectedTenses(selectedTenses.filter((t) => t !== tense));
    } else {
      setSelectedTenses([...selectedTenses, tense]);
    }
  };

  // Group tenses by essential vs non-essential
  const tensesByEssential = {
    essential: tenseOptions.filter((tense) => tense.essential),
    nonEssential: tenseOptions.filter((tense) => !tense.essential),
  };

  // Essential groups with descriptions
  const essentialGroups = [
    {
      id: "essential",
      label: "Essential Forms",
      description: "Core grammar patterns for basic communication",
    },
    {
      id: "nonEssential",
      label: "Extended Forms",
      description: "Additional patterns for nuanced expression",
    },
  ] as const;

  const selectAllTenses = () => {
    setSelectedTenses(tenseOptions.map((tense) => tense.id));
  };

  const selectEssentialTenses = () => {
    setSelectedTenses(tensesByEssential.essential.map((tense) => tense.id));
  };

  const clearTenses = () => {
    // Keep at least one tense selected
    if (tensesByEssential.essential.length > 0) {
      setSelectedTenses([tensesByEssential.essential[0].id]);
    } else if (tenseOptions.length > 0) {
      setSelectedTenses([tenseOptions[0].id]);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Label htmlFor="tenses" className="text-base font-medium">
          Tenses
        </Label>
        <div className="flex gap-2">
          <Button variant="outline" size="xs" onClick={selectAllTenses}>
            Select All
          </Button>
          <Button variant="outline" size="xs" onClick={selectEssentialTenses}>
            Select Essential
          </Button>
          <Button variant="outline" size="xs" onClick={clearTenses}>
            Clear
          </Button>
        </div>
      </div>

      <TooltipProvider>
        {essentialGroups.map((group) => (
          <div key={group.id} className="mb-4">
            <h3 className="text-sm font-medium mb-2 flex items-center flex-wrap">
              {group.label}
              <Label className="text-xs opacity-70 font-normal ml-2">
                {group.description}
              </Label>
              <span className="text-xs text-muted-foreground ml-2 hidden sm:block">
                ({tensesByEssential[group.id].length} tenses)
              </span>
            </h3>

            <div className="space-y-2 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-2 items-start">
              {tensesByEssential[group.id].map((tense) => (
                <div key={tense.id}>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id={`tense-${tense.id}`}
                      checked={selectedTenses.includes(tense.id)}
                      onCheckedChange={() => handleTenseToggle(tense.id)}
                    />
                    <div className="flex items-center gap-2">
                      <Label
                        htmlFor={`tense-${tense.id}`}
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                      >
                        {tense.label}
                        <span className="ml-1 text-xs text-muted-foreground">
                          {tense.description}
                        </span>
                      </Label>
                      {tense.longDescription && (
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <InfoIcon className="h-3.5 w-3.5 text-muted-foreground cursor-help" />
                          </TooltipTrigger>
                          <TooltipContent side="top" className="max-w-72">
                            {tense.longDescription}
                          </TooltipContent>
                        </Tooltip>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </TooltipProvider>

      <div className="text-xs text-muted-foreground">
        {selectedTenses.length} of {tenseOptions.length} selected
      </div>
    </div>
  );
}
