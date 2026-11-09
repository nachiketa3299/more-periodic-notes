import { Notice, Plugin } from 'obsidian';
import { t } from './i18n';
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
		this.opener = new PeriodicNoteOpener(this.app);
		this.addSettingTab(new MorePeriodicNotesSettingTab(this.app, this));

		for (const period of PERIODS) {
			this.addOpenCommand(period);
		}
	}

	async loadSettings(): Promise<void> {
		this.settings = mergeSettings(await this.loadData());
	}

	async saveSettings(): Promise<void> {
		await this.saveData(this.settings);
	}

	async openPeriodicNote(period: PeriodDefinition): Promise<void> {
		try {
			await this.opener.open(period, this.settings.periods[period.id], this.settings.openInNewTab);
		} catch (error) {
			console.error('[more-periodic-notes]', error);
			const message = error instanceof Error ? error.message : String(error);
			new Notice(t('notice.openFailed', { period: t(`period.${period.id}`), message }));
		}
	}

	private addOpenCommand(period: PeriodDefinition): void {
		this.addCommand({
			id: `open-${period.id}-note`,
			name: t('command.open', { period: t(`period.${period.id}`) }),
			icon: period.icon,
			checkCallback: (checking) => {
				if (!this.settings.periods[period.id].enabled) {
					return false;
				}
				if (!checking) {
					void this.openPeriodicNote(period);
				}
				return true;
			},
		});
	}
}
