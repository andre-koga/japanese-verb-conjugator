import { useGameStore } from "@/stores/gameStore";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";

export default function DictionaryFormAlert() {
  const { isSelectionValid } = useGameStore();

  if (isSelectionValid()) {
    return (
      <Alert className="mb-6">
        <AlertTitle>Remember</AlertTitle>
        <AlertDescription>
          All verbs are shown in their dictionary form (辞書形).
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <Alert
      variant="destructive"
      className="bg-destructive/10 border-destructive/30 mb-6"
    >
      <AlertTitle>Invalid Selection</AlertTitle>
      <AlertDescription>
        You cannot practice with only present indicative + affirmative + plain
        form. Please select at least one other tense or change the
        polarity/formality settings.
      </AlertDescription>
    </Alert>
  );
}
