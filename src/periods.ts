import { PERIOD_ICONS } from './icons';

export type PeriodId = 'weekly' | 'monthly' | 'yearly';

export type PeriodUnit = 'isoWeek' | 'month' | 'year';

export interface PeriodDefinition {
	id: PeriodId;
	unit: PeriodUnit;
	defaultFormat: string;
	icon: string;
}

export const PERIODS: readonly PeriodDefinition[] = [
	{ id: 'weekly', unit: 'isoWeek', defaultFormat: 'GGGG[w]WW', icon: PERIOD_ICONS.weekly.id },
	{ id: 'monthly', unit: 'month', defaultFormat: 'YYYY[m]MM', icon: PERIOD_ICONS.monthly.id },
	{ id: 'yearly', unit: 'year', defaultFormat: 'YYYY[y]', icon: PERIOD_ICONS.yearly.id },
];
