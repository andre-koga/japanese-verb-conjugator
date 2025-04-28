import type { ConjugationRule, VerbEnding } from '../types';
import { transformations } from './transformations';
import { getVerbStem } from './basic';

export const conditionalRules: Record<string, ConjugationRule[]> = {
	// BA FORM
	'conditionalBa-affirmative-plain': [
		{
			appliesTo: ['ichidan'],
			transform: (verb) => getVerbStem(verb, 'ichidan') + 'れば'
		},
		{
			appliesTo: ['godan'],
			transform: (verb) => {
				if (verb.type === 'irregular') return verb.dictionary;
				if (!verb.ending) return verb.dictionary;
				const stem = getVerbStem(verb, 'godan');
				const ending = verb.ending as VerbEnding;
				return stem + transformations.godan.endings[ending].e + 'れば';
			}
		}
	],
	'conditionalBa-affirmative-polite': [
		{
			appliesTo: ['ichidan'],
			transform: (verb) => getVerbStem(verb, 'ichidan') + 'れば'
		},
		{
			appliesTo: ['godan'],
			transform: (verb) => {
				if (verb.type === 'irregular') return verb.dictionary;
				if (!verb.ending) return verb.dictionary;
				const stem = getVerbStem(verb, 'godan');
				const ending = verb.ending as VerbEnding;
				return stem + transformations.godan.endings[ending].e + 'れば';
			}
		}
	],
	'conditionalBa-negative-plain': [
		{
			appliesTo: ['ichidan'],
			transform: (verb) => getVerbStem(verb, 'ichidan') + 'なければ'
		},
		{
			appliesTo: ['godan'],
			transform: (verb) => {
				if (verb.type === 'irregular') return verb.dictionary;
				if (!verb.ending) return verb.dictionary;
				const stem = getVerbStem(verb, 'godan');
				const ending = verb.ending as VerbEnding;
				return stem + transformations.godan.endings[ending].a + 'なければ';
			}
		}
	],
	'conditionalBa-negative-polite': [
		{
			appliesTo: ['ichidan'],
			transform: (verb) => getVerbStem(verb, 'ichidan') + 'なければ'
		},
		{
			appliesTo: ['godan'],
			transform: (verb) => {
				if (verb.type === 'irregular') return verb.dictionary;
				if (!verb.ending) return verb.dictionary;
				const stem = getVerbStem(verb, 'godan');
				const ending = verb.ending as VerbEnding;
				return stem + transformations.godan.endings[ending].a + 'なければ';
			}
		}
	],

	// TARA FORM
	'conditionalTara-affirmative-plain': [
		{
			appliesTo: ['ichidan'],
			transform: (verb) => {
				if (verb.type === 'irregular') {
					// For irregular verbs, check if there's a specific form defined
					if (verb.irregularForms && verb.irregularForms['conditionalTara-affirmative-plain']) {
						return verb.irregularForms['conditionalTara-affirmative-plain'];
					}
					// Otherwise use the regular pattern if defined
					if (verb.regularPattern === 'ichidan') {
						return getVerbStem(verb, 'ichidan') + 'たら';
					}
				}
				return getVerbStem(verb, 'ichidan') + 'たら';
			}
		},
		{
			appliesTo: ['godan'],
			transform: (verb) => {
				if (verb.type === 'irregular') {
					// For irregular verbs, check if there's a specific form defined
					if (verb.irregularForms && verb.irregularForms['conditionalTara-affirmative-plain']) {
						return verb.irregularForms['conditionalTara-affirmative-plain'];
					}
					// Otherwise use the regular pattern if defined
					if (verb.regularPattern === 'godan') {
						// Special handling for irregular godan verbs
						if (verb.dictionary === 'する') return 'したら';
						if (verb.dictionary === 'くる') return 'きたら';
					}
					// For special irregular verbs like suru/kuru that don't follow regular patterns
					if (verb.dictionary === 'する') return 'したら';
					if (verb.dictionary === 'くる') return 'きたら';
					return verb.dictionary; // Fallback for other irregulars
				}

				if (!verb.ending) return verb.dictionary; // Fallback

				const stem = getVerbStem(verb, 'godan');
				const ending = verb.ending as VerbEnding;
				const teForm = stem + transformations.godan.endings[ending].te;
				return teForm.replace('て', 'たら').replace('で', 'だら');
			}
		}
	],
	'conditionalTara-affirmative-polite': [
		{
			appliesTo: ['ichidan'],
			transform: (verb) => {
				if (verb.type === 'irregular') {
					// For irregular verbs, check if there's a specific form defined
					if (verb.irregularForms && verb.irregularForms['conditionalTara-affirmative-polite']) {
						return verb.irregularForms['conditionalTara-affirmative-polite'];
					}
					// Otherwise use the regular pattern if defined
					if (verb.regularPattern === 'ichidan') {
						return getVerbStem(verb, 'ichidan') + 'たら';
					}
				}
				return getVerbStem(verb, 'ichidan') + 'たら';
			}
		},
		{
			appliesTo: ['godan'],
			transform: (verb) => {
				if (verb.type === 'irregular') {
					// For irregular verbs, check if there's a specific form defined
					if (verb.irregularForms && verb.irregularForms['conditionalTara-affirmative-polite']) {
						return verb.irregularForms['conditionalTara-affirmative-polite'];
					}
					// For special irregular verbs like suru/kuru that don't follow regular patterns
					if (verb.dictionary === 'する') return 'したら';
					if (verb.dictionary === 'くる') return 'きたら';
					return verb.dictionary; // Fallback for other irregulars
				}

				if (!verb.ending) return verb.dictionary; // Fallback

				const stem = getVerbStem(verb, 'godan');
				const ending = verb.ending as VerbEnding;
				const teForm = stem + transformations.godan.endings[ending].te;
				return teForm.replace('て', 'たら').replace('で', 'だら');
			}
		}
	],
	'conditionalTara-negative-plain': [
		{
			appliesTo: ['ichidan'],
			transform: (verb) => {
				if (verb.type === 'irregular') {
					// For irregular verbs, check if there's a specific form defined
					if (verb.irregularForms && verb.irregularForms['conditionalTara-negative-plain']) {
						return verb.irregularForms['conditionalTara-negative-plain'];
					}
					// Otherwise use the regular pattern if defined
					if (verb.regularPattern === 'ichidan') {
						return getVerbStem(verb, 'ichidan') + 'なかったら';
					}
				}
				return getVerbStem(verb, 'ichidan') + 'なかったら';
			}
		},
		{
			appliesTo: ['godan'],
			transform: (verb) => {
				if (verb.type === 'irregular') {
					// For irregular verbs, check if there's a specific form defined
					if (verb.irregularForms && verb.irregularForms['conditionalTara-negative-plain']) {
						return verb.irregularForms['conditionalTara-negative-plain'];
					}
					// For special irregular verbs like suru/kuru that don't follow regular patterns
					if (verb.dictionary === 'する') return 'しなかったら';
					if (verb.dictionary === 'くる') return 'こなかったら';
					return verb.dictionary; // Fallback for other irregulars
				}

				if (!verb.ending) return verb.dictionary; // Fallback

				const stem = getVerbStem(verb, 'godan');
				const ending = verb.ending as VerbEnding;
				return stem + transformations.godan.endings[ending].a + 'なかったら';
			}
		}
	],
	'conditionalTara-negative-polite': [
		{
			appliesTo: ['ichidan'],
			transform: (verb) => {
				if (verb.type === 'irregular') {
					// For irregular verbs, check if there's a specific form defined
					if (verb.irregularForms && verb.irregularForms['conditionalTara-negative-polite']) {
						return verb.irregularForms['conditionalTara-negative-polite'];
					}
					// Otherwise use the regular pattern if defined
					if (verb.regularPattern === 'ichidan') {
						return getVerbStem(verb, 'ichidan') + 'なかったら';
					}
				}
				return getVerbStem(verb, 'ichidan') + 'なかったら';
			}
		},
		{
			appliesTo: ['godan'],
			transform: (verb) => {
				if (verb.type === 'irregular') {
					// For irregular verbs, check if there's a specific form defined
					if (verb.irregularForms && verb.irregularForms['conditionalTara-negative-polite']) {
						return verb.irregularForms['conditionalTara-negative-polite'];
					}
					// For special irregular verbs like suru/kuru that don't follow regular patterns
					if (verb.dictionary === 'する') return 'しなかったら';
					if (verb.dictionary === 'くる') return 'こなかったら';
					return verb.dictionary; // Fallback for other irregulars
				}

				if (!verb.ending) return verb.dictionary; // Fallback

				const stem = getVerbStem(verb, 'godan');
				const ending = verb.ending as VerbEnding;
				return stem + transformations.godan.endings[ending].a + 'なかったら';
			}
		}
	]
};
