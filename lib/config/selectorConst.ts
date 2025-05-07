import type { JLPTLevelData, TenseGroup } from "../types";

export const JLPTLevels: readonly JLPTLevelData[] = [
    {
        id: "N5",
        label: "N5",
        difficulty: "Beginner",
        description:
            "Basic Japanese knowledge, understanding simple conversations and text",
    },
    {
        id: "N4",
        label: "N4",
        difficulty: "Basic",
        description: "Basic everyday conversations, simple reading comprehension",
    },
    {
        id: "N3",
        label: "N3",
        difficulty: "Intermediate",
        description:
            "Understanding of everyday Japanese, reading newspapers and magazines with basic vocabulary",
    },
    {
        id: "N2",
        label: "N2",
        difficulty: "Pre-Advanced",
        description:
            "Able to understand most Japanese used in everyday situations and in a variety of circumstances",
    },
    {
        id: "N1",
        label: "N1",
        difficulty: "Advanced",
        description:
            "Comprehensive understanding of Japanese in a wide range of situations",
    },
] as const;

export const essentialGroups: readonly TenseGroup[] = [
    {
        isEssential: true,
        label: "Essential Forms",
        description: "Core grammar patterns for basic communication",
    },
    {
        isEssential: false,
        label: "Extended Forms",
        description: "Additional patterns for nuanced expression",
    },
] as const; 