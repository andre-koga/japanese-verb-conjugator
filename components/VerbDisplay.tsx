import { useGameStore } from "@/stores/gameStore";
import { Card, CardContent } from "@/components/ui/card";
import { ExternalLink } from "lucide-react";
import Link from "next/link";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { JLPTColor } from "@/lib/utils";
import { conjugate } from "@/lib/conjugation";

export default function VerbDisplay() {
  const { currentVerb, tense, polarity, formality, showAnswer, isCorrect } =
    useGameStore();

  if (!currentVerb) return null;

  const correctAnswer =
    showAnswer && !isCorrect
      ? conjugate(currentVerb, { tense, polarity, formality })
      : null;

  return (
    <Card>
      <CardContent className="text-center space-y-6">
        {/* Verb Information */}
        <div className="space-y-2">
          <p className="text-xs text-muted-foreground p-0 m-0">
            {currentVerb.kana}
          </p>
          <h2 className="text-xl font-bold">{currentVerb.dictionary} </h2>
          <p>{currentVerb.meaning}</p>

          <div className="flex justify-center gap-2">
            <Badge variant="secondary" className="text-muted-foreground">
              {currentVerb.type.toUpperCase()}
            </Badge>
            {currentVerb.JLPTLevel && (
              <Badge
                className={`${JLPTColor(currentVerb.JLPTLevel)} text-primary`}
              >
                {currentVerb.JLPTLevel}
              </Badge>
            )}
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-border w-3/4 mx-auto"></div>

        {/* Instructions */}
        <div className="space-y-3">
          <h2 className="font-medium">Conjugate To:</h2>
          <div className="flex flex-wrap justify-center gap-4">
            <div className="flex flex-col items-center gap-1">
              <span className="text-sm text-muted-foreground">Tense</span>
              <Badge variant="outline" className="text-sm">
                {tense}
              </Badge>
            </div>

            <div className="flex flex-col items-center gap-1">
              <span className="text-sm text-muted-foreground">Form</span>
              <Badge variant="outline" className="text-sm">
                {polarity}
              </Badge>
            </div>

            <div className="flex flex-col items-center gap-1">
              <span className="text-sm text-muted-foreground">Speech</span>
              <Badge variant="outline" className="text-sm">
                {formality}
              </Badge>
            </div>
          </div>
        </div>

        {/* Correct Answer Display */}
        {correctAnswer && (
          <div className="text-destructive">
            <p className="text-sm text-muted-foreground">Correct Answer:</p>
            <p className="text-lg font-medium">{correctAnswer}</p>
          </div>
        )}

        {/* Jisho Lookup Button */}
        <Link
          href={`https://jisho.org/search/${currentVerb.dictionary}`}
          target="_blank"
          rel="noopener noreferrer"
          title="Look up on Jisho.org"
        >
          <Button variant="ghost" size="sm">
            <ExternalLink className="h-4 w-4 mr-2" />
            <span>Look up on Jisho</span>
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
}
