# More Periodic Notes

## What does it do?

More Periodic Notes adds commands and ribbon actions to open or create the current weekly, monthly, and yearly notes in Obsidian, on desktop and mobile.

You can also look up periodic notes for a specific date and copy the corresponding weekly note name.

For example, this plugin can open periodic notes like below:

- **Open weekly note** (ISO week, `2026w46`)
- **Open monthly note** (`2026m11`)
- **Open yearly note** (`2026y`)

Obsidian's Daily notes plugin covers only daily notes.

## Find periodic notes by date

Run **Find periodic notes by date** from the command palette. Today's date is selected so you can replace it with a date in `YYYY-MM-DD` format.

When the date is valid, choose an action from the list:

- **Copy weekly note name** using your configured weekly name format, without the folder path or `.md` extension.
- Open or create the **weekly note** for that date.
- Open or create the **monthly note** for that date.
- Open or create the **yearly note** for that date.

For example, with the default formats, `2026-11-18` corresponds to `2026w47`, `2026m11` and `2026y`.

Existing notes are labeled **Open**; missing notes are labeled **Create**. A note is created only when you select its action, using that period's folder, template and tab settings. Template dates refer to the date you entered.

Use the arrow keys and **Enter**, or tap an action on mobile. Press **Esc** to close. Invalid dates show an explanation instead of actions.

## Ribbon and mobile Quick Access

The plugin adds a ribbon action for each period. The calendar icons show **W** for weekly, **M** for monthly and **Y** for yearly notes. Each action uses the same folder, name format, template and tab settings as its command.

On mobile, assign one of these actions to the Quick Access ribbon button:

1. Open **Settings → Appearance → Ribbon menu → Manage**.
2. Set **Quick access** to **Open weekly note**, **Open monthly note** or **Open yearly note**.

A short press opens the selected period's note. A long press opens the full ribbon menu.

Use Obsidian's ribbon controls to hide or reorder ribbon items.

## Settings

Each period's **Enable** toggle controls whether its command, ribbon action and date lookup can open or create notes. Turning a period off hides its command from the command palette and its open/create action from the date lookup. Its ribbon action stays available, but shows a notice instead of opening or creating a note. Copying the weekly note name remains available in the date lookup even when weekly notes are disabled.

**Name format** controls the file name only. Names cannot be empty or contain `/` or `\`; use **Folder** to set the storage location. An empty name format uses the period's default format.

## Supported Languages

The plugin interface follows Obsidian's language setting.

- English
- Korean
