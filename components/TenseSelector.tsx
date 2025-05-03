import { useGameStore } from "@/stores/gameStore";
import { Checkbox } from "@/components/ui/checkbox";
import { tenseOptions } from "@/lib/verbOptions";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { InfoIcon } from "lucide-react";
import { Tense } from "@/lib/types";

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

  return (
    <div>
      <label className="mb-2 block font-medium">Tenses</label>
      <div className="space-y-2 max-h-60 overflow-y-auto rounded-md border p-2">
        {tenseOptions.map((tense) => (
          <div key={tense.id} className="flex items-center space-x-2">
            <Checkbox
              id={`tense-${tense.id}`}
              checked={selectedTenses.includes(tense.id)}
              onCheckedChange={() => handleTenseToggle(tense.id)}
            />
            <div className="flex items-center gap-2">
              <label
                htmlFor={`tense-${tense.id}`}
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
              >
                {tense.label}
                <span className="ml-1 text-xs text-muted-foreground">
                  {tense.description}
                </span>
              </label>
              {tense.longDescription && (
                <Tooltip>
                  <TooltipTrigger asChild>
                    <InfoIcon className="h-3.5 w-3.5 text-muted-foreground cursor-help" />
                  </TooltipTrigger>
                  <TooltipContent side="right" className="max-w-72">
                    {tense.longDescription}
                  </TooltipContent>
                </Tooltip>
              )}
            </div>
          </div>
        ))}
      </div>
      <div className="mt-1 text-xs text-muted-foreground">
        {selectedTenses.length} selected
      </div>
    </div>
  );
}
