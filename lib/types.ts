export type JLPTLevel = "N5" | "N4" | "N3" | "N2" | "N1";

export type VerbEnding = 'u' | 'ku' | 'gu' | 'su' | 'tsu' | 'nu' | 'bu' | 'mu' | 'ru';

export type SoundChange = 'a' | 'i' | 'e' | 'o' | 'te';

// Create a type that represents all possible conjugation form keys
type ConjugationFormKey = `${Tense}-${Polarity}-${Formality}`;

// Create a type for irregular verb forms that only requires exceptions
type IrregularVerbForms = Partial<Record<ConjugationFormKey, string>>;

// Create a discriminated union type for JapaneseVerb
export type JapaneseVerb =
	| {
		dictionary: string;
		kana: string;
		meaning: string;
		type: 'godan' | 'ichidan';
		ending: VerbEnding;
		transitivity: 'transitive' | 'intransitive';
	}
	| {
		dictionary: string;
		kana: string;
		meaning: string;
		type: 'irregular';
		irregularForms: IrregularVerbForms;
		// Optional: specify which regular pattern to follow for non-specified forms
		regularPattern: 'godan' | 'ichidan';
		transitivity: 'transitive' | 'intransitive';
	};

export interface ConjugationRule {
	appliesTo: string[];
	transform: (verb: JapaneseVerb) => string;
}

export type Tense =
	| 'present'
	| 'past'
	| 'teForm'
	| 'potential'
	| 'passive'
	| 'causative'
	| 'imperative'
	| 'volitional'
	| 'conditionalBa'
	| 'conditionalTara'
	| 'progressive'
	| 'desire'
	| 'causativePassive'
	| 'conditionalNara'
	| 'conditionalTo'
	| 'should'
	| 'must'
	| 'attemptive'
	| 'preparatory'
	| 'regrettable'
	| 'giving'
	| 'receiving'
	| 'receivingFavor'
	| 'simultaneous'
	| 'purposeGoing'
	| 'purposeComing';

export type Polarity = 'affirmative' | 'negative';

export type Formality = 'plain' | 'polite';
