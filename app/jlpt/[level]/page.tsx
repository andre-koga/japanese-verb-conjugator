"use client";

import PageTitle from "@/components/PageTitle";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getVerbsForLevel } from "@/lib/conjugation";
import type { JLPTLevel } from "@/lib/types";
import { ExternalLink } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { use } from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";

interface PageProps {
  params: Promise<{
    level: string;
  }>;
}

const validLevels: JLPTLevel[] = ["N5", "N4", "N3", "N2", "N1"];

export default function JLPTLevelPage({ params }: PageProps) {
  const resolvedParams = use(params);
  const level = resolvedParams.level.toUpperCase() as JLPTLevel;
  const [verbType, setVerbType] = useState<"all" | "godan" | "ichidan">("all");
  const [transitivity, setTransitivity] = useState<
    "all" | "transitive" | "intransitive"
  >("all");

  // Validate the level is a valid JLPT level
  if (!validLevels.includes(level)) {
    notFound();
  }

  const verbs = getVerbsForLevel(level);
  const filteredVerbs = verbs
    .sort((a, b) => a.kana.localeCompare(b.kana))
    .filter((verb) => {
      if (verbType !== "all" && verb.type !== verbType) return false;
      if (transitivity !== "all" && verb.transitivity !== transitivity)
        return false;
      return true;
    });

  return (
    <div className="min-h-screen space-y-8">
      <PageTitle title="日本語動詞活用練習" subtitle={`JLPT ${level} Verbs`} />

      <div className="flex gap-4">
        <Tabs
          defaultValue="all"
          value={verbType}
          onValueChange={(v) => setVerbType(v as typeof verbType)}
        >
          <TabsList className="flex">
            <TabsTrigger value="all">All Types</TabsTrigger>
            <TabsTrigger value="godan">五段</TabsTrigger>
            <TabsTrigger value="ichidan">一段</TabsTrigger>
          </TabsList>
        </Tabs>

        <Tabs
          defaultValue="all"
          value={transitivity}
          onValueChange={(v) => setTransitivity(v as typeof transitivity)}
        >
          <TabsList className="flex">
            <TabsTrigger value="all">All Verbs</TabsTrigger>
            <TabsTrigger value="transitive">他動詞</TabsTrigger>
            <TabsTrigger value="intransitive">自動詞</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filteredVerbs.map((verb) => (
          <Card key={verb.dictionary} className="gap-0 px-1 py-3">
            <CardHeader className="px-2">
              <CardTitle className="flex items-center gap-2">
                <span className="text-xl">{verb.dictionary}</span>
                <span className="text-muted-foreground text-base">
                  {verb.kana}
                </span>
                <div className="text-muted-foreground ml-auto">
                  <Link
                    href={`https://jisho.org/search/${verb.dictionary}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    title="Look up on Jisho.org"
                  >
                    <Button variant="ghost" size="sm">
                      <ExternalLink className="mr-2 h-4 w-4" />
                      <span>Jisho</span>
                    </Button>
                  </Link>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-2 px-2">
              <p className="text-lg">{verb.meaning}</p>
              <div className="flex gap-2">
                <Badge variant="default">
                  {verb.type === "godan" ? "五段" : "一段"}
                </Badge>
                <Badge variant="default">
                  {verb.transitivity === "transitive" ? "他動詞" : "自動詞"}
                </Badge>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
