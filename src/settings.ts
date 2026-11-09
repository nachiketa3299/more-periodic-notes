import {
	App,
	PluginSettingTab,
	type SettingDefinition,
	type SettingDefinitionGroup,
	type SettingDefinitionItem,
	type TFile,
} from 'obsidian';
import { t } from './i18n';
import type MorePeriodicNotesPlugin from './main';
import { PERIODS, type PeriodDefinition, type PeriodId } from './periods';

export interface PeriodSettings {
	enabled: boolean;
	folder: string;
	format: string;
	template: string;
}

export interface MorePeriodicNotesSettings {
	openInNewTab: boolean;
	periods: Record<PeriodId, PeriodSettings>;
}

const periodDefaults = (enabled: boolean): PeriodSettings => ({
	enabled,
	folder: '',
	format: '',
	template: '',
});

export const DEFAULT_SETTINGS: MorePeriodicNotesSettings = {
	openInNewTab: false,
	periods: {
		weekly: periodDefaults(true),
		monthly: periodDefaults(true),
		yearly: periodDefaults(true),
	},
};

export function mergeSettings(saved: unknown): MorePeriodicNotesSettings {
	const data = (saved ?? {}) as Partial<MorePeriodicNotesSettings>;
	const periods = {} as Record<PeriodId, PeriodSettings>;
	for (const period of PERIODS) {
		periods[period.id] = { ...DEFAULT_SETTINGS.periods[period.id], ...(data.periods?.[period.id] ?? {}) };
	}
	return { ...DEFAULT_SETTINGS, ...data, periods };
}

const OPEN_IN_NEW_TAB_KEY = 'openInNewTab';

type PeriodField = keyof PeriodSettings;

function periodKey(period: PeriodDefinition, field: PeriodField): string {
	return `${period.id}.${field}`;
}

function parsePeriodKey(key: string): [PeriodId, PeriodField] | null {
	const [periodId, field] = key.split('.');
	const period = PERIODS.find((candidate) => candidate.id === periodId);
	if (!period || !field || !(field in DEFAULT_SETTINGS.periods[period.id])) {
		return null;
	}
	return [period.id, field as PeriodField];
}

export class MorePeriodicNotesSettingTab extends PluginSettingTab {
	constructor(
		app: App,
		private readonly plugin: MorePeriodicNotesPlugin,
	) {
		super(app, plugin);
	}

	getSettingDefinitions(): SettingDefinitionItem[] {
		return [
			{
				name: t('settings.openInNewTab.name'),
				desc: t('settings.openInNewTab.desc'),
				control: { type: 'toggle', key: OPEN_IN_NEW_TAB_KEY },
			},
			...PERIODS.map((period) => this.periodGroup(period)),
		];
	}

	getControlValue(key: string): unknown {
		if (key === OPEN_IN_NEW_TAB_KEY) {
			return this.plugin.settings.openInNewTab;
		}
		const parsed = parsePeriodKey(key);
		return parsed ? this.plugin.settings.periods[parsed[0]][parsed[1]] : undefined;
	}

	async setControlValue(key: string, value: unknown): Promise<void> {
		if (key === OPEN_IN_NEW_TAB_KEY) {
			this.plugin.settings.openInNewTab = Boolean(value);
		} else {
			const parsed = parsePeriodKey(key);
			if (!parsed) {
				return;
			}
			const settings = this.plugin.settings.periods[parsed[0]];
			if (parsed[1] === 'enabled') {
				settings.enabled = Boolean(value);
			} else {
				settings[parsed[1]] = typeof value === 'string' ? value.trim() : '';
			}
		}
		await this.plugin.saveSettings();
		this.refreshDomState();
	}

	private periodGroup(period: PeriodDefinition): SettingDefinitionGroup {
		const label = t(`period.label.${period.id}`);
		const command = t('command.open', { period: t(`period.${period.id}`) });
		const enabled = () => this.plugin.settings.periods[period.id].enabled;

		return {
			type: 'group',
			heading: t(`settings.heading.${period.id}`),
			items: [
				{
					name: t('settings.enable.name'),
					desc: t('settings.enable.desc', { command }),
					control: { type: 'toggle', key: periodKey(period, 'enabled') },
				},
				this.formatDefinition(period, enabled),
				{
					name: t('settings.folder.name'),
					desc: t('settings.folder.desc'),
					visible: enabled,
					control: {
						type: 'folder',
						key: periodKey(period, 'folder'),
						placeholder: t('settings.folder.placeholder', { label }),
						includeRoot: true,
					},
				},
				{
					name: t('settings.template.name'),
					desc: t('settings.template.desc'),
					visible: enabled,
					control: {
						type: 'file',
						key: periodKey(period, 'template'),
						placeholder: t('settings.template.placeholder', { label }),
						filter: (file: TFile) => file.extension === 'md',
					},
				},
			],
		};
	}

	private formatDefinition(period: PeriodDefinition, visible: () => boolean): SettingDefinition {
		let sampleEl: HTMLElement | undefined;
		const desc = createFragment((fragment) => {
			fragment.appendText(t('settings.format.desc'));
			fragment.createEl('a', {
				text: t('settings.format.reference'),
				href: 'https://momentjs.com/docs/#/displaying/format/',
			});
			fragment.createEl('br');
			fragment.appendText(t('settings.format.current'));
			sampleEl = fragment.createEl('b', { cls: 'u-pop' });
		});

		return {
			name: t('settings.format.name'),
			desc,
			visible,
			render: (setting) => {
				setting.addMomentFormat((component) => {
					component.setDefaultFormat(period.defaultFormat).setPlaceholder(period.defaultFormat);
					if (sampleEl) {
						component.setSampleEl(sampleEl);
					}
					component.setValue(this.plugin.settings.periods[period.id].format).onChange(async (value) => {
						this.plugin.settings.periods[period.id].format = value.trim();
						await this.plugin.saveSettings();
					});
					component.updateSample();
				});
			},
		};
	}
}
