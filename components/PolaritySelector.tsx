import { Polarity } from "@/lib/types";
import { polarityOptions } from "@/lib/verbOptions";
import { useGameStore } from "@/stores/gameStore";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";

export default function PolaritySelector() {
  const { selectedPolarities, setSelectedPolarities } = useGameStore();

  const handlePolarityToggle = (polarity: Polarity) => {
    // If polarity is already selected, remove it
    // If not, add it to the selection
    if (selectedPolarities.includes(polarity)) {
      setSelectedPolarities(selectedPolarities.filter((p) => p !== polarity));
    } else {
      setSelectedPolarities([...selectedPolarities, polarity]);
    }
  };

  const selectAllPolarities = () => {
    setSelectedPolarities(polarityOptions.map((p) => p.id));
  };

  const clearPolarities = () => {
    // Keep at least one polarity selected
    if (polarityOptions.length > 0) {
      setSelectedPolarities([polarityOptions[0].id]);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Label htmlFor="polarity" className="text-base font-medium">
          Polarity
        </Label>
        <div className="flex gap-2">
          <Button variant="outline" size="xs" onClick={selectAllPolarities}>
            Select All
          </Button>
          <Button variant="outline" size="xs" onClick={clearPolarities}>
            Clear
          </Button>
        </div>
      </div>

      <TooltipProvider>
        <div className="space-y-2 grid grid-cols-1 sm:grid-cols-2 gap-x-2 items-start">
          {polarityOptions.map((option) => (
            <div key={option.id}>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id={`polarity-${option.id}`}
                  checked={selectedPolarities.includes(option.id)}
                  onCheckedChange={() => handlePolarityToggle(option.id)}
                />
                <div className="flex items-center gap-2">
                  <Label
                    htmlFor={`polarity-${option.id}`}
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
        {selectedPolarities.length} of {polarityOptions.length} selected
      </div>
    </div>
  );
}
