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
import { essentialGroups } from "@/lib/config/selectorConst";

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
    <div className="space-y-2">
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
          <div
            key={group.isEssential ? "essential" : "nonEssential"}
            className="space-y-2"
          >
            <h3 className="flex flex-wrap items-center text-sm font-medium">
              {group.label}
              <Label className="ml-2 text-xs font-normal opacity-70">
                {group.description}
              </Label>
              <span className="text-muted-foreground ml-2 hidden text-xs sm:block">
                (
                {
                  tensesByEssential[
                    group.isEssential ? "essential" : "nonEssential"
                  ].length
                }{" "}
                tenses)
              </span>
            </h3>

            <div className="grid grid-cols-1 space-y-2 gap-x-2 sm:grid-cols-2 md:grid-cols-3">
              {tensesByEssential[
                group.isEssential ? "essential" : "nonEssential"
              ].map((tense) => (
                <div key={tense.id}>
                  <div className="flex space-x-2">
                    <Checkbox
                      id={`tense-${tense.id}`}
                      checked={selectedTenses.includes(tense.id)}
                      onCheckedChange={() => handleTenseToggle(tense.id)}
                    />
                    <div className="flex gap-2">
                      <Label
                        htmlFor={`tense-${tense.id}`}
                        className="cursor-pointer text-sm leading-none font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        {tense.label}
                        <span className="text-muted-foreground ml-1 text-xs">
                          {tense.description}
                        </span>
                      </Label>
                      {tense.longDescription && (
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <InfoIcon
                              size={14}
                              className="text-muted-foreground cursor-help"
                            />
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

      <div className="text-muted-foreground -mt-2 text-xs">
        {selectedTenses.length} of {tenseOptions.length} selected
      </div>
    </div>
  );
}
