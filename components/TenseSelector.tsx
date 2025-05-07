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

  const selectAllTenses = () => {
    setSelectedTenses(tenseOptions.map((tense) => tense.id));
  };

  const clearTenses = () => {
    // Keep at least one tense selected
    if (tenseOptions.length > 0) {
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
          <Button variant="outline" size="xs" onClick={clearTenses}>
            Clear
          </Button>
        </div>
      </div>

      <TooltipProvider>
        <div className="grid grid-cols-1 space-y-2 gap-x-2 sm:grid-cols-2 md:grid-cols-3">
          {tenseOptions.map((tense) => (
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
      </TooltipProvider>

      <div className="text-muted-foreground -mt-2 text-xs">
        {selectedTenses.length} of {tenseOptions.length} selected
      </div>
    </div>
  );
}
