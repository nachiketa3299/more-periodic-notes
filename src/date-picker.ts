import type { Moment } from 'moment';
import { Notice, SuggestModal, TFile, moment } from 'obsidian';
import { t } from './i18n';
import type MorePeriodicNotesPlugin from './main';
import { resolvePeriodicNote } from './notes';
import { PERIODS, type PeriodDefinition } from './periods';

const DATE_FORMAT = 'YYYY-MM-DD';

type DateAction =
	| { type: 'copy'; name: string }
	| { type: 'open'; name: string; period: PeriodDefinition; date: Moment; exists: boolean };

export class DatePickerModal extends SuggestModal<DateAction> {
	constructor(private readonly plugin: MorePeriodicNotesPlugin) {
		super(plugin.app);
		this.setPlaceholder(t('picker.placeholder'));
		this.inputEl.setAttribute('aria-label', t('command.findByDate'));
		this.inputEl.value = moment().locale('en').format(DATE_FORMAT);
		this.setInstructions([
			{ command: '↑↓', purpose: t('picker.navigate') },
			{ command: '↵', purpose: t('picker.choose') },
			{ command: 'esc', purpose: t('picker.close') },
		]);
	}

	onOpen(): void {
		super.onOpen();
		this.inputEl.dispatchEvent(new Event('input', { bubbles: true }));
		this.inputEl.select();
	}

	getSuggestions(query: string): DateAction[] {
		const input = query.trim();
		this.emptyStateText = t('picker.placeholder');
		if (!/^\d{4}-\d{2}-\d{2}$/.test(input)) {
			return [];
		}
		const date = moment(input, DATE_FORMAT, true) as Moment;
		if (!date.isValid()) {
			this.emptyStateText = t('picker.invalidDate');
			return [];
		}

		const actions: DateAction[] = [];
		try {
			for (const period of PERIODS) {
				const settings = this.plugin.settings.periods[period.id];
				if (!settings.enabled && period.id !== 'weekly') {
					continue;
				}
				const target = resolvePeriodicNote(period, settings, date);
				if (period.id === 'weekly') {
					actions.push({ type: 'copy', name: target.name });
				}
				if (settings.enabled) {
					actions.push({
						type: 'open',
						name: target.name,
						period,
						date,
						exists: this.app.vault.getAbstractFileByPath(target.path) instanceof TFile,
					});
				}
			}
		} catch (error) {
			this.emptyStateText = error instanceof Error ? error.message : String(error);
			return [];
		}
		return actions;
	}

	renderSuggestion(action: DateAction, el: HTMLElement): void {
		const label =
			action.type === 'copy'
				? t('picker.copy')
				: t(action.exists ? 'command.open' : 'picker.create', { period: t(`period.${action.period.id}`) });
		const content = el.createDiv({ cls: 'suggestion-content' });
		content.createDiv({ cls: 'suggestion-title', text: label });
		content.createDiv({ cls: 'suggestion-note', text: action.name });
	}

	async onChooseSuggestion(action: DateAction): Promise<void> {
		if (action.type === 'open') {
			await this.plugin.openPeriodicNote(action.period, action.date);
			return;
		}
		try {
			await this.inputEl.ownerDocument.defaultView!.navigator.clipboard.writeText(action.name);
			new Notice(t('notice.copied', { name: action.name }));
		} catch (error) {
			console.error('[more-periodic-notes]', error);
			new Notice(t('notice.copyFailed'));
		}
	}
}
