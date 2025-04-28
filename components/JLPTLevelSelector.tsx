import { useGameStore } from "@/stores/gameStore";
import { Button } from "@/components/ui/button";
import { Toggle } from "@/components/ui/toggle";
import type { JLPTLevel } from "@/lib/types";

const JLPTLevels = [
  { id: "N5", label: "N5" },
  { id: "N4", label: "N4" },
  { id: "N3", label: "N3" },
  { id: "N2", label: "N2" },
  { id: "N1", label: "N1" },
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
        <h3 className="font-medium">JLPT Level</h3>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={() => toggleAllLevels(true)}>
            Select All
          </Button>
          <Button variant="outline" size="sm" onClick={() => toggleAllLevels(false)}>
            Clear
          </Button>
        </div>
      </div>
      <div className="flex flex-wrap gap-2">
        {JLPTLevels.map((level) => (
          <Toggle
            key={level.id}
            variant="outline"
            pressed={enabledJLPTLevels.includes(level.id as JLPTLevel)}
            onClick={() => toggleLevel(level.id as JLPTLevel)}
          >
            {level.label}
          </Toggle>
        ))}
      </div>
      <div className="mt-1 text-xs">
        {enabledJLPTLevels.length} of {JLPTLevels.length} selected
        <span className="ml-2 italic">(Note: Only N5 is currently available)</span>
      </div>
    </div>
  );
}
