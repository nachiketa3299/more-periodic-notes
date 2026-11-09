import { App, Notice, TFile, TFolder, moment, normalizePath } from 'obsidian';
import { t } from './i18n';
import type { PeriodDefinition } from './periods';
import type { PeriodSettings } from './settings';

type Moment = ReturnType<typeof moment>;

const MARKDOWN_EXTENSION = '.md';

export function resolveFormat(period: PeriodDefinition, settings: PeriodSettings): string {
	return settings.format.trim() || period.defaultFormat;
}

export function periodicNotePath(period: PeriodDefinition, settings: PeriodSettings, date: Moment): string {
	const name = date.format(resolveFormat(period, settings));
	const folder = settings.folder.trim().replace(/^\/+|\/+$/g, '');
	return normalizePath(folder ? `${folder}/${name}${MARKDOWN_EXTENSION}` : `${name}${MARKDOWN_EXTENSION}`);
}

export function renderTemplate(raw: string, period: PeriodDefinition, date: Moment, title: string): string {
	const start = date.clone().startOf(period.unit);
	const end = date.clone().endOf(period.unit);
	const formatted =
		(value: Moment, fallback: string) =>
		(_match: string, format?: string): string =>
			value.format(format?.trim() || fallback);

	return raw
		.replace(/\{\{\s*title\s*\}\}/gi, title)
		.replace(/\{\{\s*date\s*(?::([^}]*))?\s*\}\}/gi, formatted(date, 'YYYY-MM-DD'))
		.replace(/\{\{\s*time\s*(?::([^}]*))?\s*\}\}/gi, formatted(date, 'HH:mm'))
		.replace(/\{\{\s*start\s*(?::([^}]*))?\s*\}\}/gi, formatted(start, 'YYYY-MM-DD'))
		.replace(/\{\{\s*end\s*(?::([^}]*))?\s*\}\}/gi, formatted(end, 'YYYY-MM-DD'));
}

export class PeriodicNoteOpener {
	constructor(private readonly app: App) {}

	async open(
		period: PeriodDefinition,
		settings: PeriodSettings,
		openInNewTab: boolean,
		date: Moment = moment(),
	): Promise<void> {
		const path = periodicNotePath(period, settings, date);
		const file = await this.getOrCreate(path, period, settings, date);
		if (!file) {
			return;
		}
		const leaf = this.app.workspace.getLeaf(openInNewTab ? 'tab' : false);
		await leaf.openFile(file);
	}

	private async getOrCreate(
		path: string,
		period: PeriodDefinition,
		settings: PeriodSettings,
		date: Moment,
	): Promise<TFile | null> {
		const existing = this.app.vault.getAbstractFileByPath(path);
		if (existing instanceof TFile) {
			return existing;
		}
		if (existing) {
			new Notice(t('notice.pathIsFolder', { path }));
			return null;
		}

		await this.ensureParentFolder(path);
		const title = path.slice(path.lastIndexOf('/') + 1, -MARKDOWN_EXTENSION.length);
		const template = await this.readTemplate(settings.template);
		const content = renderTemplate(template, period, date, title);
		return this.app.vault.create(path, content);
	}

	private async ensureParentFolder(path: string): Promise<void> {
		const separator = path.lastIndexOf('/');
		if (separator < 0) {
			return;
		}
		let current = '';
		for (const segment of path.slice(0, separator).split('/')) {
			current = current ? `${current}/${segment}` : segment;
			const existing = this.app.vault.getAbstractFileByPath(current);
			if (existing instanceof TFolder) {
				continue;
			}
			if (existing) {
				throw new Error(t('notice.pathIsFile', { path: current }));
			}
			await this.app.vault.createFolder(current);
		}
	}

	private async readTemplate(templatePath: string): Promise<string> {
		const trimmed = templatePath.trim();
		if (!trimmed) {
			return '';
		}
		const file = this.resolveTemplateFile(trimmed);
		if (!file) {
			new Notice(t('notice.templateNotFound', { path: trimmed }));
			return '';
		}
		return this.app.vault.cachedRead(file);
	}

	private resolveTemplateFile(path: string): TFile | null {
		const withExtension = path.endsWith(MARKDOWN_EXTENSION) ? path : `${path}${MARKDOWN_EXTENSION}`;
		const direct = this.app.vault.getAbstractFileByPath(normalizePath(withExtension));
		if (direct instanceof TFile) {
			return direct;
		}
		return this.app.metadataCache.getFirstLinkpathDest(path.replace(/\.md$/, ''), '');
	}
}
