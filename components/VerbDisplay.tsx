import { useGameStore } from "@/stores/gameStore";
import { Card, CardContent } from "@/components/ui/card";
import { ExternalLink } from "lucide-react";
import Link from "next/link";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { JLPTColor } from "@/lib/utils";
import { conjugate } from "@/lib/conjugation";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  tenseOptions,
  polarityOptions,
  formalityOptions,
  verbTypeOptions,
  transitivityOptions,
} from "@/lib/verbOptions";

export default function VerbDisplay() {
  const { currentVerb, tense, polarity, formality, showAnswer, isCorrect } =
    useGameStore();

  if (!currentVerb) return null;

  const correctAnswer =
    showAnswer && !isCorrect
      ? conjugate(currentVerb, { tense, polarity, formality })
      : null;

  const currentTenseOption = tenseOptions.find((t) => t.id === tense);

  return (
    <Card>
      <CardContent className="space-y-6 text-center">
        {/* Verb Information */}
        <div className="space-y-2">
          <p className="text-muted-foreground m-0 p-0 text-xs">
            {currentVerb.kana}
          </p>
          <h2 className="text-xl font-bold">{currentVerb.dictionary} </h2>
          <p>{currentVerb.meaning}</p>

          <div className="flex justify-center gap-2">
            {currentVerb.JLPTLevel && (
              <Badge
                className={`${JLPTColor(currentVerb.JLPTLevel)} text-primary`}
              >
                {currentVerb.JLPTLevel}
              </Badge>
            )}
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Badge
                    variant="secondary"
                    className="text-muted-foreground border-muted-foreground/50 border"
                  >
                    {currentVerb.type === "godan" ? "五段" : "一段"}
                  </Badge>
                </TooltipTrigger>
                <TooltipContent className="max-w-72">
                  <p>
                    {
                      verbTypeOptions.find((t) => t.id === currentVerb.type)
                        ?.longDescription
                    }
                  </p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Badge
                    variant="secondary"
                    className="text-muted-foreground border-muted-foreground/50 border"
                  >
                    {currentVerb.transitivity === "transitive"
                      ? "他動詞"
                      : "自動詞"}
                  </Badge>
                </TooltipTrigger>
                <TooltipContent className="max-w-72">
                  <p>
                    {
                      transitivityOptions.find(
                        (t) => t.id === currentVerb.transitivity,
                      )?.longDescription
                    }
                  </p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </div>

        {/* Divider */}
        <div className="bg-border mx-auto h-px w-3/4"></div>

        {/* Instructions */}
        <div className="space-y-3">
          <h2 className="font-medium">Conjugate To:</h2>
          <div className="flex flex-wrap justify-center gap-4">
            <div className="flex flex-col items-center gap-1">
              <span className="text-muted-foreground text-sm">Tense</span>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Badge variant="outline" className="text-sm">
                      {tense}
                    </Badge>
                  </TooltipTrigger>
                  <TooltipContent className="max-w-72">
                    <p>
                      {
                        tenseOptions.find((t) => t.id === tense)
                          ?.longDescription
                      }
                    </p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>

            {currentTenseOption?.hasPolarity && (
              <div className="flex flex-col items-center gap-1">
                <span className="text-muted-foreground text-sm">Polarity</span>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Badge variant="outline" className="text-sm">
                        {polarity}
                      </Badge>
                    </TooltipTrigger>
                    <TooltipContent className="max-w-72">
                      <p>
                        {
                          polarityOptions.find((p) => p.id === polarity)
                            ?.longDescription
                        }
                      </p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            )}

            {currentTenseOption?.hasFormality && (
              <div className="flex flex-col items-center gap-1">
                <span className="text-muted-foreground text-sm">Formality</span>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Badge variant="outline" className="text-sm">
                        {formality}
                      </Badge>
                    </TooltipTrigger>
                    <TooltipContent className="max-w-72">
                      <p>
                        {
                          formalityOptions.find((f) => f.id === formality)
                            ?.longDescription
                        }
                      </p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            )}
          </div>
        </div>

        {/* Correct Answer Display */}
        {correctAnswer && (
          <div className="text-destructive">
            <p className="text-muted-foreground mb-4 text-sm">
              Correct Answer:
            </p>
            <p className="text-muted-foreground m-0 p-0 text-xs">
              {correctAnswer[1]}
            </p>
            <p className="text-xl font-medium">{correctAnswer[0]}</p>
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
            <ExternalLink className="mr-2 h-4 w-4" />
            <span>Look up on Jisho</span>
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
}
