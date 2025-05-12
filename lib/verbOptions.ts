import type { Formality, Polarity, Tense, VerbType, Transitivity } from "./types";

interface TenseOption {
  id: Tense;
  label: string;
  description: string;
  longDescription: string;
  hasFormality: boolean;
  hasPolarity: boolean;
  allowedCombinations?: {
    polarity: Polarity;
    formality: Formality;
  }[];
}

interface PolarityOption {
  id: Polarity;
  label: string;
  description: string;
  longDescription: string;
}

interface FormalityOption {
  id: Formality;
  label: string;
  description: string;
  longDescription: string;
}

interface VerbTypeOption {
  id: VerbType;
  label: string;
  description: string;
  longDescription: string;
}

interface TransitivityOption {
  id: Transitivity;
  label: string;
  description: string;
  longDescription: string;
}

export const tenseOptions: TenseOption[] = [
  {
    id: "present indicative",
    label: "Present Indicative",
    description: "現在形",
    hasFormality: true,
    hasPolarity: true,
    longDescription:
      "The present tense (dictionary form) is used to express habitual actions, general truths, and future events. It's the base form of Japanese verbs.",
    allowedCombinations: [
      { polarity: "affirmative", formality: "polite" },
      { polarity: "negative", formality: "plain" },
      { polarity: "negative", formality: "polite" }
    ],
  },
  {
    id: "te form",
    label: "Te-form",
    description: "て形",
    hasFormality: false,
    hasPolarity: false,
    longDescription:
      "The te-form is a versatile connecting form used to link verbs, create requests, show ongoing actions, and form many compound verbs.",
  },
  {
    id: "presumptive",
    label: "Presumptive",
    description: "意向形",
    hasFormality: true,
    hasPolarity: true,
    longDescription:
      'The presumptive form expresses intention or conjecture, similar to "let\'s" or "probably" in English. It\'s commonly used for suggesting activities or expressing likelihood.',
  },
  {
    id: "imperative",
    label: "Imperative",
    description: "命令形",
    hasFormality: true,
    hasPolarity: true,
    longDescription:
      "The imperative form is used for commands or strong requests. The plain form is considered rude except among close friends. The negative form (prohibitive) is used to tell someone not to do something, with な being the plain form and ないでください being the polite form.",
  },
  {
    id: "past indicative",
    label: "Past Indicative",
    description: "過去形",
    hasFormality: true,
    hasPolarity: true,
    longDescription:
      "The past tense indicates completed actions or states. It's formed by changing the end of the verb (-た form).",
  },

  {
    id: "past presumptive",
    label: "Past Presumptive",
    description: "過去推量形",
    hasFormality: true,
    hasPolarity: true,
    longDescription:
      "The past presumptive form expresses conjecture about past events, similar to 'must have' or 'probably' in English.",
  },
  {
    id: "present progressive",
    label: "Present Progressive",
    description: "ている形",
    hasFormality: true,
    hasPolarity: true,
    allowedCombinations: [
      { polarity: "affirmative", formality: "plain" },
      { polarity: "affirmative", formality: "polite" },
      { polarity: "negative", formality: "polite" }
    ],
    longDescription:
      "The progressive form indicates ongoing actions or states. It combines the te-form with iru/imasu and can also show resultant states.",
  },
  {
    id: "past progressive",
    label: "Past Progressive",
    description: "ていた形",
    hasFormality: true,
    hasPolarity: true,
    allowedCombinations: [
      { polarity: "affirmative", formality: "plain" },
      { polarity: "affirmative", formality: "polite" },
      { polarity: "negative", formality: "polite" }
    ],
    longDescription:
      "The past progressive form indicates actions or states that were ongoing in the past. It's formed by conjugating the progressive form into the past tense.",
  },
  {
    id: "conditional ba",
    label: "Conditional (Ba)",
    description: "ば形",
    hasFormality: false,
    hasPolarity: true,
    longDescription:
      'The ba-conditional expresses hypothetical conditions ("if X, then Y") and is used for general or natural consequences.',
  },
  {
    id: "conditional tara",
    label: "Conditional (Tara)",
    description: "たら形",
    hasFormality: false,
    hasPolarity: true,
    longDescription:
      'The tara-conditional is used for "if/when" conditions with a sequential nuance. It\'s often used for unexpected discoveries or future uncertainties.',
  },
  {
    id: "potential",
    label: "Potential",
    description: "可能形",
    hasFormality: true,
    hasPolarity: true,
    longDescription:
      'The potential form expresses the ability to do something ("can do"). It\'s formed differently for ichidan and godan verbs.',
  },
  {
    id: "causative",
    label: "Causative",
    description: "使役形",
    hasFormality: true,
    hasPolarity: true,
    longDescription:
      "The causative form expresses making or letting someone do something. It indicates permission or coercion.",
  },
  {
    id: "passive",
    label: "Passive",
    description: "受身形",
    hasFormality: true,
    hasPolarity: true,
    longDescription:
      'The passive form is used when the subject is being acted upon, similar to "is done" in English. It can also express adversity in Japanese.',
  },
];

export const polarityOptions: PolarityOption[] = [
  {
    id: "affirmative",
    label: "Affirmative",
    description: "肯定",
    longDescription: "The affirmative form is the positive form of the verb, expressing that an action is done or a state exists. It's the basic form used in statements and questions."
  },
  {
    id: "negative",
    label: "Negative",
    description: "否定",
    longDescription: "The negative form expresses that an action is not done or a state does not exist. It's formed by adding ない (plain) or ません (polite) to the verb stem."
  }
];

export const formalityOptions: FormalityOption[] = [
  {
    id: "plain",
    label: "Plain",
    description: "普通体",
    longDescription: "The plain form (だ/る) is used in casual situations, with friends, family, and in informal writing. It's the basic form of Japanese verbs and is used in subordinate clauses."
  },
  {
    id: "polite",
    label: "Polite",
    description: "丁寧体",
    longDescription: "The polite form (です/ます) is used in formal situations, with people you don't know well, and in business settings. It shows respect and is considered more appropriate in public situations."
  }
];

export const verbTypeOptions: VerbTypeOption[] = [
  {
    id: "godan",
    label: "Godan",
    description: "五段活用",
    longDescription: "Godan verbs are the most common type of Japanese verb. They have five possible endings: -u, -ku, -gu, -su, -tsu. The ending changes depending on the verb stem."
  },
  {
    id: "ichidan",
    label: "Ichidan",
    description: "一段活用",
    longDescription: "Ichidan verbs are a type of Japanese verb that have only one possible ending. They are the simplest type of Japanese verb and are used in many everyday situations."
  }
];

export const transitivityOptions: TransitivityOption[] = [
  {
    id: "transitive",
    label: "Transitive",
    description: "他動詞",
    longDescription: "Transitive verbs take an object and are used to describe actions that can be done to or with an object."
  },
  {
    id: "intransitive",
    label: "Intransitive",
    description: "自動詞",
    longDescription: "Intransitive verbs do not take an object and are used to describe actions that are done without an object."
  }
];

