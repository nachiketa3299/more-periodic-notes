export type PeriodId = 'weekly' | 'monthly' | 'yearly';

export type PeriodUnit = 'isoWeek' | 'month' | 'year';

export interface PeriodDefinition {
	id: PeriodId;
	unit: PeriodUnit;
	defaultFormat: string;
	icon: string;
}

export const PERIODS: readonly PeriodDefinition[] = [
	{ id: 'weekly', unit: 'isoWeek', defaultFormat: 'GGGG[w]WW', icon: 'calendar-range' },
	{ id: 'monthly', unit: 'month', defaultFormat: 'YYYY[m]MM', icon: 'calendar' },
	{ id: 'yearly', unit: 'year', defaultFormat: 'YYYY[y]', icon: 'calendar-days' },
];
