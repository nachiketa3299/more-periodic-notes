import type { Moment } from 'moment';
import { Notice, Plugin, moment } from 'obsidian';
import { DatePickerModal } from './date-picker';
import { t } from './i18n';
import { registerPeriodIcons } from './icons';
import { PeriodicNoteOpener } from './notes';
import { PERIODS, type PeriodDefinition } from './periods';
import {
	DEFAULT_SETTINGS,
	MorePeriodicNotesSettingTab,
	mergeSettings,
	type MorePeriodicNotesSettings,
} from './settings';

export default class MorePeriodicNotesPlugin extends Plugin {
	settings: MorePeriodicNotesSettings = DEFAULT_SETTINGS;
	private opener!: PeriodicNoteOpener;

	async onload(): Promise<void> {
		await this.loadSettings();
		this.register(registerPeriodIcons());
		this.opener = new PeriodicNoteOpener(this.app);
		this.addSettingTab(new MorePeriodicNotesSettingTab(this.app, this));

		for (const period of PERIODS) {
			this.registerPeriodActions(period);
		}
		this.addCommand({
			id: 'find-periodic-note-by-date',
			name: t('command.findByDate'),
			callback: () => new DatePickerModal(this).open(),
		});
	}

	async loadSettings(): Promise<void> {
		this.settings = mergeSettings(await this.loadData());
	}

	async saveSettings(): Promise<void> {
		await this.saveData(this.settings);
	}

	async openPeriodicNote(period: PeriodDefinition, date: Moment): Promise<void> {
		if (!this.isPeriodEnabled(period)) {
			new Notice(t('notice.periodDisabled', { period: t(`period.${period.id}`) }));
			return;
		}

		try {
			await this.opener.open(period, this.settings.periods[period.id], date, this.settings.openInNewTab);
		} catch (error) {
			console.error('[more-periodic-notes]', error);
			const message = error instanceof Error ? error.message : String(error);
			new Notice(t('notice.openFailed', { period: t(`period.${period.id}`), message }));
		}
	}

	private isPeriodEnabled(period: PeriodDefinition): boolean {
		return this.settings.periods[period.id].enabled;
	}

	private registerPeriodActions(period: PeriodDefinition): void {
		const name = t('command.open', { period: t(`period.${period.id}`) });

		this.addCommand({
			id: `open-${period.id}-note`,
			name,
			icon: period.icon,
			checkCallback: (checking) => {
				if (!this.isPeriodEnabled(period)) {
					return false;
				}
				if (!checking) {
					void this.openPeriodicNote(period, moment() as Moment);
				}
				return true;
			},
		});

		this.addRibbonIcon(period.icon, name, () => {
			void this.openPeriodicNote(period, moment() as Moment);
		});
	}
}
