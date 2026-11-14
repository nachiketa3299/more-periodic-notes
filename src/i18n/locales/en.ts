const en = {
	'period.weekly': 'weekly note',
	'period.monthly': 'monthly note',
	'period.yearly': 'yearly note',
	'period.label.weekly': 'Weekly',
	'period.label.monthly': 'Monthly',
	'period.label.yearly': 'Yearly',

	'command.open': 'Open {period}',
	'command.findByDate': 'Find periodic notes by date',

	'picker.placeholder': 'Enter a date in YYYY-MM-DD format',
	'picker.invalidDate': 'This date is not valid.',
	'picker.copy': 'Copy weekly note name',
	'picker.create': 'Create {period}',
	'picker.navigate': 'Navigate',
	'picker.choose': 'Run',
	'picker.close': 'Close',

	'settings.openInNewTab.name': 'Open in new tab',
	'settings.openInNewTab.desc': 'Open periodic notes in a new tab instead of replacing the active one.',
	'settings.heading.weekly': 'Weekly notes',
	'settings.heading.monthly': 'Monthly notes',
	'settings.heading.yearly': 'Yearly notes',
	'settings.enable.name': 'Enable',
	'settings.enable.desc':
		'Enables opening or creating this note from "{command}", the ribbon, and the date lookup. Manage ribbon visibility in Obsidian settings.',
	'settings.format.name': 'Name format',
	'settings.format.desc': 'Moment.js format for the file name. The folder setting determines its location. ',
	'settings.format.reference': 'Syntax reference',
	'settings.format.current': 'Current note: ',
	'settings.folder.name': 'Folder',
	'settings.folder.desc': 'New notes are created here. Leave empty for the vault root.',
	'settings.folder.placeholder': 'Example: Journal/{label}',
	'settings.template.name': 'Template file',
	'settings.template.desc':
		'Used when a note is created. Supports {{title}}, {{date}}, {{time}}, {{start}} and {{end}}, each with an optional :FORMAT.',
	'settings.template.placeholder': 'Example: Templates/{label}',

	'notice.periodDisabled': 'Opening the {period} is disabled. Enable it in the plugin settings.',
	'notice.invalidName': 'Check the name format for the {period}. File names cannot be empty or contain / or \\.',
	'notice.copied': 'Copied: {name}',
	'notice.copyFailed': 'Could not copy to the clipboard.',
	'notice.pathIsFolder': 'Cannot create note: "{path}" is a folder.',
	'notice.pathIsFile': '"{path}" is a file, not a folder.',
	'notice.templateNotFound': 'Template not found: {path}',
	'notice.openFailed': 'Could not open {period}: {message}',
};

export default en;
