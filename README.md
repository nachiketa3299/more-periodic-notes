# More Periodic Notes

Open this week's, this month's and this year's note with a command or ribbon button, on desktop and mobile.

Obsidian's Daily notes plugin covers today. This plugin adds the same for the other periods:

- **Open weekly note** (ISO week, e.g. `2026w46`)
- **Open monthly note** (e.g. `2026m11`)
- **Open yearly note** (e.g. `2026y`)

The note is created from an optional template if it does not exist yet.

## Ribbon and mobile Quick Access

The plugin adds a ribbon action for each period. The calendar icons show **W** for weekly, **M** for monthly and **Y** for yearly notes. Each action uses the same folder, name format, template and tab settings as its command.

On mobile, assign one of these actions to the Quick Access ribbon button:

1. Open **Settings → Appearance → Ribbon menu → Manage**.
2. Set **Quick access** to **Open weekly note**, **Open monthly note** or **Open yearly note**.

A short press opens the selected period's note. A long press opens the full ribbon menu.

Use Obsidian's ribbon controls to hide or reorder ribbon items.

## Settings

Each period's **Enable** toggle controls whether its command and ribbon action can open notes. Turning a period off hides its command from the command palette. Its ribbon action stays available, but shows a notice instead of opening or creating a note.

Each period has its own folder, name format and template file. Name formats use [Moment.js tokens](https://momentjs.com/docs/#/displaying/format/); slashes create subfolders.

Templates may use `{{title}}`, `{{date}}`, `{{time}}`, `{{start}}` and `{{end}}`, each with an optional `:FORMAT` suffix, e.g. `{{start:MMM D}}`.

The interface follows Obsidian's language setting (English and Korean included).
