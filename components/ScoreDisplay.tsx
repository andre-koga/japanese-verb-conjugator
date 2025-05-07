import { useGameStore } from "@/stores/gameStore";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
} from "@/components/ui/chart";
import {
  Bar,
  BarChart,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";
import type { ChartConfig } from "@/components/ui/chart";

interface TenseData {
  tense: string;
  percentage: number;
  correct: number;
  total: number;
}

export default function ScoreDisplay() {
  const { score, totalQuestions, currentVerb, tenseStats } = useGameStore();

  // Don't render if practice hasn't started yet
  if (!currentVerb) return null;

  // Calculate percentage for each tense
  const tenseData: TenseData[] = Object.entries(tenseStats).map(([tense, stats]) => ({
    tense,
    percentage: stats.total > 0 ? (stats.correct / stats.total) * 100 : 0,
    correct: stats.correct,
    total: stats.total,
  }));

  const chartConfig = {
    present: {
      label: "Present",
      color: "#2563eb", // Blue
    }
  } satisfies ChartConfig;

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

      {tenseData.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Performance by Tense</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="min-h-[300px] h-[300px]">
              <BarChart data={tenseData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                  dataKey="tense"
                  tickFormatter={(value: string) => value.charAt(0).toUpperCase() + value.slice(1)}
                />
                <YAxis
                  tickFormatter={(value: number) => `${value}%`}
                  domain={[0, 100]}
                />
                <ChartTooltip
                  content={({ active, payload }) => {
                    if (!active || !payload?.length) return null;
                    const data = payload[0].payload as TenseData;
                    return (
                      <div className="rounded-lg border bg-background p-2 shadow-sm">
                        <p className="font-medium">{data.tense}</p>
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
                  fill={chartConfig[tenseData[0]?.tense as keyof typeof chartConfig]?.color || "#2563eb"}
                />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
