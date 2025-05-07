import { useGameStore } from "@/stores/gameStore";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartContainer,
  ChartConfig,
  ChartTooltip,
} from "@/components/ui/chart";
import { Bar, BarChart, XAxis, YAxis, CartesianGrid } from "recharts";
import type { Tense, Polarity, Formality } from "@/lib/types";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface StatsData {
  name: string;
  percentage: number;
  correct: number;
  total: number;
}

const tenseLabels: Record<Tense, string> = {
  "present indicative": "Present Indicative",
  "past indicative": "Past Indicative",
  "te form": "Te-form",
  presumptive: "Presumptive",
  "past presumptive": "Past Presumptive",
  "present progressive": "Present Progressive",
  "past progressive": "Past Progressive",
  "conditional ba": "Conditional (Ba)",
  "conditional tara": "Conditional (Tara)",
  potential: "Potential",
  causative: "Causative",
  passive: "Passive",
  imperative: "Imperative",
};

const polarityLabels: Record<Polarity, string> = {
  affirmative: "Affirmative",
  negative: "Negative",
};

const formalityLabels: Record<Formality, string> = {
  plain: "Plain",
  polite: "Polite",
};

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "#2563eb",
  },
  mobile: {
    label: "Mobile",
    color: "#60a5fa",
  },
} satisfies ChartConfig;

function StatsChart({ data, title }: { data: StatsData[]; title: string }) {
  if (data.length === 0) return null;

  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={chartConfig}
          className="h-[300px] min-h-[300px]"
        >
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" tickFormatter={(value: string) => value} />
            <YAxis
              tickFormatter={(value: number) => `${value}%`}
              domain={[0, 100]}
            />
            <ChartTooltip
              content={({ active, payload }) => {
                if (!active || !payload?.length) return null;
                const data = payload[0].payload as StatsData;
                return (
                  <div className="bg-background rounded-lg border p-2 shadow-sm">
                    <p className="font-medium">{data.name}</p>
                    <p className="text-muted-foreground text-sm">
                      {data.correct} / {data.total} correct
                    </p>
                    <p className="font-medium">{data.percentage.toFixed(1)}%</p>
                  </div>
                );
              }}
            />
            <Bar
              dataKey="percentage"
              name="Correct Percentage"
              radius={[4, 4, 0, 0]}
              fill="#2563eb"
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}

export default function ScoreDisplay() {
  const {
    score,
    totalQuestions,
    currentVerb,
    tenseStats,
    polarityStats,
    formalityStats,
  } = useGameStore();

  // Don't render if practice hasn't started yet
  if (!currentVerb) return null;

  // Calculate stats for each category
  const tenseData: StatsData[] = Object.entries(tenseStats).map(
    ([tense, stats]) => ({
      name: tenseLabels[tense as Tense],
      percentage: stats.total > 0 ? (stats.correct / stats.total) * 100 : 0,
      correct: stats.correct,
      total: stats.total,
    }),
  );

  const polarityData: StatsData[] = Object.entries(polarityStats).map(
    ([polarity, stats]) => ({
      name: polarityLabels[polarity as Polarity],
      percentage: stats.total > 0 ? (stats.correct / stats.total) * 100 : 0,
      correct: stats.correct,
      total: stats.total,
    }),
  );

  const formalityData: StatsData[] = Object.entries(formalityStats).map(
    ([formality, stats]) => ({
      name: formalityLabels[formality as Formality],
      percentage: stats.total > 0 ? (stats.correct / stats.total) * 100 : 0,
      correct: stats.correct,
      total: stats.total,
    }),
  );

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Overall Score</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-bold">
            {score} / {totalQuestions}
          </p>
          <p className="text-muted-foreground text-sm">
            {totalQuestions > 0
              ? `${Math.round((score / totalQuestions) * 100)}% correct`
              : "No questions answered yet"}
          </p>
        </CardContent>
      </Card>

      <Tabs defaultValue="tense" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="tense">By Tense</TabsTrigger>
          <TabsTrigger value="polarity">By Polarity</TabsTrigger>
          <TabsTrigger value="formality">By Formality</TabsTrigger>
        </TabsList>
        <TabsContent value="tense">
          <StatsChart data={tenseData} title="Performance by Tense" />
        </TabsContent>
        <TabsContent value="polarity">
          <StatsChart data={polarityData} title="Performance by Polarity" />
        </TabsContent>
        <TabsContent value="formality">
          <StatsChart data={formalityData} title="Performance by Formality" />
        </TabsContent>
      </Tabs>
    </div>
  );
}
