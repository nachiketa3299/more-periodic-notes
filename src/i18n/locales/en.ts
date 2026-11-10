const en = {
	'period.weekly': 'weekly note',
	'period.monthly': 'monthly note',
	'period.yearly': 'yearly note',
	'period.label.weekly': 'Weekly',
	'period.label.monthly': 'Monthly',
	'period.label.yearly': 'Yearly',

	'command.open': 'Open {period}',

	'settings.openInNewTab.name': 'Open in new tab',
	'settings.openInNewTab.desc': 'Open periodic notes in a new tab instead of replacing the active one.',
	'settings.heading.weekly': 'Weekly notes',
	'settings.heading.monthly': 'Monthly notes',
	'settings.heading.yearly': 'Yearly notes',
	'settings.enable.name': 'Enable',
	'settings.enable.desc':
		'Enables the "{command}" command and ribbon action. Manage ribbon visibility in Obsidian settings.',
	'settings.format.name': 'Name format',
	'settings.format.desc': 'Moment.js format for the note name. Slashes create subfolders. ',
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
	'notice.pathIsFolder': 'Cannot create note: "{path}" is a folder.',
	'notice.pathIsFile': '"{path}" is a file, not a folder.',
	'notice.templateNotFound': 'Template not found: {path}',
	'notice.openFailed': 'Could not open {period}: {message}',
};

export default en;
