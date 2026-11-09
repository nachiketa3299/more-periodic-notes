import { App, PluginSettingTab, Setting } from 'obsidian';
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

export class MorePeriodicNotesSettingTab extends PluginSettingTab {
	constructor(
		app: App,
		private readonly plugin: MorePeriodicNotesPlugin,
	) {
		super(app, plugin);
	}

	display(): void {
		const { containerEl } = this;
		containerEl.empty();

		new Setting(containerEl)
			.setName(t('settings.openInNewTab.name'))
			.setDesc(t('settings.openInNewTab.desc'))
			.addToggle((toggle) =>
				toggle.setValue(this.plugin.settings.openInNewTab).onChange(async (value) => {
					this.plugin.settings.openInNewTab = value;
					await this.plugin.saveSettings();
				}),
			);

		for (const period of PERIODS) {
			this.displayPeriod(containerEl, period);
		}
	}

	private displayPeriod(containerEl: HTMLElement, period: PeriodDefinition): void {
		const settings = this.plugin.settings.periods[period.id];
		const save = () => this.plugin.saveSettings();
		const label = t(`period.label.${period.id}`);
		const command = t('command.open', { period: t(`period.${period.id}`) });

		new Setting(containerEl).setName(t(`settings.heading.${period.id}`)).setHeading();

		new Setting(containerEl)
			.setName(t('settings.enable.name'))
			.setDesc(t('settings.enable.desc', { command }))
			.addToggle((toggle) =>
				toggle.setValue(settings.enabled).onChange(async (value) => {
					settings.enabled = value;
					await save();
					this.display();
				}),
			);

		if (!settings.enabled) {
			return;
		}

		const formatDesc = document.createDocumentFragment();
		formatDesc.appendText(t('settings.format.desc'));
		formatDesc.createEl('a', {
			text: t('settings.format.reference'),
			href: 'https://momentjs.com/docs/#/displaying/format/',
		});
		formatDesc.createEl('br');
		formatDesc.appendText(t('settings.format.current'));
		const sampleEl = formatDesc.createEl('b', { cls: 'u-pop' });

		new Setting(containerEl)
			.setName(t('settings.format.name'))
			.setDesc(formatDesc)
			.addMomentFormat((component) => {
				component
					.setDefaultFormat(period.defaultFormat)
					.setPlaceholder(period.defaultFormat)
					.setSampleEl(sampleEl)
					.setValue(settings.format)
					.onChange(async (value) => {
						settings.format = value.trim();
						await save();
					});
				component.updateSample();
			});

		new Setting(containerEl)
			.setName(t('settings.folder.name'))
			.setDesc(t('settings.folder.desc'))
			.addText((text) =>
				text
					.setPlaceholder(t('settings.folder.placeholder', { label }))
					.setValue(settings.folder)
					.onChange(async (value) => {
						settings.folder = value.trim();
						await save();
					}),
			);

		new Setting(containerEl)
			.setName(t('settings.template.name'))
			.setDesc(t('settings.template.desc'))
			.addText((text) =>
				text
					.setPlaceholder(t('settings.template.placeholder', { label }))
					.setValue(settings.template)
					.onChange(async (value) => {
						settings.template = value.trim();
						await save();
					}),
			);
	}
}
