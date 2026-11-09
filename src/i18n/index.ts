import { getLanguage } from 'obsidian';
import en from './locales/en';
import ko from './locales/ko';

export type Locale = typeof en;
export type LocaleKey = keyof Locale;

const locales: Record<string, Partial<Locale>> = { en, ko };

let active: Partial<Locale> | undefined;

function current(): Partial<Locale> {
	if (!active) {
		active = locales[getLanguage()] ?? en;
	}
	return active;
}

export function t(key: LocaleKey, vars: Record<string, string> = {}): string {
	const template = current()[key] ?? en[key];
	return template.replace(/\{(\w+)\}/g, (match, name: string) => vars[name] ?? match);
}
