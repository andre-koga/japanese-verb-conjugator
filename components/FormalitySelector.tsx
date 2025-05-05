import { Formality } from "@/lib/types";
import { useGameStore } from "@/stores/gameStore";
import { formalityOptions } from "@/lib/verbOptions";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";

export default function FormalitySelector() {
  const { selectedFormalities, setSelectedFormalities } = useGameStore();

  const handleFormalityToggle = (formality: Formality) => {
    // If formality is already selected, remove it
    // If not, add it to the selection
    if (selectedFormalities.includes(formality)) {
      setSelectedFormalities(
        selectedFormalities.filter((f) => f !== formality)
      );
    } else {
      setSelectedFormalities([...selectedFormalities, formality]);
    }
  };

  const selectAllFormalities = () => {
    setSelectedFormalities(formalityOptions.map((f) => f.id));
  };

  const clearFormalities = () => {
    // Keep at least one formality selected
    if (formalityOptions.length > 0) {
      setSelectedFormalities([formalityOptions[0].id]);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Label htmlFor="formality" className="text-base font-medium">
          Formality
        </Label>
        <div className="flex gap-2">
          <Button variant="outline" size="xs" onClick={selectAllFormalities}>
            Select All
          </Button>
          <Button variant="outline" size="xs" onClick={clearFormalities}>
            Clear
          </Button>
        </div>
      </div>

      <TooltipProvider>
        <div className="space-y-2 grid grid-cols-1 sm:grid-cols-2 gap-x-2 items-start">
          {formalityOptions.map((option) => (
            <div key={option.id}>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id={`formality-${option.id}`}
                  checked={selectedFormalities.includes(option.id)}
                  onCheckedChange={() => handleFormalityToggle(option.id)}
                />
                <div className="flex items-center gap-2">
                  <Label
                    htmlFor={`formality-${option.id}`}
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                  >
                    {option.label}
                    <span className="ml-1 text-xs text-muted-foreground">
                      {option.description}
                    </span>
                  </Label>
                </div>
              </div>
            </div>
          ))}
        </div>
      </TooltipProvider>

      <div className="text-xs text-muted-foreground">
        {selectedFormalities.length} of {formalityOptions.length} selected
      </div>
    </div>
  );
}
